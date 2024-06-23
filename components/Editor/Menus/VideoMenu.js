import { BubbleMenu } from "@tiptap/react";
// import LinkInput from "./MenuButtons/LinkDropdown/LinkButtonRadix";
// import FontFormatButton from "./MenuButtons/FontFormatDropdown/FontFormatButton";
// import MergeTagsButton from "./MenuButtons/MergeTags/MergeTagsButton";
import { TextSelection } from "prosemirror-state";
import { styled } from "@stitches/react";
import { blackA, slate } from "@radix-ui/colors";
import VideoModalButton from "./MenuButtons/VideoPopoverButton/VideoPopoverButton";
// import ImagePopoverButton from "./MenuButtons/ImagePopoverButton/ImagePopoverButton";
import { useState } from "react";
// import { posToDOMRect } from "@tiptap/core";

// import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";

import "tippy.js/animations/scale-subtle.css";


const VideoMenu = ({ editor, isSelecting }) => {
  if (!editor) {
    return null;
  }
  const [showing, setShowing] = useState(false);

  // const imageActive = editor.isActive('figure', {figureType:'image'});
  // const videoActive = editor.isActive('figure', {figureType:'video'});

  return (
    <>
      <BubbleMenu
        style={{ pointerEvents: "none" }}
        pluginKey={"TextMenu"}
        tippyOptions={{
        //   arrow: roundArrow,
          arrow: false,
          placement: "left-start",
          zIndex: "38",
          popperOptions: {
            modifiers: [{ name: "eventListeners", options: { scroll: false } },
            
            { name: 'flip', enabled: false }],
          },
          //use the referenceClientRect to position the bubble menu at start of image (because of slider)
        //   getReferenceClientRect: () => {
        //     const { state, view } = editor;
        //     const { selection } = state;
        //     let { from, to } = selection;
        //     if (selection?.node?.attrs?.src) {
        //       let node = view.nodeDOM(from);

        //       const nodeViewWrapper = node.dataset.nodeViewWrapper
        //         ? node
        //         : node.querySelector("[data-node-view-wrapper]");

        //       if (nodeViewWrapper) {
        //         node = nodeViewWrapper.firstChild;
        //       }

        //       if (node) {
        //         let nodeRect = node.getBoundingClientRect();
        //         let newNodeRect = {
        //           bottom: nodeRect.bottom,
        //           height: nodeRect.height,
        //           left: nodeRect.left - nodeRect.width / 2 + 100,
        //           right: nodeRect.right,
        //           top: nodeRect.top,
        //           width: nodeRect.width,
        //           x: nodeRect.x - nodeRect.width / 2 + 100,
        //           y: nodeRect.y,
        //         };
        //         console.log(newNodeRect);
        //         return newNodeRect;
        //       }
        //       return node.getBoundingClientRect();
        //     } else {
        //       return posToDOMRect(view, from, to);
        //     }
        //   },
          duration: 100,
          animation: "scale-subtle",
        }}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          const selection = editor.state.selection;
          const isTextSelection = selection instanceof TextSelection;

          if (!editor.isActive("figure", { figureType: "video" })) {
            setShowing(false);
            return false;
          }

          if (isTextSelection) {
            setShowing(false);
            return false;
          }
          //update image src
          const figure_node = selection?.$anchor?.nodeAfter;
          if (figure_node?.type?.name == "figure") {
            //use image inside figure
            if (figure_node.firstChild?.type?.name == "video") {
              let figure_child = figure_node.firstChild;
              setShowing(figure_child?.attrs?.src);
            }
          }

          return editor.isActive("figure");
        }}
        element={document.getElementById("editor-container")}
        editor={editor}
      >
        {/* bold */}
        <div
          className={`${isSelecting ? "" : "pointer-events-all"} p-2 w-fit -mt-[52px] ml-[102%] duration-300 rounded-xl shadow-md bg-gray-900 flex text-gray-100`}
          >
          <div
            className={`${isSelecting ? "pointer-events-none" : "pointer-events-all"} flex`}
          >
            {/* <FontFormatButton  editor={editor}/> */}
            {/* <div className={`bg-gray-800 hover:bg-gray-900 mx-1 my-auto`} style={{height:'20px', width:'1px'}}/> */}

            <VideoModalButton
              onClick={() => uploadRef.current.closePopup()}
              editor={editor}
              showing={showing}
              // node={props.node}
              // updateAttributes={props.updateAttributes}
            />
            {/* <IconButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`
                hover:bg-gray-800  mr-1
                ${editor.isActive("bold")?'bg-gray-800':'bg-gray-900'}
                ${editor.isActive("bold")?'text-blue-400':'text-gray-200'}`}
              >
              <svg  className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" fill="currentColor"/></svg>
              </IconButton> */}
          </div>
        </div>
      </BubbleMenu>
    </>
  );
};

export default VideoMenu;
