import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Sentry from "@sentry/nextjs";
import { getInterViewTemplate } from "../libs/templates/interviewTemplate";
import { getUserArticle, getSlugFromArticleId } from "@/lib/api";

/**
 * useLoad hook for loading post content
 *
 * Handles loading content from local storage (for new posts) and from the backend (for existing posts)
 *
 * @param {object} params - The parameters for the hook
 * @param {object} params.user - The user object
 * @param {boolean} params.interview - Flag indicating if it's an interview
 * @param {string} params.productName - The product name
 * @returns {object} - The hook state and functions
 */
const useLoad = ({ user, interview, productName } = {}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initialContent, setInitialContent] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [postId, setPostId] = useState(router.query?.slug);
  const [slug, setSlug] = useState(null);
  const [postObject, setPostObject] = useState(false);
  const [title, setTitle] = useState(null);
  const [postStatus, setStatus] = useState("draft");


  // Load content when user or postId changes
  useEffect(() => {
    if (user && router.isReady) {
      const { slug } = router.query;
      if (slug) {
        setPostId(slug);
      } else {
        refetch();
      }
    }
  }, [user, router.query.slug && router.isReady]);

  useEffect(() => {
    if(postId && user?.isLoggedIn){

        refetch();
    }
  }, [postId, user?.isLoggedIn]);

  // Refetch content
  const refetch = async () => {
    if (postId) {
        await getCurrentPost();
      setLoading(false);
    } else {
      setIsOwner(true);
      setCanEdit(true);
      loadLocalContent();
      setLoading(false);
    }
  };

  // Load local content for new posts
  const loadLocalContent = () => {
    let retrievedObject = localStorage.getItem("wipContent");
    if (interview) {
      retrievedObject = localStorage.getItem("wipInterview");
    }
    if (retrievedObject) {
      setInitialContent(JSON.parse(retrievedObject));
    } else {
      if (interview) {
        setInitialContent(getInterViewTemplate({ productName }));
      } else {
        setInitialContent(false);
      }
    }
  };

  // Fetch current post from the backend
  const getCurrentPost = async () => {
    try {
      const data = await getUserArticle(user, postId);
      const post = data.userPostId;
      
      const userHasPermission = checkPermissions(post);
      console.log(userHasPermission)
      Sentry.captureMessage(`#33 80 getUserArticle: ${post?.id}`, {
        extra: data,
      });

      if (userHasPermission) {
        setPostObject(post);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Check user permissions for editing the post
  const checkPermissions = post => {
    let hasPermission = false;

    if (user && post?.owner == user?.id && post?.type === "article") {
      setIsOwner(true);
      setCanEdit(true);
      hasPermission = true;
    }

    if (user?.isAdmin && post?.id) {
      setCanEdit(true);
      hasPermission = true;
    }

    if(!post?.id){
        hasPermission = false;
        setInitialContent(false);
    }

    return hasPermission;
  };

  /**
   * when postObject is available, set the initial content
   * and other data
   */
  useEffect(() => {
    if (postObject) {
      setPostId(postObject?.id);

      //et content
      let content = postObject?.content;
      //if title isn't part of body, add it in
      if (postObject?.title && content.indexOf(postObject?.title) == -1) {
        content = `<h1>${postObject?.title}</h1>${content}`;
      }
      if (content) {
        setInitialContent(content);
      } else {
        setInitialContent(false);
      }

      //set title
      setTitle(postObject?.title);
      //set status
      setStatus(postObject?.status);
    }
  }, [postObject]);

  // Fetch slug when user and postId are available
  useEffect(() => {
    const fetchData = async () => {
      const { userPostId } = await getSlugFromArticleId(user, postId);
      setSlug(userPostId?.slug);
    };
    if (user && postId) {
      fetchData();
    }
  }, [postId, user]);

  return {
    loading,
    initialContent,
    title,
    postId,
    slug,
    postStatus,
    isOwner,
    postObject,
    canEdit,
    refetch,
    setPostObject,
  };
};

export default useLoad;
