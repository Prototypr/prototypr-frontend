import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import Link from "next/link";
import Button from "@/components/Primitives/Button"
import { CircleWavyQuestion } from "../icons";
const HeroCard = ({logo, post, tags, featuredImage}) =>{
    return(
        <div
        className={`col-span-12 border border-1 border-[#dadee5] shadow-sm h-full rounded-2xl mx-auto relative overflow-hidden p-2 leading-tight w-full`}
      >
        <Image
          className="bg-gray-700 rounded-2xl object-cover"
          layout="fill"
          objectFit="cover"
          src={featuredImage}
        />
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-gray-900/0 to-black left-0 rounded-2xl z-0" />
        <div className="relative w-full max-w-[1320px] mx-auto h-full flex flex-col-reverse justify-between">
          {/* <div style={{pointerEvents:'none'}} className="bg-black pointer-none opacity-[20%] w-full h-full absolute left-0 top-0"/> */}
          <div className="w-full z-10 grid grid-cols-3 gap-16 flex pt-0 md:pt-6 p-6 justify-between ">
            <div className="flex order-2 md:order-1 col-span-3 md:col-span-2 w-full flex-col justify-between">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                  <div className="flex max-w-[94%] flex-col">
                    <div className="mr-4 mb-3 flex-none w-[74px] h-[74px] md:w-[88px] md:h-[88px] my-auto shadow-sm rounded-2xl p-[3px] bg-white border border-gray-300">
                      <Image
                        loader={gumletLoader}
                        priority={false < 2 ? `true` : `false`}
                        data-priority={false < 2 ? `true` : `false`}
                        fetchpriority={false < 2 ? "true" : "false"}
                        data-gmlazy={false < 2 ? `false` : `true`}
                        width="100"
                        height="100"
                        alt="Brand logo for external website's link"
                        className="rounded-2xl h-full w-full object-cover bg-white"
                        src={logo}
                      />
                    </div>
                    <div className="flex flex-col text-white justify-center">
                      <h1 className="text-5xl line-clamp-2 mb-0 tracking-tight font-semibold drop-shadow-lg text-white">
                        {post?.attributes?.title}
                      </h1>
                      {post?.attributes?.excerpt ? (
                        <p className="text-base line-clamp-2 text-white mt-2 max-w-[800px]">
                          {post?.attributes?.excerpt}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex md:hidden mt-4 flex-none">
                      <div className="flex justify-end">
                        <a
                          target={"_blank"}
                          href={
                            post?.attributes?.link + "?ref=prototypr.io"
                          }
                        >
                          <Button
                            className="rounded-full text-base bg-blue-600 font-medium text-white px-6 py-2 h-[28px] leading-none"
                            variant={"confirmBig"}
                          >
                            Visit site
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex order-1 md:order-2 col-span-3 md:col-span-1 flex-col justify-end">
              <div className="flex text-base text-white">
               <CircleWavyQuestion className={'mr-1.5'}/>
                <div className="mb-4">
                  <div className="inline">
                    Is this yours?{" "}
                    <Link
                      className="underline"
                      href={`/toolbox/post/${post.id}/claim`}
                    >
                      Claim this page
                    </Link>
                    .
                  </div>
                </div>
              </div>
              {/* hide on mobile */}
              <div className="hidden md:flex flex-none">
                <div className="flex justify-end">
                  <a
                    target={"_blank"}
                    href={post?.attributes?.link + "?ref=prototypr.io"}
                  >
                    <Button
                      className="rounded-full text-base bg-blue-600 font-medium text-white px-6 py-2 h-[28px] leading-none"
                      variant={"confirmBig"}
                    >
                      Visit site
                    </Button>
                    {/* <Button
                      className="rounded-full uppercase text-xs bg-blue-600 font-medium text-white px-6 py-0.5 h-[28px] leading-none"
                      variant={"confirmBig"}
                    >
                      Get
                    </Button> */}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 pt-3 text-white flex flex-col-reverse">
            <div className="flex flex-row flex-wrap gap-2">
              {tags.map((tag, i) => {
                if (i < 4) {
                  return (
                    <Link
                      href={`/toolbox/${tag.attributes.slug}/page/1/`}
                    >
                      <button
                        className={`px-3 h-6 text-sm capitalize rounded-full border border-opacity-50 border-white bg-black/40 backdrop-blur-md`}
                      >
                        {tag.attributes.name}
                      </button>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    )
}

export default HeroCard;