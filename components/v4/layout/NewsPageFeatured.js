import HeroCardSection from "@/components/toolbox/HeroCardSectionNews";
import Link from "next/link";
import Button from "@/components/Primitives/Button";

const NewsPageFeatured = ({
  post,
  domain,
  content,
  ogImage,
  faviconUrl,
  excerpt,
  morePosts,
}) => {
  return (
    <div className="relative w-full max-w-[1320px] mx-auto flex flex-col justify-center">
      {/* <div className="md:border-l md:border-blue-200 md:pl-6"> */}
      <div
        className="w-full grid grid-cols-8 gap-4"
        style={{ gridAutoFlow: "dense" }}
      >
        <div className="col-span-8 order-first lg:order-last lg:col-span-8">
          <div className="relative bg-white overflow-hidden rounded-2xl border border-gray-300/70 shadow-sm">
            <HeroCardSection
              faviconUrl={faviconUrl}
              domain={domain}
              logo={null}
              post={post}
              excerpt={excerpt}
              tags={post.attributes.tags.data}
              featuredImage={
                post?.attributes?.featuredImage?.data?.attributes?.url
                  ? post?.attributes?.featuredImage?.data?.attributes?.url
                  : ogImage
              }
            />

            <div className="p-6 lg:p-8 pb-3 lg:pb-3">
              <div className="w-[48rem] max-w-full mb-8 text-gray-800 text-lg">{excerpt}</div>
              {post.attributes?.outgoingLinks?.length?<div className="col-span-8 lg:col-span-2 max-h-[1200px] relative">
                <h1
                  tabIndex={0}
                  className="text-xl mb-3 font-semibold tracking-tight"
                >
                  Explore links in this article
                </h1>
                {/* <p className="mb-2.5 text-sm text-gray-600">Referenced in this article</p> */}
                <div className="overflow-x-auto flex gap-4">
                  <div className="z-10 absolute p-4 z-10 -mr-8 hidden md:block pointer-events-none bottom-0 right-0 h-full w-32 bg-gradient-to-l from-[#fbfcff]" />

                  {post.attributes.outgoingLinks.map((link, index) => {
                    const hostname = new URL(link.url).hostname;
                    return (
                      <div className="overflow-hidden last:mr-10 hover:bg-gray-50 flex-none hover:shadow-md bg-white/80 border border-gray-300/50 shadow-sm rounded-2xl transition transition-all duration-700">
                        <a
                          href={`${link.url}?ref=prototypr`}
                          target="_blank"
                          className="text-sm"
                        >
                          <div className="flex h-full">
                            {link.imageUrl ? (
                              <div
                                style={{
                                  backgroundImage: `url(${link.imageUrl})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                }}
                                className="flex flex-col relative bg-gray-50 border-r border-gray-100/80 h-full w-[166px]"
                              >
                              </div>
                            ) : null}

                            <div className="p-3 h-full flex flex-col">
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

                              <div className="flex flex-col h-full justify-between">
                                <div>
                                  <div className="text-gray-700 max-w-[220px] line-clamp-2 text-base lg:text-md mb-2 leading-snug font-medium">
                                    {link.title
                                      ? link.title
                                      : link.text
                                        ? link.text
                                        : link.url}
                                  </div>
                                  {link?.description !==
                                  (link.title || link.text) ? (
                                    <div className="text-gray-600 mb-2 line-clamp-2 text-xs max-w-[240px]">
                                      {link.description}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="text-gray-500 text-xs max-w-[220px] truncate">
                                  {link.rootDomain ? link.rootDomain : link.url}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>:null}
            </div>

            {content !== excerpt ? (
              <div className="col-span-2 w-[48rem] max-w-full mx-auto border-t border-gray-100/80 p-6 lg:p-8 mt-6 w-full flex flex-col">
                <div className="flex gap-1 mb-4">
                <svg className="h-6 w-6 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polygon points="160 16 144 96 208 120 96 240 112 160 48 136 160 16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                <h1
                  tabIndex={0}
                  className="text-2xl my-auto font-medium tracking-tight"
                >
                  Breakdown 
                </h1>

                  </div>
                <div
                  className="text-lg text-gray-800 blog-content news-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
                <div className="mt-6 mb-6 ">
                  <a
                    className="underline text-lg font-semibold text-gray-700"
                    target={"_blank"}
                    href={post?.attributes?.link + "?ref=prototypr.io"}
                  >
                      Read full post on {domain}
                  </a>{" "}
                  →
                  </div>
              </div>
            ) : null}
            {/* <div className="order-1 m-6 mt-0 hidden lg:flex md:order-2 col-span-12 flex-col justify-end">
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
            </div> */}
          </div>
          {morePosts}
        </div>
      </div>
    </div>
  );
};

export default NewsPageFeatured;
