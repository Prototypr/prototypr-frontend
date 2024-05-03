import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import Link from "next/link";
import Button from "@/components/Primitives/Button";

/**
 * HeroCardSection
 * this one is rounded at the top only
 * so it connects with the next card
 *
 * also has no border/shadow and no button
 * @param {*} param0
 * @returns
 */
const HeroCardSection = ({ logo, post, tags, featuredImage, faviconUrl, domain, excerpt }) => {
  return (
    <div
      // className={`col-span-12 border border-1 border-[#dadee5] shadow-sm h-full rounded-2xl mx-auto relative overflow-hidden p-2 leading-tight w-full`}
      className={`col-span-12 h-full relative mx-auto relative overflow-hidden p-2 leading-tight w-full `}
    >
      <Image
        className="bg-gray-700 object-cover absolute top-0 left-0 w-full h-full z-0"
        // layout="fill"
        width={400}
        height={400}
        loader={gumletLoader}
        placeholder="blur"
        priority={true}
        objectFit="cover"
        key={featuredImage}
        src={featuredImage}
      />
      <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-gray-900/0 via-black/60 to-black left-0 rounded-t-2xl z-0" />
      <div className="relative w-full max-w-[1320px] min-h-[340px] mx-auto h-full flex flex-col-reverse justify-between">
        {/* <div style={{pointerEvents:'none'}} className="bg-black pointer-none opacity-[20%] w-full h-full absolute left-0 top-0"/> */}
        <div className="w-full z-10 grid grid-cols-12 lg:gap-8 flex pt-0 md:pt-6 p-6 lg:pb-6 justify-between ">
          <div className="flex order-2 md:order-1 col-span-12 lg:col-span-9 w-full flex-col justify-between">
            <div className="flex flex-col">
              <div className="flex flex-col text-white justify-center">
                <div>
                  {/* <div className="flex mb-3 mt-3">
                <div className="w-6 h-6 my-auto flex flex-col justify-center p-0.5 mr-1 bg-gray-50 border border-gray-100 rounded">
                  <img className="w-4 h-4 mx-auto my-auto" src={faviconUrl} />
                </div>
                <div className="text-xs my-auto leading-none font-medium uppercase">
                  {domain}
                </div>
              </div> */}
                  <div className="z-10 mb-3 flex w-[fit-content]">
                    <div className="my-auto flex rounded-full flex-col justify-center p-[1px] mr-0.5 bg-black/50">
                      <img
                        className="w-4 h-4 mx-auto my-auto rounded-full"
                        src={faviconUrl}
                      />
                    </div>
                    <div className="text-xs my-auto leading-none text-white/80 ml-1 font-medium uppercase">
                      {domain}
                    </div>
                  </div>
                
                  {/* </div> */}
                </div>
                <h1 className="text-5xl mb-0 tracking-tight font-semibold drop-shadow-lg text-white">
                  {post?.attributes?.title}
                </h1>
                {post?.attributes?.excerpt ? (
                  <p className="text-base line-clamp-4 text-white mt-2">
                    {post?.attributes?.excerpt}
                  </p>
                ) : null}
              </div>
              <div className="flex lg:hidden mt-4 flex-none">
                <div className="flex justify-end">
                  <a
                    target={"_blank"}
                    href={post?.attributes?.link + "?ref=prototypr.io"}
                  >
                    <Button
                      className="rounded-full text-sm bg-blue-600 font-medium uppercase text-white px-6 py-1 h-[28px] leading-none"
                      variant={"confirmBig"}
                    >
                      Read full story
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 hidden lg:flex md:order-2 col-span-3 flex-col justify-end">
            {/* hide on mobile */}
            <div className="hidden md:flex flex-none">
              <div className="flex justify-end">
                <a
                  target={"_blank"}
                  href={post?.attributes?.link + "?ref=prototypr.io"}
                >
                  <Button
                    className="rounded-full text-xs uppercase bg-blue-600 font-medium text-white px-5 py-0.5 h-[28px] leading-none"
                    variant={"confirmBig"}
                  >
                    Read full story
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-3 text-white flex flex-col-reverse">
          <div className="flex flex-row flex-wrap gap-2">
            {tags?.length
              ? tags.map((tag, i) => {
                  if (i < 4) {
                    return (
                    //   <Link href={`/news/${tag.attributes.slug}/page/1/`}>
                        <button
                          className={`px-3 h-6 cursor-default text-sm capitalize rounded-full border border-opacity-50 border-white bg-black/40 backdrop-blur-md`}
                        >
                          {tag.attributes.name}
                        </button>
                    //   </Link>
                    );
                  }
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCardSection;
