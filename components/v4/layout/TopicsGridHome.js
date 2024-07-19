import { ArrowRight, Tag } from "@/components/icons";

import Link from "next/link";
import PostsGroup3Cards from "./PostsGroup3Cards";
import ToolIconCardRow from "./ToolIconCardRow";

const TopicsGridHome = ({ largePost, smallPosts, tools,showHeading, slug, heading }) => {
  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl?largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl:dummyAvatar;

    let authorData = largePost?.attributes?.author?.data?.attributes
    let largePostAvatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
  return (
    <>
    <div className="max-w-[1320px]">
    <div className="flex flex-col justify-between">
        <div className="w-full">
           {showHeading!==false?<div className="flex w-full justify-between mb-6">
            <div className="flex">
              <Tag className="hidden md:inline-block my-auto mr-3" size={32}/>
              <h2 className="text-xl md:text-3xl capitalize font-semibold text-black/90 tracking-tight">
                {heading}
              </h2>
            </div>
            <div className="my-auto">
              <div className="flex relative">
              <div className="text-md inline text-black/80 font-normal ">
              <Link href={`/topic/${slug}/page/1`}>See all</Link>
              </div>
              <div className="my-auto">
                <Link href={`/posts/${slug}/page/1`}>
                  <div className="bg-gray-200/60  ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                      <ArrowRight weight="bold" size={14} className="text-gray-900 my-auto"/>
                  </div>
                </Link>
              </div>
            </div>
            </div>
          </div>:''}

          <PostsGroup3Cards
          posts={[largePost,...smallPosts?.slice(0,2)]} 
          cols={3}
          />


          {tools?.length && <div className={`w-full mt-3 flex`}>
            <ToolIconCardRow title={`${heading} tools`} showHeader={false} withBackground={true} tools={tools} />       
          </div>}

        </div>
      
    </div>
    </div>
    </>
  );
};
export default TopicsGridHome;
