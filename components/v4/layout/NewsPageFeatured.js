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
  morePosts
}) => {
  return (
    <div className="relative w-full max-w-[1320px] mx-auto flex flex-col justify-center">
      {/* <div className="md:border-l md:border-blue-200 md:pl-6"> */}
      <div
        className="w-full grid grid-cols-8 gap-4"
        style={{ gridAutoFlow: "dense" }}
      >
        <div className="col-span-8 lg:col-span-2 max-h-[1200px] relative">
          <div className="max-h-[1200px] bg-[#f4f4f4]/10 p-3 rounded-2xl lg:overflow-y-auto flex flex-col gap-4">
            <div className="z-10 absolute p-4 z-10 hidden md:block pointer-events-none bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fbfcff]" />

            <h1 tabIndex={0} className="text-base mb-0 font-semibold tracking-tight">
              References
            </h1>
            {post.attributes.outgoingLinks.map((link, index) => {
              const hostname = new URL(link.url).hostname;
              return (
                <div className="hover:bg-gray-50 hover:shadow-md bg-white/80 border border-gray-300/50 p-3 shadow-sm rounded-2xl transition transition-all duration-700">
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

                    <div key={index} className="flex ">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-gray-700 text-base lg:text-sm font-medium">
                          {link.title
                            ? link.title
                            : link.text
                              ? link.text
                              : link.url}
                        </div>
                        {link?.description !== (link.title || link.text) ? (
                          <div className="text-gray-600 line-clamp-2 text-xs max-w-[240px]">
                            {link.description}
                          </div>
                        ) : null}
                        <div className="text-gray-400 text-xs max-w-[200px] truncate">
                          {link.rootDomain ? link.rootDomain : link.url}
                        </div>
                        {
                          link.imageUrl ? (
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
                </div>
              );
            })}
          </div>
          {/* <div className="order-first col-span-2 w-full flex flex-col lg:flex-row lg:justify-between">
          {post?.attributes?.outgoingLinks?.length ? (
            <div className="flex flex-col justify-start relative flex-none w-full">
              <h1
                tabIndex={0}
                className="text-base mb-2 font-semibold tracking-tight"
              >
                Referenced links
              </h1>
              {post.attributes.outgoingLinks?.length ? (
                <div className="flex flex-col gap-3 lg:pr-1">
                  
                </div>
              ) : null}
            </div>
          ) : (
            ""
          )}
        </div> */}
        </div>
        <div className="col-span-8 order-first lg:order-last lg:col-span-6">
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

            {content !== excerpt ? (
              <div className="col-span-2 p-6 border-t w-full border-gray-100 flex flex-col lg:flex-row lg:justify-between">
                <div
                  className="text-lg order-first lg:order-last max-w-[48rem] mx-auto text-gray-800 blog-content news-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
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
