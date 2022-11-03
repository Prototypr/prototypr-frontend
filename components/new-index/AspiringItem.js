import Image from "next/image";
import Link from "next/link";
// import { useIntl } from 'react-intl';
import gumletLoader from "./gumletLoader";

export default function AspiringItem({ post = {} }) {
  // const intl = useIntl();
  // const locale = intl.locale ? intl.locale : "en-US";
  const {
    title = "",
    excerpt,
    slug,
    legacyFeaturedImage = null,
    featuredImage = null,
    author = null,
  } = post?.attributes;
  const ftImage = featuredImage?.data?.attributes?.url
    ? featuredImage.data.attributes.url
    : legacyFeaturedImage?.mediaItemUrl
    ? legacyFeaturedImage?.mediaItemUrl
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  return (
    <Link href={`/post/${slug}`}>
      <div className="grid-cols-1 cursor-pointer group">
        <figure className="relative w-full h-64 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
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

        {/* <div className="font-base text-sm hover:underline leading-6 tracking-wide uppercase text-gray-500 mt-2">
          <Link
            className="hover:underline"
            href={`/people/${author?.data?.attributes?.slug}/page/1`}
          >
            <a>{author?.data?.attributes?.name}</a>
          </Link>
        </div> */}
        <h4 className="text-black-1 font-semibold text-lg leading-6 mt-4">
          <Link href={`/post/${slug}`}>
            <span className="font-noto-serif">{title}</span>
          </Link>
        </h4>
        <div className="font-base font-normal hover:underline hover:text-gray-800 text-base text-neutral-700 leading-5 mt-2">
          <Link
            className="hover:underline hover:text-gray-800"
            href={`/people/${author?.data?.attributes?.slug}/page/1`}
          >
            <span>{author?.data?.attributes?.name}</span>
          </Link>
        </div>

        <p
          className="text-neutral-800 text-base leading-normal font-normal overflow-hidden text-ellipsis clamp-3 mt-4"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        ></p>
      </div>
    </Link>
  );
}
