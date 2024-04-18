import React from "react";
import ReactDOM from "react-dom";

import { useEditor, EditorContent } from "@tiptap/react";
import MenuFloating from "./Menus/FloatingMenu";

import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import TextMenu from "@/components/Editor/Menus/TextMenu";
import ImageMenu from "@/components/Editor/Menus/ImageMenu";

import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

import Cite from "./CustomExtensions/Cite";

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
import { Image } from "./CustomExtensions/Figure2/CustomImage";

import Figure from "./CustomExtensions/Figure2/Figure";
import FigCaption from "./CustomExtensions/Figure2/Figcaption";
import { PasteFilter } from "./CustomExtensions/PasteFilter";

import Tweet from "./CustomExtensions/Tweet/Tweet";
import LinkEmbed from "./CustomExtensions/LinkEmbed/LinkEmbed";
import Video from "./CustomExtensions/Video/Video";

import { ToggleSwitch } from "@/components/atom/Switch/switch";
import PreviewDisplay from "./preview";

import { useRouter } from "next/router";
import VideoMenu from "./Menus/VideoMenu";
import { addTwitterScript } from "./editorHooks/libs/addTwitterScript";
import UndoRedoButtons from "./UndoRedoButtons";
// const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

import Button from "@/components/Primitives/Button";
import { PublishDialogButton } from "./PublishDialogButton";
import SidePanelTrigger from "./SidePanel/SidePanelTrigger";

const CustomDocument = Document.extend({
  content: "heading block*",
  atom: true,
});

/**
 * Editor
 * @returns {JSX.Element}
 * @example
 *
 * @param {*} param0
 * @returns
 */
const Editor = ({
  canEdit = false,
  initialContent = null,
  postStatus = "draft",
  postObject = null,
  slug = null,
  postId = null,
  //functions
  createPost = false,
  savePost = false,
  updatePost = false,
}) => {
  const router = useRouter();

  const { user } = useUser({
    redirectIfFound: false,
  });

  /**
   * useLoad is a custom hook that loads the editor content
   * Load the editor content
   * @returns {object}
   */

  const [editorInstance, setEditorInstance] = useState(false);
  const [previewEnabled, togglePreview] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      CustomDocument,
      Text,
      History,
      Paragraph,
      Heading,
      Tweet,
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
      Cite,
      Video,
      Iframe,
      Youtube,
      Blockquote,
      LinkEmbed,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: null,
          class: null,
        },
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
        includeChildren: true,
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
          if (node.type.name === "tweet") {
            return "Paste a tweet link and press enter";
          }
          return "Tell a story...";
        },
      }),
    ],
    onCreate: ({ editor }) => {
      setEditorInstance(editor);
      /**
       * when the editor is created
       * set the content to the initial content
       */
      editor
        ?.chain()
        .setContent(initialContent)
        .setMeta("addToHistory", false)
        .run();

      //add the twitter widget script
      addTwitterScript();
    },
    onUpdate: ({ editor }) => {
      try {
        const json = editor.getJSON();
        // autosave would happen in the parent here;
        updatePost({ editor, json });
      } catch (e) {
        if (typeof updatePost !== "function") {
          console.log(e);
          console.log("updatePost is not a function");
        } else [console.log(e)];
      }
    },
  });

  /**
   * onSave
   * when save button is clicked on the navbar!
   *
   * forReview is a flag for when publish button is clicked - it submits the post for review
   *
   * - not using autosave yet
   * - remove onSave when switching to autosaving
   */
  const onSave = async ({ forReview }) => {
    setIsSaving(true);

    try {
      const saved = await savePost({
        editor,
        forReview: forReview ? true : false,
      });
      if (saved) {
        setIsSaving(false);
      } else {
        console.log("Error saving");
        setIsSaving(false);
      }
    } catch (e) {
      console.log("Error saving");
      setIsSaving(false);
    }
  };

  if (!canEdit) return <p>You are not owner of this post</p>;

  return (
    <>
      <div className="fixed z-[48] bottom-10 left-10 border flex flex-col grid gap-2 border-black border-opacity-10 p-4 bg-white rounded-lg">
        <p className="text-xs">Preview Mode</p>
        <ToggleSwitch
          onToggle={() => {
            togglePreview(!previewEnabled);
            setTimeout(() => {
              const s = document.createElement("script");
              s.setAttribute("src", "https://platform.twitter.com/widgets.js");
              s.setAttribute("id", "twitter-widget");
              s.setAttribute("async", "true");

              if (!document.getElementById("twitter-widget")) {
                document.head.appendChild(s);
              }
            }, 500);
          }}
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
              <div className="fixed bottom-3 z-20 w-full">
                <div className="relative bg-gray-100/80 w-[500px] shadow-sm border border-gray-300/20 mx-auto rounded-xl p-3 text-sm backdrop-blur text-gray-800 flex flex-row justify-center items-center">
                  You're editing as admin.
                </div>
              </div>
            </div>
          )}

          {/* undoredo buttons render in a portal on the navbar */}
          <UndoRedoNavPortal>
            <UndoRedoButtons editor={editor} />
          </UndoRedoNavPortal>

          <EditorButtonsNavPortal>
            <EditorButtons
              //general stuff
              user={user}
              onSave={onSave}
              isSaving={isSaving}
              postStatus={postStatus}
              canEdit={canEdit}
              editor={editor}
              //functions
              createPost={createPost}
              updatePost={updatePost}
              //for updating existing post
              slug={slug}
              postId={postId}
              postObject={postObject}
            />
          </EditorButtonsNavPortal>

          {/* NAVIGATION END */}
          <div className="my-4 pt-0 mt-[100px] max-w-[44rem] mx-auto relative pb-10 blog-content">
            {editor && <MenuFloating editor={editor} />}
            <TextMenu editor={editor} />
            {/* <LinkMenu editor={editor} /> */}
            <ImageMenu editor={editor} />
            <VideoMenu editor={editor} />

            <EditorContent editor={editor} />
            <div className="popup-modal mb-6 relative bg-white p-6 pt-3 rounded-lg w-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;

/**
 * Use portal components so that the buttons can be rendered on the navbar
 */
const EditorButtonsNavPortal = ({ children }) => {
  const container = document.getElementById("editor-nav-buttons");
  return ReactDOM.createPortal(children, container);
};

const UndoRedoNavPortal = ({ children }) => {
  const container = document.getElementById("undoredo-container");
  return ReactDOM.createPortal(children, container);
};

/**
 * EditorButtons
 * render buttons for saving and publishing
 * in the editor, these are wrapped in a portal so they can be rendered on the navbar
 * @param {*} param0
 * @returns
 */
const EditorButtons = ({
  //general stuff
  user,
  canEdit,
  onSave,
  isSaving,
  postStatus,
  editor,
  //for updating existing post
  slug,
  postId,
  postObject,
}) => {
  return (
    <>
      {user?.isLoggedIn && (
        <Button
          variant="ghostBlue"
          onClick={onSave}
          className="text-[13px] font-normal h-[25px] px-2 my-auto"
        >
          {isSaving
            ? "Saving..."
            : postStatus == "publish"
              ? "Update"
              : "Save Draft "}
        </Button>
      )}

      {/* show publish button if post not published */}
      {/* publish button does same as save draft button, but uses dialog and adds 'forReview' flag */}
      {canEdit && postStatus !== "publish" && (
        <PublishDialogButton
          //save post creates a post or updates an existing one
          //for /write (new post), it creates a new post
          //for /p/[slug] (existing post), it updates the existing post
          onSave={onSave}
        />
      )}

      {user?.isAdmin && (
          <div className="flex flex-col grid gap-2 rounded-lg">
            {editor && (
              <SidePanelTrigger
                user={user}
                editor={editor}
                postObject={postObject}
              />
            )}
          </div>
        )}
    </>
  );
};
