import Image from "next/image";
import Link from "next/link";
import Avatar from "../../avatar/Avatar";
import MediumTag from "../../tag/MediumTag";
import gumletLoader from "@/components/new-index/gumletLoader";
import Moment from "react-moment";
const defaultBase64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABLCAQAAAA1k5H2AAAAi0lEQVR42u3SMQEAAAgDoC251a3gL2SgmfBYBRAA`;

// layouts: 1 is big image
// 2 is small image
const BigBackgroundCard = ({
  post,
  link,
  title,
  flip,
  excerpt,
  image,
  tags,
  date,
  avatar,
  author,
  layout,
  showDescription,
  imageDimensions,
  textDimensions,
}) => {

  return (
    // <div className="hover:bg-white transition transition-all duration-300 rounded-2xl p-1 flex flex-col sm:flex-row lg:flex-col  w-full max-w-[985px]">
    <div
      className={`bg-white h-full p-0 border border-gray-300/50 shadow-sm overflow-hidden group hover:shadow-lg hover:scale-[1.005] transition transition-all duration-300 rounded-2xl flex flex-col ${layout == 3 ? "" : `sm:flex-row ${flip?'sm:flex-row-reverse':''}`}  w-full `}
    >
      <div
        className={`${imageDimensions ? imageDimensions : layout == 2 ? "md:w-[45%] border-r md:h-[320px]" : layout == 3 ? "w-full md:h-[364px] border-b" : "md:w-3/5 border-r md:h-[440px]"} w-full relative ${!imageDimensions ? "h-[240px] sm:h-[224px]" : ""} overflow-hidden border-gray-200`}
      >
        <Link href={link ?? ""}>
          <Image
            placeholder="blur"
            blurDataURL={post?.attributes?.base64?post?.attributes?.base64:defaultBase64}
            loader={gumletLoader}
            className="object-cover cursor-pointer group-hover:scale-[1.03] transition transition-all duration-700"
            layout="fill"
            src={image}
            alt={title}
          />
        </Link>
      </div>
      <div
        className={`${textDimensions ? textDimensions : layout == 2 ? "md:w-[65%]" : layout == 3 ? "w-full" : "md:w-2/5"} ${layout == 3 ? "p-4" : "px-5 py-4"} w-full  flex flex-col justify-between`}
      >
        <div className="flex flex-col">
          {tags?.length ? (
            <div className={`flex text-xs mb-3`}>
              {tags.slice(0, 2).map((tag, index) => {
                return (
                  <MediumTag
                    key={index}
                    index={index}
                    link={`/posts/${tag.attributes?.slug}/page/1/`}
                  >
                    {tag.attributes?.name}
                  </MediumTag>
                );
              })}
            </div>
          ) : null}
          <Link href={link ?? ""}>
            <h2 className="text-xl tracking-tight sm:text-2xl mt-1 font-semibold line-clamp-4">
              {title}
            </h2>
          </Link>
          {showDescription !== false ? (
            <Link href={link ?? ""}>
              <div
                dangerouslySetInnerHTML={{ __html: excerpt }}
                className="mt-3 text-gray-500 line-clamp-6"
              />
            </Link>
          ) : null}
        </div>
        <div className="mt-3">
          {author !== false ? (
            <Avatar src={avatar} author={author} date={date} size="lg" />
          ) : (
            <p className={`line-clamp-1 text-gray-500`}>
              <Moment
                className={`text-xs text-gray-600 my-auto`}
                date={date}
                format="MMM Do YY"
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default BigBackgroundCard;
