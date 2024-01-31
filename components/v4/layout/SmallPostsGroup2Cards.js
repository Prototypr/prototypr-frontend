// import PrototyprNetworkCTA2 from "@/components/Sidebar/NetworkCTA2";
import SmallCardPost from "../card/SmallCard/SmallCardPost";
const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
// import SingleFancyCard from "./SingleFancyCard";

const SmallPostsGroup2Cards = ({smallPosts}) =>{

    return(
        <div className="flex w-full lg:w-1/2 flex-col mt-4 lg:-mt-3">
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
              <div key={index} className="w-full mt-3 mb-3">
                <SmallCardPost
                  link={`/post/${post?.attributes?.slug}`}
                  avatar={avatar}
                  author={post?.attributes?.author?.data?.attributes}
                  image={coverImage}
                  date={post?.attributes?.date}
                  title={post?.attributes?.title}
                  tags={post?.attributes?.tags?.data}
                />
              </div>
            );
          })
        ) :"" 
        }
      </div>
    )
}
export default SmallPostsGroup2Cards