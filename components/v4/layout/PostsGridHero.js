import BigCardPost from "../card/BigCard/BigCardPost";
// import { ArrowRight } from "phosphor-react";
// import Link from 'next/link'

// import SmallCard from "../card/SmallCard/SmallCardE";
import SmallPostsGroup2Cards from "./SmallPostsGroup2Cards";
import RSSTitle from "../text/RSSTitle";
// import PostsGroup3Cards from "./PostsGroup3Cards";

const PostsGridHero = ({ largePost, smallPosts, showHeading,title }) => {
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
      {showHeading!==false?<RSSTitle title={'Recent posts'}/>:''}
    </div>
    <div className="flex flex-col lg:flex-row justify-between max-w-[1320px]">
      <div className="w-full lg:w-1/2 md:pr-6">
        <BigCardPost
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
        <SmallPostsGroup2Cards smallPosts={smallPosts?.slice(0,2)}/>
    </div>
    {/* rows of 3 */}
    </>
  );
};
export default PostsGridHero;
