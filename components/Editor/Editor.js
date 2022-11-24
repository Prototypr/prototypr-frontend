import { useEditor, EditorContent } from "@tiptap/react";
import MenuFloating from "./Menus/FloatingMenu";
import EditorNav from "../EditorNav";
import dynamic from "next/dynamic";

import Placeholder from "@tiptap/extension-placeholder";
// import Placeholder from "./CustomExtensions/Figure2/Placeholder";
import Document from "@tiptap/extension-document";
import TextMenu from "@/components/Editor/Menus/TextMenu";
import ImageMenu from "@/components/Editor/Menus/ImageMenu";
import Button from "@/components/Primitives/Button";


import SidePanelTrigger from "./SidePanel/SidePanelTrigger";

import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

// import { saveAs } from "file-saver";
import { PublishDialogButton } from "./PublishDialogButton";

import Iframe from "./CustomExtensions/Iframe/Iframe";
import Gapcursor from "@tiptap/extension-gapcursor";
import Youtube from "@tiptap/extension-youtube";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import CodeBlock from "@tiptap/extension-code-block";
import Bold from "@tiptap/extension-bold";
import HardBreak from "@tiptap/extension-hard-break";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Dropcursor from "@tiptap/extension-dropcursor";
import History from "@tiptap/extension-history";
import { Blockquote } from "@/components/Editor/CustomExtensions/CustomBlockquote";
// import { FigCaption, Figure } from "./CustomExtensions/Figure";
// import { FigCaption } from "./CustomExtensions/Figure";

// import Image from "@tiptap/extension-image";
import {Image} from "./CustomExtensions/Figure2/CustomImage";

import Figure from "./CustomExtensions/Figure2/Figure";
import FigCaption from "./CustomExtensions/Figure2/Figcaption";
import { PasteFilter } from "./CustomExtensions/PasteFilter";

import Tweet from "./CustomExtensions/Tweet/Tweet";
import Video from "./CustomExtensions/Video/Video";

import { useConfirmTabClose } from "./useConfirmTabClose";
import { useCreate, useLoad, useUpdate } from "./editorHooks/index";
import { ToggleSwitch } from "@/components/atom/Switch/switch";
import PreviewDisplay from "./preview";

import { useRouter } from "next/router";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

const CustomDocument = Document.extend({
  content: "heading block*",
  atom: true,
});

const Editor = ({
  editorType = "create",
  hasEditPermission = true,
}) => {
  const router = useRouter();

  const { user } = useUser({
    redirectIfFound: false,
  });

  const { content, loading, slug, title, articleSlug, postId, postStatus, isOwner, postObject } =
    useLoad(editorType, user);
  const {
    updateExistingPost,
    setSaving,
    setHasUnsavedChanges,
    hasUnsavedChanges,
    saving,
  } = useUpdate();
  const { createNewPost } = useCreate();

  const [editorCreated, setEditorCreated] = useState(false);
  const [editorInstance, setEditorInstance] = useState(false);
  const [previewEnabled, togglePreview] = useState(false);

  useConfirmTabClose(hasUnsavedChanges);

  const editor = useEditor({
    extensions: [
      CustomDocument,
      Text,
      History,
      Paragraph,
      Heading,
      CodeBlock,
      HorizontalRule,
      Bold,
      HardBreak,
      Underline,
      Italic,
      ListItem,
      Gapcursor,
      BulletList,
      OrderedList,
      Dropcursor,
      Tweet,
      Video,
      Iframe,
      Youtube,
      Blockquote,
      Link.configure({
        openOnClick: false,
      }),
      // images are converted to figures now
      Figure,
      Image.configure({
        allowBase64: true,
      }),
      FigCaption,
      PasteFilter,
      // Figure.configure({
      //   allowBase64: true,
      // }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What's the title?";
          }
          if (node.type.name === "figcaption") {
            return "What's the title?";
          }
          if (node.type.name === "figure") {
            return "What's the title?";
          }
          return "Tell a story...";
        },
      }),
    ],
    onCreate: ({ editor }) => {
      setEditorInstance(editor);
      setEditorCreated(true);
      // setTimeout(() => {
      // }, 1200);
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setHasUnsavedChanges(true);
      // send the content to an API here (if new post only)
      if (!slug) {
        localStorage.setItem("wipContent", JSON.stringify(json));
      }
    },
  });

  // load from local storage if anything exists
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      if (editor?.commands) {
        editor
          ?.chain()
          .setContent(content)
          .setMeta("addToHistory", false)
          .run();
      }
    }
  }, [content]);

  useEffect(() => {
    if (editor) {
      if (user?.isAdmin) {
        if (!hasEditPermission) {
          console.log("cant edit");
          editor.setEditable(false);
        } else {
          console.log("can edit");
          editor.setEditable(true);
        }
      }
    }
  }, [editor, hasEditPermission, user?.isAdmin]);


  const onSave = async () => {
    // if (editorType === "edit") {
    if (slug) {
      setSaving(true);
      try {
        console.log("saving post...");
        // while updating the post, we are using articleSlug instead of slug
        // This is to ensure that the slug never changes from its original slug
        await updateExistingPost({postId,user,editor,articleSlug,forReview:false,postStatus,postObject});
      } catch (e) {
        setSaving(false);
      }
    } else {
      if (editorType === "create") {
        const postInfo = await createNewPost(user, editor);
        //set the new slug
        localStorage.removeItem("wipContent");

        router.push(`p/${postInfo?.id}`);
      }
    }
  };

  // not using right now
  // const onExport = async () => {
  //   const json = editor.getJSON();
  //   const content = json.content;
  //   if (content) {
  //     let blob = new Blob([JSON.stringify({ content: content })], {
  //       type: "application/json",
  //     });
  //     const filename = slug ? `${slug}.json` : `${Date.now()}.json`;
  //     saveAs(blob, filename);
  //   }
  // };

  return (
    <>
      <div className="fixed z-[48] bottom-10 left-10 border flex flex-col gap-2 border-black border-opacity-10 p-4 bg-white rounded-lg">
        <p className="text-xs">
          Preview Mode
        </p>
        <ToggleSwitch
          onToggle={() => togglePreview(!previewEnabled)}
          size="small"
          checked={previewEnabled}
        />
      </div>


      {previewEnabled ? (
        <div>
          <PreviewDisplay editor={editorInstance} content={content} />
        </div>
      ) : (
        <div className="w-full relative my-4">
          {/* NAVIGATION, WITH BUTTONS EMBEDDED AS A PROP */}
          {user?.isAdmin && (
            <div className="mt-16">
              {hasEditPermission ? (
                <div className="z-50 p-3 text-sm fixed top-[64px] w-full bg-green-100 backdrop-blur text-green-900 flex flex-row justify-center items-center">
                  Hello there Admin, you can edit this post.
                </div>
              ) : (
                <div className=" p-3 text-sm bg-yellow-400 flex flex-row justify-center items-center">
                  You don't have permission to edit this.
                </div>
              )}
            </div>
          )}

          <EditorNav
            editorInstance={editorInstance}
            postStatus={postStatus}
            isEditor={true}
            editorButtons={
              <div className="my-auto flex mr-1">
                {hasUnsavedChanges && (
                  <div className="inline mr-6 text-pink-500 text-xs my-auto">
                    Unsaved changes
                  </div>
                )}
                <>
                  {!user?.isAdmin && (
                    <div>
                      <Button
                        variant="ghostBlue"
                        onClick={onSave}
                        className="text-sm"
                      >
                        {saving ? "Saving...": postStatus == "publish"? "Update": "Save Draft"}
                      </Button>
                    </div>
                  )}

                  {(user?.isAdmin && hasEditPermission )&& (
                    <div>
                      <Button
                        variant="ghostBlue"
                        onClick={onSave}
                        className="text-sm"
                      >
                        {saving? "Saving...": postStatus == "publish"? "Update": "Save Draft "}
                      </Button>
                    </div>
                  )}

                  {(
                   ( (slug && postStatus != "publish") && !user?.isAdmin) || (isOwner && postStatus!='publish') )
                  && (
                   <PublishDialogButton 
                    slug={slug}
                    user={user} 
                    postId={postId}
                    createNewPost={createNewPost}
                    updateExistingPost={updateExistingPost}
                    editor={editor}
                    postStatus={postStatus}
                    postObject={postObject}/>
                  )}

                {user?.isAdmin &&
                <div className="flex flex-col gap-2 bg-white rounded-lg">
                  {editorInstance && <SidePanelTrigger user={user} editor={editorInstance} postObject={postObject}/>}
                </div>
                }
                </>
              </div>
            }
          />
          {/* NAVIGATION END */}
          <div className="my-4 pt-16 relative pb-10 blog-content">
            {editor && <MenuFloating editor={editor} />}
            <TextMenu editor={editor} />
            <ImageMenu editor={editor} />
            {((loading || !editorCreated)|| (!content && slug))? (
              <div
                style={{ maxWidth: "100%" }}
                className="mx-2 h-screen absolute top-0 left-0 flex flex-col justify-center w-screen"
              >
                <div className="-mt-32 mx-auto text-blue-800 opacity-80">
                  <Spinner />
                </div>
              </div>
            ) : (
              <EditorContent editor={editor} />
            )}

            <div className="popup-modal mb-6 relative bg-white p-6 pt-3 rounded-lg w-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
