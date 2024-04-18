import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getUserArticle } from "@/lib/api";
import { getSlugFromArticleId } from "@/lib/api";
import * as Sentry from "@sentry/nextjs";

/**
 * useLoad hook for editing existing post
 *
 * loads content from backend from the given slug
 *
 * @param {*} type
 * @param {*} usr
 * @returns
 */
const useLoad = user => {
  const router = useRouter();
  //router.query.slug is the postId not the slug!
  const [postId, setPostId] = useState(router.query?.slug);
  const [slug, setSlug] = useState(null); //need to fetch the slug separately
  const [postObject, setPostObject] = useState(false);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [postStatus, setStatus] = useState("draft");

  const [initialContent, setInitialContent] = useState(null);

  const [canEdit, setCanEdit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  //TODO: fetch slug from backend

  useEffect(() => {
    setPostId(router.query.slug);
    if (user?.isLoggedIn && router.query.slug) {
      setLoading(true);
      refetch();
      //   Sentry.captureMessage(`#33 l29 userId: ${user?.id}`, { extra: user });
    }
  }, [user, router.query.slug]);

  const refetch = async () => {
    if (postId) {
      //clear local storage
      localStorage.removeItem("wipContent");
      console.log("loading from backend");
      //load data
      await getCurrentPost();
      setLoading(false);
    } else {
      //can't load data - something gone wrong
      setLoading(false);
    }
  };

  const getCurrentPost = async () => {
    setLoading(true);

    try {
      //get article data
      const data = await getUserArticle(user, postId);
      const post = data.userPostId;

      //check if user has permission to edit
      let userHasPermission = checkPermissions(post);

      Sentry.captureMessage(`#33 80 getUserArticle: ${post?.id}`, {
        extra: data,
      });

      //only set post data if user has permission
      if (userHasPermission) {
        let content = post?.content;
        //if title isn't part of body, add it in
        if (post?.title && content.indexOf(post?.title) == -1) {
          content = `<h1>${post?.title}</h1>${content}`;
        }
        setPostObject(post);
        setPostId(post?.id);
        if(content){
            setInitialContent(content);
        }else{
            setInitialContent(false)
        }
        setTitle(post?.title);
        setStatus(post?.status);
      }

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const checkPermissions = post => {
    let hasPermission = false;

    if (user && post?.owner == user?.id && post?.type === "article") {
      setIsOwner(true);
      setCanEdit(true);
      hasPermission = true;
    }

    if (user.isAdmin) {
      setCanEdit(true);
      hasPermission = true;
    }
    return hasPermission;
  };

  /**
   * once user and id are available, fetch the article slug
   * this is only needed when editing the slug from the editor settings
   */
  useEffect(() => {
    async function fetchData() {
      const { userPostId } = await getSlugFromArticleId(user, postId);
      const postSlug = userPostId?.slug;
      setSlug(postSlug);
    }
    /**
     * Fetch data from strapi
     * if user and slug are available
     */
    if (user && postId) {
      fetchData();
    }
  }, [postId, user]);

  return {
    loading,
    initialContent,
    postId,
    title,
    slug,
    postStatus,
    isOwner,
    postObject,
    canEdit,
  };
};

export default useLoad;
