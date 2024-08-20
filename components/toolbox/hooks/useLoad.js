import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserArticle } from "@/lib/api";

const useLoad = (user) => {
  const [postId, setPostId] = useState(true);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [postStatus, setStatus] = useState("draft");
  const [content, setContent] = useState(null);
  const [articleSlug, setArticleSlug] = useState(null);
  const [isOwner, setIsOwner] = useState(false)
  const [postObject, setPostObject] = useState(false)

  const router = useRouter();
  const { id } = router.query;
  //TODO: fetch slug from backend

  useEffect(() => {
    if (user) {
      setLoading(true);

      refetch();
    }
  }, [user]);

  useEffect(() => {
    if (user && id) {
        refetch();
    }
  }, [id, user]);

  const refetch = async () => {
    if (id) {
      console.log("loading from backend");
      //load data
      await getCurrentPost();
      // todo
      // setContent(content);
      setLoading(false);
    }
  };

  const getCurrentPost = async () => {
    setLoading(true);

    try {
      const data = await getUserArticle({user, id, type:'tool'});

      const post = data;

      //only allow owner of post, and post type article
      if(post?.owner==user?.id && post?.type==='tool'){
        setIsOwner(true)
      }else{
        setIsOwner(false)
      }
    
      setPostObject(post)
      setPostId(post?.id);
      setContent(post?.content);
      setTitle(post?.title);
      setStatus(post?.status);

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return {
    loading,
    content,
    postId,
    title,
    postStatus,
    articleSlug,
    isOwner,
    postObject,
    refetch
  };
};

export default useLoad;
