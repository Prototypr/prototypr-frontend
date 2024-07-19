import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { formatDate, getDomain } from "pages/news/[slug]";

const NewsColumn = ({
  posts,
  title,
  textColor,
  withBackground,
  groupedNewsPosts,
  showHeader,
  sponsor,
  headline,
  showBeta,
}) => {
  const renderPosts = posts =>
    posts.map((post, index) => {
      const postDomain = getDomain(post?.attributes?.legacyAttributes?.link);

      // const ogImage = post?.attributes?.seo?.opengraphImage
      //   ? post?.attributes?.seo?.opengraphImage
      //   : post?.attributes?.featuredImage?.data?.attributes?.url
      //     ? post?.attributes?.featuredImage?.data?.attributes?.url
      //     : post?.legacyFeaturedImage
      //       ? post?.legacyFeaturedImage?.mediaItemUrl
      //       : post?.ogImage
      //         ? post?.ogImage.opengraphImage
      //         : post?.attributes?.ogImage?.opengraphImage
      //           ? post?.attributes?.ogImage.opengraphImage
      //           : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
      return (
        <article
          key={index}
          className="group relative flex hover:bg-gray-50 transition transition-all duration-400"
        >
          <Link
            target={!showBeta?'_blank':""}
            className="flex"
            // href={post?.attributes?.legacyAttributes?.link + `?ref=prototypr`}
            href={!showBeta?`${post?.attributes?.legacyAttributes?.link}`:`/news/${post?.attributes?.slug}`}
          >
            <div className="flex flex-col items-start pr-2">
              <h3 className="text-base pl-2.5 mb-0.5 font-medium tracking-tight text-gray-900">
                {/* <div className="absolute -inset-x-4 -inset-y-2 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-gray-800/50" /> */}
                <a className="block" href={post.url}>
                  <span className="relative z-10">
                    {post.attributes?.title}
                  </span>
                </a>
              </h3>

              <div className="pl-2.5">
                <div className="z-10 mb-1 mt-1 flex w-[fit-content]">
                  <div className="my-auto flex rounded-full flex-col justify-center p-[1px] mr-0.5 bg-black/50">
                    <img
                      className="w-3 h-3 mx-auto my-auto rounded-full"
                      src={`https://www.google.com/s2/favicons?domain=${postDomain}`}
                    />
                  </div>
                  <div className="text-[10px] ml-0.5 text-gray-400 tracking-wide my-auto leading-none font-medium uppercase">
                    {postDomain}
                  </div>
                </div>
              </div>

              <div className="z-10  order-first">
                <div className="relative z-10 flex items-center text-base pl-2.5">
                  <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full rounded-full bg-gray-200 -ml-1" />
                  </span>
                  <div className="text-[12px] font-medium my-auto font-base text-gray-600">
                    {formatDate(post?.attributes?.date)}
                  </div>
                </div>
              </div>
              {/* <p className="relative z-10 text-sm text-gray-600 dark:text-gray-400">
              <div
                style={{ color: "#4a5568" }}
                className="py-3 max-w-3xl text-base mb-2"
                dangerouslySetInnerHTML={{ __html: post.attributes?.excerpt }}
              ></div>
            </p> */}
              {/* <div className="flex z-10 relative justify-start w-full mt-4">
              <div
                aria-hidden="true"
                className="relative flex items-center text-sm font-medium text-blue-500"
              >
                Visit source
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="ml-1 h-4 w-4 stroke-current"
                >
                  <path
                    d="M6.75 5.75 9.25 8l-2.5 2.25"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div> */}
            </div>
            {/* <div className="relative flex-none group-hover:scale-[1.02] my-auto w-[180px] h-[180px] transition transition-all duration-400">
            <img
              className="rounded-xl z-10 h-full w-full object-cover"
              src={ogImage}
            />
          </div> */}
          </Link>
        </article>
      );
    });

  return (
    <div className={`h-full w-full rounded-2xl`}>
      {/* <Container maxWidth="max-w-[1320px] w-full"> */}
      {showHeader !== false && (
        <div className="flex justify-between p-3 pt-0 pb-4 rounded-t-2xl">
          <div className="flex">
            <div>
              <div className="flex">
                {/* <div className="my-auto">
                <Robot size={'24'} />
              </div> */}
                <h3
                  className={`${showBeta === false ? "text-xl" : "text-xl font-bold"} capitalize drop-shadow-sm tracking-[-0.018em] text-gray-800`}
                >
                  {headline ? headline : title ? title : <>News Explorer</>}
                </h3>

                {showBeta !== false ? (
                  <span className="bg-blue-500 my-auto font-medium text-white py-0 px-[6px] text-[11px] rounded-full ml-2">
                    Beta
                  </span>
                ) : null}
              </div>
              {showBeta !== false ? (
                <div className="text-sm text-gray-600">
                  Prototypr News Explorer
                </div>
              ) : null
              // <div className="text-sm text-gray-800">Selected by humans.</div>
              }
            </div>
          </div>
          <div className="flex relative">
            {/* <div className="text-sm my-auto inline text-black/80 font-normal ">
              <Link href={`/news/`}>See all</Link>
            </div> */}
            <div className="my-auto">
              <Link href={`/news/`}>
                <div className="bg-gray-200/60  ml-2.5 flex justify-center my-auto h-5 w-5 rounded-full">
                  <ArrowRight
                    weight="bold"
                    size={12}
                    className="text-gray-900 my-auto"
                  />
                </div>
              </Link>
            </div>
          </div>
          {/* <Link href='/toolbox'>
            <div className="flex">
              <div className={`text-sm my-auto text-black opacity-60`}>See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link> */}
        </div>
      )}
      <div
        className={`${showBeta === false ? "max-h-[404px]" : "max-h-[46rem]"} relative`}
      >
        <div
          className={`p-3 h-full ${showBeta === false ? "max-h-[404px]" : "max-h-[46rem]"} overflow-y-auto`}
        >
          {["today", "yesterday", "thisWeek", "lastWeek", "lastMonth"].map(
            group => {
              let formattedGroup = group.replace("last", "last ");
              formattedGroup = formattedGroup.replace("this", "this ");

              return (
                groupedNewsPosts &&
                groupedNewsPosts[group] &&
                groupedNewsPosts[group].length > 0 && (
                  <section
                    key={group}
                    aria-labelledby={group}
                    className="md:border-l md:border-gray-200 md:pl-"
                  >
                    <div className="grid grid-cols-1 items-baseline gap-y-2 md:grid-cols-5">
                      <h2
                        id={group}
                        className="col-span-5 mb-1 w-[fit-content] pr-4 rounded-r-full pl-2 border- border-gray-300/50 text-base font-semibold text-gray-800"
                      >
                        {/* <div className="pl-[1px]"> */}
                        {formattedGroup.charAt(0).toUpperCase() +
                          formattedGroup.slice(1)}
                        {/* </div> */}
                      </h2>
                      <div className="col-span-5 mb-8">
                        <div className="space-y-5">
                          {" "}
                          {renderPosts(groupedNewsPosts[group])}
                        </div>
                      </div>
                    </div>
                  </section>
                )
              );
            }
          )}
          {groupedNewsPosts?.months &&
            Object.entries(groupedNewsPosts?.months).map(([month, posts]) => (
              <section
                key={month}
                aria-labelledby={month}
                className="md:border-l md:border-gray-200 md:pl-"
              >
                <div className="grid grid-cols-1 items-baseline gap-y-2 md:grid-cols-5">
                  <h2
                    id={month}
                    className="col-span-5 mb-1 w-[fit-content] pr-4 rounded-r-full pl-2 border- border-gray-300/50 text-base font-semibold text-gray-800"
                  >
                    {/* <div className="pl-[1px]"> */}
                    {month}
                    {/* </div> */}
                  </h2>
                  <div className="col-span-5 mb-8">
                    <div className="space-y-5">{renderPosts(posts)}</div>
                  </div>
                </div>
              </section>
            ))}
        </div>
        {/* {posts.slice(0, 12).map((tool, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className={`${index==0?'-mt-6':'border-t border-gray-100'} my-3 flex flex-col`} />
              <div className="">
                <NewsColumnCard
                  withBackground={false}
                  tool={tool?.attributes}
                />
              </div>
            </div>
          );
        })} */}
        {showBeta !== false ? (
          <div className="z-10 rounded-b-2xl absolute z-10 hidden md:block pointer-events-none bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fbfcff]" />
        ) : null}
      </div>
    </div>
  );
};

export default NewsColumn;
