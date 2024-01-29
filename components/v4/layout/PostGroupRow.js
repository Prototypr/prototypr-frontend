// import BigCard from "../card/BigCard/BigCardC";

// import SmallCard from "../card/SmallCard/SmallCardE";
// import SmallPostsGroup from "./SmallPostGroupB";
// import RSSTitle from "../text/RSSTitle";
import SmallCard from "../card/SmallCard/SmallCardStacked";
import { useIntl } from "react-intl";
import Button from "@/components/Primitives/Button";

const PostGroupRow = ({ largePost, smallPosts, description,title }) => {
  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl?largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl:dummyAvatar;

    let authorData = largePost?.attributes?.author?.data?.attributes
    let largePostAvatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar

    const intl = useIntl();
    return (
    <>
   
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1320px]">
     
     <div className="flex flex-col justify-center mb-6 md:mb-0 px-6 md:px-6">
        <div>
            <h2 className="text-lg md:text-xl mb-1 text-[#0F1F40] font-semibold font-inter max-w-md leading-[32px]">
             {intl.formatMessage({ id: title })}
            </h2>
            <p>
                219 posts
            {/* {intl.formatMessage({ id: description })} */}
            </p>
            <Button className="rounded-full mt-6" variant={"ghostSmallBlue"}>Browse</Button>
        </div>
     </div>
      {/* <div className="w-full lg:w-1/2">
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
      </div> */}
      {/* <SmallPostsGroup smallPosts={smallPosts?.slice(0,3)}/> */}
      {smallPosts.map((post,index)=>{
          let url = post?.attributes?.featuredImage?.data?.attributes?.url;
          const coverImage = url
            ? url
            : post?.attributes?.legacyFeaturedImage?.mediaItemUrl;
            let authorData = post.attributes?.author?.data?.attributes
            let avatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
        return(
            <SmallCard
            link={`/post/${post?.attributes?.slug}`}
            avatar={avatar}
            author={post?.attributes?.author?.data?.attributes}
            image={coverImage}
            date={post?.attributes?.date}
            title={post?.attributes?.title}
            tags={post?.attributes?.tags?.data}
        />
        )
      })}
    </div>
    </>
  );
};
export default PostGroupRow;
