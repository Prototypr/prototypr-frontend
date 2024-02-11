import Link from "next/link";
import { usePlausible } from "next-plausible";

import Image from "next/image";
const {
  default: gumletLoader,
} = require("@/components/new-index/gumletLoader");

const ToolIconCard = ({ tool, withBackground, small }) => {
  const { slug, title, tags } = tool;

  const plausible = usePlausible();


  let coverImage =   
  // tool.legacyMedia?.logoNew?tool.legacyMedia?.logoNew:
  // tool.legacyMedia?.mediaItemUrl?tool.legacyMedia?.mediaItemUrl:
  // tool.legacyMedia?.imgUrl?tool.legacyMedia?.imgUrl:
  tool.featuredImage?.data?.attributes?.url
    ? tool.featuredImage.data.attributes.url
    : tool.legacyFeaturedImage
    ? tool.legacyFeaturedImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
    
    coverImage = (tool?.legacyMedia?.logoNew || coverImage?.logoNew || tool.legacyMedia?.mediaItemUrl ||tool.legacyFeaturedImage?.mediaItemUrl)
    
  return (
    <div>
      <Link
        href={`/toolbox/${slug}`}
        onClick={() => {
          plausible("toolIconCard", {
            props: {
              location: "discoverSection",
              page: "home",
            },
          });
        }}
        className="flex"
      ><div className={`${withBackground?' bg-white p-3 shadow-sm':''} border border-gray-200/70 border-1 w-full h-auto rounded-2xl cursor-pointer flex flex-col`}>
          <div className="flex flex-row rounded-xl">
            <div
              style={{ flex: `0 0 ${small?'3em':'56px'}` }}
              className={`${small?'h-12 w-12':'w-[56px] h-[56px]'} mr-2 relative rounded-xl overflow-hidden`}
            >
              {coverImage ? (
                <Image
                  tabIndex={0}
                  loader={gumletLoader}
                  layout="fill"
                  objectFit="cover"
                  src={coverImage}
                  className="object-cover drop-shadow-sm"
                  alt="Author profile picture"
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col pl-1 justify-center">
              <div className=" overflow-hidden line-clamp-1 inline font-semibold py-0 mb-0 font-inter text-base">
                {title}
                {/* <span className="text-xs ml-2 capitalize bg-gray-100 font-inter px-2 text-blue-800 py-0.5 border border-black border-opacity-5 text-black rounded-full">
                  Promoted
                </span> */}
              </div>
              {tags?.data?.length ? (
                // <Link href={`/toolbox/${tags?.data[0]?.attributes?.slug}`}>
                  <div className="flex flex-row text-sm text-gray-500">
                    {/* <span className="text-xs mt-1 capitalize bg-gray-100 font-inter px-2 py-0.5 border border-black border-opacity-5 text-black rounded-full"> */}
                    <span className="text-xs capitalize text-gray-500">
                      {tags?.data[0]?.attributes?.name}
                    </span>
                    {/* </span> */}
                  </div>
                // </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ToolIconCard;
