import BigCard from "../card/BigCard/BigCardD";
import ToolCollection from "@/components/v4/layout/ToolCollection";

// import SmallCard from "../card/SmallCard/SmallCardE";
import SmallPostsGroupC from "./SmallPostGroupC";
// import RSSTitle from "../text/RSSTitle";
import { ArrowRight, Tag } from "phosphor-react";

// import { CaretRight, Tag } from "phosphor-react";
import Link from "next/link";
// import Button from "@/components/Primitives/Button";
const LargePostGridC = ({ largePost, smallPosts, tools,showHeading, slug, heading }) => {
  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl?largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl:dummyAvatar;

    let authorData = largePost?.attributes?.author?.data?.attributes
    let largePostAvatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
  return (
    <>
    <div className="bg-white border border-gray-300/40 p-6 md:p-0 rounded-3xl max-w-[1320px] shadow-md">
    <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-8/12 md:p-6">
           {showHeading!==false?<div className="flex w-full justify-between mb-6">
            <div className="flex">
              <Tag className="hidden md:inline-block my-auto mr-3" size={32}/>
              <h2 className="text-xl md:text-3xl capitalize font-semibold text-black/90 tracking-tight">
                {heading}
              </h2>
            </div>
            <div className="my-auto">
              <div className="flex relative">
              <div className="text-md inline text-black/80 font-normal font-inter">
              <Link href={`/posts/${slug}/page/1`}>See all</Link>
              </div>
              <div className="my-auto">
                <Link href={`/posts/${slug}/page/1`}>
                  <div className="bg-gray-200/60  ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                      <ArrowRight weight="bold" size={14} className="text-gray-900 my-auto"/>
                  </div>
                </Link>
              </div>
            </div>
            {/* <Link href={`/posts/${slug}/page/1`}>
            <div className="font-inter mt-1 text-sm my-auto text-black opacity-60 cursor-pointer text-sm flex">
              <div className="my-auto">See all</div>
            <CaretRight className="my-auto" size={14} />
            </div>
          </Link> */}
            </div>
          </div>:''}
        {/* <div className="hidden md:block flex relative p-2 mb-1">
            <h3 className="text-lg overflow-hidden line-clamp-1 font-medium font-inter">
              Top reads
            </h3>
            <div className="bg-blue-200/90 ml-3 flex justify-center my-auto h-6 w-6 rounded-full">
                <ArrowRight weight="bold" size={14} color="rgb(0,0,0)" className="my-auto"/>
            </div>
          </div> */}
            <BigCard
            link={`/post/${largePost?.attributes?.slug}`}
            avatar={largePostAvatar}
            excerpt={largePost?.attributes?.excerpt}
            author={largePost?.attributes?.author?.data?.attributes}
            image={largeCoverImage}
            date={largePost?.attributes?.date}
            title={largePost?.attributes?.title}
            tags={largePost?.attributes?.tags?.data}
            />
        <SmallPostsGroupC tools={tools} smallPosts={smallPosts?.slice(0,2)}/>
        {/* <div className="flex mt-10"> */}
            {/* <div className="font-inter cursor-pointer flex">
              <div className="text-blue-600 text-md font-base">
                See more {heading}
              </div>
              <CaretRight className="my-auto text-blue-600" size={14} />
            </div> */}
            {/* <Link href={`/posts/${slug}/page/1`}>
              
              <Button className="rounded-full  leading-none" variant="ghostBlue">
                See more {heading}
              </Button>
            </Link> */}
          {/* </div>   */}
        </div>
      <div className="w-full lg:w-4/12 md:p-6 lg:bg-gray-50 md:border-l border-gray-100 lg:rounded-r-3xl">
      {tools?.length>3 ?
        <>
        <ToolCollection tagline={false} slug={slug} topic={heading} tools={tools} />
        </>:''
      }
      </div>
    </div>
    </div>
    </>
  );
};
export default LargePostGridC;
