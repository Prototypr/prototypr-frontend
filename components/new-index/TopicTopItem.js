import Author from "./Author";
import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

export default function TopicTopItem({ topic = {} }) {
  const {
    title = "",
    excerpt,
    slug,
    tags,
    legacyFeaturedImage = null,
    featuredImage = null,
    author = null,
  } = topic?.attributes ? topic.attributes : topic;
  const tagArr = tags?.data;

  const avatar = author?.data?.attributes?.avatar?.data?.attributes?.url
    ? author.data.attributes.avatar.data.attributes.url
    : author?.data?.attributes?.legacyAvatar
    ? author.data.attributes.legacyAvatar
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  return (
    <Link href={`/post/${slug}`} legacyBehavior>
      <div className="grid-cols-1 rounded-lg bg-white p-6 flex flex-col sm:flex-row cursor-pointer group">
        <figure className="relative w-full sm:w-1/2 h-64 mb-3 sm:mb-0 mr-6 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
          <div className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out">
            {legacyFeaturedImage?.mediaItemUrl ? (
              <Image
                loader={gumletLoader}
                objectFit="cover"
                className="rounded-lg contrast-115"
                layout="fill"
                src={legacyFeaturedImage?.mediaItemUrl}
              />
            ) : (
              featuredImage?.data?.attributes?.url && (
                <Link href={`/post/${slug}`} legacyBehavior>
                  <Image
                    loader={gumletLoader}
                    objectFit="cover"
                    className="rounded-lg contrast-115"
                    layout="fill"
                    src={featuredImage?.data?.attributes?.url}
                  />
                </Link>
              )
            )}
          </div>
        </figure>

        <div className="flex flex-col flex-1">
          <div className="flex">
            <div className="font-base hover:cursor-pointer hover:text-primary-700 hover:transition-all text-xs leading-none tracking-wide uppercase text-primary-400 mr-2 font-semibold tracking-[.05em]">
              {tagArr && tagArr.length ? tagArr[0].attributes.name : "design"}
            </div>
            {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#data</div> */}
          </div>
          <h4 className="text-2xl lg:text-4xl font-semibold mb-4 mt-4 max-w-md">
            {slug && (
              <Link href={`/post/${slug}`} legacyBehavior>
                <span className="font-noto-serif hover:text-gray-900 transition duration-150 ease-in-out">
                  {title}
                </span>
              </Link>
            )}
          </h4>
          <div
            className="mt-3 text-gray-3 font-normal text-base leading-normal overflow-hidden text-ellipsis clamp-2"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></div>
          <div className="flex items-center mt-5">
            <Author
              avatar={avatar}
              authorName={author?.data?.attributes?.name}
              author={author}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
