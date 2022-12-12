import Image from "next/image";
import Link from "next/link";
import { useIntl } from "react-intl";
import gumletLoader from "@/components/new-index/gumletLoader";

export default function ProductItem({ post = {} }) {
  const intl = useIntl();
  const locale = intl.locale ? intl.locale : "en-US";
  const {
    title = "",
    excerpt,
    slug,
    date,
    tags,
    legacyFeaturedImage = null,
    featuredImage = null,
    author = null,
  } = post?.attributes ? post.attributes : post;
  const tagArr = tags?.data ? tags.data : [];

  const authorImage = author?.data?.attributes?.avatar?.data?.attributes?.url
    ? author.data.attributes.avatar.data.attributes.url
    : author?.data?.attributes?.legacyAvatar
    ? author.data.attributes.legacyAvatar
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  const ftImage = featuredImage?.data?.attributes?.url
    ? featuredImage.data.attributes.url
    : legacyFeaturedImage?.mediaItemUrl
    ? legacyFeaturedImage?.mediaItemUrl
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  const tagName =
    tagArr && tagArr.length ? tagArr[0].attributes.name : "design";
  const tagSlug = tagArr && tagArr.length ? tagArr[0].attributes.slug : "";
  return (
    <div className="grid-cols-1 flex items-top p-4 group hover:bg-white hover:shadow-sm hover:rounded-lg hover:transition duration-300 ease-in-out">
      <div className="flex-1 ml-0 h-full">
        <Link href={`/posts/${tagSlug}`}>
          <div className="font-base hover:cursor-pointer hover:text-primary-700 hover:transition-all text-xs leading-none tracking-wide uppercase text-primary-400 mr-1 font-semibold tracking-[.05em]">
            {tagName}
          </div>
        </Link>
        <h4 className="font-semibold text-lg sm:text-xl leading-6 text-gray-1 pr-7 mt-4">
          <Link href={`/post/${slug}`}>
            <span className="font-noto-serif">{title}</span>
          </Link>
        </h4>
        <div className="mt-4 flex items-center">
          <div className="w-8 h-8 cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-sm rounded-full relative">
            {authorImage && (
              <Link href={`/people/${author?.data?.attributes?.slug}`}>
                <Image
                  loader={gumletLoader}
                  src={authorImage}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </Link>
            )}
          </div>
          <div className="font-normal text-base ml-3 text-neutral-700 leading-5">
            {author?.data?.attributes && (
              <Link
                href={`/people/${author?.data?.attributes?.slug}`}
                className="hover:underline hover:text-gray-800"
              >
                <p>
                  {`${
                    author?.data?.attributes?.firstName
                      ? author?.data?.attributes?.firstName
                      : ""
                  } `}
                  {`${
                    author?.data?.attributes?.lastName
                      ? author?.data?.attributes?.lastName
                      : ""
                  }`}
                  {`${
                    !author?.data?.attributes?.firstName &&
                    !author?.data?.attributes?.lastName
                      ? author?.data?.attributes?.name
                      : ""
                  }`}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
      <figure
        //   style={{ width: 162, height: 124 }}
        className="relative w-[105px] h-[80px] sm:w-[162px] sm:h-[124px] overflow-hidden rounded-lg transform group-hover:translate-x-0  group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden"
      >
        <div className="absolute  w-full h-full rounded-lg transform border cursor-pointer">
          <Link
            href={`/post/${slug}`}
            className="hover:underline hover:text-gray-800"
          >
            <Image
              loader={gumletLoader}
              objectFit="cover"
              width={162}
              height={124}
              className="rounded-lg contrast-115 object-cover w-[100px] h-[75px] sm:w-[162px] sm:h-[124px]"
              // layout="fill"
              src={ftImage}
            />
          </Link>
        </div>
      </figure>
    </div>
  );
}
