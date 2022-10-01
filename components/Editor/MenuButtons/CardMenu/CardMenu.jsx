import React, {useState, useContext} from "react";
import {motion} from 'framer-motion'
// import HandlebarsCreator from "../../../../utilities/handlebarsFilter/handlebarsCreator"
import {generateHTMLCode, generateJSONCode} from '../../../generateHTML'
import InsertMenu from './InsertMenu'
import {duplicateCard} from './card-functions'
import {TextSelection} from "prosemirror-state";

var pretty = require('pretty');

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


const CardMenu = (props) =>{

  const {editor, node} = props
  
  const [menuExpanded, setMenuExpanded] = useState(false)
  
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
      setMenuExpanded(false)
  }
     return(

     <Tippy 
        appendTo= {document.getElementById('editor-container')}
        hideOnClick={true}
        onClickOutside={onHide}
        render={attrs => (
                <motion.div 
                initial="exit"
                animate={isOpenPopup ? "enter" : "exit"}
                variants={subMenuAnimate}
                style={{width:!menuExpanded?"154px":'180px'}}
                className="flex rounded-lg hover:bg-gray-800 hover:text-white cursor-default text-gray-100 flex-col shadow-lg bg-gray-900" {...attrs}>
                  {/* POPOVER CONTENTS */}
                  <>
                    {/* <h2 className="text-sm pb-2 px-4 mb-1 border-b border-gray-800 font-body text-white">{editor.isActive('link') || editor.isActive('blockLink')?"Edit Link":'Insert Link'}</h2> */}
                    {isOpenPopup && 
                    <div 
                    className="py-1">
                    {menuExpanded ? 
                    <>
                      <InsertMenu 
                      onHide={onHide} 
                      editor={editor}/>
                    </>
                    : 
                    <>
                        {/* duplicate */}
                        <div
                        onClick={() =>{
                            onHide()
                            setTimeout(()=>{
                            //  editor.chain().focus().duplicateTableSection().focus().run()
                              let $pos = editor.state.selection.$anchor
                              for (let d = $pos.depth; d > 0; d--) {
                                let node = $pos.node(d)
                                if (node.type.name == "letterCard") {
                                    // var handlebarsCreator = new HandlebarsCreator()
                                    var html = generateHTMLCode(node.toJSON())
                                    // editor.chain().focus().addRowAfter($pos.after(d)).run()
                                    var duplicatedHTML = duplicateCard(node.attrs,`${html}`)
                                    var json = generateJSONCode(duplicatedHTML)
                                    
                                    editor.chain().setTextSelection(0).focus().insertContentAt($pos.after(d),json.content[0]).blur().run()

                                    setTimeout(()=>{
                                      selectionClearer()
                                    }, 20) 
                                }
                              }
                            },50)
                            }}
                         className="px-1 flex my-1 hover:bg-gray-200 duration-200 ease-in-out 
                            transition">
                            <button
                            className="moveable-arrow text-base focus:outline-none flex justify-center px-2 py-1 rounded-lg font-bold cursor-default 
                            duration-200 ease-in-out 
                            transition"
                                // className={editor.isActive("orderedList") ? "is-active" : ""}
                            >
                           <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z" fill="currentColor"/></svg>
                            </button>
                            <div className="text-xs my-auto font-medium ">Duplicate row</div>
                        </div>
                        {/* divider */}
                        <div className="w-full border-b border-gray-400"/>
                        {/* delete */}
                        <div
                        onClick={() =>{
                                    onHide()
                                     editor.chain().focus().deleteCard().setTextSelection(0).blur().run()
                                    setTimeout(()=>{
                                      selectionClearer()
                                    },50)
                                    }}
                         className="px-1 flex mt-1 hover:bg-gray-200 duration-200 ease-in-out 
                            transition">
                            <button
                            className="moveable-arrow text-base focus:outline-none flex justify-center px-2 py-1 rounded-lg font-bold cursor-default 
                            duration-200 ease-in-out 
                            transition"
                                // className={editor.isActive("orderedList") ? "is-active" : ""}
                            >
                            <svg className="w-4 h-4 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" fill="currentColor"/></svg>
                            </button>
                            <div className="text-xs my-auto font-medium ">Delete row</div>
                        </div>
                    </>}
                    </div>
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
            popperOptions={{hideOnClick:true,modifiers:[{ name: 'eventListeners', options: { scroll: false }}]}}
        >
        {/* DOTTED TRIGGER BUTTON */}
          {props.button}
        </Tippy>)
}

export default CardMenu

const selectionClearer = ()=>{
  // var doc = document.getElementById('letter-doc')
  //   doc.click()
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }
}