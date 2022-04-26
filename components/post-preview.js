import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Image from "next/image";
import Link from "next/link";
const gumletLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  type,
  index,
  tag = {},
}) {
  return (
    <div className="flex group flex-col py-4 flex-grow h-full border border-gray-100 hover:shadow-lg transition-shadow duration-500 bg-white relative rounded-lg">
      <div className="relative rounded-lg px-4 pb-4 cursor-pointer">
        <>
          <CoverImage imageHeight="h-60" slug={slug} title={title} url={coverImage} type={type} />
          <div className="absolute rounded-full bg-white bottom-0 left-7">
            {coverImage && coverImage.logoNew && (
              <div
                className="p-1 rounded-full border-gray-100 border bg-white -mt-4"
                style={{ height: "44px", width: "44px" }}
              >
                <Image
                  loader={gumletLoader}
                  priority={index==0?true:false}
                  data-priority={index==0?true:false}
                  data-gmlazy={index==0?false:true}
                  width="44"
                  height="44"
                  alt="Brand logo for external website's link"
                  className="object-cover flex-shrink-0 shine rounded-full border border-2 border-gray-200 bg-white"
                  src={coverImage.logoNew}
                />
              </div>
            )}
          </div>
        </>
      </div>

      <div className="px-4 py-1 flex justify-between">
        <div className="pl-3 overflow-hidden mt-1 cursor-pointer">
          <div className="font-semibold overflow-hidden heading mt-0 h-6">
            <Link href={`/${type ? type : "posts"}/${slug}`}>
              <a className="group-hover:underline">{title}</a>
            </Link>
          </div>
          <div className="text-xs text-gray-600 mt-0.5 uppercase">
            {tag && `# ${tag.attributes?.name}`}
          </div>
        </div>
      </div>
    </div>
  );
}
