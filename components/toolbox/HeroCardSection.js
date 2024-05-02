import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import Link from "next/link";
import Button from "@/components/Primitives/Button"

/**
 * HeroCardSection
 * this one is rounded at the top only
 * so it connects with the next card
 * 
 * also has no border/shadow and no button
 * @param {*} param0 
 * @returns 
 */
const HeroCardSection = ({logo, post, tags, featuredImage}) =>{
    return(
        <div
        // className={`col-span-12 border border-1 border-[#dadee5] shadow-sm h-full rounded-2xl mx-auto relative overflow-hidden p-2 leading-tight w-full`}
        className={`relative col-span-12 h-full mx-auto relative overflow-hidden p-2 leading-tight w-full`}
      >
        <Image
          className="bg-gray-700 object-cover absolute top-0 left-0 w-full h-full z-0"
          // layout="fill"
          width={400}
          height={400}
          objectFit="cover"
          loading="eager"
          priority={true}
          loader={gumletLoader}
          key={featuredImage}
          src={featuredImage}
        />
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-gray-900/0 via-black/60 to-black left-0 rounded-t-2xl z-0" />
        <div className="relative w-full max-w-[1320px] mx-auto h-full flex flex-col-reverse justify-between">
          {/* <div style={{pointerEvents:'none'}} className="bg-black pointer-none opacity-[20%] w-full h-full absolute left-0 top-0"/> */}
          <div className="w-full z-10 grid grid-cols-12 lg:gap-8 flex pt-0 md:pt-6 p-6 lg:pb-16 justify-between ">
            <div className="flex order-2 md:order-1 col-span-12 lg:col-span-9 w-full flex-col justify-between">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="mr-4 mb-3 flex-none w-[74px] h-[74px] md:w-[88px] md:h-[88px] my-auto shadow-sm rounded-2xl p-[3px] bg-white border border-gray-300">
                      <Image
                        key={logo}
                        loader={gumletLoader}
                        // priority={true}
                        // data-priority={true}
                        // fetchpriority={true}
                        data-gmlazy={false}
                        width="100"
                        height="100"
                        alt="Brand logo for external website's link"
                        className="rounded-xl h-full w-full object-cover bg-white"
                        src={logo}
                      />
                    </div>
                    <div className="flex flex-col text-white justify-center">
                      <h1 className="text-5xl line-clamp-2 mb-0 tracking-tight font-semibold drop-shadow-lg text-white">
                        {post?.attributes?.title}
                      </h1>
                      {post?.attributes?.excerpt ? (
                        <p className="text-base line-clamp-3 text-white mt-2">
                          {post?.attributes?.excerpt}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex lg:hidden mt-4 flex-none">
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

            <div className="order-1 hidden lg:flex md:order-2 col-span-3 flex-col justify-end">
              <div className="flex text-xs text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180Zm28-72c0,17.38-13.76,31.93-32,35.28V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36S168,88.15,168,108Z"></path>
                </svg>
                  <div className="inline-block my-auto">
                    Is it yours?{" "}
                    <Link
                      className="underline"
                      href={`/toolbox/post/${post.id}/claim`}
                    >
                      Claim page
                    </Link>
                    .
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
                      className="rounded-full text-xs uppercase bg-blue-600 font-medium text-white px-5 py-0.5 h-[28px] leading-none"
                      variant={"confirmBig"}
                    >
                      Get
                    </Button>
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

export default HeroCardSection;