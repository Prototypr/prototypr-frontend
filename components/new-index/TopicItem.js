import Author from "./Author";
import Image from "next/image";
import Link from "next/link";
import { useIntl } from "react-intl";
import gumletLoader from "@/components/new-index/gumletLoader";

export default function TopicItem({ topic = {} }) {
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
  } = topic?.attributes;
  const tagArr = tags.data;
  const ftImage = featuredImage?.data?.attributes?.url
    ? featuredImage.data.attributes.url
    : legacyFeaturedImage?.mediaItemUrl
    ? legacyFeaturedImage?.mediaItemUrl
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  return (
    <Link href={`/post/${slug}`}>
      <div className="grid-cols-1 p-3 flex cursor-pointer group">
        <figure className="relative h-0 mr-1 sm:mr-0 w-28 h-28 sm:w-40 sm:h-40 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
          <div className="absolute  w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
            <Image
              loader={gumletLoader}
              objectFit="cover"
              className="rounded-lg contrast-115"
              layout="fill"
              src={ftImage}
            />
          </div>
        </figure>
        <div className="flex flex-col flex-1 ml-4">
          <div className="flex">
            <div className="font-normal text-xs sm:text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">
              # {tagArr && tagArr.length ? tagArr[0].attributes.slug : "design"}
            </div>
            {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2"># product design</div> */}
          </div>
          <h4 className="text-black-1 font-semibold text-lg leading-normal mt-2">
            <Link href={`/post/${slug}`}>
              <a className="font-noto-serif">{title}</a>
            </Link>
          </h4>
          <div className="flex items-center mt-4">
            <Author
              avatar={
                author?.data?.attributes?.avatar?.data?.attributes?.url
                  ? author.data.attributes.avatar.data.attributes.url
                  : author?.data?.attributes?.legacyAvatar
                  ? author.data.attributes.legacyAvatar
                  : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
              }
              authorName={author?.data?.attributes?.name}
              author={author}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
