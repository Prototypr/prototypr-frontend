import Link from "next/link";
import Image from "next/image";

export default function NewsList({
  posts,
  title = "More posts",
  type = "toolbox",
}) {
  return (
    <div className="hidden md:block bg-white rounded-lg mt-6 p-6 lg:mb-16">
      <h1 className="text-sm font-semibold font-inter-serif mb-3">{title}</h1>

      {posts.map((post, index) => {
        post = post.attributes;
        const img = post?.legacyFeaturedImage?.logoNew
          ? post.legacyFeaturedImage.logoNew
          : post?.legacyFeaturedImage?.mediaItemUrl
            ? post.legacyFeaturedImage.mediaItemUrl
            : post?.featuredImage?.data?.attributes?.url
              ? post?.featuredImage?.data?.attributes?.url
              : "https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png";

        return (
          <div key={`related_post_${index}`}>
            <div
              className="flex h-full relative mb-3 md:mb-0 border-b border-gray-50 cursor-pointer"
              key={`relatedPost_${index}`}
            >
              <div className="rounded-lg relative flex md:my-4 h-16 w-16 md:h-16 flex-none">
                {img && (
                  <Link href={`/${type}/${post.slug}`}>
                    <Image
                      objectFit="cover"
                      width={66}
                      height={66}
                      alt={post.title}
                      src={img}
                      className="cardImage cursor-pointer flex-shrink-0 shine h-16 w-16 md:h-16 rounded-md border border-gray-100"
                    />
                  </Link>
                )}
              </div>

              <div className=" sm:w-auto pl-3 py-4 md:pl-3">
                <div
                  className="cursor-pointer text-sm text-gray-800 leading-tight"
                  style={{ overflow: "hidden" }}
                >
                  <Link href={`/${type}/${post.slug}`}>{post.title}</Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
