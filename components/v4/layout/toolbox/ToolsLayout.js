import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const ToolsLayout = ({ posts, type }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 py-6 gap-6 w-full flex-wrap">
      {posts.map((post, i) => {
        let title, slug, coverImage, tags;

        if (type === "toolboxContentPage") {
          title = post.title;
          slug = post.slug;
          tags = post.tags.data.slice(0, 2);

          coverImage = post.featuredImage?.data?.attributes?.url
            ? post.featuredImage.data.attributes.url
            : post.legacyFeaturedImage
            ? post.legacyFeaturedImage
            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

          coverImage =
            post?.legacyMedia?.logoNew ||
            coverImage?.logoNew ||
            post.legacyMedia?.mediaItemUrl;
        } else {
          title = post?.attributes?.title;
          slug = post.attributes?.slug;
          tags = post?.attributes?.tags?.data.slice(0, 2);
          coverImage = post.attributes?.featuredImage?.data?.attributes?.url
            ? post.attributes.featuredImage.data.attributes.url
            : post.attributes?.legacyFeaturedImage
            ? post.attributes?.legacyFeaturedImage
            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
          coverImage =
            post?.attributes?.legacyMedia?.logoNew ||
            coverImage?.logoNew ||
            post.legacyMedia?.mediaItemUrl;
        }

        return (
          <div
            key={slug}
            className="w-auto flex flex-col md:flex-row justify-between gap-6 p-5 bg-white rounded-2xl border border-black border-opacity-10"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {coverImage ? (
                <div
                  className="p-1 rounded-2xl overflow-hidden bg-gray-50"
                  style={{ height: "75px", width: "75px" }}
                >
                  <Image
                    loader={gumletLoader}
                    priority={false < 2 ? `true` : `false`}
                    data-priority={false < 2 ? `true` : `false`}
                    fetchpriority={false < 2 ? "true" : "false"}
                    data-gmlazy={false < 2 ? `false` : `true`}
                    width="100"
                    height="100"
                    alt="Brand logo for external website's link"
                    className=" border rounded-2xl bg-white"
                    src={coverImage}
                  />
                </div>
              ) : (
                <div
                  className="p-1 rounded-2xl overflow-hidden bg-gray-50"
                  style={{ height: "75px", width: "75px" }}
                ></div>
              )}

              <div className="flex flex-col gap-1">
                <p className="font-semibold line-clamp-3">{title}</p>
                {tags && (
                  <div className="flex flex-row gap-1">
                    {tags.map((x) => {
                      return (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                          {x.attributes.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div>
              <Link href={`/toolbox/${slug}`}>
                <button className="px-8 py-2 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  Get
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToolsLayout;
