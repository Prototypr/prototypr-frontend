// import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const ToolCard = ({ posts, type, columns, tagNumber, border }) => {
  return (
    <div
      className={`grid grid-cols-1 px-1 ${columns ? columns : "lg:grid-cols-3"} gap-2 w-full flex-wrap`}
    >
      {posts.map((post, i) => {
        let title, slug, coverImage, tags;

        if (type === "toolboxContentPage") {
          title = post.title;
          slug = post.slug;
          if (tagNumber == 1) {
            tags = post.tags.slice(0, 1);
          } else if(tagNumber > 2){
            tags = post.tags.slice(0, 2);
          }

          coverImage = post.featuredImage?.data?.attributes?.url
            ? post.featuredImage.data.attributes.url
            : post.legacyFeaturedImage
              ? post.legacyFeaturedImage
              : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

          coverImage =
            post?.legacyMedia?.logoNew ||
            coverImage?.logoNew ||
            post.legacyMedia?.mediaItemUrl ||
            post.attributes?.legacyFeaturedImage?.mediaItemUrl;
        } else {
          title = post?.attributes?.title;
          slug = post.attributes?.slug;
          if (tagNumber == 1) {
            tags = post?.attributes?.tags?.data.slice(0, 1);
          } else {
            tags = post?.attributes?.tags?.data.slice(0, 2);
          }
          // let tool = post.attributes

          // let coverImage =
          // tool.featuredImage?.data?.attributes?.url
          //   ? tool.featuredImage.data.attributes.url
          //   : tool.legacyFeaturedImage
          //   ? tool.legacyFeaturedImage
          //   : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

          //   coverImage = (tool?.legacyMedia?.logoNew || coverImage?.logoNew || tool.legacyMedia?.mediaItemUrl)

          coverImage = post.attributes?.featuredImage?.data?.attributes?.url
            ? post.attributes.featuredImage.data.attributes.url
            : post.attributes?.legacyFeaturedImage
              ? post.attributes?.legacyFeaturedImage
              : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
          coverImage =
            post?.attributes?.legacyMedia?.logoNew ||
            coverImage?.logoNew ||
            post.attributes?.legacyMedia?.mediaItemUrl ||
            post.attributes?.legacyFeaturedImage?.mediaItemUrl;
        }

        return (
          <Link href={`/toolbox/${slug}`}>
            <div
              key={slug}
              className={`w-auto group  gap-2 hover:bg-gray-100/90 rounded-2xl transition trasition-all duration-400 p-2 flex md:flex-row justify-between gap-4 ${border ? "bg-white rounded-2xl border border-black border-opacity-5 p-3" : ""} `}
            >
              <div className="flex justify-center sm:flex-row">
                {coverImage ? (
                  <div className="mr-4 relative rounded-xl border border-gray-300/40 overflow-hidden h-[64px] w-[64px] bg-gray-50 group-hover:scale-[1.05] group-hover:shadow-sm flex-none transition transition-all duration-700 ">
                    <Image
                      loader={gumletLoader}
                      priority={false < 2 ? `true` : `false`}
                      data-priority={false < 2 ? `true` : `false`}
                      fetchpriority={false < 2 ? "true" : "false"}
                      data-gmlazy={false < 2 ? `false` : `true`}
                      fill={true}
                      layout="fill"
                      // width="100"
                      // height="100"
                      alt="Brand logo for external website's link"
                      className="object-cover rounded-xl bg-white"
                      src={coverImage}
                    />
                  </div>
                ) : (
                  <div className="p-1 h-[64px] w-[64px] mr-4 rounded-2xl overflow-hidden bg-gray-50"></div>
                )}

                <div className="flex flex-col justify-center ">
                  <p className="font-medium tracking-tight line-clamp-2 mb-1">
                    {title}
                  </p>
                  {tags?.length && (
                    <div className="flex flex-wrap">
                      {/* {tags.map((x, i) => { 
                      return (
                        <span className={`${i>0?'hidden md:inline-block md:line-clamp-1':''} px-3 mr-1 py-1 h-[1.42rem] leading-wide overflow-hidden rounded-full bg-gray-100 text-xs capitalize`}>
                          {x.attributes.name}
                        </span>
                      );
                    })} */}
                      <Link
                        href={`/toolbox/${tags[0].attributes?.slug}/page/1/`}
                        className={`${i > 0 ? "hidden md:inline-block md:line-clamp-1" : ""} px-2.5 mr-1 py-0.5 leading-wide overflow-hidden hover:shadow-sm hover:font-medium rounded-full bg-[#ecf0f5] text-xs capitalize transition transition-all duration-400`}
                      >
                        {tags[0].attributes.name}
                      </Link>
                    </div>
                  )}
                  {/* <p className="text-[#989898]">Pro Editing for everyone</p> */}
                </div>
              </div>
              <div className="flex hidden xs:flex md:flex lg:hidden xl:flex flex-col justify-center">
                <button className="px-4 py-1 text-sm bg-transparent border  border-blue-600 group-hover:bg-blue-700 hover:bg-blue-700 group-hover:text-white hover:text-white transition transition-all duration-400 text-blue-600 rounded-full">
                  Get
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ToolCard;
