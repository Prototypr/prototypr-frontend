import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  getSponsoredPostById,
  getSponsoredPostByPaymentId,
  getUserBySponsorPostId,
} from "@/lib/api";

const useLoad = user => {
  const [postId, setPostId] = useState(true);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [postObject, setPostObject] = useState(false);

  const router = useRouter();
  const { id, paymentId } = router.query;

  useEffect(() => {
    if (user) {
      setLoading(true);

      refetch();
    }
  }, [user]);

  useEffect(() => {
    if (paymentId) {
      refetch();
    }
  }, [paymentId]);

  const refetch = async () => {
    if (id || paymentId) {
      console.log("loading from backend");
      //load data
      await getCurrentPost();
      setLoading(false);
    }
  };

  const getCurrentPost = async () => {
    setLoading(true);

    /**
     * if the user is logged in, use the custom strapi user endpoint
     */
    if (user?.isLoggedIn) {
      try {
        const data = await getUserBySponsorPostId(user, id);

        const post = data.userSponsor;

        if (post?.owner == user?.id) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }

        setPostObject(post);
        setPostId(post?.id);
        setContent(post?.description);
        setTitle(post?.title);

        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    } else {
      /**
       * if visitor has no account, get the public version
       */

      try {
        if (
          paymentId &&
          router.pathname == "/sponsor/booking/checkout-complete"
        ) {
          const data = await getSponsoredPostByPaymentId(paymentId);
          setPostObject({ ...data });
          setPostId(data?.id);
          setContent(data?.description);
          setTitle(data?.title);
          setLoading(false);
        } else {
          const data = await getSponsoredPostById(id);

          let post_obj = { id: data.id, ...data?.attributes };

          //flatten the products array
         let products = post_obj.products.data.map(product => {
            return {
              id: product.id,
              ...product.attributes,
            };
          });

          post_obj.products = products;

          setPostObject(post_obj);
          setPostId(data?.id);
          setContent(data?.attributes?.description);
          setTitle(data?.attributes?.title);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  return {
    loading,
    content,
    postId,
    title,
    isOwner,
    postObject,
  };
};

export default useLoad;
