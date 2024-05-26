"use client"
import { useEffect, useState } from "react";
import { getUserArticles } from "@/lib/api";

const PAGE_SIZE = 9

const useFetchPosts = (user, postStatus, postType) => {

    const [total, setTotal] = useState(null);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      refetch(1)
    }, []);

      const refetch = async (offset) => {
        setLoading(true)
        
        let pageOffset = (offset-1) * PAGE_SIZE
        if(!pageOffset){
          pageOffset = 0
        }
    
        if(!user){
          return false
        }
        const data = await getUserArticles({user, postStatus:postStatus, pageSize:PAGE_SIZE, offset:pageOffset, type:postType});
        const postsFromUser = data.userPosts?.posts
        setPosts(postsFromUser)
        setTotal(data.userPosts?.count)

        setLoading(false)
      };
  

    return { loading, posts,total,pageSize:PAGE_SIZE, refetch};

    
  };

export default useFetchPosts