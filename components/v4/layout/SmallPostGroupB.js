// import PrototyprNetworkCTA2 from "@/components/Sidebar/NetworkCTA2";
import SmallCard from "../card/SmallCard/SmallCardF";
const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
// import SingleFancyCard from "./SingleFancyCard";

const SmallPostsGroupB = ({smallPosts}) =>{

    return(
      <div className="grid grid-cols-3 gap-3">

        {/* <div className="flex w-full lg:w-1/2 flex-col justify-between"> */}
{/* <SingleFancyCard/> */}
            {/* <PrototyprNetworkCTA2 /> */}
        {smallPosts?.length ? (
          smallPosts.map((post, index) => {
            let url = post?.attributes?.featuredImage?.data?.attributes?.url;
            const coverImage = url
              ? url
              : post?.attributes?.legacyFeaturedImage?.mediaItemUrl;
              let authorData = post.attributes?.author?.data?.attributes
              let avatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
            return (
              <div key={index} className="w-full col-span-1">
                <SmallCard
                  link={`/post/${post?.attributes?.slug}`}
                  avatar={avatar}
                  author={post?.attributes?.author?.data?.attributes}
                  image={coverImage}
                  date={post?.attributes?.date}
                  title={post?.attributes?.title}
                  tags={post?.attributes?.tags?.data}
                  content={post?.attributes?.content}
                  excerpt={post?.attributes?.excerpt}
                />
              </div>
            );
          })
        ) :"" 
        }
      </div>
    )
}
export default SmallPostsGroupB