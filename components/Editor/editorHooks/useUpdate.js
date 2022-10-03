import toast from "react-hot-toast";
import {getPostDetails} from './libs/helpers'
import { useEffect, useState } from "react";
var axios = require("axios");


const useUpdate = () => {
    const [saving, setSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(undefined);

      const updateExisitingPost = async (user, editor, slug, forReview, postStatus) => {

        const { entry, findPostEndpointConfigs } = getPostDetails(user, editor, slug, forReview, postStatus);
    
        let publishPostEndpointConfig = {
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/{id}`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
    
          data: {
            data: {
              ...entry,
            },
          },
        };
    
        try {
          const existsResult = await axios(findPostEndpointConfigs);
          const exists = existsResult?.data?.data?.length > 0;
          if (exists) {
            const postId = existsResult.data.data[0].id;
            publishPostEndpointConfig.url = publishPostEndpointConfig.url.replace(
              "{id}",
              postId
            );
            
            await axios(publishPostEndpointConfig)
              .then(async function (response) {
                setSaving(false);
                setHasUnsavedChanges(false);
                if(forReview){
                  toast.success("Submitted for review!", {
                    duration: 5000,
                  });
                  localStorage.removeItem("wipContent");
                }else if (postStatus=='publish'){
                  toast.success("Your post has been updated!", {
                    duration: 5000,
                  });

                  localStorage.removeItem("wipContent");
                }
                else{

                  toast.success("Your draft has been updated!", {
                    duration: 5000,
                  });

                  localStorage.removeItem("wipContent");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            setSaving(false);
            setHasUnsavedChanges(true);
            toast.error("Your draft could not be saved!", {
              duration: 5000,
            });
          }
        } catch {
          (e) => console.log(e);
        }
      };

    return { updateExisitingPost, saving, hasUnsavedChanges, setHasUnsavedChanges, setSaving };

    
  };

export default useUpdate