import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const qs = require("qs");
var axios = require("axios");

import { getUserArticle } from "@/lib/api";

const useLoad = (type='create', usr) => {


    const [user] = useState(usr);
    const [postId, setPostId] = useState(true);
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
          }else{
            //it's a new post
            setLoading(false)
          }
        }
      }



      const getCurrentPost = async () => {

        setLoading(true)

        try{
          const data = await getUserArticle(user, slug);

          const post = data.userPost
      
          let content = post?.content
  
          //if title isn't part of body, add it in
          if(post?.title && content.indexOf(post?.title)==-1){
            content = `<h1>${post?.title}</h1>${content}`
          }
          
          setPostId(post?.id)
          setContent(content);
          setTitle(post?.title);
          setStatus(post?.status)
  
          setLoading(false)

        }catch(e){
          console.log(e)
          setLoading(false)
        }
       
      };
  

    return { loading, content,postId, title, editorType, slug, postStatus};

    
  };

export default useLoad