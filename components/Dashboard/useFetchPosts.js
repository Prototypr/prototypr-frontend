import { useEffect, useState } from "react";
import { getUserArticles } from "@/lib/api";
// const qs = require("qs");
// var axios = require("axios");

const useFetchPosts = (user) => {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [drafts, setDrafts] = useState(null);
    const [publishedPosts, setPublishedPosts] = useState(null);

    useEffect(() => {


      setLoading(true)
      
      refetch()
      
      }, []);

      const refetch = async () => {
        setLoading(true)
        // const query = qs.stringify(
        //   {
        //     filters: {
        //       id: {
        //         $eq: user.id,
        //       },
        //     },
        //     populate: "*",
        //     fields: ["email", "firstName"],
        //   },
        //   {
        //     encodeValuesOnly: true, // prettify URL
        //   }
        // );
    
        // let currentUserData = {
        //   method: "get",
        //   url: `${process.env.NEXT_PUBLIC_API_URL}/api/users?${query}`,
        //   headers: {
        //     Authorization: `Bearer ${user?.jwt}`,
        //   },
        // };
        // const currentUser = await axios(currentUserData);
        //use graphql
        const data = await getUserArticles(user);
        const postsFromUser = data.userPosts

        setPosts(postsFromUser);

        let drfts =[], pblished = []

        for (var x = 0;x<postsFromUser.length;x++){
            let post = postsFromUser[x]
            
            if(post.status==='publish'){
                pblished.push(post)
            }else if (post.status==='draft' || post.status==='pending'){
                drfts.push(post)
            }
        }
        setDrafts(drfts)
        setPublishedPosts(pblished)
        setLoading(false)
      };
  

    return { loading, posts,drafts, publishedPosts, refetch};

    
  };

export default useFetchPosts