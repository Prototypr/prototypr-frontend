import ModalComponent, { useModal } from "./modal";
import Button from "../Primitives/Button";

const SubmitPostModal = ({ children, handleBeforeOpen }) => {
  const { showDialog, open, close } = useModal();

  return (
    <div>
      <Button
      className="ml-1"
        onClick={() => {
          handleBeforeOpen(open);
          //   open();
        }}
      >
        Publish
      </Button>

      <ModalComponent showDialog={showDialog} close={close}>
        <div className="flex flex-row justify-between">{children}</div>
      </ModalComponent>
    </div>
  );
};

export default SubmitPostModal;
