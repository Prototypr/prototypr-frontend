import Link from "next/link";
import { usePlausible } from "next-plausible";

import Image from "next/image";
const {
  default: gumletLoader,
} = require("@/components/new-index/gumletLoader");

const ToolIconCard = ({ tool, withBackground, small, cardHeight, logoHeight }) => {
  const { slug, title, tags } = tool;

  const plausible = usePlausible();


  console.log(tool)
  let logo =   
  // tool.legacyMedia?.logoNew?tool.legacyMedia?.logoNew:
  // tool.legacyMedia?.mediaItemUrl?tool.legacyMedia?.mediaItemUrl:
  // tool.legacyMedia?.imgUrl?tool.legacyMedia?.imgUrl:
  tool.featuredImage?.data?.attributes?.url
    ? tool.featuredImage.data.attributes.url
    : tool.legacyFeaturedImage
    ? tool.legacyFeaturedImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
    
    logo = (tool?.legacyMedia?.logoNew || logo?.logoNew || tool.legacyMedia?.mediaItemUrl)

const coverImage = tool.legacyFeaturedImage?.mediaItemUrl
    
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
      >
        <div className={`${withBackground?'bg-[#EAE9F5] p-2':''} mt-3 md:mt-0 w-full h-auto rounded-xl cursor-pointer flex flex-col`}>
          <div className="flex">
            <div className="flex flex-col w-full">
                <div className={`overflow-hidden rounded-xl border border-black border-opacity-5 ${cardHeight?'mb-3':'mb-2'}`}>
                    <div className={`w-full relative ${cardHeight?cardHeight:'h-[180px] md:h-[134px]'} object-cover`}>
                    <Image
                        tabIndex={0}
                        loader={gumletLoader}
                        layout="fill"
                        objectFit="cover"
                        src={coverImage}
                        className="object-cover w-full h-full"
                        alt="Logo"
                        />
                    </div>
                </div>
                <div className="flex">
                    <div
                    style={{ flex: `0 0 ${small?'3em':logoHeight?'66px':'44px'}` }}
                    className={`${small?'h-12 w-12':logoHeight?logoHeight:'w-[44px] h-[44px]'} mr-2 relative border border-opacity-5 border-black bg-white rounded-xl overflow-hidden`}
                    >
                    {logo ? (
                        <Image
                        tabIndex={0}
                        loader={gumletLoader}
                        layout="fill"
                        objectFit="cover"
                        src={logo}
                        className="object-cover"
                        alt="Logo"
                        />
                    ) : (
                        ""
                    )}
                    </div>
                    <div className="flex flex-col pl-1 justify-center">
                    <div className=" overflow-hidden line-clamp-1 inline font-medium py-0 mb-0 font-inter text-base">
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
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ToolIconCard;
