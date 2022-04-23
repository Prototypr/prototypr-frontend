import Image from "next/image";
import Link from "next/link";
import { useIntl } from 'react-intl';
export default function AspiringItem({ post = {} }) {
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
  } = post?.attributes;
  return (
    <div className="grid-cols-1 cursor-pointer group">
      <figure className="relative w-full h-64 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
        <div className="absolute  w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
          <Link href={`/post/${slug}`}>
            <Image
              objectFit="cover"
              className="rounded-lg contrast-115"
              layout="fill"
              src={featuredImage?.data?.attributes?.url ? featuredImage.data.attributes.url:legacyFeaturedImage?.mediaItemUrl?legacyFeaturedImage?.mediaItemUrl:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}
            />
          </Link>
        </div>
      </figure>

      <div className="font-base text-sm hover:underline leading-6 tracking-wide uppercase text-gray-3 mt-2">
      <Link className="hover:underline" href={`/people/${author?.data?.attributes?.slug}/page/1`}>
        <a>{author?.data?.attributes?.name}</a>
      </Link>
      </div>
      <h4 className="text-black-1 font-semibold text-lg leading-normal mt-1">
        <Link href={`/post/${slug}`}>
          <a className="group-hover:underline">{title}</a>
        </Link>
      </h4>

      <p
        className="text-gray-3 text-base leading-normal font-normal overflow-hidden text-ellipsis clamp-3 mt-2"
        dangerouslySetInnerHTML={{ __html: excerpt  }}
      ></p>
    </div>
  );
}
