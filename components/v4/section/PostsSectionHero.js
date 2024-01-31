// import SidebarDiscover from "@/components/v4/layout/SidebarDiscover";
import Container from "@/components/container";
import PostsGridHero from "@/components/v4/layout/PostsGridHero";
import PostsGroup3Cards from "../layout/PostsGroup3Cards";
import RSSTitle from "../text/RSSTitle";
import SectionDivider from "./SectionDivider";
import TagsNavRow from "./TagsNavRow";
// import {RssSimple} from 'phosphor-react'
const PostsSectionHero = ({user, heroCardPost, viewablePosts, showTags,title, showRecent,showTitle }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      {showRecent && 
      <>
        <div className="w-full shadow-md h-full grid grid-cols-12 flex justify-center bg-white rounded-3xl p-6 mt-6 lg:p-6">
            <div className={`w-full max-w-full flex flex-col gap-2 col-span-12 `}>
            <PostsGridHero title={title} largePost={heroCardPost} smallPosts={viewablePosts} />
            </div>
        </div>
        <SectionDivider py="py-4" transparentLine={true}/>
      </>
      
      }
      {showTags && 
       <div className="-mt-4 -ml-3 mb-5">
       <TagsNavRow/>
     </div>
      }
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className={`${!showRecent?'-mt-4':''} w-full max-w-full flex flex-col gap-2 col-span-12 `}>
         <div className="flex justify-between">
            {showTitle!==false &&
            <div className="my-3">
              <RSSTitle title={`${title?`All ${title}`:'All posts'}`}/>
              </div>
            }
            </div>
            <PostsGroup3Cards posts={!showRecent?viewablePosts:viewablePosts?.slice(2,viewablePosts?.length)}/>
        </div>
        {/* <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        /> */}
      </div>
    </Container>
  );
};

export default PostsSectionHero;
