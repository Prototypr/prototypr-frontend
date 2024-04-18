import { useEffect, useState } from "react";

/**
 * useLoad hook for creating new post
 * 
 * loads content from local storage if available
 *
 * @param {*} type
 * @param {*} usr
 * @returns
 */
const useLoad = user => {
  const [loading, setLoading] = useState(true);

  const [postStatus] = useState("draft");
  const [initialContent, setInitialContent] = useState(null);

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      setCanEdit(true);
      refetch();
    }
  }, [user]);

  const refetch = async () => {
    let retrievedObject = localStorage.getItem("wipContent");
    if (retrievedObject) {
      setInitialContent(JSON.parse(retrievedObject));
      setLoading(false);
    } else {
      //it's a new post
      setInitialContent(false)
      setLoading(false);
    }
  };

  return {
    loading,
    initialContent,
    postStatus,
    canEdit,
  };
};

export default useLoad;
