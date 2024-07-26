// import EditorWrapper from "../prototypr-packages/public/Editor/EditorWrapper";
// import EditorWrapper from "@prototypr/typr/dist/EditorWrapper";
import useUser from "@/lib/iron-session/useUser";
import { getUserArticle, getSlugFromArticleId } from "@/lib/api";
import dynamic from "next/dynamic";
const EditorWrapper = dynamic(() => import("@prototypr/typr/dist/EditorWrapper"), {
  ssr: false
});
// import '@prototypr/typr/dist/styles.css';

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
  const { user, isLoading, mutateUser } = useUser({
    // redirectTo: '/account',
    redirectTo: "/onboard",
    redirectIfFound: false,
  });
  return (
    <>
      <EditorWrapper
        getUserArticle={getUserArticle}
        getSlugFromArticleId={getSlugFromArticleId}
        user={user}
        userLoading={isLoading}
        mutateUser={mutateUser}
      />
    </>
  );
}
