import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";

const ImageNodeView = props => {
  const [blob, setBlob] = useState(null);
console.log(blob)
  useEffect(() => {
    if (props.node.attrs.src && !blob) {
      fetch(`https://req.prototypr.io/${props.node.attrs.src}`)
        .then(response => response.blob())
        .then(blob => {
          setBlob(URL.createObjectURL(blob));
        });
    }
  }, [props.node.attrs.src]);

  return (
    <NodeViewWrapper
      draggable="true"
      data-drag-handle
    //   onDragStart={event => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //   }}
    //   value="Don't drag me :("
      onClick={() => {
        console.log("click");
        let pos = props.getPos();
        console.log(pos);
        //set editor selection to pos
        props.editor.commands.setNodeSelection(pos - 1);
      }}
      contentEditable={false}
    >
      <img src={blob} alt={props.node.attrs.alt} />
    </NodeViewWrapper>
  );
};

export default ImageNodeView;
