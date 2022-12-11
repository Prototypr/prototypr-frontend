// copy pasted from https://tiptap.dev/examples/default

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from "@tiptap/extension-placeholder";

import Underline from "@tiptap/extension-underline";
import Link from '@tiptap/extension-link'

import MenuBar from './MenuBar';

export default ({setDescription, initialContent='', height=250}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: null,
          class: null,
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
            return "e.g. We're looking for an mid-level UI designer to help part-time with an onboarding flow. The position is remote friendly!";
        },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
        setDescription(editor.getHTML())
      },
  })

  return (
    <div className="border blog-content border-gray-300 pt-12 rounded-lg py-4 relative -mt-2">
      <MenuBar editor={editor} />
      <div style={{minHeight:height,maxHeight:400}} className="pt-4 px-5 overflow-auto">
      <EditorContent editor={editor} />
      </div>
    </div>
  )
}

