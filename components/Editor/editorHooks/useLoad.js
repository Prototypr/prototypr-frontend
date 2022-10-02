import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const qs = require("qs");
var axios = require("axios");

const useLoad = (type='create', usr) => {


    const [user] = useState(usr);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [editorType] = useState(type)
    const [sluggy, setSlug] = useState(null)

    const router = useRouter();


    useEffect(() => {


      setLoading(true)
        if (editorType === "edit") {
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
      }, []);



      const getCurrentPost = async () => {

        setLoading(true)
        const { slug } = router.query;
        setSlug(slug)
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
        const post = resp.data.data[0].attributes;
        setContent(post?.content);
        setTitle(post?.title);

        setLoading(false)
      };
  

    return { loading, content, title, editorType, slug:sluggy};

    
  };

export default useLoad