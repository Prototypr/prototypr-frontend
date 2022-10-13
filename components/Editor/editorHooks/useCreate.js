import toast from "react-hot-toast";
import {getPostDetails} from './libs/helpers'
var axios = require("axios");


const useCreate = () => {


      const createNewPost = async (user, editor) => {
        const { entry } = getPostDetails(user, editor);
    
        let publishPostEndpointConfig = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
    
          data: {
            data: {
              ...entry,
              publishedAt:null
            },
          },
        };
    
        try {
           let postResult =  await axios(publishPostEndpointConfig)
              .then(async function (response) {
                toast.success("Your draft has been saved!", {
                  duration: 5000,
                });
                return response?.data?.data
              })
              .catch(function (error) {
                console.log(error);
              });

              return postResult
        } catch {
          toast.error("Error creating draft! Please contact support for help.", {
            duration: 5000,
          });
          (e) => console.log(e);
        }
      };

    return { createNewPost };

    
  };

export default useCreate