import toast from "react-hot-toast";
import {getPostDetails} from './libs/helpers'
var axios = require("axios");


const useCreate = () => {


      const createNewPost = async (user, editor, editorType) => {
        const { entry, findPostEndpointConfigs } = getPostDetails(user, editor, editorType);
    
        let publishPostEndpointConfig = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
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
          if (!exists) {
            await axios(publishPostEndpointConfig)
              .then(async function (response) {
                toast.success("Your post has been submitted!", {
                  duration: 5000,
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            toast.error("You've already submitted this post!", {
              duration: 5000,
            });
          }
        } catch {
          (e) => console.log(e);
        }
      };

    return { createNewPost };

    
  };

export default useCreate