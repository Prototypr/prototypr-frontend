import { useEffect, useState } from "react";
import { getPartnerJobs } from "@/lib/api";

const PAGE_SIZE = 9

const useFetchJobPosts = (user, postStatus) => {

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
    
        const data = await getPartnerJobs({user, pageSize:PAGE_SIZE, offset:pageOffset});
        const partnerJobs = data.partnerJobs?.posts

        setPosts(partnerJobs)
        setTotal(data.partnerJobs?.count)
        
        setLoading(false)
      };
  

    return { loading, posts,total,pageSize:PAGE_SIZE, refetch};

    
  };

export default useFetchJobPosts