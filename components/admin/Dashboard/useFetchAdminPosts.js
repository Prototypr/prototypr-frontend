import { useEffect, useState } from "react";
import { getAdminArticles } from "@/lib/api";

const PAGE_SIZE = 9

const useFetchPosts = (user, postStatus) => {

    const [total, setTotal] = useState(null);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      refetch(1)
    }, []);

      const refetch = async (offset, userIdFilter) => {
        setLoading(true)
        
        let pageOffset = (offset-1) * PAGE_SIZE
        if(!pageOffset){
          pageOffset = 0
        }
    
        const data = await getAdminArticles({user, postStatus, pageSize:PAGE_SIZE, offset:pageOffset, userIdFilter:userIdFilter});
        const postsFromUser = data.adminPosts?.posts
        setPosts(postsFromUser)
        setTotal(data.adminPosts?.count)

        setLoading(false)
      };
  

    return { loading, posts,total,pageSize:PAGE_SIZE, refetch};

    
  };

export default useFetchPosts