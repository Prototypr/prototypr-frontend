import { BubbleMenu } from "@tiptap/react";
import { TextSelection } from "prosemirror-state";
import ImagePopoverButton from "./MenuButtons/ImagePopoverButton/ImagePopoverButton";
import { useState } from "react";
import "tippy.js/dist/svg-arrow.css";

import "tippy.js/animations/scale-subtle.css";

const ImageMenu = ({ editor, isSelecting }) => {
  if (!editor) {
    return null;
  }

  // const imageActive = editor.isActive('figure', {figureType:'image'});
  // const videoActive = editor.isActive('figure', {figureType:'video'});
  const [showing, setShowing] = useState(false);

  return (
    <>
      <BubbleMenu
        style={{ pointerEvents: "none" }}
        pluginKey={"TextMenu"}
        tippyOptions={{
          // arrow: roundArrow,
          flipBehavior:['top-start'],
          arrow: false,
          popperOptions: {
            modifiers: [{ name: "eventListeners", options: { scroll: false } },
            { name: 'flip', enabled: false }],
          },
          
          duration: 100,
          zIndex: "38",
          animation: "scale-subtle",
          placement: "left-start",
     //use the referenceClientRect to position the bubble menu at start of image (because of slider)
          // getReferenceClientRect: () => {
          //   const { state, view } = editor;
          //   const { selection } = state;
          //   let { from, to } = selection;
          //   if (selection?.node?.attrs?.src) {
          //     let node = view.nodeDOM(from);

          //     const nodeViewWrapper = node.dataset.nodeViewWrapper
          //       ? node
          //       : node.querySelector("[data-node-view-wrapper]");

          //     if (nodeViewWrapper) {
          //       node = nodeViewWrapper.firstChild;
          //     }

          //     if (node) {
          //       let nodeRect = node.getBoundingClientRect();
          //       let newNodeRect = {
          //         bottom: nodeRect.bottom,
          //         height: nodeRect.height,
          //         left: nodeRect.left - nodeRect.width / 2 + 100,
          //         right: nodeRect.right,
          //         top: nodeRect.top,
          //         width: nodeRect.width,
          //         x: nodeRect.x - nodeRect.width / 2 + 100,
          //         y: nodeRect.y,
          //       };
          //       return newNodeRect;
          //     }
          //     return node.getBoundingClientRect();
          //   } else {
          //     return posToDOMRect(view, from, to);
          //   }
          // },
        }}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          const selection = editor.state.selection;
          const isTextSelection = selection instanceof TextSelection;

          if (!editor.isActive("figure", { figureType: "image" })) {
            return false;
          }

           if (isTextSelection) {
            setShowing(false);
            return false;
          }

          //update image src
          const figure_node = selection?.$anchor?.nodeAfter
          if(figure_node?.type?.name=='figure'){
          //use image inside figure
          if(figure_node.firstChild?.type?.name=='image'){
            let figure_child = figure_node.firstChild
            setShowing(figure_child?.attrs?.src);
          }
          }

          return editor.isActive("figure");
        }}
        element={document.getElementById("editor-container")}
        editor={editor}
      >
        <div
          className={`${isSelecting ? "" : "pointer-events-all"} p-2 w-fit -mt-[58px] ml-[102%] duration-300 rounded-xl shadow-md bg-gray-900 flex text-gray-100`}
        >
          <div
            className={`${isSelecting ? "pointer-events-none" : "pointer-events-all"} flex`}
          >
            <ImagePopoverButton
              showing={showing}
              onClick={() => uploadRef.current.closePopup()}
              editor={editor}
            />
          </div>
        </div>
      </BubbleMenu>
    </>
  );
};

export default ImageMenu;
