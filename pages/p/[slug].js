import dynamic from "next/dynamic";

import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import Layout from "@/components/layout-editor";

import Editor from "@/components/Editor/EditorB";
import { useEffect } from "react";
import useLoad from "@/components/Editor/editorHooks/editPost/useLoad";
import useUpdate from "@/components/Editor/editorHooks/editPost/useUpdate";

import { useConfirmTabClose } from "@/components/Editor/useConfirmTabClose";
import EditorNav from "@/components/EditorNavB";

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
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("id", "twitter-widget");
    s.setAttribute("async", "true");

    if (!document.getElementById("twitter-widget")) {
      document.head.appendChild(s);
    }
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:hide"]);
    }
  }, []);

  //useLoad hook
  const {
    canEdit,
    loading,
    initialContent,
    postStatus,
    postObject,
    slug,
    postId,
  } = useLoad(user);

  const {
    updatePostById,
    setSaving,
    setHasUnsavedChanges,
    hasUnsavedChanges,
    saving,
  } = useUpdate();

  useConfirmTabClose(hasUnsavedChanges);

  /**
   * savePost
   * when save button is clicked
   * save the post to the backend
   * @param {*} param0
   */
  const savePost = async ({ editor, forReview }) => {
    try {
      await updatePostById({
        editor: editor,
        postId: postId,
        user: user,
        slug: slug,
        forReview: forReview,
        postStatus: postStatus,
        postObject: postObject,
      });
      return true;
    } catch (e) {
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
  const updatePost = ({ editor, json, forReview=false }) => {
    console.log("updatePost");
    setHasUnsavedChanges(true);
  };

  return (
    <>
      <EditorNav postStatus={postStatus} />

      <div className="h-full w-full">
        <div id="editor-container" className="w-full h-full mx-auto  relative">
          {!user && <Fallback />}

          {/* only load editor if initialContent has loaded */}
          {(user && !user?.isLoggedIn) || initialContent == null ? (
            <>
              {/* <Layout> */}
              <div className="relative w-full h-full flex">
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
                  //functions
                  savePost={savePost}
                  updatePost={updatePost}
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
