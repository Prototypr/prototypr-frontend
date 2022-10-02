import { useEditor, EditorContent } from "@tiptap/react";
import MenuFloating from './Menus/FloatingMenu'
import EditorNav from "../EditorNav";

import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import TextMenu from '@/components/Editor/Menus/TextMenu'

import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

import SubmitPostModal from "../modal/submitPost";
import { saveAs } from "file-saver";

import Gapcursor from "@tiptap/extension-gapcursor";
import Youtube from "@tiptap/extension-youtube";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import CodeBlock from "@tiptap/extension-code-block";
import Bold from '@tiptap/extension-bold'
import HardBreak from '@tiptap/extension-hard-break'
import Underline from '@tiptap/extension-underline'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Dropcursor from '@tiptap/extension-dropcursor'
import History from "@tiptap/extension-history";
import {Blockquote} from "@/components/Editor/CustomExtensions/CustomBlockquote";
import Figure from "./CustomExtensions/Figure"
import Tweet from "./CustomExtensions/Tweet/Tweet"
import Video from "./CustomExtensions/Video/Video"

import {useConfirmTabClose} from './useConfirmTabClose'
import {useCreate, useLoad, useUpdate} from './editorHooks/index'


const CustomDocument = Document.extend({
  content: "heading block*",
  atom: true,
});


const Editor = ({ editorType = "create" }) => {
  
  const { user } = useUser({
    redirectIfFound: false,
  });

  const {content, loading, slug} = useLoad(editorType, user)
  const {updateExisitingPost, setSaving, setHasUnsavedChanges, hasUnsavedChanges, saving} = useUpdate()
  const {createNewPost} = useCreate()

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
      Youtube,
      Blockquote,
      Link.configure({
        openOnClick: false,
      }),
      Figure.configure({
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What's the title?";
          }
            return "Tell a story...";
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setHasUnsavedChanges(true);
      // send the content to an API here
      localStorage.setItem("wipContent", JSON.stringify(json));
    },
  });

  // load from local storage if anything exists
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
        if (editor?.commands) {
          editor?.commands?.setContent(content);
        }
      }
  }, [content, editor]);




  const onSubmit = async () => {
    // before submitting, check strapi if slug or id already exists
    // if it exists, then do an update, else create a new one
    if (editorType === "create") {
      await createNewPost(user, editor, editorType);
    }

    if (editorType === "edit") {
      await updateExisitingPost(user, editor, editorType, slug);
    }
  };

  const onSave = async () => {
    if (editorType === "edit") {
      setSaving(true);
      try {
        console.log("saving...");
        await updateExisitingPost(user, editor, editorType, slug);
      } catch (e) {
        setSaving(false);
      }
    }
  };

  const onExport = async () => {
    const json = editor.getJSON();
    const content = json.content;
    if (content) {
      let blob = new Blob([JSON.stringify({ content: content })], {
        type: "application/json",
      });
      const filename = slug ? `${slug}.json` : `${Date.now()}.json`;
      saveAs(blob, filename);
    }
  };

  const handleBeforeSubmit = async (open) => {
    // do all editor content checks here
    // check if post has a title
    // check if post has a description
    open();
  };

  return (
    <div className="w-full relative my-4">
     {/* NAVIGATION, WITH BUTTONS EMBEDDED AS A PROP */}
      <EditorNav 
      editorButtons = {
        <div className="w-full max-w-4xl p-4 mx-auto ">
          <div className="flex z-50 sticky top-0 bg-white">
          <aside className="w-full p-2 py-4 border-b flex flex-row justify-between items-center">
          <div className="flex">
            <span className="p-2 py-1 text-xs bg-green-400 bg-opacity-20 text-green-500 rounded-full border border-green-500">
              Beta
            </span>
          </div>
          <div className="flex flex-row justify-end gap-2">
            {editorType === "edit" && (
              <div>
                <button
                  onClick={onExport}
                  className="p-1 px-3 bg-yellow-400 rounded text-sm text-white"
                >
                  Export
                </button>
              </div>
            )}
            {editorType === "edit" && (
              <div>
                <button
                  onClick={onSave}
                  className="p-1 px-3 bg-green-400 rounded text-sm text-white"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
            <SubmitPostModal handleBeforeOpen={handleBeforeSubmit}>
              <div className="p-10">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl my-0">
                      Are you sure you want to publish this post?
                    </h1>
                    <p className="text-sm leading-7 my-0">
                      Feel free to make any changes. You can always edit the
                      post later. After you submit your draft, our editors will
                      look through it to ensure it aligns with our guidelines.
                      Once that's done, we will approve your draft and it will
                      be published on Prototypr. We will email you when it's
                      live.
                    </p>
                  </div>
                  <div className="p-4">
                    <img src="/static/images/source-bg.png" />
                  </div>

                  <button
                    onClick={onSubmit}
                    className="px-3 py-3 bg-blue-700 rounded text-sm text-white "
                  >
                    Submit Draft
                  </button>
                </div>
              </div>
            </SubmitPostModal>
          </div>
        </aside>
      </div>
      </div>
      }
      />
    {/* NAVIGATION END */}

      <div className="my-4 pt-16 pb-10 blog-content">
        {/* <div className="fixed bottom-10 left-5 z-10 flex flex-row gap-[2px]">
          <Spinner size={"sm"} />
          <span className="m-0 p-0">Saving</span>
        </div> */}
        {editor && 
       <MenuFloating editor={editor}/>}
        <TextMenu  editor={editor} />
        <EditorContent editor={editor} />
        <div className="popup-modal mb-6 relative bg-white p-6 pt-3 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default Editor;