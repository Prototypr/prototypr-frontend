import dynamic from "next/dynamic";

import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
// import Layout from "@/components/layout-editor";

import Editor from "@/components/Editor/Editor";
import { useEffect } from "react";
import useLoad from "@/components/Editor/editorHooks/editPost/useLoad";
import useUpdate from "@/components/Editor/editorHooks/editPost/useUpdate";

import { useConfirmTabClose } from "@/components/Editor/useConfirmTabClose";
import EditorNav from "@/components/EditorNav";
import { addTwitterScript } from "@/components/Editor/editorHooks/libs/addTwitterScript";

const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

/**
 * Edit post page
 * used to edit existing post given the slug
 *
 * uses the 'edit' version of useLoad
 * /components/Editor/editorHooks/editPost/useLoad
 * this hook loads the editor with the existing post content from the backend
 *
 * @param {*} props
 * @returns
 */
export default function EditPostPage(props) {
  const { user } = useUser({
    redirectTo: "/onboard",
    redirectIfFound: false,
  });

  useEffect(() => {
    addTwitterScript();
  }, []);

  //useLoad hook
  const {
    canEdit,
    initialContent,
    postStatus,
    postObject,
    slug,
    postId,
    refetch,
    setPostObject,
  } = useLoad(user);

  //useUpdate hook
  const {
    //update post content
    updatePostById,
    //update post settings
    updateSettings,
    setHasUnsavedChanges,
    hasUnsavedChanges,
  } = useUpdate();

  useConfirmTabClose(hasUnsavedChanges);

  /**
   * savePost
   * when save or submit for publishing button is clicked
   * save the post to the backend
   * @param {*} param0
   */
  const savePost = async ({ editor, forReview }) => {
    try {
      const updatedPostObject = await updatePostById({
        editor: editor,
        postId: postId,
        user: user,
        forReview: forReview,
        postStatus: postStatus,
        postObject: postObject,
      });

      //update the postObject from useLoad hook
      if(updatedPostObject) {
        setPostObject(updatedPostObject);
        //confirm no unsaved changes
        setHasUnsavedChanges(false);
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  /**
   * updateSettings
   */
  const updatePostSettings = async ({ settings }) => {
    try {
      const updatedPostObject = await updateSettings({
        postId: postId,
        user: user,
        settings: settings,
        postObject: postObject,
      });

      if(updatedPostObject) {
        setPostObject(updatedPostObject);
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  /**
   * updatePost
   * when editor onUpdate is triggered,
   * do whatever - in this case, set hasUnsavedChanges to true
   *
   * - not autosaving yet until saving doesn't have issues (like overwriting fields wrongly)
   * - using save post button to save for now
   * @param {*} param0
   */
  const updatePost = ({ editor, json, forReview = false }) => {
    // console.log("updatePost");
    setHasUnsavedChanges(true);
  };

  return (
    <>
      <EditorNav postStatus={postStatus} />

      <div className="h-full w-full">
        <div id="editor-container" className="w-full h-full mx-auto  relative">
          {/* {!user && <Fallback />} */}

          {/* only load editor if initialContent has loaded */}
          {(user && !user?.isLoggedIn) || initialContent == null ? (
            <>
              {/* <Layout> */}
              <div className="relative w-full h-screen flex">
                <div className="my-auto mx-auto">
                  <Spinner />
                </div>
              </div>
              {/* </Layout> */}
            </>
          ) : (
            user?.isLoggedIn && (
              <div>
                <Editor
                  canEdit={canEdit}
                  initialContent={initialContent}
                  postStatus={postStatus}
                  //used for updating existing post
                  slug={slug}
                  postId={postId}
                  postObject={postObject}
                  //save and update content
                  savePost={savePost}
                  updatePost={updatePost}
                  //refetch post needed when the featured image is updated in post settings
                  refetchPost={refetch}
                  //update post settings
                  updatePostSettings={updatePostSettings}
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
