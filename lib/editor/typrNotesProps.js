import { signOut } from "next-auth/react";
import fetchJson from "@/lib/iron-session/fetchJson";
import { createPost } from "@/lib/editor/createPost";
import { savePost } from "@/lib/editor/savePost";
import { getUserArticle } from "@/lib/api";
// import { loggedInMenu } from "./menus/loggedInMenu";
import { settingsMenuNotes,seoMenu } from "./menus/settingsMenuNotes";

export const typrNotesProps = ({ user, userLoading, mutateUser, router }) => ({
  enablePublishingFlow: false,
  theme: "blue",
  editorWidth: "590px",
  components: {
    
    nav: {
      show: true,
      undoRedoButtons: { show: false },
      logo: { show: false, image: `/static/images/logo-small.svg`, url: "/" },
      userBadge: {
        show: false,
        avatarPlaceholder:
          "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/4f9713374ad556ff3b8ca33e241f6c43.png?updated_at=2022-12-14T10:55:38.818Z",
        // loggedInMenu
      },
      position: "sticky",
    },
    settingsPanel: {
      show: true,
      generalTab: {
        menu: settingsMenuNotes,
      },
      seoTab: {
        menu: seoMenu,
      },
      featuredImage: {
        show: true,
      },
    },
  },
  user: {
    id: user?.id,
    slug: user?.profile?.slug,
    avatar: user?.profile?.avatar?.url,
    isLoggedIn: user?.isLoggedIn,
    isAdmin: user?.isAdmin,
    loading: userLoading,
    jwt: user?.jwt,
    signOut: async () => {
      await signOut({ redirect: false });
      mutateUser(
        await fetchJson("/api/auth/logout", { method: "POST" }),
        false
      );
    },
  },
  postOperations: {
    load: async ({ postId, user }) => {
      const postObject = await getUserArticle({
        user,
        id: postId,
        type: "note",
      });
      return postObject;
    },
    save: async ({ entry, postId }) => {
      const postObject = await savePost({ entry, postId, user, type: "note" });
      return postObject;
    },
    create: async ({ entry }) => {
      const postObject = await createPost({ entry, user, type: "note" });
      return postObject;
    },
  },
  mediaHandler: {
    config: {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/article/image/upload`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
    },
  },
  hooks: {
    onPostCreated: ({ id }) => {
      router.replace(
        {
          pathname: router.pathname,
          query: { slug: id },
          as: `/p/${id}`,
        },
        undefined,
        { shallow: true }
      );
    },
  },
  router: {
    push: router.push,
  },
});
