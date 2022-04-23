import Author from "./Author";
import Image from "next/image";
import Link from "next/link";
import { useIntl } from "react-intl";
export default function TopicTopItem({ topic = {} }) {
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
  return (
    <div className="grid-cols-1 bg-white p-6 flex flex-col sm:flex-row cursor-pointer group">
      <figure className="relative w-full sm:w-1/2 h-64 mb-3 sm:mb-0 mr-6 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
        <div className="absolute  w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
          {legacyFeaturedImage?.mediaItemUrl ? (
            <Link href={`/post/${slug}`}>
              <Image
                objectFit="cover"
                className="rounded-lg contrast-115"
                layout="fill"
                src={legacyFeaturedImage?.mediaItemUrl}
              />
            </Link>
          ):featuredImage?.data?.attributes?.url &&
          <Link href={`/post/${slug}`}>
              <Image
                objectFit="cover"
                className="rounded-lg contrast-115"
                layout="fill"
                src={featuredImage?.data?.attributes?.url}
              />
            </Link>
          }
        </div>
      </figure>

      <div className="flex flex-col flex-1">
        <div className="flex">
          <div className="font-base text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">
            # {tagArr && tagArr.length ? tagArr[0].attributes.name : "design"}
          </div>
          {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#data</div> */}
        </div>
        <h4 className="text-black-1 font-semibold text-lg leading-normal mt-2">
          {slug && (
            <Link href={`/post/${slug}`}>
              <a className="group-hover:underline">{title}</a>
            </Link>
          )}
        </h4>
        <div
          className="mt-3 text-gray-3 font-normal text-base leading-normal overflow-hidden text-ellipsis clamp-2"
          dangerouslySetInnerHTML={{ __html: excerpt}}
        ></div>
        <div className="flex items-center mt-5">
          <Author
            avatar={author?.data?.attributes?.avatar}
            authorName={author?.data?.attributes?.name}
            author={author}
          />
        </div>
      </div>
    </div>
  );
}
