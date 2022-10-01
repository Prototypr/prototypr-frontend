import React, {useState, useContext} from "react";
import {motion} from 'framer-motion'
// import HandlebarsCreator from "../../../../utilities/handlebarsFilter/handlebarsCreator"
import {generateHTMLCode, generateJSONCode} from '../../../generateHTML'
import InsertMenu from './InsertMenu'
import {duplicateSection} from './table-row-functions'

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


const CogMenu = (props) =>{

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
                className="flex rounded-lg cursor-default text-gray-800 flex-col shadow-lg border border-gray-200 bg-white" {...attrs}>
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
                          {/* insert element */}
                            <div
                            onClick={() =>{
                                  editor.commands.focus()
                                          setMenuExpanded(true)
                                        }}
                            className="px-1 flex my-1 hover:bg-gray-200 duration-200 ease-in-out 
                                transition">
                                <button
                                className="moveable-arrow text-base focus:outline-none flex justify-center px-2 py-1 rounded-lg font-bold cursor-default 
                                duration-200 ease-in-out 
                                transition"
                                    // className={editor.isActive("orderedList") ? "is-active" : ""}
                                >
                                {/* <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6 6V7h2v4h4v2h-4v4h-2v-4H7v-2h4z" fill="currentColor"/></svg> */}
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12 13c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm1 2h-2v1.999L9 17v2l2-.001V21h2v-2.001L15 19v-2l-2-.001V15zm7-12c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h16zM5 5v4h14V5H5z" fill="currentColor"/></svg>
                                </button>
                                <div className="text-xs my-auto font-medium ">Insert element</div>
                        </div>

                        {/* duplicate */}
                        <div
                        onClick={() =>{
                            onHide()

                            // const tr = editor?.view.state.tr
                            // setTimeout(()=>{
                            //  editor.chain().focus().duplicateTableSection().focus().run()
                              let $pos = editor.state.selection.$anchor
                              let cardArticleData = []
                              // first get the original cardArticleData from the letterCard node
                              for (let d = $pos.depth; d > 0; d--) {
                                let node = $pos.node(d)
                                if (node.type.name == "letterCard") {
                                   cardArticleData = JSON.parse(JSON.stringify(JSON.parse(node.attrs.articleData)))
                                }

                              }

                              for (let d = $pos.depth; d > 0; d--) {
                                let node = $pos.node(d)
                                if (node.type.spec.tableRole == "row") {
                                  if(node.attrs.dataLetterSection){
                                    // var handlebarsCreator = new HandlebarsCreator()
                                    //clone the section

                                    // let clonedNode  = JSON.parse(JSON.stringify(node))

                                    var nodeHTML = generateHTMLCode(node.toJSON())
                                    // editor.chain().focus().addRowAfter($pos.after(d)).run()
                                    var duplicatedHTML = duplicateSection(node.attrs,`${nodeHTML}`, cardArticleData)

                                    var json = generateJSONCode(duplicatedHTML.html, true)

                                    // tr.insert($pos.after(d), json.content[0].content[0])
                                    // editor?.view.dispatch(tr)
                                    editor.chain().setTextSelection(0).focus().insertContentAt({from:$pos.after(d)},json.content[0].content[0], {updateSelection:true}).updateCardArticleData($pos, duplicatedHTML.newArticleData).setTextSelection(0).blur().run()

                                    setTimeout(()=>{
                                      selectionClearer()
                                    }, 20)

                                  }
                                }
                              }
                            // },50)
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
                            <div className="text-xs my-auto font-medium ">Duplicate</div>
                        </div>

                      {/* divider */}
                        <div className="w-full border-b border-gray-400"/>

                      <div
                         onClick={() => {
                                    onHide()
                                    // move up
                                        editor.chain().focus().moveTableSection('up').blur().setTextSelection(0).run()
                                        setTimeout(()=>{
                                          selectionClearer()
                                        }, 20)
                                    }}
                         className="px-1 flex my-1 hover:bg-gray-200 duration-200 ease-in-out 
                            transition">
                            <button
                                // className={editor.isActive("bulletList") ? "is-active" : ""}
                                className="moveable-arrow text-base focus:outline-none flex justify-center px-2 py-1 rounded-lg font-bold cursor-default 
                                "
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z" fill="currentColor"/></svg>
                            </button>
                            <div className="text-xs my-auto font-medium ">Move up</div>
                        </div>
                        {/* move down */}
                        <div
                        onClick={() =>{
                                    onHide()
                                     editor.chain().focus().moveTableSection('down').setTextSelection(0).blur().run()
                                     setTimeout(()=>{
                                      selectionClearer()
                                    }, 20)
                                    }}
                         className="px-1 flex my-1 hover:bg-gray-200 duration-200 ease-in-out 
                            transition">
                            <button
                            className="moveable-arrow text-base focus:outline-none flex justify-center px-2 py-1 rounded-lg font-bold cursor-default 
                            duration-200 ease-in-out 
                            transition"
                                // className={editor.isActive("orderedList") ? "is-active" : ""}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z" fill="currentColor"/></svg>
                            </button>
                            <div className="text-xs my-auto font-medium ">Move down</div>
                        </div>
                          {/* divider */}
                        <div className="w-full border-b border-gray-400"/>
                        
                        {/* divider */}
                        {/* <div className="w-full border-b border-gray-400"/> */}
                        
                        {/* delete */}
                        <div
                        onClick={() =>{

                          let $pos = editor.state.selection.$anchor
                          let articleDataToDelete = []

                          for (let d = $pos.depth; d > 0; d--) {
                            let node = $pos.node(d)
                            if (node.type.spec.tableRole == "row") {
                              if(node.attrs.dataLetterSection){
                                node.descendants((n,pos)=>{
                                  if(n.attrs.dataLetterArticleId){
                                    articleDataToDelete.push(n.attrs.dataLetterArticleId)
                                  }
                                })
                              }
                            }
                          }
                          
                          let cardArticleData = []
                            // first get the original cardArticleData from the letterCard node
                            for (let d = $pos.depth; d > 0; d--) {
                              let node = $pos.node(d)
                              if (node.type.name == "letterCard") {
                                  cardArticleData = JSON.parse(JSON.stringify(JSON.parse(node.attrs.articleData)))
                              }
                            }
                            if(cardArticleData?.length){

                              cardArticleData = cardArticleData.filter(function (article) {
                                // return true for salary greater than equals to 25000
                                return (articleDataToDelete.indexOf(article._id)<0 );
                              });
                            }else{
                              cardArticleData = {}
                            }


                            onHide()
                            setTimeout(()=>{
                              editor.chain().focus().deleteTableSection().updateCardArticleData($pos, cardArticleData).setTextSelection(0).blur().run()
                              setTimeout(()=>{
                              selectionClearer()
                            }, 20)
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
                            <div className="text-xs my-auto font-medium ">Delete</div>
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
              placement="bottom"
              //scroll="false" // true
              //resize="false" // true
              animation={true}
            popperOptions={{hideOnClick:true,modifiers:[{ name: 'eventListeners', options: { scroll: false }}]}}
        >
        {/* DOTTED TRIGGER BUTTON */}
          {props.button}
        </Tippy>)
}

export default CogMenu

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