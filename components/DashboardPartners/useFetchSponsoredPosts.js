import { useEffect, useState } from "react";
import { getPartnerPosts } from "@/lib/api";

const PAGE_SIZE = 9

const useFetchSponsoredPosts = (user, postStatus) => {

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
    
        const data = await getPartnerPosts({user, pageSize:PAGE_SIZE, offset:pageOffset});
        console.log(data)
        const partnerPosts = data.partnerPosts?.posts
        setPosts(partnerPosts)
        setTotal(data.partnerPosts?.count)
        
        setLoading(false)
      };
  

    return { loading, posts,total,pageSize:PAGE_SIZE, refetch};

    
  };

export default useFetchSponsoredPosts