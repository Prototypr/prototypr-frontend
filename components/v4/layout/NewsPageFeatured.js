import Button from "@/components/Primitives/Button";
import Link from "next/link";
import Image from "next/image";
import { LinkIcon } from "@/components/icons";
const NewsPageFeatured = ({
  post,
  domain,
  content,
  ogImage,
  faviconUrl,
  excerpt,
}) => {
  return (
    <div className="relative w-full max-w-[1320px] mx-auto flex flex-col justify-center">
      {/* <div className="md:border-l md:border-blue-200 md:pl-6"> */}
      <div className="w-full">
        <div className="relative grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12 bg-white p-6 rounded-2xl border border-gray-300/70 shadow-sm">
          <div className="lg:pl-20 z-10">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              {post?.attributes?.featuredImage?.data?.attributes?.url ? (
                <Image
                  alt=""
                  loading="lazy"
                  layout="responsive"
                  width={800}
                  height={800}
                  decoding="async"
                  data-nimg={1}
                  className="aspect-square rotate-3 shadow-sm w-full rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  src={post.attributes.featuredImage.data.attributes.url}
                  style={{ color: "transparent" }}
                />
              ) : (
                <img
                  alt=""
                  loading="lazy"
                  layout="responsive"
                  width={800}
                  height={800}
                  decoding="async"
                  data-nimg={1}
                  className="aspect-square rotate-3 shadow-sm w-full rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  src={ogImage}
                  style={{ color: "transparent" }}
                />
              )}
            </div>
          </div>
          <div className="lg:order-first flex flex-col justify-between">
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
                <div className="text-xs my-auto leading-none text-gray-500 ml-1 font-medium uppercase">
                  {domain}
                </div>
              </div>
              {/* <div className="flex flex-col justify-between "> */}
              <h1 className="text-4xl leading-tight font-bold tracking-tight text-zinc-800 sm:text-6xl dark:text-zinc-100">
                {post?.attributes?.title}
              </h1>
              <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                <div
                  className="text-base text-gray-500"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                ></div>
              </div>
              {/* </div> */}
            </div>
            {/* <div className="flex flex-col justify-center flex-none border-t border-gray-200 bg-gray-50/50 rounded-b-xl w-full absolute py-4 left-0 bottom-0 w-[calc(100%-2px)] ml-[1px]">
              <div className="flex flex-col justify-center relative">
                <a
                  target={"_blank"}
                  href={
                    (post?.attributes?.legacyAttributes?.link
                      ? post?.attributes?.legacyAttributes?.link
                      : post?.attributes?.link) + "?ref=prototypr"
                  }
                >
                  <Button
                    className="rounded-full ml-4 bg-blue-600 font-semibold text-white px-6 py-4 leading-none"
                    variant={"confirmBig"}
                  >
                    Read article
                  </Button>
                </a>
              </div>
            </div> */}
          </div>
          {content!==excerpt?<div className="col-span-2 border-t w-full border-gray-100 flex flex-col lg:flex-row lg:justify-between">
            {post?.attributes?.outgoingLinks?.length ? (
              <div className="flex flex-col justify-start pr-[40px] relative flex-none w-full lg:w-[300px]">
                  <h1
                    tabIndex={0}
                    className="text-base mb-0.5 mt-6 font-semibold tracking-tight"
                  >
                    References
                  </h1>
                  <p className="text-xs text-gray-500 mb-4">
                    Articles and links referenced in this post
                  </p>
                  {post.attributes.outgoingLinks?.length ? (
                    <div className=" mb-3 flex flex-col gap-4 pr-1">
                      {post.attributes.outgoingLinks.map((link, index) => {
                        const hostname = new URL(link.url).hostname;
                        return (
                          <a
                            href={`${link.url}?ref=prototypr`}
                            target="_blank"
                            className="text-sm"
                          >
                            <div className="z-10 mb-1.5 flex w-[fit-content]">
                              <div className="my-auto flex rounded-full flex-col justify-center p-[1px] mr-0.5 bg-black/50">
                                <img
                                  className="w-4 h-4 mx-auto my-auto rounded-full"
                                  src={`https://www.google.com/s2/favicons?domain=${hostname}`}
                                />
                              </div>
                              <div className="text-xs ml-0.5 text-gray-600 tracking-wide my-auto leading-none font-medium">
                                {link.siteName ? link.siteName : hostname}
                              </div>
                            </div>

                            <div key={index} className="flex  mb-2">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-gray-700 text-sm font-medium">
                                  {link.title
                                    ? link.title
                                    : link.text
                                      ? link.text
                                      : link.url}
                                </div>
                                {link?.description !==
                                (link.title || link.text) ? (
                                  <div className="text-gray-600 line-clamp-2 text-xs max-w-[240px]">
                                    {link.description}
                                  </div>
                                ) : null}
                                <div className="text-gray-400 text-xs max-w-[200px] truncate">
                                  {link.rootDomain ? link.rootDomain : link.url}
                                </div>
                                {link.imageUrl ? (
                                  <img
                                    src={link.imageUrl}
                                    className="w-[100px] h-[65px] mt-1 mb-1 object-cover rounded-md border border-gray-50 mr-2"
                                  />
                                ) : null
                                // <div className="h-7 w-7 bg-gray-100/80 border border-gray-100 rounded-md mr-2 flex flex-col justify-center">
                                //   <LinkIcon
                                //     className={"mx-auto text-gray-500/80 w-4 h-4"}
                                //   />
                                // </div>
                                }
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
              </div>
            ) : (
              ""
            )}
            <div
              className="text-lg order-first lg:order-last max-w-[48rem] mx-auto text-gray-800 blog-content news-content"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>:null}
        </div>
      </div>
    </div>
  );
};

export default NewsPageFeatured;
