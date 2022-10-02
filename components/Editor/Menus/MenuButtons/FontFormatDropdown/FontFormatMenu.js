import React, {useState, useContext, useRef} from "react";
import {motion} from 'framer-motion'
import ReactDOM from 'react-dom'

import {roundArrow} from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';

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

  const items= [
    {
      title: "Paragraph",
      icon:<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"  viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" fill="currentColor"/></svg>,
      command: (editor) => {
        editor
          .chain()
          .focus()
          .setNode("paragraph")
          .focus()
          .run();
      }
    },
    {
      title: "Heading 1",
      icon:<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" fill="currentColor"/></svg>,
      command: (editor) => {
        editor
          .chain()
          .focus()
          .setNode("heading", { level: 1 })
          .focus()
          .run();
      }
    },
    {
      title: "Heading 2",
      icon:<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" fill="currentColor"/></svg>,
      command: (editor) => {
        editor
          .chain()
          .focus()
          .setNode("heading", { level: 2 })
          .focus()
          .run();
      }
    },
  ]
  
const FontFormatMenu = (props) =>{

    const {editor} = props;
    const firstFieldRef = useRef(null)

    const tippyInstance = useRef()

  const [selectedIndex, setSelectedIndex] = useState(0)


     const onPopupOpen = () =>{
       editor.commands.blur()
      if(tippyInstance.current){

        ReactDOM.findDOMNode(firstFieldRef.current).focus();
      }
     }
       
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
   

  const upHandler= ()=>{
    const index = (selectedIndex + items.length - 1) % items.length
    setSelectedIndex(index)
  }
  const downHandler= ()=>{
    const index = (selectedIndex + items.length + 1) % items.length
    setSelectedIndex(index)
  }
  const enterHandler= ()=>{
    selectItem(selectedIndex);
  }

  const selectItem =(index)=> {
    const item = items[index];

    if (item) {
      item.command(editor);
      setIsOpenPopup(false)
    }
  }

  function onMount() {
    onPopupOpen()
    setIsOpenPopup(true)
  }

  function onHide() {
      setIsOpenPopup(false)  
  }
     return(

     <Tippy 
        appendTo= {document.getElementById('editor-container')}
        onClickOutside={onHide}
        onCreate={instance => (tippyInstance.current = instance)}
        render={attrs => (
                <motion.div 
                initial="exit"
                tabIndex={0}
                animate={isOpenPopup ? "enter" : "exit"}
                variants={subMenuAnimate}
                style={{width:"140px", marginTop:'4px'}}
                ref={firstFieldRef}
                onKeyDown={(e)=>{
                  if(e.code=='ArrowDown'){
                    e.preventDefault()
                    downHandler()
                  }else if (e.code=='ArrowUp'){
                    e.preventDefault()
                    upHandler()
                  }else if (e.code=='Enter'){
                    e.preventDefault()
                    enterHandler();
                  }
                }}
                className={`flex rounded-md p-1 flex-col bg-gray-900`} {...attrs}>
                  {/* POPOVER CONTENTS */}
                  <>
                    {isOpenPopup && 
                    <div>
                      {items.map((item, index) => {
                        return (
                            <div 
                            key={index}
                            onClick={() => selectItem(index)}
                            className={`${index===selectedIndex?'bg-royalblue-700':'hover:bg-royalblue-500'} cursor-default ${item.title=='Delete' ?'border-t border-gray-200':''} flex text-gray-100 px-3 py-1.5 rounded-md`}>  
                                <div className="mr-3">
                                  {item.icon}
                                </div>
                                <div className="my-auto">
                                  <div className="text-gray-100 text-xs">{item.element || item.title}</div>
                                </div>
                            </div>
                          );
                        })}
                    </div>
                  }
                  </>
                </motion.div>
              )}
              onMount={onMount}
              onHide={onHide}
              trigger="click"
              interactive={true}
              arrow={roundArrow}
              // Need to ensure it can be tabbed to directly after with no clipping issues
              // appendTo={document.body}
              placement="bottom-start"
              //scroll="false" // true
              //resize="false" // true
              animation={true}
            popperOptions={{modifiers:[{ name: 'eventListeners', options: { scroll: false }}]}}
        >
        {/* DOTTED TRIGGER BUTTON */}
          {props.button}
        </Tippy>)
}

export default FontFormatMenu