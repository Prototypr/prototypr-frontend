import React, { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import { violet, blackA,slate, mauve, green, red, gray } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import ImageLinkField from './ImageLinkField/ImageLinkField'
import ImageAltField from './ImageLinkField/ImageAltField'
import LinkInput from "../LinkDropdown/LinkButtonRadix";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: 'rgba(255,255,255,0.98)',
  zIndex: 99999,
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  zIndex: 99999,
  // backgroundColor: "white",
  borderRadius: 6,
  textAlign:'center',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "800px",
  height: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
      red: {
        backgroundColor: red.red4,
        color: red.red11,
        "&:hover": { backgroundColor: red.red5 },
        "&:focus": { boxShadow: `0 0 0 2px ${red.red7}` },
      },
      gray: {
        backgroundColor: gray.gray4,
        color: gray.gray11,
        "&:hover": { backgroundColor: gray.gray5 },
        "&:focus": { boxShadow: `0 0 0 2px ${gray.gray7}` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const CloseButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '6px',
  height: 28,
  width: 35,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: slate.slate6,
  backgroundColor: 'transparent',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: slate.slate11 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
//   '&:active':{background:'white'}
});




const ImageModalButton = ({ onClick, editor }) =>{



  const [modalOpen, setModalOpen] = useState(null)
  const [modalOption, setModalOption] = useState(null)
  const setModal = (option) =>{
    setModalOption(option)
  }
  
  
const [figureNode, setFigureNode] = useState(null)
const [imgSrc, setImgSrc] = useState(null)
const onOpenChange = (open) =>{
  if(!modalOpen){
    const selection = editor?.state?.selection
    const figure_node = selection?.$anchor?.nodeAfter
    if(figure_node?.type?.name=='figure'){
     //use image inside figure
     if(figure_node.firstChild?.type?.name=='image'){
      let img_node = figure_node.firstChild
       setFigureNode(img_node)
       setImgSrc(img_node?.attrs?.src)
     }
    }
    setModalOpen(open)
  }else{
    setModalOpen(false)
  }
}

const toggleModal = () =>{
  setModalOpen(!modalOpen)
}


  return (
  <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <div className="flex">
    <DialogTrigger asChild>

      <IconButton onClick={()=>setModal('alt')} className={'text-sm hover:bg-gray-800 hover:text-white'} aria-label="Update link">
          ALT
        </IconButton>
    </DialogTrigger>
    <LinkInput isFigure={true} marginLeft={-100} showRemove={true} editor={editor} />
      {/* <IconButton onClick={()=>setModal('link')} className={' hover:bg-gray-800 hover:text-white'} aria-label="Update link">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" fill="currentColor"/></svg>
        </IconButton> */}
      </div>
    <DialogContent>
      <DialogTitle>{modalOption=='alt' && 'Alternative Text'}</DialogTitle>
      <DialogDescription>
      {modalOption=='alt' && 'Write a brief description of this image for readers with visual impairments'}
      </DialogDescription>
      <div>
        <img style={{maxWidth:300, maxHeight:200, objectFit:'cover'}} className="mx-auto mt-3 mb-10" src={imgSrc}/>
      </div>
      <div>
        <ImageAltField figureNode={figureNode} closePopup={toggleModal} editor={editor}/>
      </div>
      {/* <div className="flex flex-row justify-start gap-2">
        <DialogClose asChild>
          <Button onClick={onClick} variant="red">
            Delete
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button variant="gray">Cancel</Button>
        </DialogClose>
      </div> */}
      <DialogClose asChild>
        <CloseButton aria-label="Close"><Cross2Icon /></CloseButton>
      </DialogClose>
    </DialogContent>
  </Dialog>
);}

export default ImageModalButton;
