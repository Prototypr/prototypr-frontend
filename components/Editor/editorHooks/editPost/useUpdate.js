import toast from "react-hot-toast";
import { useState } from "react";
import { checkSessionExpired } from "@/lib/account/checkSessionExpired";
import { getEditPostData } from "../libs/getEditPostData";
import { updatePostObject } from "../libs/helpers/updatePostObjectWithUpdateResults";
const axios = require("axios");

/**
 * updates a post based on its postId
 *
 * used in the editor to save existing post drafts, submit for review, or publish
 *
 * @param {*} postId
 * @param {*} user
 * @param {*} editor
 * @param {*} slug
 * @param {*} forReview
 * @param {*} postStatus
 * @param {*} postObject
 *
 * @returns
 */
const useUpdate = () => {
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(undefined);

  /**
   * updatePost
   * @param {*} param0
   * @returns updated postObject
   */
  const updatePost = async ({
    postId,
    user,
    editor,
    forReview,
    postStatus,
    postObject,
  }) => {
    //create the entry object with updated post data from the editor content
    const { entry } = getEditPostData({
      editor,
      forReview,
      postStatus,
      postObject,
    });

    //check if session expired
    //check if jwt is expired
    const sessionExpired = checkSessionExpired(user?.jwt);
    if (sessionExpired) {
      alert("Your sessions has expired. Please log in again.");
      return false;
    }

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

    setSaving(true);

    const updateData = await axios(publishPostEndpointConfig)
      .then(async function (response) {
        setTimeout(() => {
          setSaving(false);
          setHasUnsavedChanges(false);
        }, 1000);
        if (forReview) {
          toast.success("Submitted for review!", {
            duration: 5000,
          });
          localStorage.removeItem("wipContent");
        } else if (postStatus == "publish") {
          // toast.success("Your post has been updated!", {
          //   duration: 5000,
          // });

          localStorage.removeItem("wipContent");
        } else {
          // toast.success("Your draft has been updated!", {
          //   duration: 5000,
          // });

          localStorage.removeItem("wipContent");
        }
        return response;
      })
      .catch(function (error) {
        console.log(error);
        setSaving(false);
        setHasUnsavedChanges(true);
        toast.error("Your draft could not be saved!", {
          duration: 5000,
        });
      });

    //update the initial postobject with the updated data and return it
    const updatedObject = updatePostObject({
      updatedObject: updateData?.data?.data?.attributes,
      existingObject: postObject,
    });

    return updatedObject;
  };

  /**
   * updatePostSettings
   */
  const updatePostSettings = async ({ postId, user, settings, postObject }) => {
    //create the entry object with the new settings
    const entry = {
      type: "article",
      ...settings,
    };

    //check if session expired
    //check if jwt is expired
    const sessionExpired = checkSessionExpired(user?.jwt);
    if (sessionExpired) {
      alert("Your sessions has expired. Please log in again.");
      return false;
    }

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

    setSaving(true);

    const updateData = await axios(publishPostEndpointConfig)
      .then(async function (response) {
        setSaving(false);
        setHasUnsavedChanges(false);
        toast.success("Article settings updated!", {
          duration: 5000,
        });
        return response;
      })
      .catch(function (error) {
        console.log(error);
        setSaving(false);
        setHasUnsavedChanges(true);
        toast.error("Settings could not be saved!", {
          duration: 5000,
        });
      });

    //update the initial postobject with the updated data and return it
    const updatedObject = updatePostObject({
      updatedObject: updateData?.data?.data?.attributes,
      existingObject: postObject,
    });
    return updatedObject;
  };

  //return hook stuff
  return {
    updatePostById: updatePost,
    updateSettings: updatePostSettings,
    saving,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    setSaving,
  };
};

export default useUpdate;
