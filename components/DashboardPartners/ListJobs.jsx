import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

import useFetchJobPosts from "./useFetchJobPosts";
import EmptyState from "./EmptyState";
import JobCard from "./JobCard";
import NewPagination from "../pagination";

const ListJobs = ({postStatus}) => {
  const [currentTab, setCurrentTab] = useState("drafts");
  const { user } = useUser({
    redirectIfFound: false,
  });

  const {
    posts,
    loading,
    refetch,
    total,
    pageSize
  } = useFetchJobPosts(user, postStatus);

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
            <div className="grid grid-cols-3 gap-5">
              {!loading &&
                posts?.map((post) => (
                  <JobCard refetch={refetch} user={user} post={post} />
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
      </div>
  </>
  );
};

export default ListJobs;


