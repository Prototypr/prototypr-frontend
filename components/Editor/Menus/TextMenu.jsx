import { BubbleMenu } from "@tiptap/react";
import LinkInput from "./MenuButtons/LinkDropdown/LinkButtonRadix";
// import FontFormatButton from "./MenuButtons/FontFormatDropdown/FontFormatButton";
// import MergeTagsButton from "./MenuButtons/MergeTags/MergeTagsButton";
import { TextSelection } from "prosemirror-state";
import { styled } from '@stitches/react';
import { blackA, slate } from '@radix-ui/colors';

import {roundArrow} from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';

import 'tippy.js/animations/scale-subtle.css';

const switchBlockQuote = (editor) =>{
  // editor.chain().focus().updateAttributes('blockquote',{ class: 'wp-block-quote' }).run();

  if(editor.isActive('blockquote') && !editor.isActive({class:'wp-block-quote'})){
    editor.chain().focus().updateAttributes('blockquote',{ class: 'wp-block-quote' }).run()
  }else{
    editor.chain().focus().toggleBlockquote().run()
  }

}


const IconButton = styled('button', {
  // all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '6px',
  height: 28,
  width: 35,
  display: 'inline-flex',
  marginRight:1,
  marginLeft:1,
  alignItems: 'center',
  justifyContent: 'center',
  // color: slate.slate6,
  // backgroundColor: 'transparent',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  // '&:hover': { backgroundColor: slate.slate11 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
//   '&:active':{background:'white'}
});

const MenuBar = ({ editor, isSelecting }) => {
    if (!editor) {
      return null;
    }
    // console.log(editor);
    return (
      <>
        <BubbleMenu 
        style={{pointerEvents:'none'}}
          pluginKey={'TextMenu'}
        tippyOptions={{
          arrow:roundArrow,
          popperOptions:{modifiers:[{ name: 'eventListeners', options: { scroll: false }}]},
          duration: 100,
          animation: 'scale-subtle'}}
          shouldShow={ ({ editor, view, state, oldState, from, to }) => {

          const selection = editor.state.selection
          const isTextSelection = selection instanceof TextSelection

          if(isTextSelection && (selection.ranges[0].$from.pos==selection.ranges[0].$to.pos)){
            return false
          }

          if(isTextSelection){
            return (editor.isActive('paragraph') || editor.isActive('heading')) || (editor.isActive('figure') || editor.isActive('image')) 

          }else{
            return false
          }
          }}

        element={document.getElementById('editor-container')}
        editor={editor}>
              {/* bold */}
              <div className={`${isSelecting?'':'pointer-events-all'} p-2 duration-300 rounded-xl shadow-md bg-gray-900 flex text-gray-100`}>
              
              <div className={`${isSelecting?'pointer-events-none':'pointer-events-all'} flex`}>
              <IconButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`
                hover:bg-gray-800  mr-1
                ${editor.isActive("bold")?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive("bold")?'text-blue-400':'text-gray-200'}`}
              >
              <svg  className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" fill="currentColor"/></svg>
              </IconButton>
              {/* italic */}
              <IconButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`hover:bg-gray-800  mr-1
                ${editor.isActive("italic")?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive("italic")?'text-blue-400':'text-gray-200'}`}
              >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" fill="currentColor"/></svg>
              </IconButton>
              {/* underline */}
              <IconButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`hover:bg-gray-800  mr-1
                ${editor.isActive("underline")?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive("underline")?'text-blue-400':'text-gray-200'}`}
              >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" fill="currentColor"/></svg>
              </IconButton>
              {/* headings */}
              {!editor.isActive('figure') &&
                <>
                <div className="bg-gray-700 hover:bg-gray-900 mx-1 my-auto" style={{height:'20px', width:'1px'}}/>

              <IconButton
                onClick={()=>editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`hover:bg-gray-800  mr-1
                ${editor.isActive('heading', { level: 1 })?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive('heading', { level: 1 })?'text-blue-400':'text-gray-200'}`}
              >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" fill="currentColor"/></svg>
              </IconButton>
              <IconButton
                onClick={()=>editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`hover:bg-gray-800  mr-1
                ${editor.isActive('heading', { level: 2 })?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive('heading', { level: 2 })?'text-blue-400':'text-gray-200'}`}
              >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" fill="currentColor"/></svg>
              </IconButton>
                </>
              }
              <div className="bg-gray-700 hover:bg-gray-900 mx-1 my-auto" style={{height:'20px', width:'1px'}}/>
              {/* blockquote */}
            { !editor.isActive('figure') &&  
            <IconButton
                onClick={()=>switchBlockQuote(editor)}
                className={`hover:bg-gray-800  mr-1
                ${editor.isActive("blockquote")?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive("blockquote")?'text-blue-400':'text-gray-200'}`}
              >
             <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C4.591 12.322 3.17 10.841 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z" fill="currentColor"/></svg>
              </IconButton>}

              {/* Ordered list */}
              {!editor.isActive('figure') && 
              <IconButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`hover:bg-gray-800  mr-1
                ${editor.isActive("bulletList")?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive("bulletList")?'text-blue-400':'text-gray-200'}`}
              >
             <svg className="h-5 w-5"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="currentColor"/></svg>
              </IconButton>}
              {/* unordered list */}
              {!editor.isActive('figure') &&
              <>
              <IconButton
              className={`hover:bg-gray-800  mr-1
              ${editor.isActive("orderedList")?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive("orderedList")?'text-blue-400':'text-gray-200'}`}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="currentColor"/></svg>
              </IconButton>
              <div className="bg-gray-700 hover:bg-gray-900 mx-1 my-auto" style={{height:'20px',marginRight:1, width:'1px'}}/>
              </>
              }

              <LinkInput marginLeft={editor.isActive('figure') && -52} showRemove={true} editor={editor} />

              </div>
              </div>
        </BubbleMenu>
      </>
    );
  };

  export default MenuBar