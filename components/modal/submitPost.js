import ModalComponent, { useModal } from "./modal";

const SubmitPostModal = ({ children, handleBeforeOpen }) => {
  const { showDialog, open, close } = useModal();

  return (
    <div>
      <button
        onClick={() => {
          handleBeforeOpen(open);
          //   open();
        }}
        className="p-1 px-3 bg-blue-700 rounded text-sm text-white"
      >
        Submit
      </button>

      <ModalComponent showDialog={showDialog} close={close}>
        <div className="flex flex-row justify-between">{children}</div>
      </ModalComponent>
    </div>
  );
};

export default SubmitPostModal;
