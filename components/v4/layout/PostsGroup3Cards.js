// import PrototyprNetworkCTA2 from "@/components/Sidebar/NetworkCTA2";
import MediumPost from "../card/SmallCard/MediumPost";
const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
// import SingleFancyCard from "./SingleFancyCard";

const PostsGroup3Cards = ({posts,cols}) =>{

    return(
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols==4?'lg:grid-cols-4':'lg:grid-cols-3'} gap-8 w-full`}>
{/* <SingleFancyCard/> */}
            {/* <PrototyprNetworkCTA2 /> */}
        {posts?.length ? (
          posts.map((post, index) => {
            let url = post?.attributes?.featuredImage?.data?.attributes?.url;
            const coverImage = url
              ? url
              : post?.attributes?.legacyFeaturedImage?.mediaItemUrl;
              let authorData = post.attributes?.author?.data?.attributes
              let avatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
            return (
              <div key={index} className="w-full">
                <MediumPost
                  imageSmall={cols==4?true:''}
                  link={`/post/${post?.attributes?.slug}`}
                  avatar={avatar}
                  author={post?.attributes?.author?.data?.attributes}
                  image={coverImage}
                  date={post?.attributes?.date}
                  title={post?.attributes?.title}
                  excerpt={post?.attributes?.excerpt}
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
export default PostsGroup3Cards