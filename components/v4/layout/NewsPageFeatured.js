import Button from "@/components/Primitives/Button";
import Link from "next/link";
import Image from "next/image";
import { LinkIcon } from "@/components/icons";
import HeroCardSection from "@/components/toolbox/HeroCardSectionNews";

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
    
        <div className="relative bg-white overflow-hidden rounded-2xl border border-gray-300/70 shadow-sm">

        <HeroCardSection 
        faviconUrl={faviconUrl}
        domain={domain}
        logo={null}
        post={post}
        excerpt={excerpt}
        tags={post.attributes.tags.data}
        featuredImage={post?.attributes?.featuredImage?.data?.attributes?.url?post?.attributes?.featuredImage?.data?.attributes?.url:ogImage}
        />

  
        
          {content!==excerpt?<div className="col-span-2 p-6 border-t w-full border-gray-100 flex flex-col lg:flex-row lg:justify-between">
            {post?.attributes?.outgoingLinks?.length ? (
              <div className="flex flex-col justify-start lg:pr-[40px] relative flex-none w-full lg:w-[300px]">
                  <h1
                    tabIndex={0}
                    className="text-base mb-0.5 font-semibold tracking-tight"
                  >
                    References
                  </h1>
                  <p className="text-xs text-gray-500 mb-4">
                    Articles and links referenced in this post
                  </p>
                  {post.attributes.outgoingLinks?.length ? (
                    <div className="flex flex-col gap-3 lg:pr-1">
                      {post.attributes.outgoingLinks.map((link, index) => {
                        const hostname = new URL(link.url).hostname;
                        return (
                          <a
                            href={`${link.url}?ref=prototypr`}
                            target="_blank"
                            className="text-sm bg-gray-100/50 hover:bg-gray-100 transition transition-all duration-700 p-4 lg:p-2 rounded-2xl"
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
