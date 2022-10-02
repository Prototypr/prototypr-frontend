import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export default (props) => {
  // if (nodes < 2) {
      console.log(props)
  return (
    <NodeViewWrapper className="react-component mely-editor-block">
      <div contentEditable="false"
       style={{border:props.selected?'2px solid black':'',position:'relative', background:'#fcd9d9', borderRadius:'12px', padding:'12px'}}
      className="content">
      <h3 style={{marginBottom:'8px'}}>Embed:</h3>
      <p style={{marginTop:'8px', fontSize:'12px'}}>This is the editor preview. The published version will look different.</p>
      
      <iframe src={props.node.attrs.src} width="400" height="300"></iframe>
      <div style={{position:'absolute', top:'6px', right:'6px'}}>
        <button style={{background:'blue', padding:'6px', borderRadius:'6px', color:'white', fontSize:'13px'}} 
        onClick={(e)=>{
            e.preventDefault();
            var newSrc= prompt("Please enter an embed link from YouTube, CodePen or CodeSandbox", props.node.attrs.src)
            if (newSrc.startsWith('https://www.youtube.com/watch?v=')) {
                newSrc = newSrc.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
                newSrc = newSrc.split('&')[0];
                props.updateAttributes({src:newSrc})
            }else if(newSrc.indexOf('https://codesandbox.io/embed/')>-1||newSrc.indexOf('https://codepen.io/')>-1){
                props.updateAttributes({src:newSrc})
            }else{
                alert('Not a supported embed. Only YouTube, CodeSandbox, CodePen are supported atm')
            }
            }}>Update</button>
      </div>
      </div>
      
      {/* <NodeViewContent contentEditable={false} 
      style={{border:props.selected?'2px solid black':''}}
      className={`node-vew-content mely-editor-block-view`}>
            
        </NodeViewContent> */}
      {/* </div> */}
    </NodeViewWrapper>
  );
  // } else {
  //   return null;
  // }
};