// import SidebarDiscover from "@/components/v4/layout/SidebarDiscover";
import Container from "@/components/container";
import HeroPostGrid from "../layout/HeroPostGrid";
// import {RssSimple} from 'phosphor-react'
const HeroArticleSection = ({user, heroCardPost,showBigPost, viewablePosts, cols,title, showHeading,showHeadingRow }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      {/* <div className="w-full shadow-md h-full grid grid-cols-12 flex justify-center bg-white rounded-3xl p-6 lg:p-6"> */}
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className={`w-full max-w-full flex flex-col col-span-12 `}>
          <HeroPostGrid title={title} showHeading={showHeading} showHeadingRow={showHeadingRow} cols={cols} showBigPost={showBigPost} largePost={heroCardPost} smallPosts={viewablePosts} />
        </div>
        {/* <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        /> */}
      </div>
    </Container>
  );
};

export default HeroArticleSection;
