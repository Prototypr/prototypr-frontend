import React, { useState, useEffect, useRef, useCallback } from "react";
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import Tippy from "@tippyjs/react";
import LazyLoad, { forceCheck } from "react-lazyload";
import { checkImage } from "./ImageParts/imageCheck";
import ImageLoadingSpinner from './ImageParts/ImageLoadingSpinner'
import { ImageDecorationKey } from "../Figure";

import "tippy.js/animations/scale-subtle.css";

import OutgoingImageLink from "./ImageParts/OutgoingImageLinkRadix";
// import ImageUpload from "./ImageParts/ImageUploadRadix";
import {roundArrow} from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';

import 'tippy.js/animations/scale-subtle.css';
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
export default (props) => {

  useEffect(() => {
    setTimeout(() => {
      forceCheck();
    }, 200);
  });

  // useEffect(()=>{
  //   console.log('image editor node mounted')

  //   return () =>{
  //     console.log('image editor node destroyed')
  //   }
  // },[])

  return (
    <NodeViewWrapper
      id="imageEditorNode"
      style={{
        cursor: "pointer",
        position: "relative",
        // needed or horizontal images will stack
        display: "inline-block",
        // marginBottom:'-4px'
        verticalAlign:'bottom'
      }}
    >
      <LazyLoad
      style={{maxWidth:'100%'}}
      className={props?.node?.attrs?.class}
        // height={200}
        // once={true}
        // scrollContainer={"#scrollable-area"}
        unmountIfInvisible={false}
        offset={-100}
        placeholder={
          <ImageLoadingSpinner isLoading={true}/>
        }
      >
        <ImageComponent {...props} />
      </LazyLoad>
    </NodeViewWrapper>
  );
};

const ImageComponent = (props) => {

  
  const [imageInfo, setImageInfo] = useState(null)
  const [placeholderPresent, setPlaceholderPresent] = useState(false)
  const [blobDisplaying, setBlobDisplaying] = useState(false)
  const [imageDimensions, setImageDimensions] = useState(false)
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    const updateImage = async () => {
      let imgInfo = await checkImage(props.node.attrs?.src);

      let wratio = parseInt(props.node.attrs?.width) / imgInfo.width;
      let hratio = parseInt(props.node.attrs?.height) / imgInfo.height;

      let h = imgInfo.height * hratio;
      if(!hratio){
        h=imgInfo.height * wratio
      }
      let w = imgInfo.width * wratio;

      setImageDimensions({w:w,h:h})
      setImageInfo(imgInfo)
    };

    updateImage();

    //check decoration
    // let placeholderPos = findPlaceholder(props.editor.state, props?.node?.attrs?.dataUid);
    // if(placeholderPos){
    //   setPlaceholderPresent(true)
    // }else{
    //   setPlaceholderPresent(false)
    // }

          setBlobDisplaying(false)
// setFirstRender(true)
//     if(firstRender){
//       setTimeout(()=>{
//         setFirstRender(false)
//       },2000)
//     }

  }, [props.node.attrs?.src]);


  const uploadRef = useRef();

  const [thisSelected, setThisSelected] = useState(false);

  useEffect(() => {
    if (props.selected) {
      setThisSelected(true);
      textAreaRef.current.focus()

    } else if (!props.selected) {
      setThisSelected(false);
    }
  }, [props.selected]);

  const textAreaRef = React.createRef();


  return (
    <Tippy
      visible={thisSelected}
      duration={100}
      className="focus:outline-none"
      popperOptions={{
        modifiers: [{ name: "eventListeners", options: { scroll: false } }],
      }}
      content={
        <div 
        className={`focus:outline-none p-2 rounded-xl bg-gray-900 shadow-md flex text-gray-100`}>
          {/* <ImageUpload
            ref={uploadRef}
            editor={props.editor}
            node={props.node}
            setCanvasLoading={() => {
              console.log("done");
              // setPlaceholderPresent(true)
              // setBlobDisplaying(false)
            }}
            updateAttributes={props.updateAttributes}
          /> */}
          <OutgoingImageLink
            onClick={() => uploadRef.current.closePopup()}
            editor={props.editor}
            node={props.node}
            updateAttributes={props.updateAttributes}
          />
        </div>
      }
      interactive={true}
      arrow={roundArrow}
      appendTo={() => document.getElementById("editor-container")}
      animation="scale-subtle"
      inertia={true}
    >
      <div
        className="block overflow-hidden"
        onClick={(e) => {
          textAreaRef.current.focus()
          return false;
        }}
      >
        {/* LOADING OVERLAY */}
        
        {/* LOADING OVERLAY */}
        <div

      class="drag-handle"
      contenteditable="false"
      draggable="true"
      data-drag-handle
      style={{marginLeft:-20, marginTop:-1}}
      className={`${props.selected?'visible':'hidden'} absolute left-0 z-10  `}
    >
      <DragHandleDots2Icon className="w-5 h-5"/>
      </div>
        <figure 
        style={{maxWidth:'100%'}}
        draggable={false} className={`${props.selected?'border border-blue-400 border-2':''} ${props.node.attrs.class} `}> 
          <img 
          draggable={false}
          className={`editor-img ${props.node.attrs.class}`}
          onClick={()=>{
            var pos = props.getPos();
            if (pos) {
              props.editor.commands.setNodeSelection(pos);
            }
          }}
          src={props.node.attrs.src}/>
            <textarea 
            onChange={(e)=>{
              if(e.target.value!=props.node.attrs.figcaption){
                props.updateAttributes({figcaption: e.target.value})
              }
             
            }}
            ref={textAreaRef}
            className="figcaption"
            placeholder={thisSelected?"Insert caption":''}
            onMouseUp={(e)=>e.target.focus()}
            onMouseDown={(e)=>e.target.focus()}
            onClick={(e)=>e.target.focus()}
            onKeyDown={(e)=>{
              // enter key
              if(e.keyCode === 13){
                e.preventDefault(); // Ensure it is only this code that runs
                var pos = props.getPos();
            if (pos) {
              // props.editor.chain().setNodeSelection(pos).focus().run();
              props.editor.chain().focus().insertContentAt(pos+2, '<p class="is-empty"></p>', {
                updateSelection: true,
                // parseOptions: {
                //   preserveWhitespace: 'full',
                // }
              }).run()
            }
            }
            if(e.keyCode==8){
              if(!e.target?.value){
                var pos = props.getPos();
                props.editor.chain().setTextSelection(pos-1).focus().run()
                e.preventDefault(); // Ensure it is only this code that runs
                props.deleteNode()
              }
            }
            }}
            // onMouseEnter={(e)=>e.target.focus()}
            defaultValue={props.node.attrs.figcaption?props.node.attrs.figcaption:''}
            />
        </figure>
             
          {/* <figcaption contentEditable style={{minWidth:50}}>
          
          </figcaption> */}


         {(((!blobDisplaying && imageInfo))&&!placeholderPresent) &&
           <div style={{width:imageDimensions.w, height:imageDimensions.h}} className="bg-gray-300 imgEditorPlaceholder animate-pulse rounded-lg"/>
         }

      {!imageInfo && !placeholderPresent &&
      <>
        <ImageLoadingSpinner isLoading={true}/>
      </>
      }
        
      </div>
    </Tippy>
  );
};


function findPlaceholder(state, id) {
  let decos = ImageDecorationKey.getState(state);
  let found = decos.find(null, null, (spec) => spec.id == id);
  return found.length ? found[0].from : null;
}