// import BigCardPost from "../card/BigCard/BigCardPost";
// import { ArrowRight } from "phosphor-react";
// import Link from 'next/link'

// import SmallCard from "../card/SmallCard/SmallCardE";
import PostsGroup3Cards from "./PostsGroup3Cards";
import RSSTitle from "../text/RSSTitle";

const PostsGridHero = ({ posts, showHeading,title }) => {
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
        <PostsGroup3Cards posts={posts}/>
    </div>
    {/* rows of 3 */}
    
    </>
  );
};
export default PostsGridHero;
