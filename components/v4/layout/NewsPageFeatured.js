import Button from "@/components/Primitives/Button";
import Link from "next/link";
import Image from "next/image";
const NewsPageFeatured = ({ post, domain, content, ogImage, faviconUrl }) => {
  return (
    <div className="relative mt-8 w-full max-w-[1320px] mx-auto flex flex-col justify-center">
      {/* <div className="md:border-l md:border-blue-200 md:pl-6"> */}
      <div className="w-full">
        <div className="relative grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12 bg-white p-6 rounded-2xl border border-gray-300/70 shadow-sm">
          <div className="lg:pl-20 z-10">
            <div className="max-w-xs px-2.5 lg:max-w-none">
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
              {/* <Image
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
              /> */}
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2 pb-[80px] flex flex-col justify-between">
            <div>
              {/* <div className="flex mb-3 mt-3">
                <div className="w-6 h-6 my-auto flex flex-col justify-center p-0.5 mr-1 bg-gray-50 border border-gray-100 rounded">
                  <img className="w-4 h-4 mx-auto my-auto" src={faviconUrl} />
                </div>
                <div className="text-xs my-auto leading-none font-medium uppercase">
                  {domain}
                </div>
              </div> */}
              <div className="z-10 mb-3 mt-3 flex w-[fit-content]">
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
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                </div>
              {/* </div> */}
            </div>
            <div className="flex flex-col justify-center flex-none border-t border-gray-200 bg-gray-50/50 rounded-b-xl w-full absolute py-4 left-0 bottom-0 w-[calc(100%-2px)] ml-[1px]">
              <div className="flex flex-col justify-center relative">
                <a
                  target={"_blank"}
                  href={
                    (post?.attributes?.legacyAttributes?.link
                      ? post?.attributes?.legacyAttributes?.link
                      : post?.attributes?.link ) + "?ref=prototypr"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPageFeatured;
