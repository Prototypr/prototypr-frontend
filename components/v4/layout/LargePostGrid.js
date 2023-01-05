import BigCard from "../card/BigCard/BigCardB";
import SmallCard from "../card/SmallCard/SmallCardE";
import SmallPostsGroup from "./SmallPostsSection";
const LargePostGrid = ({ largePost, smallPosts }) => {
  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl;

    let authorData = largePost?.attributes?.author?.data?.attributes
    const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
    let largePostAvatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
  return (
    <div className="flex flex-col max-w-[1320px]">
      <div>
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
      <SmallPostsGroup smallPosts={smallPosts}/>
    </div>
  );
};
export default LargePostGrid;
