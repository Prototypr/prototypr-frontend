import { signOut } from "next-auth/react";
import fetchJson from "@/lib/iron-session/fetchJson";
import { createPost } from "@/lib/editor/createPost";
import { savePost } from "@/lib/editor/savePost";
import { getUserArticle } from "@/lib/api";
import { loggedInMenu } from "./menus/loggedInMenu";

export const typrProps = ({ user, userLoading, mutateUser, router }) => ({
  enablePublishingFlow: true,
  theme: "blue",
  components: {
    nav: {
      logo: { image: `/static/images/logo-small.svg`, url: "/" },
      userBadge: {
        loggedInMenu
      }
    },
    userMenu: {
      avatarPlaceholder:
        "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/4f9713374ad556ff3b8ca33e241f6c43.png?updated_at=2022-12-14T10:55:38.818Z",
    },
    settingsPanel: {
      featuredImage: {
       show:true
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
      const postObject = await getUserArticle(user, postId);
      return postObject;
    },
    save: async ({ entry, postId }) => {
      const postObject = await savePost({ entry, postId, user });
      return postObject;
    },
    create: async ({ entry }) => {
      const postObject = await createPost({ entry, user });
      return postObject;
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
    push: router.push
  },
});
