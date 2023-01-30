import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

import useFetchPosts from "../Dashboard/useFetchPosts";
import EmptyState from "./EmptyState";
import PostCard from "./PostCard";
import NewPagination from "../pagination";

const Dashboard = ({postStatus, postType, currentTab}) => {
  const { user } = useUser({
    redirectIfFound: false,
  });

  const {
    posts,
    loading,
    refetch,
    total,
    pageSize
  } = useFetchPosts(user, postStatus, postType);

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(()=>{
    refetch(1)

  },[])

  const changePage = (offset) =>{
    setCurrentPage(offset)
    refetch(offset)
  }
  return (
  <>
      <div>
            <div className="grid grid-cols-12 gap-6">
              {!loading &&
                posts?.map((post) => (
                  <PostCard refetch={refetch} user={user} post={post} />
                ))}
            </div>
            {!loading && !posts?.length && (
              <EmptyState currentTab={currentTab} draft={false} />
            )}
             <NewPagination
                total={total}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageNumChange={changePage}
              />
      </div>
  </>
  );
};

export default Dashboard;


