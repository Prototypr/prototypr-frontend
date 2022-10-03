import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const qs = require("qs");
var axios = require("axios");

const useLoad = (type='create', usr) => {


    const [user] = useState(usr);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState(null);
    const [postStatus, setStatus] = useState('draft');
    const [content, setContent] = useState(null);
    const [editorType] = useState(type)

    const router = useRouter();
    const { slug } = router.query;


    useEffect(() => {


      setLoading(true)
      
      refetch()
      
      }, []);


      const refetch = () =>{

        if (slug) {
          console.log("loading from backend");

          //load data
          getCurrentPost()
          // todo
          // setContent(content);
          setLoading(false)
        } else {
          console.log("loading from local");
    
          let retrievedObject = localStorage.getItem("wipContent");
          if (retrievedObject) {
            setContent(JSON.parse(retrievedObject));
            setLoading(false)
          }
        }
      }



      const getCurrentPost = async () => {

        setLoading(true)
        const query = qs.stringify(
          {
            filters: {
              slug: {
                $eq: slug,
              },
            },
            populate: "*",
            fields: [],
          },
          {
            encodeValuesOnly: true, // prettify URL
          }
        );
    
        let currentPostData = {
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts?${query}`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        };
    
        const resp = await axios(currentPostData);
        const post = resp.data?.data[0]?.attributes;

        let content = post?.content

        //if title isn't part of body, add it in
        if(post?.title && content.indexOf(post?.title)==-1){
          content = `<h1>${post?.title}</h1>${content}`
        }
        
        setContent(content);
        setTitle(post?.title);
        setStatus(post?.status)

        setLoading(false)
      };
  

    return { loading, content, title, editorType, slug, postStatus};

    
  };

export default useLoad