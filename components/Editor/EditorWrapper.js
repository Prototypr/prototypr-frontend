import dynamic from "next/dynamic";
// import Layout from "@/components/layout-editor";

// import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import { useCallback, useEffect, useState } from "react";
import { addTwitterScript } from "@/components/Editor/editorHooks/libs/addTwitterScript";

import Editor from "@/components/Editor/Editor";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

// import useLoad from "@/components/Editor/editorHooks/newPost/useLoad";
import useLoad from "@/components/Editor/editorHooks/editPost/useLoadCombined";
import useCreate from "@/components/Editor/editorHooks/newPost/useCreate";
import useUpdate from "@/components/Editor/editorHooks/editPost/useUpdate";

import { useRouter } from "next/router";
import EditorNav from "@/components/EditorNav";
import { useConfirmTabClose } from "./useConfirmTabClose";
import { debounce } from "lodash";
const saveDebounceDelay = 3000;

/**
 * Write
 * used to create new post
 *
 * uses the 'new post' version of useLoad
 * /components/Editor/editorHooks/newPost/useLoad
 * this hook loads the editor with any content stored in local storage
 *
 * @returns
 */
export default function EditorWrapper({ isInterview = false, tool = false }) {
  const router = useRouter();

  const { user } = useUser({
    // redirectTo: '/account',
    redirectTo: "/onboard",
    redirectIfFound: false,
  });
  /**
   * embed twitter widget if not already loaded
   */
  useEffect(() => {
    addTwitterScript();
  }, []);

  //useLoad hook
  //initialContent is null until loaded - so is 'false' when it's a new post
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
  } = useLoad({
    user,
    interview: isInterview,
    productName: tool?.name ? tool.name : false,
  });
  //create new post hook
  const { createPost, creatingPost, created } = useCreate();

  const {
    //update post content
    updatePostById,
    //update post settings
    updateSettings,
    setHasUnsavedChanges,
    saved,
    saving,
    setSaving,
    hasUnsavedChanges,
  } = useUpdate();

  useConfirmTabClose(hasUnsavedChanges);

  /**
   * updatePost
   * when editor onUpdate is triggered,
   * save the content to local storage
   * @param {*} param0
   */
  const updatePost = ({ editor, json, forReview }) => {
    // send the content to an API here (if new post only)
    if (postId) {
      setHasUnsavedChanges(true);
      setTimeout(() => {
        setSaving(!saving);
      }, 2700);
      debounceSave({ editor, forReview });
    } else {
      localStorage.setItem("wipContent", JSON.stringify(json));
      debounceSave({ editor, forReview });
    }
  };

  /**
   * bypass debounce and save immediately
   * @param {*} param0 
   */
  const forceSave = ({ editor, json, forReview }) => {
    setSaving(false);
    savePost({ editor, forReview });
  }

  /**
   * for autosave
   */
  const debounceSave = useCallback(
    debounce(async ({ editor, forReview }) => {
      setSaving(false);
      savePost({ editor, forReview });
    }, saveDebounceDelay),
    [user, postId, postObject, postStatus]
  );

  /**
   * savePost
   * when save button is clicked
   * save the post to the backend
   *
   * for new post, create a new post and redirect to the new post
   * @param {*} param0
   * @returns
   */
  const savePost = async ({ editor, forReview }) => {
    //check if editor has any content
    // Updating an existing post
    if (
      editor.state.doc.textContent.trim() === "" &&
      editor.state.doc.childCount <= 2
    ) {
      return false;
    }

    try {
      if (postId) {
        // Updating an existing post
        const updatedPostObject = await updatePostById({
          editor: editor,
          postId: postId,
          user: user,
          forReview: forReview,
          postStatus: postStatus,
          postObject: postObject,
        });

        // Update the postObject from useLoad hook
        if (updatedPostObject) {
          setPostObject(updatedPostObject);
          // Confirm no unsaved changes
          setHasUnsavedChanges(false);
        }
        return true;
      } else {
        // Creating a new post
        if (!router.query.slug) {
          const postInfo = await createPost({ user, editor, forReview });
          // Set the new slug
          localStorage.removeItem("wipContent");

          router.replace(
            {
              pathname: router.pathname,
              query: { slug: postInfo?.id },
              as: `/p/${postInfo?.id}`,
            },
            undefined,
            { shallow: true }
          );

          refetch();
          return true;
        } else {
          return false;
        }
      }
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

      if (updatedPostObject) {
        setPostObject(updatedPostObject);
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return (
    <>
      <EditorNav tool={tool} post={postObject} postStatus={postStatus} />

      <div className="h-full w-full" id="editor-container">
        <div className="w-full h-full mx-auto  relative">
          {/* {!user && <Fallback />} */}

          {/* only load editor if initialContent is not null */}
          {(user && !user?.isLoggedIn) || initialContent == null ? (
            // <Layout>
            <div className="my-auto h-screen flex flex-col justify-center text-center">
              <div className="mx-auto opacity-50">
                <Spinner />
              </div>
            </div>
          ) : (
            // </Layout>
            user?.isLoggedIn && (
              <>
                <div className="my-4">
                  <Editor
                    canEdit={canEdit}
                    initialContent={initialContent}
                    postStatus={postStatus}
                    //saving status
                    hasUnsavedChanges={hasUnsavedChanges}
                    isSaving={saving || creatingPost}
                    saved={saved || created}
                    //used for updating existing post
                    slug={slug}
                    postId={postId}
                    postObject={postObject}
                    //save and update content
                    // savePost={debounceSave}
                    updatePost={updatePost}
                    forceSave={forceSave}
                    //refetch post needed when the featured image is updated in post settings
                    refetchPost={refetch}
                    //update post settings
                    updatePostSettings={user?.isAdmin?updatePostSettings:false}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
