// import BigCard from "../card/BigCard/BigCardC";

// import SmallCard from "../card/SmallCard/SmallCardE";
// import SmallPostsGroup from "./SmallPostGroupB";
// import RSSTitle from "../text/RSSTitle";
import SmallCard from "../card/SmallCard/SmallCardStacked";
import { useIntl } from "react-intl";
// import Button from "@/components/Primitives/Button";
// import Link from 'next/link'
const PostGroupRow = ({ largePost, smallPosts, description,title,topicObject }) => {
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
   
    <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-[1320px]">
     
     {/* <div className="flex flex-col justify-center mb-6 md:mb-0">
        <div className="bg-blue-200/20 border border-blue-200/70 h-full rounded-2xl p-6">
            <h2 className="text-lg md:text-3xl mb-1 font-semibold font-inter max-w-md leading-[32px] text-blue-900">
             {intl.formatMessage({ id: title })}
            </h2>
            <p className="text-blue-900">
              {topicObject?.tagline}
            </p>
            <Link href={`/posts/${topicObject?.slug}/page/1`}>
              <Button className="rounded-full mt-6" variant={"ghostSmallBlue"}>Browse</Button>
            </Link>
        </div>
     </div> */}
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
        let p = post?.attributes
        if(!p){
          p=post
        }
        // if(!post?.attributes && post){
        //   p.attributes = post
        // }
          let url = p?.featuredImage?.data?.attributes?.url;
          const coverImage = url
            ? url
            : p?.legacyFeaturedImage?.mediaItemUrl;
            let authorData = p?.author?.data?.attributes
            let avatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
        if(p){

          return(
          <SmallCard
          link={`/post/${p?.slug}`}
          avatar={avatar}
          author={p?.author?.data?.attributes}
          image={coverImage}
          date={p?.date}
          title={p?.title}
          tags={p?.tags?.data}
      />
      )
        }
      })}
    </div>
    </>
  );
};
export default PostGroupRow;
