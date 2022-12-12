import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

import useFetchSponsoredPosts from "./useFetchSponsoredPosts";
import EmptyState from "./EmptyState";
import SponsorCard from "./SponsorCard";
import NewPagination from "../pagination";

const ListSponsors = ({postStatus}) => {
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
  } = useFetchSponsoredPosts(user, postStatus);

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
                  <SponsorCard refetch={refetch} user={user} post={post} />
                ))}
            </div>
            {!loading && !posts?.length && (
              <EmptyState type="sponsor" draft={false} />
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

export default ListSponsors;


