import dynamic from "next/dynamic";
// import Layout from "@/components/layout-editor";

import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import { useEffect } from "react";
import { addTwitterScript } from "@/components/Editor/editorHooks/libs/addTwitterScript";

import Editor from "@/components/Editor/Editor";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

import useLoad from "@/components/Editor/editorHooks/newPost/useLoad";
import useCreate from "@/components/Editor/editorHooks/newPost/useCreate";

import { useRouter } from "next/router";
import EditorNav from "@/components/EditorNav";

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
export default function Write() {
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
  const { canEdit, loading, initialContent, postStatus } = useLoad(user);

  //create new post hook
  const { createPost } = useCreate();

  /**
   * updatePost
   * when editor onUpdate is triggered,
   * save the content to local storage
   * @param {*} param0
   */
  const updatePost = ({ editor, json }) => {
    // send the content to an API here (if new post only)
    localStorage.setItem("wipContent", JSON.stringify(json));
  };

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
    try {
      const postInfo = await createPost({ user, editor, forReview });
      //set the new slug
      localStorage.removeItem("wipContent");

      router.push(`p/${postInfo?.id}`);
    } catch (e) {
      return false;
    }
  };

  return (
    <>
      <EditorNav postStatus={postStatus} />

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
                    //functions
                    createPost={createPost}
                    savePost={savePost}
                    updatePost={updatePost}
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
