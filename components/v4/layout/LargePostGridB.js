import BigCard from "../card/BigCard/BigCardC";
import { ArrowRight } from "phosphor-react";
import Link from 'next/link'

// import SmallCard from "../card/SmallCard/SmallCardE";
import SmallPostsGroup from "./SmallPostGroupB";
import RSSTitle from "../text/RSSTitle";
const LargePostGrid = ({ largePost, smallPosts, showHeading,title }) => {
  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl?largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl:dummyAvatar;

    let authorData = largePost?.attributes?.author?.data?.attributes
    let largePostAvatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
  return (
    <>
    <div className="flex justify-between">
      {showHeading!==false?<RSSTitle title={title}/>:''}
       <div className="flex relative p-2">
            <div className="text-md inline text-gray-800 my-auto font-normal font-inter">
            <Link href={`/posts/`}>See all</Link>
            </div>
            <div className="my-auto">
              <Link href={`/posts/`}>
                <div className="bg-blue-100  ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                    <ArrowRight weight="bold" size={14} className="text-blue-900 my-auto"/>
                </div>
              </Link>
            </div>
          </div>
    </div>
    <div className="flex flex-col lg:flex-row justify-between max-w-[1320px]">
      <div className="w-full lg:w-1/2">
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
      </div>
      <SmallPostsGroup smallPosts={smallPosts?.slice(0,3)}/>
    </div>
    </>
  );
};
export default LargePostGrid;
