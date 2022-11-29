import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getUserJobById } from "@/lib/api";

const useLoad = (user) => {
  const [postId, setPostId] = useState(true);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [isOwner, setIsOwner] = useState(false)
  const [postObject, setPostObject] = useState(false)

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user) {
      setLoading(true);

      refetch();
    }
  }, [user]);

  const refetch = async () => {
    if (id) {
      console.log("loading from backend");
      //load data
      await getCurrentPost();
      setLoading(false);
    } 
  };

  const getCurrentPost = async () => {
    setLoading(true);

    try {
      const data = await getUserJobById(user, id);

      const post = data.userJob;

      if(post?.owner==user?.id){
        setIsOwner(true)
      }else{
        setIsOwner(false)
      }

      setPostObject(post)
      setPostId(post?.id);
      setContent(post?.description);
      setTitle(post?.title);

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
    isOwner,
    postObject
  };
};

export default useLoad;
