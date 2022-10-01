import React, {useState} from "react";
import {motion} from 'framer-motion'
import InlineInsertMenu from './InlineInsertMenu'

import Tippy from '@tippyjs/react/headless'; // different import path!

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      y:-4,
          ease: "easeIn",

      transition: {
        duration: 0.1
      },
      display: "block"
    },
    exit: {
          ease: "easeOut",

      opacity: 0,
      rotateX: -25,
      y:-16,
      transition: {
        duration: 0.1,
      },
      transitionEnd: {
        display: "none"
      }
    }
  };


const InlineElementButton = (props) =>{

  const {editor, node} = props

  
//   const previousUrl = editor.getAttributes("link").href;
  const [link, setLink] = useState('');
  
  const firstFieldRef = React.useRef(null)

     const onPopupOpen = () =>{

      if (editor) {

        let previousUrl = editor.getAttributes("link").href;
        
        if(editor.isActive('blockLink')){
            previousUrl = editor.getAttributes("blockLink").href;
        }
        setLink(previousUrl)
        // onOpen()

      }
     }
       
       const [isOpenPopup, setIsOpenPopup] = React.useState(false);
   

  function onMount() {
    onPopupOpen()
    setIsOpenPopup(true)
  }

  function onHide(unmount) {
      setIsOpenPopup(false)  
  }
     return(

     <Tippy 
        appendTo= {document.getElementById('editor-container')}
        onClickOutside={onHide}
        render={attrs => (
                <motion.div 
                initial="exit"
                animate={isOpenPopup ? "enter" : "exit"}
                variants={subMenuAnimate}
                style={{width:"190px"}}
                className="flex rounded-lg py-1 flex-col bg-white shadow-lg cursor-default" {...attrs}>
                  {/* POPOVER CONTENTS */}
                  <>
                    {isOpenPopup && 
                        <InlineInsertMenu
                        editor={editor} 
                        onHide={onHide} 
                        />
                  }
                  </>
                </motion.div>
              )}
              onMount={onMount}
              onHide={onHide}
              trigger="click"
              interactive={true}
              // Need to ensure it can be tabbed to directly after with no clipping issues
              // appendTo={document.body}
              placement="bottom-start"
              //scroll="false" // true
              //resize="false" // true
              animation={true}
            popperOptions={{modifiers:[{ name: 'eventListeners', options: { scroll: false }}]}}
        >
        {/* DOTTED TRIGGER BUTTON */}
            <button
            className={`focus:outline-none flex justify-center px-2 py-1 rounded-lg font-bold cursor-default 
                hover:bg-gray-800  
                duration-200 ease-in-out 
                text-gray-400
                hover:text-white
                transition`}
            // onClick={() => alert('Insert Menu')}
            >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="currentColor"/></svg>
            </button>
        </Tippy>)
}

export default InlineElementButton