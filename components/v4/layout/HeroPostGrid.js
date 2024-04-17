import BigCard from "../card/BigCard/BigCardC";
import { ArrowRight } from "phosphor-react";
import Link from "next/link";

import RSSTitle from "../text/RSSTitle";
import PostsGroup3Cards from "./PostsGroup3Cards";
import BigBackgroundCard from "../card/BigCard/BigBackgroundCard";
import MediumPost from "../card/SmallCard/MediumPost";

const HeroPostGrid = ({
  largePost,
  showBigPost,
  smallPosts,
  showHeading,
  showHeadingRow,
  title,
  cols,
  showSmallCardDescription,
  maxPosts,
  show2PostRow,
  imageDimensions,
  textDimensions,
}) => {
  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const dummyAvatar =
    "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl
      ? largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl
      : dummyAvatar;

  let authorData = largePost?.attributes?.author?.data?.attributes;
  let largePostAvatar = authorData?.avatar?.data
    ? authorData?.avatar?.data?.attributes?.url
    : authorData?.legacyAvatar
      ? authorData?.legacyAvatar
      : dummyAvatar;

  return (
    <>
      {showHeadingRow !== false && (
        <div className="flex justify-between mb-4">
          {showHeading !== false ? <RSSTitle title={title} /> : ""}
          <div className="flex relative p-2">
            <div className="text-md inline text-gray-800 my-auto font-normal font-inter">
              <Link href={`/posts/`}>See all</Link>
            </div>
            <div className="my-auto">
              <Link href={`/posts/`}>
                <div className="bg-gray-200/60  ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                  <ArrowRight
                    weight="bold"
                    size={14}
                    className="text-blue-900 my-auto"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between max-w-[1320px] relative">
        {showBigPost && (
          <div className="w-full mb-3">
            <div className="z-20 relative">
              <BigBackgroundCard
                showDescription={cols == 2 ? false : true}
                layout={showBigPost}
                link={`/post/${largePost?.attributes?.slug}`}
                avatar={largePostAvatar}
                imageDimensions={imageDimensions}
                textDimensions={textDimensions}
                excerpt={largePost?.attributes?.excerpt}
                author={largePost?.attributes?.author?.data?.attributes}
                image={largeCoverImage}
                date={largePost?.attributes?.date}
                title={largePost?.attributes?.title}
                tags={largePost?.attributes?.tags?.data}
              />
            </div>
            {/* <div className="z-10">
          <svg className="absolute top-0 mt-[50px] opacity-30 right-0 w-[40px] -mr-[50px]" width="212" height="494" viewBox="0 0 212 494" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M28.3337 100.328C20.1738 87.8542 2.0981 87.2306 0.961914 69.248C4.47376 68.0007 8.50165 67.1692 11.9102 65.2981C14.8023 63.739 17.0748 60.7245 19.7603 58.6456C39.1788 43.9893 59.9403 32.4514 84.6265 29.437C88.5515 28.9173 92.1667 26.3186 95.9884 25.0713C107.763 21.4332 119.538 17.8991 131.313 14.4689C136.581 12.9097 142.572 12.5978 147.013 9.79133C157.962 2.72305 170.047 1.57969 183.371 0.0205078C186.366 3.55465 189.672 7.60853 193.907 12.7018C199.071 8.85587 203.616 5.52961 208.264 2.09941C209.297 3.86648 210.64 5.11381 210.433 6.04932C208.574 17.3794 202.376 24.5516 191.221 27.7739C170.047 33.8027 150.525 43.8854 130.177 51.7853C103.218 62.1798 78.2222 76.5243 51.1603 86.503C43.7234 89.2056 37.2166 94.8186 28.3337 100.328ZM179.239 16.4439C179.136 15.9241 179.033 15.4044 178.826 14.8847C178.31 15.0926 177.69 15.1965 177.484 15.6123C177.277 15.9241 177.69 16.5478 177.793 17.0675C178.31 16.8596 178.826 16.6517 179.239 16.4439Z" fill="#3EA7F3"/>
  <path d="M14.0791 211.652C20.8962 211.029 26.2673 209.989 31.6383 210.093C61.9022 210.821 92.1664 211.548 122.327 213.004C144.224 214.043 166.121 216.434 188.019 218.097C197.728 218.825 203.616 225.997 211.569 230.466C208.987 235.56 205.578 232.026 202.893 232.233C199.484 232.545 195.972 232.13 192.667 232.753C189.362 233.481 186.263 235.352 183.061 236.495C179.859 237.639 176.554 238.574 173.249 239.51C170.563 240.237 167.878 241.173 165.192 241.173C145.774 240.549 126.871 243.667 108.176 248.761C105.077 249.592 101.359 248.969 98.0539 248.657C82.3539 247.513 66.5503 246.162 50.8503 244.915C31.122 243.668 20.1732 234.416 14.0791 211.652Z" fill="#3EA7F3"/>
  <path d="M35.564 353.227C41.9679 343.976 49.7146 344.495 54.6725 349.069C65.2081 358.736 78.842 363.725 88.448 374.847C108.693 398.131 129.66 420.687 150.318 443.659C152.178 445.634 153.211 448.337 154.76 450.623C162.404 461.953 167.258 475.154 178 484.406C180.273 486.381 182.339 491.058 178.62 493.345C176.451 494.696 172.113 493.761 169.324 492.513C166.432 491.058 164.159 488.148 161.68 485.653C126.768 449.688 91.8566 413.723 57.048 377.55C49.8177 370.066 43.3107 362.062 35.564 353.227Z" fill="#3EA7F3"/>
  <path d="M179.239 16.4439C178.723 16.6518 178.31 16.8597 177.793 17.0676C177.69 16.5479 177.277 15.9242 177.484 15.6124C177.69 15.1966 178.413 15.0927 178.826 14.8848C179.033 15.5084 179.136 15.9242 179.239 16.4439Z" fill="white"/>
  </svg>
        </div> */}

            {/* <BigCard
          link={`/post/${largePost?.attributes?.slug}`}
          avatar={largePostAvatar}
          excerpt={largePost?.attributes?.excerpt}
          author={largePost?.attributes?.author?.data?.attributes}
          image={largeCoverImage}
          date={largePost?.attributes?.date}
          title={largePost?.attributes?.title}
          tags={largePost?.attributes?.tags?.data}
        /> */}
          </div>
        )}
        {show2PostRow ? (
          <>
            <div className="mb-3">
              {/* <PostsGroup3Cards 
        cols={2}
        showDescription={showSmallCardDescription}
        posts={smallPosts?.slice(0,2)}
        // posts={smallPosts}
        /> */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 w-full`}>
                {smallPosts?.length >= 2
                  ? smallPosts?.slice(0, 2).map((post, index) => {
                      let url = post?.attributes?.featuredImage?.data
                        ?.attributes?.url
                        ? post?.attributes?.featuredImage?.data?.attributes?.url
                        : null;
                      const coverImage = url
                        ? url
                        : post?.attributes?.legacyFeaturedImage?.mediaItemUrl
                          ? post?.attributes?.legacyFeaturedImage?.mediaItemUrl
                          : null;
                      let authorData = post?.attributes?.author?.data
                        ?.attributes
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
                            showDescription={true}
                            imageHeight={`h-[320px]`}
                            link={`/post/${post?.attributes?.slug ? post?.attributes?.slug : ""}`}
                            avatar={avatar}
                            author={
                              post?.attributes?.author?.data?.attributes
                                ? post?.attributes?.author?.data?.attributes
                                : null
                            }
                            image={coverImage}
                            date={
                              post?.attributes?.date
                                ? post?.attributes?.date
                                : null
                            }
                            title={
                              post?.attributes?.title
                                ? post?.attributes?.title
                                : null
                            }
                            excerpt={
                              post?.attributes?.excerpt
                                ? post?.attributes?.excerpt
                                : null
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
              </div>
            </div>
            <PostsGroup3Cards
              cols={cols}
              showDescription={showSmallCardDescription}
              posts={smallPosts?.slice(2, smallPosts?.length)}
              // posts={smallPosts}
            />
          </>
        ) : (
          <PostsGroup3Cards
            cols={cols}
            showDescription={showSmallCardDescription}
            // posts={!showBigPost?[largePost,...smallPosts?.slice(0,(cols==4?3:cols==2?1:2))]:smallPosts?.slice(0,(cols==4?4:cols==2?2:3))}
            posts={
              !showBigPost
                ? [
                    largePost,
                    ...smallPosts?.slice(0, cols == 4 ? 3 : cols == 2 ? 1 : 2),
                  ]
                : smallPosts?.slice(
                    0,
                    maxPosts ? maxPosts : cols == 4 ? 4 : cols == 2 ? 2 : 3
                  )
            }
            // posts={smallPosts}
          />
        )}
      </div>
    </>
  );
};
export default HeroPostGrid;
