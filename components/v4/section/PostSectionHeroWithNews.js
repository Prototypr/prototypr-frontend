// import SidebarDiscover from "@/components/v4/layout/SidebarDiscover";
import Container from "@/components/container";
// import PostsGridHero from "@/components/v4/layout/PostsGridHero";
import SectionDivider from "./SectionDivider";
import HeroPostGrid from "../layout/HeroPostGrid";
// import NewsColumn from "../layout/NewsColumn";
import PostsNewsGroup3 from "../layout/PostNewsGroup3";

import { FireIcon } from "@/components/icons";

const PostsSectionHeroWithNews = ({
  user,
  heroCardPost,
  toolsList,
  showHeroTitle,
  groupSlice,
  viewablePosts,
  showTags,
  title,
  showRecent,
  showTitle,
  news,
  headline,
  groupedNewsPosts,
  tagName,
  tools,
  pageNo,
  tag,
}) => {
  return (
    <Container padding={false} maxWidth="max-w-[1320px] mx-auto">
      {showRecent ? (
        <>
          {/* <div className="w-full shadow-md h-full grid grid-cols-12 flex justify-center bg-white rounded-3xl p-6 mt-6 lg:p-6"> */}
          <div className="w-full h-full grid grid-cols-12 flex justify-center">
            <div
              className={`w-full max-w-full flex flex-col col-span-12 mt-3 `}
            >
              {/* <PostsGridHero title={title} largePost={heroCardPost} showHeading={showHeroTitle!==false} smallPosts={viewablePosts} /> */}
              {/* <PostsGroup3Cards posts={[heroCardPost,...viewablePosts?.slice(0,2)]} /> */}
              <Container padding={false} maxWidth="max-w-[1320px] mx-auto ">
                {/* <div className="w-full shadow-md h-full grid grid-cols-12 flex justify-center bg-white rounded-3xl p-6 lg:p-6"> */}
                <div className="w-full h-full grid grid-cols-12 flex justify-center">
                  <div
                    className={`w-full max-w-full flex flex-col col-span-12 `}
                  >
                    <HeroPostGrid
                      imageDimensions={`md:w-7/12 md:h-[520px]`}
                      textDimensions={`md:w-5/12`}
                      title={title}
                      showSmallCardDescription={true}
                      showHeading={true}
                      showHeadingRow={false}
                      cols={3}
                      tools={tools}
                      showBigPost={2}
                      show2PostRow={true}
                      largePost={heroCardPost}
                      smallPosts={viewablePosts}
                      maxPosts={viewablePosts?.length}
                    />
                  </div>

                  {/* <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        /> */}
                </div>
              </Container>
              {/* <HeroArticleSection
              cols={3}
              title={false}
              showHeading={false}
              showHeadingRow={false}
              // cols={3}
              heroCardPost={heroCardPost}
              viewablePosts={viewablePosts}
              maxSmallPosts={viewablePosts?.length}
              // showBigPost={false}
              showBigPost={2}/> */}
              {/* <HeroPostGrid cols={3} showBigPost={2} showHeadingRow={false} largePost={heroCardPost} smallPosts={viewablePosts} /> */}
            </div>
          </div>
          <SectionDivider py="py-4" transparentLine={true} />
        </>
      ) : (
        <div className="w-full h-full grid grid-cols-12 flex justify-center px-3 md:px-3">
          <div
            className={`${!showRecent ? "-mt-4" : ""} w-full max-w-full flex flex-col gap-2 col-span-12 `}
          >
            <div className="flex justify-between">
              {showTitle !== false && (
                <div className="my-3">
                  {/* <RSSTitle title={`${title?`All ${title}`:'All posts'}`}/> */}
                </div>
              )}
            </div>
            <PostsNewsGroup3
              // tools={tools}
              pageNo={pageNo}
              posts={
                !showRecent
                  ? viewablePosts
                  : viewablePosts?.slice(
                      groupSlice ? groupSlice : 2,
                      viewablePosts?.length
                    )
              }
              headline={
                <div className="flex">
                  <FireIcon size={24} className={"my-auto mr-1"} />
                  {tagName} News
                </div>
              }
              news={news}
              tag={tag}
              tagName={tagName}
              groupedNewsPosts={groupedNewsPosts}
              tools={tools}
            />
          </div>
          {/* <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        /> */}
        </div>
      )}

      {/* {showTags && 
       <div className=" mt-4">
       <TagsNavRow/>
     </div>
      } */}
    </Container>
  );
};

export default PostsSectionHeroWithNews;
