import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const NewPagination = dynamic(() => import("@/components/pagination"));
// import Layout from '@/components/layout'
// import Layout from "@/components/layoutForBlogPost";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
import Footer from "@/components/footer";
// import LargePostGridB from "@/components/v4/layout/LargePostGridB";
import useUser from "@/lib/iron-session/useUser";
// const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));

// import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
// import BreadCrumbs from "@/components/v4/layout/Breadcrumbs";
import {
  getAllPostsForPostsPage,
  getCommonQuery,
  getPostsByPageForPostsPage,
} from "@/lib/api";
// import Head from 'next/head'
import { transformPostList } from "@/lib/locale/transformLocale";
// import { useState } from "react";
// import SignupSidebar from "@/components/newsletter/SignupSidebar";
// import SponsorSidebarCard from "@/components/SponsorSidebarCard";
// import { Waypoint } from "react-waypoint";
// import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";
// import TopicSection from "@/components/v4/section/TopicSection";
import { makeAuthorList, shuffleArray } from "@/lib/utils/postUtils";
import { ArrowRight, Article, FireIcon, ToolboxIcon } from "@/components/icons";
import Link from "next/link";
import PostsSectionHero from "@/components/v4/section/PostsSectionHero";
// import TagsNavRow from "@/components/v4/section/TagsNavRow";
import SectionDivider from "@/components/v4/section/SectionDivider";
import ToolIconCard from "@/components/v4/card/ToolIconCard";
import TagsNavRow from "@/components/v4/section/TagsNavRow";
import BigBackgroundCard from "@/components/v4/card/BigCard/BigBackgroundCard";
import PostsGroup3Cards from "@/components/v4/layout/PostsGroup3Cards";
import PostsNewsGroup3 from "@/components/v4/layout/PostNewsGroup3";
import SmallCard from "@/components/v4/card/SmallCard/SmallCardF";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";
import getSponsors from "@/lib/utils/getSponsors";
import { formatAllTools } from "@/lib/utils/formatToolContent";
import { groupPostsByDate } from "@/lib/utils/groupPostsByDate";
import PostsSectionHeroWithNews from "@/components/v4/section/PostSectionHeroWithNews";
// import SmallPostsGroup from "@/components/v4/layout/SmallPostsSection";
// import Image from "next/image";
// const Aspiring = dynamic(() => import("@/components/new-index/Aspiring"));
// const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
// const ProductList = dynamic(() => import("@/components/new-index/ProductList"));
// const TopicTopItem = dynamic(() => import("@/components/new-index/TopicTopItem"), { ssr: false });

const PAGE_SIZE = 9;
const ALL_TAGS = [
  "ux",
  "user-research",
  "ui",
  "color",
  "career",
  "interview",
  "accessibility",
  "code",
  "vr",
];
export default function PostsPage({
  allPosts = [],
  tools = [],
  heroPost = null,
  morePosts = [],
  preview,
  pagination = {},
  // firstPost = [],
  tag = "",
  pageNo = 1,
  tagName = "",
  authors = [],
  navSponsor,
  news,
  sponsors,
  groupedNewsPosts,
}) {
  const router = useRouter();

  const onPageNumChange = pageNum => {
    router.push(`/topic/${tag}/page/${pageNum}`);
  };
  if (tagName == "Interview") {
    tagName = "Interviews";
  } else if (tagName == "UX") {
    tagName = "UX Design";
  } else if (tagName == "UI") {
    tagName = "UI Design";
  } else if (tagName == "design psychology") {
    tagName = "Psychology";
  }

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  const largePost = allPosts[0];

  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const dummyAvatar =
    "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl
      ? largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl
      : dummyAvatar;

  let authorData = largePost?.attributes?.author?.data?.attributes;
  let largePostAvatar = authorData?.avatar?.data
    ? authorData?.avatar?.data?.attributes?.url
    : authorData?.legacyAvatar
      ? authorData?.legacyAvatar
      : dummyAvatar;

  return (
    <>
      <Layout
        navOffset={false}
        sponsor={navSponsor}
        // maxWidth={'max-w-[1320px] search-wide'}
        seo={{
          title: `${tagName} | design articles on Prototypr | Page ${pagination?.page}`,
          description: `Articles on ${tagName} - design content open and accessible to everyone, no paywall here.`,
          //   image: "",
          canonical: `https://prototypr.io/topic/${tag}/page/${pagination?.page}`,
          url: `https://prototypr.io/topic/page/${tag}/${pagination?.page}`,
        }}
        padding={false}
        activeNav={"posts"}
        preview={preview}
      >
        <Container padding={false} maxWidth="w-full pb-2">
          <div className="pt-[64px]  relative overflow-hidden p-0 border-gray-200">
            <div className="mt-3">
              <TagsNavRow activeTag={tag} path="topic" />
            </div>

            {/* <div className="w-full p-6 pt-0 pb-0 z-10 relative max-w-[1320px] px-3 md:px-3 mx-auto backdrop-blur-sm backdrop-opacity-20 w-full h-full">
              <BreadCrumbs background={false}tagName={tagName}/>

              <div className="inline-flex mt-4 mb-4">
                <h2 className="mt-2 text-black/90 text-5xl font-semibold tracking-tighter xl:text-[48px] lg:leading-tight md:leading-tight capitalize drop-shadow-sm ">
                  {tagName}
                </h2>
              </div>zZ
            </div> */}
          </div>
        </Container>
        {/* <div className="h-[232px]"/> */}
        {allPosts?.length ? (
          <div className="pb-10  z-50 relative">
            {pagination.page && pagination.page == 1 ? (
              morePosts.length > 0 && (
                <>
                  <div className="z-20 relative">
                    <Container
                      // padding={false}
                      maxWidth="max-w-[1320px] mx-auto "
                    >
                      <div className="grid grid-cols-3 lg:grid-rows-2 gap-3">
                        <div className="col-span-3 lg:col-span-2 lg:row-span-2">
                          <BigBackgroundCard
                            showDescription={true}
                            layout={2}
                            link={`/post/${largePost?.attributes?.slug}`}
                            avatar={largePostAvatar}
                            imageDimensions={`lg:w-7/12 lg:h-[400px] h-[260px] border-r`}
                            textDimensions={`lg:w-5/12`}
                            excerpt={largePost?.attributes?.excerpt}
                            author={
                              largePost?.attributes?.author?.data?.attributes
                            }
                            post={largePost}
                            image={largeCoverImage}
                            date={largePost?.attributes?.date}
                            title={largePost?.attributes?.title}
                            tags={largePost?.attributes?.tags?.data}
                          />
                        </div>
                        {tools?.length ? (
                          <div className="col-span-3 border border-gray-300/50 bg-white p-3 shadow-sm rounded-2xl  lg:col-span-1 lg:row-span-2">
                            <div className="flex w-full justify-between">
                              <div>
                                <div className="flex">
                                  <ToolboxIcon
                                    size={28}
                                    className={"my-auto mr-2 text-gray-600"}
                                  />
                                  <div className="flex flex-col">
                                    <h3
                                      className={`text-lg font-bold capitalize drop-shadow-sm tracking-[-0.018em] text-gray-800`}
                                    >
                                      {tagName} Toolbox
                                    </h3>
                                    {/* <div className="text-sm text-gray-600">
                                      Handpicked every week
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="flex relative">
                                <div className="my-auto">
                                  <Link href={`/toolbox/${tag}/page/1`}>
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
                            </div>
                            <div className="lg:grid lg:grid-cols-1 lg:grid-rows-4 flex gap-6 mt-6 flex-col justify-between">
                              {tools?.length &&
                                tools.map((item, index) => {
                                  item = item?.attributes
                                    ? item?.attributes
                                    : null;
                                  return (
                                    <ToolIconCard
                                      withBackground={false}
                                      tool={item}
                                    />
                                  );
                                })}
                            </div>
                          </div>
                        ) : (
                          <div className="col-span-3 lg:col-span-1 lg:row-span-2 lg:grid lg:grid-cols-1 lg:grid-rows-2 gap-3">
                            {morePosts?.length > 0 &&
                              morePosts.slice(1, 3).map((post, index) => {
                                const coverImage = post?.attributes
                                  ?.legacyFeaturedImage?.mediaItemUrl
                                  ? post?.attributes?.legacyFeaturedImage
                                      ?.mediaItemUrl
                                  : post?.attributes?.featuredImage?.data
                                        ?.attributes?.url
                                    ? post?.attributes?.featuredImage?.data
                                        ?.attributes?.url
                                    : null;
                                let authorData = post?.attributes?.author?.data
                                  ?.attributes
                                  ? post?.attributes?.author?.data?.attributes
                                  : null;
                                let avatar = authorData?.avatar?.data
                                  ? authorData?.avatar?.data?.attributes?.url
                                  : authorData?.legacyAvatar
                                    ? authorData?.legacyAvatar
                                    : dummyAvatar;

                                return (
                                  <SmallCard
                                    link={`/post/${post?.attributes?.slug}`}
                                    key={index}
                                    title={post?.attributes?.title}
                                    image={coverImage}
                                    content={post?.attributes?.excerpt}
                                    tags={post?.attributes?.tags?.data}
                                    date={post?.attributes?.date}
                                    avatar={avatar}
                                    author={
                                      post?.attributes?.author?.data?.attributes
                                    }
                                  />
                                );
                              })}
                          </div>
                        )}
                        {/* <div className="col-span-3 lg:col-span-1 lg:row-span-2 lg:grid lg:grid-cols-1 lg:grid-rows-2 gap-3">
                            {morePosts?.length > 0 &&
                              morePosts.slice(1, 3).map((post, index) => {
                                const coverImage = post?.attributes
                                  ?.legacyFeaturedImage?.mediaItemUrl
                                  ? post?.attributes?.legacyFeaturedImage
                                      ?.mediaItemUrl
                                  : post?.attributes?.featuredImage?.data
                                        ?.attributes?.url
                                    ? post?.attributes?.featuredImage?.data
                                        ?.attributes?.url
                                    : null;
                                let authorData = post?.attributes?.author?.data
                                  ?.attributes
                                  ? post?.attributes?.author?.data?.attributes
                                  : null;
                                let avatar = authorData?.avatar?.data
                                  ? authorData?.avatar?.data?.attributes?.url
                                  : authorData?.legacyAvatar
                                    ? authorData?.legacyAvatar
                                    : dummyAvatar;

                                return (
                                  <SmallCard
                                    link={`/post/${post?.attributes?.slug}`}
                                    key={index}
                                    title={post?.attributes?.title}
                                    image={coverImage}
                                    content={post?.attributes?.excerpt}
                                    tags={post?.attributes?.tags?.data}
                                    date={post?.attributes?.date}
                                    avatar={avatar}
                                    author={
                                      post?.attributes?.author?.data?.attributes
                                    }
                                  />
                                );
                              })}
                          </div> */}
                        <div className="col-span-3">
                          <PostsNewsGroup3
                          pageNo={pagination?.page}
                          tagName={tagName}
                          tag={tag}
                            headline={
                              <div className="flex">
                                <FireIcon
                                  size={28}
                                  className={"my-auto mr-1.5 text-gray-600"}
                                />
                                <div className="flex flex-col">
                                  <div className="text-lg font-bold my-auto leading-tight">
                                    {tagName} News
                                  </div>
                                  {/* <div className="text-sm font-normal text-gray-500">
                                      Prototypr News Explorer
                                    </div> */}
                                </div>
                              </div>
                            }
                            news={news}
                            groupedNewsPosts={groupedNewsPosts}
                            posts={
                              tools?.length > 0
                                ? morePosts?.slice(1, morePosts.length)
                                : morePosts?.slice(3, morePosts.length)
                            }
                            tools={tools}
                          />
                          {/* <PostsGroup3Cards
                              news={news}
                              posts={morePosts?.slice(3, morePosts.length)}
                            /> */}
                        </div>
                      </div>
                    </Container>
                  </div>
                </>
              )
            ) : (
              // page 2 onwards
              //   <PostsSectionHero
              //   user={user}
              //   showHeroTitle={false}
              //   showTags={false}
              //   groupSlice={3}
              //   title={tagName}
              //   heroCardPost={allPosts[0]}
              //   viewablePosts={allPosts?.slice(1)}
              //   showRecent={true}
              //   toolsList={tools?.slice(0, 4)}
              // />
              <>
                {allPosts.length > 0 && (
                  <div className="pt-4">
                    <PostsSectionHeroWithNews
                      user={user}
                      groupSlice={3}
                      tools={tools?.slice(0, 4)}
                      showTags={false}
                      pageNo={pagination?.page}
                      tag={tag}
                      tagName={tagName}
                      showTitle={false}
                      news={news}
                      headline={
                        <div className="flex">
                          <FireIcon
                            size={28}
                            className={"my-auto mr-1.5 text-gray-600"}
                          />
                          <div className="flex flex-col">
                            <div className="text-lg font-bold leading-tight">
                              {tagName} News
                            </div>
                            <div className="text-sm font-normal text-gray-500">
                              Prototypr News Explorer
                            </div>
                          </div>
                        </div>
                      }
                      groupedNewsPosts={groupedNewsPosts}
                      // heroCardPost={heroPost}
                      viewablePosts={allPosts}
                      showRecent={false}
                    />
                  </div>
                )}
              </>
            )}

            <NewPagination
              align={"center"}
              total={pagination?.total}
              pageSize={PAGE_SIZE}
              currentPage={pagination?.page}
              onPageNumChange={pageNum => {
                onPageNumChange(pageNum);
              }}
            />

            {/* <TagsNavRow/> */}

            {/* <TopicSection
                  showTitle={false}
                  showSidebar={false}
                  showTopicCloud={true}
                  icon={null}
                  title={tagName}
                  authorsList={authors}
                  HeroPostRandomSection={allPosts[0]}
                  currentPage={pagination?.page}
                  OtherPostsRandomSection={allPosts?.slice(0, 6)}
                  // show more posts underneath the tools section if there's enough to show
                  extendedPosts={allPosts?.length>5?allPosts.slice(6,allPosts.length):false}
                  paginationComponent={ <NewPagination
                    total={pagination?.total}
                    pageSize={PAGE_SIZE}
                    currentPage={pagination?.page}
                    onPageNumChange={(pageNum, tag) => {
                      onPageNumChange(pageNum, tag);
                    }}
                  />}
                  // heroJob={heroJob}
                  // sponsors={sponsors}
                  toolsList={tools?.slice(0, 4)}
                  // authorsList={topicRes[topic.slug]?.authors}
                /> */}
          </div>
        ) : (
          ""
        )}
        {/* todo show loading state above */}
      </Layout>

      <Footer />
    </>
  );
}

// const Sidebar = ({ relatedPosts, paddingTop, author }) => {
//   const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-0");

//   const _handleWaypointEnter = () => {
//     setStickyPaddingTop("pt-0");
//   };
//   const _handleWaypointLeave = () => {
//     setStickyPaddingTop(SIDEBAR_STICKY_OFFSET);
//   };

//   return (
//     <div
//       className={`${paddingTop} relative col-span-4 max-w-[410px] border-l border-opacity-20`}
//     >
//       <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
//       <div
//         className={`${stickyPaddingTop} absolute transition transition-all duration-300 sticky top-0 min-h-screen hidden lg:block`}
//       >
//         <aside className="h-screen px-10 sticky top-0 py-0">
//           <div className="flex flex-col grid gap-6">
//             <PrototyprNetworkCTA />
//             <div>
//               {/* EMAIL FORM */}
//               <div className="w-full bg-blue-100 rounded-xl p-5 border border-gray-200">
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">
//                   Get the roundup
//                 </h3>
//                 <p className="text-base text-gray-500 mb-6">
//                   Get a curated selection of the best articles and topics from
//                   Prototypr in your inbox.
//                 </p>
//                 <SignupSidebar />
//               </div>

//               <div className="mt-6">
//                 <SponsorSidebarCard />
//               </div>
//             </div>

//             {/* <div className="w-full flex flex-col grid gap-2">

//             {relatedPosts?.data?.length > 0 &&
//               relatedPosts.data.map((item, index) => {
//                 return (
//                   <ProductItem key={`product_item_${index}`} post={item} />
//                   // <TopicTopItem key={index} topic={item}/>
//                 );
//               })}
//             </div> */}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

export async function getStaticProps({ preview = null, params, locale }) {
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale === "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }
  let pageSize = PAGE_SIZE;
  const { pageNo, tag } = params;

  let allPosts =
    (await getPostsByPageForPostsPage(
      preview,
      pageSize,
      pageNo,
      [tag],
      sort
    )) || [];

  let tags = allPosts[1];
  allPosts = allPosts[0];
  const pagination = allPosts.meta.pagination;

  let nextPosts = [],
    morePosts = [],
    heroPost = null;

  allPosts = transformPostList(allPosts.data, locale);

  const topicToolsRes =
    (await getCommonQuery(null, [tag], "tool", 4, (pageNo - 1) * 4, [
      "date:desc",
    ])) || [];
  const newsRes =
    (await getCommonQuery(null, [tag], "bite", 6, (pageNo - 1) * 6, [
      "date:desc",
    ])) || [];

  const authors = makeAuthorList(allPosts);
  shuffleArray(authors);

  // otherwise, just send back the list without splicing
  // firstPost = allPosts.slice(0, 1);
  // morePosts = allPosts.slice(1);

  //add blurhash to allPosts images
  for (var x = 0; x < allPosts.length; x++) {
    allPosts[x].attributes.base64 = createB64WithFallback(
      allPosts[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
    );
  }

  morePosts = allPosts;

  nextPosts = allPosts;

  const formattedNews = formatAllTools({ tools: newsRes.data, tagNumber: 0 });

  let groupedNewsPosts = groupPostsByDate(formattedNews);

  const { navSponsor, sponsors } = await getSponsors();

  return {
    props: {
      allPosts: nextPosts,
      navSponsor,
      sponsors: sponsors?.length ? sponsors : [],
      preview,
      pagination,
      tag,
      tagName: tags?.data[0]?.attributes?.name,
      pageNo,
      morePosts,
      heroPost,
      news: formattedNews,
      tools: topicToolsRes?.data,
      authors: authors,
      groupedNewsPosts,
    },
    revalidate: 20,
  };

  // const interviews =
  // (await getCommonQuery(preview, [tag], "article", 4, 0)) || [];

  // console.log("interview data from home***********" + JSON.stringify(interviews))
}

export async function getStaticPaths() {
  let pageCountArr = [];

  for (var z = 0; z < ALL_TAGS.length; z++) {
    const allPosts =
      (await getAllPostsForPostsPage(null, PAGE_SIZE, 0, [ALL_TAGS[z]])) || [];

    const pagination = allPosts.meta.pagination;
    const pageCount = pagination.pageCount;
    let arr = new Array(pageCount).fill("");
    let newArr = arr.map((i, index) => {
      return `/topic/${ALL_TAGS[z]}/page/${index + 1}`;
    });
    pageCountArr = pageCountArr.concat(newArr);
  }

  return {
    paths: pageCountArr || [],
    fallback: true,
  };
}
