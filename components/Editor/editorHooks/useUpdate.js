import toast from "react-hot-toast";
import { getPostDetails } from "./libs/helpers";
import { useState } from "react";
var axios = require("axios");

const useUpdate = () => {
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(undefined);

  const updateExisitingPost = async (
    postId,
    user,
    editor,
    slug,
    forReview,
    postStatus
  ) => {
    const { entry } = getPostDetails({user, editor, slug, forReview, postStatus});

    let publishPostEndpointConfig = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },

      data: {
        data: {
          ...entry,
        },
      },
    };

    await axios(publishPostEndpointConfig)
      .then(async function (response) {
        setSaving(false);
        setHasUnsavedChanges(false);
        if (forReview) {
          toast.success("Submitted for review!", {
            duration: 5000,
          });
          localStorage.removeItem("wipContent");
        } else if (postStatus == "publish") {
          toast.success("Your post has been updated!", {
            duration: 5000,
          });

          localStorage.removeItem("wipContent");
        } else {
          toast.success("Your draft has been updated!", {
            duration: 5000,
          });

          localStorage.removeItem("wipContent");
        }
      })
      .catch(function (error) {
        console.log(error);
        setSaving(false);
        setHasUnsavedChanges(true);
        toast.error("Your draft could not be saved!", {
          duration: 5000,
        });
      });
  };

  return {
    updateExisitingPost,
    saving,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    setSaving,
  };
};

export default useUpdate;
