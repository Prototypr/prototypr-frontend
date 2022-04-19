import Image from "next/image";
import Link from "next/link";
export default function ProductItem({ post = {} }) {
  const {
    title = "",
    excerpt,
    slug,
    date,
    tags,
    legacyFeaturedImage = null,
    author = null,
  } = post;
  const tagArr = tags.data;
  return (
    <div className="grid-cols-1 flex items-top py-2 group">
      <figure className="relative h-0 w-36 h-36 sm:w-40 sm:h-40 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
        <div className="absolute  w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
          <Link href={`/post/${slug}`}>
            <Image
              objectFit="cover"
              className="rounded-lg contrast-115"
              layout="fill"
              src={legacyFeaturedImage?.mediaItemUrl}
            />
          </Link>
        </div>
      </figure>
      <div className="flex-1 ml-4 h-full">
        <div className="flex">
          <div className="font-base text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
            # {tagArr && tagArr.length ? tagArr[0].attributes.name : "design"}
          </div>
          {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
            # product design
          </div> */}
        </div>
        <h4 className="font-semibold text-lg leading-7 text-gray-1 md:w-2/3">
          <Link href={`/post/${slug}`}>
            <a className="group-hover:underline">{title}</a>
          </Link>
        </h4>
        <div className="mt-3 flex items-center">
          <div className="w-9 h-9 cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-sm rounded-full relative">
            {author?.data?.attributes?.avatar && (
              <Link href={`people/${author?.data?.attributes?.slug}`}>
                <Image
                  src={author?.data?.attributes?.avatar}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </Link>
            )}
          </div>
          <div className="font-normal text-base ml-3 text-gray-600">
            <Link href={`people/${author?.data?.attributes?.slug}`}>
              <a className="hover:underline hover:text-gray-800">
                {author?.data?.attributes?.name}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
