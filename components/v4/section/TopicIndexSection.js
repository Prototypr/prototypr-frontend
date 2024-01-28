// import SidebarDiscover from "@/components/v4/layout/SidebarDiscover";
import Container from "@/components/container";
import LargePostGridC from "@/components/v4/layout/LargePostGridB";
import PostGroupRow from "../layout/PostGroupRow";
// import {RssSimple} from 'phosphor-react'
const TopicIndexSection = ({user, heroCardPost, viewablePosts, jobsSidebar,title }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className="w-full shadow-sm h-full grid grid-cols-12 flex justify-center bg-white rounded-xl p-6 lg:p-10">
        <div className={`w-full max-w-full flex flex-col gap-2 col-span-12 py-3 `}>
          {/* <LargePostGridC title={title} largePost={heroCardPost} smallPosts={viewablePosts} /> */}
          <PostGroupRow title={title} largePost={heroCardPost} smallPosts={viewablePosts} />
        </div>
        {/* <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        /> */}
      </div>
    </Container>
  );
};

export default TopicIndexSection;
