import React, { useEffect } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

export default ({editor, node, getPos, selected}) => {
  // if (nodes < 2) {
    useEffect(()=>{
        twttr?.widgets?.load()
    },[node])

  return (
    <NodeViewWrapper className="react-component">
         <div

class="drag-handle"
contenteditable="false"
draggable="true"
data-drag-handle
style={{marginLeft:-22, marginTop:-1}}
className={`${selected?'visible':'hidden'} absolute left-0 z-10  `}
>
<DragHandleDots2Icon className="w-5 h-5"/>
</div>
        <div className="relative">
            <div 
            onClick={()=>{
                var pos = getPos();
                if (pos) {
                  editor.commands.setNodeSelection(pos);
                }
            }}
            className={`${selected?'outline outline-2 outline-blue-400 rounded':''} absolute z-10 cursor-pointer top-0 left-0 w-full h-full`}/>
            <NodeViewContent className="twitter-tweet" as={'blockquote'}/>
        </div>
    </NodeViewWrapper>
  );
  // } else {
  //   return null;
  // }
};