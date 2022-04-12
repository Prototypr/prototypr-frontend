import React, { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRouter } from "next/router";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "rgba(0,0,0,0.3)",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
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
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  "&:focus": { outline: "none" },
});

const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 25,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#333",
    position: 'absolute',
    top: 10,
    right: 10,
  
    // '&:hover': { backgroundColor: violet.violet4 },
    // '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
  });

const Content = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
};
//TODO:maybe can be replaced with tailwind div
const StyledTitle = styled(DialogPrimitive.Title, {
    margin: 0,
    fontWeight: 500,
    color: "red",
    fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
    margin: '10px 0 20px',
    color: "green",
    fontSize: 15,
    lineHeight: 1.5,
});

const Button = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 15px',
    fontSize: 15,
    lineHeight: 1,
    fontWeight: 500,
    height: 35,
  });

// Exports
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = Content;
const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;
const DialogClose = DialogPrimitive.Close;

export default function LocaleAlert({locale = "", open = false, setOpen=() => {}}) {
    const router = useRouter();
    const {locales } = useRouter();

    const switchLanguage = (itemLocale) => {
        console.log(locales);
        if (locales.indexOf(itemLocale) < 0) {
            alert(`Sorry, we dont't support ${itemLocale} now`)
            setOpen(false);
        } else {
            setOpen(false);
            const routerQuery = router.query;
            router.push(router.asPath, router.asPath , { locale:itemLocale });
        }
    }
  return (
    <Dialog open={open}>
      {/* <Dialog.Trigger /> */}
      <DialogContent>
        <DialogTitle>Switch Language</DialogTitle>
        <DialogDescription>
          Do you what to switch to {locale}?
        </DialogDescription>
        <div className="flex justify-end mt-6">
            <Button aria-label="Close" variant="green" onClick={() => switchLanguage(locale)}>
              OK
            </Button>
        </div>
        <DialogClose asChild onClick={() => setOpen(false)}>
          <IconButton>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
