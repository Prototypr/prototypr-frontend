import Image from "next/image";
import Link from "next/link";
import Author from "@/components/new-index/Author";
export default function FeedItem({ height = 20, post = {}, index = 0 }) {
  const {
    title = "",
    excerpt,
    slug,
    date,
    tags,
    legacyFeaturedImage = null,
    featuredImage = null,
    author = null,
  } = post;
  const tagArr = tags.data;
  return (
    <div className="cursor-pointer py-6 px-1 inline-block w-full group">
      <figure
        className={`relative h-64 ${
          index % 2 == 0 ? "md:h-96" : "md:h-64"
        } w-full mb-3 sm:mb-0 mr-6 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden`}
      >
        <div className="absolute w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
          <Link href={`/post/${slug}`}>
            <Image
              objectFit="cover"
              className="rounded-lg contrast-115"
              layout="fill"
              src={featuredImage?.data?.attributes?.url ? featuredImage.data.attributes.url:legacyFeaturedImage?.mediaItemUrl?legacyFeaturedImage?.mediaItemUrl :"https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"}
            />
          </Link>
        </div>
      </figure>

      <div className="mt-3 flex">
        <div className="font-base text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">
          # {tagArr && tagArr.length ? tagArr[0].attributes.name : "design"}{" "}
        </div>
        {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#START up</div> */}
      </div>
      <h4 className="text-black-1 font-semibold text-lg leading-normal mt-2">
        <Link href={`/post/${slug}`}>
          <a className="group-hover:underline">{title}</a>
        </Link>
      </h4>
      <div className="mt-3">
        <Author textColor={"text-gray-500"} author={author} />
      </div>
    </div>
  );
}
