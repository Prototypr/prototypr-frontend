import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { useEditor, EditorContent } from "@tiptap/react";
import MenuFloating from "./Menus/FloatingMenu";

import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import TextMenu from "@/components/Editor/Menus/TextMenu";
import ImageMenu from "@/components/Editor/Menus/ImageMenu";

import Link from "@tiptap/extension-link";

import NextLink from "next/link";

import { useState } from "react";
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

import VideoMenu from "./Menus/VideoMenu";
import { addTwitterScript } from "./editorHooks/libs/addTwitterScript";
import UndoRedoButtons from "./UndoRedoButtons";
import EditorNavButtons from "./EditorNavButtons";

// const CustomDocument = Document.extend({
//   content: "heading block*",
//   atom: true,
// });

const Editor = ({
  wrapperClass = false,
  postType = "article",
  canEdit = false,
  initialContent = null,
  postStatus = "draft",
  postObject = null,
  showNavButtons = true,
  //save status
  isSaving = false,
  hasUnsavedChanges = false,
  saved = false,
  //functions
  refetchPost = false,
  updatePost = false,
  forceSave= false,
  updatePostSettings = false,
  setInitialEditorContent = false,
}) => {
  const { user } = useUser({
    redirectIfFound: false,
  });


  const [saveForReview, setForReview] = useState(false);

  useEffect(() => {
    if(forceSave && saveForReview){
      forceSave({editor, json:editor.getJSON(), forReview:saveForReview})
      setForReview(false)
    }
  },[saveForReview])

  const editor = useEditor({
    extensions: [
      // CustomDocument,
      //if postType is article, then the document should start with a heading
      Document.extend({
        content: postType == "article" ? "heading block*" : "block*",
        atom: true,
      }),
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
        showOnlyCurrent: false,
        includeChildren: false,
        placeholder: ({ editor, node }) => {
          if (node.type.name === "heading") {
            return "Title";
          }
          if (node.type.name === "figcaption") {
            return "Enter a caption";
          }
          if (node.type.name === "figure") {
            return "Enter a caption";
          }
          if (node.type.name === "tweet") {
            return "Paste a tweet link and press enter";
          }
          if (node.type.name == "paragraph") {
            //check if editor has 3 or more nodes
            if (
              editor.state.doc.textContent.trim() === "" &&
              editor.state.doc.childCount <= 2
            ) {
              return "Tell your story...";
            }
          }
        },
      }),
    ],
    onCreate: ({ editor }) => {
      /**
       * when the editor is created
       * set the content to the initial content
       */
      editor
        ?.chain()
        .setContent(initialContent)
        .setMeta("addToHistory", false)
        .run();

      //check if editor.state.doc.textContent is white space or empty
      if (editor.state.doc.textContent.trim() === "") {
        editor.commands.clearContent();
        setTimeout(() => {
          editor.chain().focus().setTextSelection(0).enter().run();
        }, 100);
      }

      if (setInitialEditorContent) setInitialEditorContent(editor);

      //add the twitter widget script
      addTwitterScript();
    },
    onUpdate: ({ editor }) => {
      try {
        const json = editor.getJSON();
        // autosave would happen in the parent here;
        updatePost({ editor, json, forReview:saveForReview });
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
  // const onSave = async ({ forReview }) => {
  //   setIsSaving(true);

  //   try {
  //     const saved = await savePost({
  //       editor,
  //       forReview: forReview ? true : false,
  //     });
  //     if (saved) {
  //       setIsSaving(false);
  //     } else {
  //       console.log("Error saving");
  //       setIsSaving(false);
  //     }
  //   } catch (e) {
  //     console.log("Error saving");
  //     setIsSaving(false);
  //   }
  // };

  if (!canEdit) {
    return (
      <div className="h-full w-full mx-auto  relative">
        <div className="my-auto h-screen flex -mt-8 flex-col justify-center text-center text-center">
          <img
            className="w-[160px] mx-auto"
            src="https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/ecacc329595d009d506f6ec3e6e47d0f.png"
          />
          <p className="text-gray-700">You are not owner of this post</p>

          <div className="mx-auto mt-4">
            <NextLink href="/dashboard">
              <button className="px-3 h-[35px] bg-blue-500 text-white font-semibold text-sm rounded-md w-fit hover:bg-blue-600">
                Go to dashboard
              </button>
            </NextLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`w-full relative ${postType == "article" ? "my-4" : ""}`}>
        {/* NAVIGATION, WITH BUTTONS EMBEDDED AS A PROP */}
        {user?.isAdmin && postType == "article" ? (
          <div className="mt-16">
            <div className="fixed bottom-3 z-20 w-full">
              <div className="relative bg-gray-100/80 w-[500px] shadow-sm border border-gray-300/20 mx-auto rounded-xl p-3 text-sm backdrop-blur text-gray-800 flex flex-row justify-center items-center">
                You're editing as admin.
              </div>
            </div>
          </div>
        ) : null}

        {/* undoredo buttons render in a portal on the navbar */}
        {showNavButtons !== false ? (
          <UndoRedoNavPortal>
            <div className="flex">
              <UndoRedoButtons editor={editor} />
              <div className={`ml-3 my-auto text-gray-500`}>
                {isSaving ? "Saving..." : hasUnsavedChanges ? "" : saved?"Saved":''}
              </div>
            </div>
          </UndoRedoNavPortal>
        ) : null}

        {showNavButtons !== false ? (
          <EditorButtonsNavPortal>
            <EditorNavButtons
              user={user}
              onSave={({ forReview }) => {
                setForReview(forReview);
              }}
              isSaving={isSaving}
              postStatus={postStatus}
              saved={saved}
              canEdit={canEdit}
              editor={editor}
              //for settings panel
              postObject={postObject}
              updatePostSettings={updatePostSettings}
              refetchPost={refetchPost}
            />
          </EditorButtonsNavPortal>
        ) : null}

        {/* NAVIGATION END */}
        <div
          className={
            wrapperClass
              ? wrapperClass
              : postType == "article"
                ? "my-4 pt-0 mt-[100px] max-w-[44rem] mx-auto relative pb-10 blog-content"
                : ""
          }
        >
          {editor && <MenuFloating editor={editor} />}
          <TextMenu editor={editor} />
          {/* <LinkMenu editor={editor} /> */}
          <ImageMenu editor={editor} />
          <VideoMenu editor={editor} />

          <EditorContent editor={editor} />
          <div className="popup-modal mb-6 relative bg-white p-6 pt-3 rounded-lg w-full"></div>
        </div>
      </div>
      {/* )} */}
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
