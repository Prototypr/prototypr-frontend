import dynamic from 'next/dynamic';
import useUser from "@/lib/iron-session/useUser";
import { getUserArticle, getSlugFromArticleId } from "@/lib/api";
// import '@prototypr/typr/dist/styles.css';

const EditorWrapper = dynamic(() => import("@prototypr/typr/dist/EditorWrapper"), {
  ssr: false
});

/**
 * 
 * Write
 * used to create new post
 *
 * uses the 'new post' version of useLoad
 * /components/Editor/editorHooks/newPost/useLoad
 * this hook loads the editor with any content stored in local storage
 *
 * @returns
 */
export default function EditPostPage() {
  const { user, isLoading, mutateUser } = useUser({
    // redirectTo: '/account',
    redirectTo: "/onboard",
    redirectIfFound: false,
  });

  return (
    <>
      <EditorWrapper
        user={user}
        userLoading={isLoading}
        mutateUser={mutateUser}
        getUserArticle={getUserArticle}
        getSlugFromArticleId={getSlugFromArticleId}
      />
    </>
  );
}