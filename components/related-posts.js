import Link from "next/link";
import Image from "next/image";

export default function RelatedPosts({ relatedPosts, title="More posts", type='toolbox' }) {
  return (
    <div className="hidden md:block bg-white rounded-lg mt-6 p-6 lg:mb-16">
      <h1 className="text-sm font-semibold mb-3">{title}</h1>
      {relatedPosts.map((post, index) => 
        <div key={`related_post_${index}`}>
          <Link href={`/${type}/${post.slug}`}>
          <div
            className="flex h-full relative mb-3 md:mb-0 border-b border-gray-50 cursor-pointer"
            key={`relatedPost_${index}`}
          >
            <div className="rounded-lg relative flex md:my-4 h-16 w-16 md:h-16 flex-none">
              {post?.legacyFeaturedImage?.logoNew &&
              <Image
                objectFit="cover"
                width={66}
                height={66}
                alt={post.title}
                src={post?.legacyFeaturedImage?.logoNew}
                className="cardImage flex-shrink-0 shine h-16 w-16 md:h-16 rounded-md border border-gray-100"
              />}
            </div>

            <div className=" sm:w-auto pl-3 py-4 md:pl-3">
                  <div
                      className="cursor-pointer text-sm text-gray-800 leading-tight"
                      style={{ overflow: "hidden" }}
                  >
                    {post.title}
                  </div>
            </div>
          </div>
          </Link>
        </div>
      )}
    </div>
  );
}
