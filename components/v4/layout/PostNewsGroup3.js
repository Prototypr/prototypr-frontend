// import PrototyprNetworkCTA2 from "@/components/Sidebar/NetworkCTA2";
import MediumPost from "../card/SmallCard/MediumPost";
import NewsCard from "../card/SmallCard/NewsCard";
import Link from "next/link";
import { ArrowRight ,ToolboxIcon} from "@/components/icons";
import NewsColumn from "./NewsColumn";
import ToolIconCard from "../card/ToolIconCard";

const dummyAvatar =
  "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
// import SingleFancyCard from "./SingleFancyCard";

const PostsNewsGroup3 = ({ tagName,tag,posts, cols, showDescription, news,groupedNewsPosts, headline, tools, pageNo }) => {
  return (
    <div
      className={`flex flex-col sm:grid sm:grid-cols-2 ${cols == 4 ? "lg:grid-cols-4" : cols == 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-3 w-full`}
    >
      {/* <SingleFancyCard/> */}
      {news?.length ? (
        <div className="order-2 md:order-first overflow-hidden pt-3 bg-white shadow-sm rounded-2xl relative border border-gray-300/50">
         <div className="z-50 rounded-b-2xl absolute block pointer-events-none bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fbfcff]" />
          <div className="order-3 md:order-1 md:mt-0 col-span-9 md:col-span-3">
              <NewsColumn
                showBeta={false}
                headline={headline}
                groupedNewsPosts={groupedNewsPosts}
                // sponsor={navSponsor}
                withBackground={false}
                posts={news}
              />
            </div>
         
        </div>
      ) : null}
      {/* {tools?.length
        ? 
         <div className="flex flex-col justify-between relative">
        {tools?.length && tools.map((item, index) => {
          item = item?.attributes ? item?.attributes : null;
            return <ToolIconCard withBackground={true} tool={item} />;
          })}
        </div>
        : ""} */}
      {/* <PrototyprNetworkCTA2 /> */}
      {posts?.length
        ? posts.map((post, index) => {
            let url = post?.attributes?.featuredImage?.data?.attributes?.url
              ? post?.attributes?.featuredImage?.data?.attributes?.url
              : null;

            const coverImage = url
              ? url
              : post?.attributes?.legacyFeaturedImage?.mediaItemUrl
                ? post?.attributes?.legacyFeaturedImage?.mediaItemUrl
                : null;
            let authorData = post?.attributes?.author?.data?.attributes
              ? post?.attributes?.author?.data?.attributes
              : null;
            let avatar = authorData?.avatar?.data
              ? authorData?.avatar?.data?.attributes?.url
              : authorData?.legacyAvatar
                ? authorData?.legacyAvatar
                : dummyAvatar;
            return (
              <div key={index} className="w-full">
                <MediumPost
                  post={post}
                  showDescription={showDescription}
                  imageSmall={cols == 4 ? true : ""}
                  imageVSmall={cols == 2 ? true : ""}
                  link={`/post/${post?.attributes?.slug ? post?.attributes?.slug : ""}`}
                  avatar={avatar}
                  author={
                    post?.attributes?.author?.data?.attributes
                      ? post?.attributes?.author?.data?.attributes
                      : null
                  }
                  image={coverImage}
                  date={post?.attributes?.date ? post?.attributes?.date : null}
                  title={
                    post?.attributes?.title ? post?.attributes?.title : null
                  }
                  excerpt={
                    post?.attributes?.excerpt ? post?.attributes?.excerpt : null
                  }
                  tags={
                    post?.attributes?.tags?.data
                      ? post?.attributes?.tags?.data
                      : null
                  }
                />
              </div>
            );
          })
        : ""}
         {(pageNo>1 && tools?.length) ? (
                  <div className="col-span-2 border border-gray-300/50 bg-white p-3 shadow-sm rounded-2xl  lg:col-span-1">
                    <div className="flex w-full justify-between">
                      <div>
                        <div className="flex">
                          <ToolboxIcon
                            size={28}
                            className={"my-auto mr-2 text-gray-600"}
                          />
                          <div className="flex flex-col">
                            <h3
                              className={`text-lg font-bold capitalize drop-shadow-sm tracking-[-0.018em] text-gray-800`}
                            >
                              {tagName} Toolbox
                            </h3>
                            {/* <div className="text-sm text-gray-600">
                                      Handpicked every week
                                    </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="flex relative">
                        <div className="my-auto">
                          <Link href={`/toolbox/${tag}/page/1`}>
                            <div className="bg-gray-200/60  ml-2.5 flex justify-center my-auto h-5 w-5 rounded-full">
                              <ArrowRight
                                weight="bold"
                                size={12}
                                className="text-gray-900 my-auto"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-1 lg:grid-rows-4 flex gap-6 mt-6 flex-col justify-between">
                      {tools?.length &&
                        tools.map((item, index) => {
                          item = item?.attributes ? item?.attributes : null;
                          return (
                            <ToolIconCard withBackground={false} tool={item} />
                          );
                        })}
                    </div>
                  </div>
                ) : null}
    </div>
  );
};
export default PostsNewsGroup3;
