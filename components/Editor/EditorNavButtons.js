import Button from "@/components/Primitives/Button";
import { PublishDialogButton } from "./PublishDialogButton";
import SidePanelTrigger from "./SidePanel/SidePanelTrigger";
/**
 * EditorButtons
 * render buttons for saving and publishing
 * in the editor, these are wrapped in a portal so they can be rendered on the navbar
 * @param {*} param0
 * @returns
 */
const EditorNavButtons = ({
  //general stuff
  user,
  canEdit,
  onSave,
  isSaving,
  postStatus,
  editor,
  //for updating existing post
  refetchPost,
  postObject,
  updatePostSettings,
}) => {
  return (
    <>
      {/* {user?.isLoggedIn ? 
        <Button
          variant="ghostBlue"
          onClick={onSave}
          className="text-[13px] font-normal h-[25px] px-2 my-auto"
        >
          {isSaving
            ? "Saving..."
            : postStatus == "publish"
              ? "Update"
              : "Save Draft "}
        </Button>
      :null} */}

      {/* show publish button if post not published */}
      {/* publish button does same as save draft button, but uses dialog and adds 'forReview' flag */}
      
        <PublishDialogButton
        postObject={postObject}
        canPublish = {canEdit && postObject?.id ? (true) : (false)}
          //save post creates a post or updates an existing one
          //for /write (new post), it creates a new post
          //for /p/[slug] (existing post), it updates the existing post
          onSave={onSave}
        />

      {/* show side panel trigger if updatePostSettings is defined (in /p/[slug]) */}
      {editor && updatePostSettings !== false ? (
        <SidePanelTrigger
          user={user}
          editor={editor}
          postObject={postObject}
          updatePostSettings={updatePostSettings}
          refetchPost={refetchPost}
        />
      ) : null}
    </>
  );
};

export default EditorNavButtons;
