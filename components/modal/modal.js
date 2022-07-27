import { useState } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

export const useModal = () => {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  return {
    showDialog,
    open,
    close,
  };
};

const ModalComponent = ({
  showDialog,
  close,
  children,
  background = "hsla(0, 0%, 100%, 0.50)",
  width = null,
}) => {
  return (
    <DialogOverlay
      style={{ background: background, zIndex: 100 }}
      isOpen={showDialog}
      onDismiss={close}
    >
      <DialogContent
        aria-label="modal"
        className="rounded border border-white border-opacity-10 px-0 "
        style={{
          boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
          backgroundColor: "#fff",
          padding: "0px 0px 0px 0px",
          width: width,
        }}
      >
        {children}
      </DialogContent>
    </DialogOverlay>
  );
};

export const NewModalComponant = ({
  showDialog,
  close,
  children,
  background = "hsla(0, 0%, 0%, 0.50)",
  width = 500,
}) => {
  return (
    <DialogOverlay
      style={{ background: background, zIndex: 100 }}
      isOpen={showDialog}
      onDismiss={close}
    >
      <DialogContent
        aria-label="modal"
        className="rounded-[10px] border border-white border-opacity-10 px-0 "
        style={{
          boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
          backgroundColor: "#323232",
          padding: "0px 0px 0px 0px",
          width: width,
        }}
      >
        {children}
      </DialogContent>
    </DialogOverlay>
  );
};

export default ModalComponent;
