import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
import { violet, blackA, mauve, green, red, gray } from "@radix-ui/colors";

const overlayShow = keyframes({
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  });
  
  const contentShow = keyframes({
    "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
    "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
  });
  
  const StyledOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: `rgba(0,0,0,0.75)`,
    zIndex: 99,
    position: "fixed",
    pointerEvents:'all',
    inset: 0,
    "@media (prefers-reduced-motion: no-preference)": {
      animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
  });
  
  const StyledContent = styled(DialogPrimitive.Content, {
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: 6,
    boxShadow:
      "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "450px",
    maxHeight: "85vh",
    padding: 25,
    "@media (prefers-reduced-motion: no-preference)": {
      animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    "&:focus": { outline: "none" }
  });
  
  function Content({ children, ...props }) {
    return (
      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledContent {...props}>{children}</StyledContent>
      </DialogPrimitive.Portal>
    );
  }

  const StyledContentLarge = styled(DialogPrimitive.Content, {
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: 6,
    boxShadow:
      "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    position: "fixed",
    // display:'flex',
    // flexDirection:'column',
    // justifyContent:'space-between',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "600px",
    maxHeight: "85vh",
    // minHeight: "60vh",
    padding: 25,
    "@media (prefers-reduced-motion: no-preference)": {
      animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    "&:focus": { outline: "none" },
  });
  
  const StyledContentImage = styled(DialogPrimitive.Content, {
    zIndex: 999,
    // backgroundColor: "white",
    borderRadius: 6,
    boxShadow:
      "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    position: "fixed",
    // display:'flex',
    // flexDirection:'column',
    // justifyContent:'space-between',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh",
    pointerEvents:'none',
    // minHeight: "60vh",
    // padding: 25,
    "@media (prefers-reduced-motion: no-preference)": {
      animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    "&:focus": { outline: "none" },
  });
  
  function ContentLarge({ children, ...props }) {
    return (
      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledContentLarge {...props}>{children}</StyledContentLarge>
      </DialogPrimitive.Portal>
    );
  }
  function ContentImage({ children, ...props }) {
    return (
      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledContentImage {...props}>{children}</StyledContentImage>
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

  export const IconButton = styled("button", {
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
  
  // Exports
  export const Dialog = DialogPrimitive.Root;
  export const DialogTrigger = DialogPrimitive.Trigger;
  export const DialogContent = Content;
  export const DialogContentLarge = ContentLarge;
  export const DialogContentImage = ContentImage;
  export const DialogTitle = StyledTitle;
  export const DialogDescription = StyledDescription;
  export const DialogClose = DialogPrimitive.Close;

  