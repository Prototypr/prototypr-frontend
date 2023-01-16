import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const ToolCardSimple = ({ posts, type, columns }) => {
  return (
    <div className={`grid grid-cols-1 ${columns?columns:'lg:grid-cols-3'} gap-6 w-full flex-wrap`}>
      {posts.map((post, i) => {
        let title, slug, coverImage, tags;


        if (type === "toolboxContentPage") {
          title = post.title;
          slug = post.slug;
          tags = post.tags.data.slice(0, 2);

          coverImage =   
          post.featuredImage?.data?.attributes?.url
            ? post.featuredImage.data.attributes.url
            : post.legacyFeaturedImage
            ? post.legacyFeaturedImage
            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
            
            coverImage = (post?.legacyMedia?.logoNew || coverImage?.logoNew || post.legacyMedia?.mediaItemUrl)
            
        } else {
          title = post?.attributes?.title;
          slug = post.attributes?.slug;
          tags = post?.attributes?.tags?.data.slice(0, 2);

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
            coverImage = (post?.attributes?.legacyMedia?.logoNew || coverImage?.logoNew || post.attributes?.legacyMedia?.mediaItemUrl)

          }

        return (
            <Link href={`/toolbox/${slug}`}>
            <div
            key={slug}
            className="w-auto group h-full flex md:flex-row justify-between gap-6 p-3 bg-white rounded-2xl border border-black border-opacity-10"
          >
            <div className="flex justify-center sm:flex-row gap-4">
              {coverImage ? (
                <div
                  className=" relative rounded-2xl overflow-hidden "
                  style={{ height: "60px", width: "60px",
                 flex: `0 0 60px`
                }}
                >
                  <Image
                    loader={gumletLoader}
                    priority={false < 2 ? `true` : `false`}
                    data-priority={false < 2 ? `true` : `false`}
                    fetchpriority={false < 2 ? "true" : "false"}
                    data-gmlazy={false < 2 ? `false` : `true`}
                    fill={true}
                    // width="100"
                    // height="100"
                    alt="Brand logo for external website's link"
                    className="border object-cover rounded-2xl bg-white"
                    src={coverImage}
                  />
                </div>
              ) : (
                <div
                  className="p-1 rounded-2xl overflow-hidden bg-gray-50"
                  style={{ height: "75px", width: "75px" }}
                ></div>
              )}

              <div className="flex flex-col justify-center gap-1">
                <p className="font-semibold line-clamp-1">{title}</p>
                {tags && (
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(0,1).map((x) => {
                      return (
                        <span className="text-xs text-gray-500 capitalize">
                          {x.attributes.name}
                        </span>
                      );
                    })}
                  </div>
                )}
                {/* <p className="text-[#989898]">Pro Editing for everyone</p> */}
              </div>
            </div>
            {/* <div className="hidden md:flex flex-col justify-center">
                <button className="px-4 py-1 text-sm bg-transparent border  border-blue-600 group-hover:bg-blue-700 hover:bg-blue-700 group-hover:text-white hover:text-white text-blue-600 rounded-full">
                  Get
                </button>
            </div> */}
          </div>
            </Link>
        );
      })}
    </div>
  );
};

export default ToolCardSimple