import dynamic from "next/dynamic";
// import Layout from "@/components/layout-editor";

import useUser from "@/lib/iron-session/useUser";
import { useEffect, useState } from "react";
import { addTwitterScript } from "@/components/Editor/editorHooks/libs/addTwitterScript";

import Editor from "@/components/Editor/Editor";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

import useLoad from "@/components/Editor/editorHooks/newPost/useLoad";
import useCreate from "@/components/Editor/editorHooks/newPost/useCreate";

import { useRouter } from "next/router";
import EditorNav from "@/components/EditorNav";
import { getToolById } from "@/lib/api";
import InterviewDialog from "@/components/InterviewDialog";

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
export default function InterviewEditor({ tool }) {
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
  const { canEdit, loading, initialContent, postStatus } = useLoad({
    user,
    interview: true,
    productName: tool?.attributes?.title,
  });

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
    localStorage.setItem("wipInterview", JSON.stringify(json));
  };

  const [dialogOpen, setDialogOpen] = useState(true);
  const [initialEditor, setInitialEditor] = useState(null);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const setInitialEditorContent = editor => {
    setInitialEditor(editor);
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
      const { id } = router.query;

      const postInfo = await createPost({
        user,
        editor,
        forReview,
        relatedPost: id,
      });
      //set the new slug
      localStorage.removeItem("wipInterview");

      router.push(`/toolbox/post/${id}/interview/${postInfo?.id}`);
    } catch (e) {
      return false;
    }
  };

  if (router.isFallback) {
    return (
      <div className="my-auto h-screen flex flex-col justify-center text-center">
        <div className="mx-auto opacity-50">
          <Spinner />
        </div>
      </div>
    );
  }

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
                    setInitialEditorContent={setInitialEditorContent}
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
      <InterviewDialog
        tool={tool}
        initialEditor={initialEditor}
        createPost={createPost}
        toggleOpen={toggleDialog}
        open={dialogOpen}
        user={user}
        relatedPostId={router.query.id}
      />
    </>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  let data;
  try {
    data = await getToolById(params.id, preview);
  } catch (error) {
    console.error("Failed to get tool:", error);
    return {
      notFound: true,
    };
  }

  let tool = data?.posts?.data[0] || null;
  return {
    props: {
      tool: tool || null,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
