// import PrototyprNetworkCTA2 from "@/components/Sidebar/NetworkCTA2";
import SmallCard from "../card/SmallCard/SmallCardH";
const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
// import SingleFancyCard from "./SingleFancyCard";

const SmallPostsGroupB = ({smallPosts}) =>{

    return(
        <div className="grid grid-cols-12 gap-8 mt-4 lg:-mt-3">
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
              <div key={index} className={`col-span-12 lg:col-span-6`}>
                <SmallCard
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
export default SmallPostsGroupB