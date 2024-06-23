import toast from "react-hot-toast";
import { getCreatePostData } from "../libs/getCreatePostData";
import { useState } from "react";
var axios = require("axios");

const useCreate = () => {
  const [creatingPost, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const createPost = async ({ user, editor, forReview, relatedPost }) => {
    setCreating(true);
    if (created) {
      throw new Error("Post already created");
    }
    const { entry } = getCreatePostData({
      user,
      editor,
      forReview,
      relatedPost,
    });

    let publishPostEndpointConfig = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },

      data: {
        data: {
          ...entry,
          publishedAt: null,
        },
      },
    };

    try {
      let postResult = await axios(publishPostEndpointConfig)
        .then(async function (response) {
          // toast.success("Your draft has been saved!", {
          //   duration: 5000,
          // });
          setCreated(true);
          setTimeout(() => {
            setCreating(false);
          }, 1000);
          return response?.data?.data;
        })
        .catch(function (error) {
          setCreating(false);
          console.log(error);
        });

      return postResult;
    } catch {
      toast.error("Error creating draft! Please contact support for help.", {
        duration: 5000,
      });
      e => console.log(e);
    }
  };

  return { createPost, creatingPost, created };
};

export default useCreate;
