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

const LinkMenu = ({ editor, isSelecting }) => {
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

          if(editor.isActive('link')){
            return true
          }else{
            return false
          }
          }}

        element={document.getElementById('editor-container')}
        editor={editor}>
              {/* bold */}
              <div className={`${isSelecting?'':'pointer-events-all'} p-2 duration-300 rounded-xl shadow-md bg-gray-900 flex text-gray-100`}>
              


          

              <LinkInput marginLeft={editor.isActive('figure') && -52} showRemove={true} editor={editor} />

              </div>
        </BubbleMenu>
      </>
    );
  };

  export default LinkMenu