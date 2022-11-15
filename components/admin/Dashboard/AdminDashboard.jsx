import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

import useFetchAdminPosts from "./useFetchAdminPosts";
import EmptyState from "./EmptyState";
import PostCard from "./PostCard";
import NewPagination from "../../pagination";

const AdminDashboard = ({postStatus}) => {
  const { user } = useUser({
    redirectIfFound: false,
  });

  const {
    posts,
    loading,
    refetch,
    total,
    pageSize
  } = useFetchAdminPosts(user, postStatus);

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
     {user?.isAdmin? <div className="-mt-5">
      <NewPagination
                total={total}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageNumChange={changePage}
              />
            <div className="grid grid-cols-3 mt-6 gap-5">
              {!loading &&
                posts?.map((post) => (
                  <PostCard refetch={refetch} user={user} post={post} />
                ))}
            </div>
            {!loading && !posts?.length && (
              <EmptyState draft={false} />
            )}
             <NewPagination
                total={total}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageNumChange={changePage}
              />
      </div>:'YOu no admin'}
  </>
  );
};

export default AdminDashboard;


