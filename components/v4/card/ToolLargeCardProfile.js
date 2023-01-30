import Link from "next/link";
import { usePlausible } from "next-plausible";

import Image from "next/image";
const {
  default: gumletLoader,
} = require("@/components/new-index/gumletLoader");

const ToolLargeCardProfile = ({ tool, withBackground, small, cardHeight, logoHeight }) => {
  const { slug, title, tags } = tool;

  const plausible = usePlausible();

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

const coverImage = tool.legacyFeaturedImage?.mediaItemUrl || tool.legacyFeaturedImage2?.mediaItemUrl
    
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
         <div className="flex hover:bg-white transition transition-all duration-300 p-1 rounded-2xl flex-row font-inter w-full max-w-[470px]">
      {coverImage ? (
        <div className="w-full shrink-0 h-[90px] max-w-[100px] xs:max-w-[195px] xs:h-[124px] relative rounded-2xl overflow-hidden border border-gray-100">
          <Image
            className="object-cover cursor-pointer"
            layout="fill"
            src={coverImage}
          />
        </div>
      ) : (
        ""
      )}
       <div className="shrink px-4 pr-5 flex flex-col justify-center">
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

        <Link href="/toolbox">
            <span className="text-xs inline-block mt-3 capitalize bg-pink-50 font-inter px-2 text-pink-600 py-0.5 border border-black border-opacity-5 rounded-full" style={{maxWidth:'fit-content'}}>
                Toolbox
            </span>
        </Link>
        <div className="flex text-xs mb-2">
         {tags?.length
          ? tags.slice(0, 1).map((tag, index) => {
              return (
                <SmallTag
                  key={index}
                  index={index}
                  link={`/posts/${tag.attributes?.slug}/page/1/`}
                >
                  {tag.attributes?.name}
                </SmallTag>
              );
            })
          : ""
        }
        </div>
      </div>
      </div>
      </Link>
    </div>
  );
};
export default ToolLargeCardProfile;
