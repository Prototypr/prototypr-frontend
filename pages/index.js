import dynamic from "next/dynamic";
// import { useState } from "react";
// import DiscoverSection from "@/components/v4/section/DiscoverSectionB";
// import SectionDivider from "@/components/v4/section/SectionDivider";
// import ToolIconCardRow from "@/components/v4/layout/ToolIconCardRow";
// import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
// import TrendingFullWidth from "@/components/homepage/TrendingFullWidth";
import IntroBanner from "@/components/v4/hero/IntroBanner2";

/**new index components */
// import { BrowserView } from "react-device-detect";
const Footer = dynamic(() => import("@/components/footer"));
// const DesignTool = dynamic(() => import("@/components/new-index/DesignTool"));
const StickyFooterCTA = dynamic(() => import("@/components/StickyFooterCTA"), {
  ssr: false,
});
// import { getAllJobs, getPopularTopics } from "@/lib/api";

// import { HomePageNewNavBar } from "@/components/Navbar/Navbar";

import {
  getCombinedPostsForHome,
  getAllToolsForHome,
  // getRandomPostsForHome,
  getCommonQuery,
  getAllNews,
} from "@/lib/api";
import { useIntl } from "react-intl";
import { transformPostListOld } from "@/lib/locale/transformLocale";
// import { useEffect } from "react";

// import TopicSectionC from "@/components/v4/section/TopicSectionC";
// import TopicSelectSection from "@/components/v4/section/TopicSelectSection";

import NewsletterSection from "@/components/v4/section/NewsletterSection";
import { makeAuthorList, shuffleArray } from "@/lib/utils/postUtils";
import useUser from "@/lib/iron-session/useUser";
import TagsNavRow from "@/components/v4/section/TagsNavRow";
// import SponsorBannerFull from "@/components/v4/banner/SponsorBannerFull";
// import TopicSpotlightSection from "@/components/v4/section/TopicSpotlightSection";
// import PopularTagsSection from "@/components/v4/section/PopularTagsSection";
import Container from "@/components/container";
import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";
// import JumboTagsSection from "@/components/v4/section/JumboTagsSection";
// import ToolLargeCardRow from "@/components/v4/layout/ToolLargeCardRow";
// import Link from "next/link";
// import Button from "@/components/Primitives/Button";
// import GiantTag from "@/components/v4/tag/GiantTag";
// import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
// import TopicSubscription from "@/components/Settings/topicsSubscription";
import { TAB_ITEMS } from "@/lib/constants";
// import GiantTag from "@/components/v4/tag/GiantTag";
import HeroArticleSection from "@/components/v4/section/HeroArticleSection";
import TopicSectionHome from "@/components/v4/section/TopicSectionHome";
import ToolsCarouselSection from "@/components/v4/section/ToolsCarouselSection";
// import ToolBackgroundCardRow from "@/components/v4/layout/ToolBackgroundCardRow";
import { formatAllTools } from "@/lib/utils/formatToolContent";
// import ToolImageCard from "@/components/v4/card/ToolImageCard";
// import ToolsColumn from "@/components/v4/layout/ToolsColumn";
import CardColumn from "@/components/v4/layout/CardColumn";
import NewsColumn from "@/components/v4/layout/NewsColumn";
import { groupPostsByDate } from "@/lib/utils/groupPostsByDate";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";
import getSponsors from "@/lib/utils/getSponsors";
// import { fetchUser } from "app/actions";

export default function Index({
  preview,
  allTools,
  topicRes,
  // jobs,
  sponsors,
  navSponsor,
  heroPost,
  morePosts,
  allNews,
  groupedNewsPosts,
  // popularTags,
}) {
  const intl = useIntl();

  const titleText = intl.formatMessage({ id: "index.header.title" });
  const descriptionText = intl.formatMessage({ id: "intro.description" });

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });
  // const HeroPostRandomSection = randomPosts.filter((item, i) => i === 0);
  // const OtherPostsRandomSection = randomPosts.filter((item, i) => i !== 0);
  // const heroJob = jobs.filter((item, i) => i === 0);
  // const jobsSidebar = jobs.filter((item, i) => i !== 0);
  const toolsList = allTools;

  return (
    <>
      <Layout
        sponsor={navSponsor}
        navOffset={false}
        padding={false}
        preview={preview}
        background={"#fbfcff"}
        // background={"#f7f9fd"}
        // background={"#F7F7F8"}
        // background={"#ffffff"}
        seo={{
          title: titleText,
          description: descriptionText,
          image: "",
          canonical: "https://prototypr.io",
          url: "https://prototypr.io",
        }}
      >
        {!user?.isLoggedIn ? (
          <>
            <IntroBanner sponsor={sponsors?.length ? sponsors[0] : null} />
            {/* <SectionDivider
              py={"py-1 sm:py-2 md:py-5"}
              transparentLine={true}
            /> */}
          </>
        ) : (
          <div className="pt-[44px]" />
        )}
        <div className="relative z-50 pt-6">
          <TagsNavRow />
        </div>
        <Container
          padding={false}
          maxWidth="max-w-[1320px] mx-auto px-3 md:px-3 xl:px-3 z-30 relative"
        >
          <div className="grid gap-3 grid-cols-9 md:grid-cols-9 xl:grid-cols-12 auto-rows-min">
            <div className="order-3 md:order-1 mt-6 md:mt-0 col-span-9 md:col-span-3">
              <NewsColumn
                groupedNewsPosts={groupedNewsPosts}
                sponsor={navSponsor}
                withBackground={false}
                posts={allNews}
              />
            </div>

            <div className="order-2 md:order-2 col-span-9 md:col-span-6 ">
              <h3 className="md:hidden mt-6 mb-3 font-bold drop-shadow-sm text-xl tracking-[-0.018em] text-gray-800">
                New Posts
              </h3>
              <HeroArticleSection
                user={user}
                cols={2}
                // cols={3}
                heroCardPost={heroPost}
                viewablePosts={morePosts}
                showSmallCardDescription={false}
                // jobsSidebar={jobsSidebar}
                // showBigPost={false}
                showBigPost={3}
                showTitle={false}
                showHeadingRow={false}
              />

              {/* <div
                className={`${user?.isLoggedIn ? "pt-6" : ""} text-2xl text-black/90 font-semibold text-left mt-6 md:-mt-8 mb-5 px-1 w-fit rounded-full`}
              >{`Latest products`}</div>
              <ToolBackgroundCardRow
                tools={[
                  ...toolsList.slice(0, 3),
                  sponsors?.length && navSponsor
                    ? navSponsor
                    : toolsList[4],
                ]}
              />
              <ToolImageCard
                  posts={[
                    ...toolsList.slice(0, 3),
                    sponsors?.length && navSponsor
                      ? navSponsor
                      : toolsList[4],
                  ]}
                  columns={"lg:col-span-4"}
                  type="toolbox"
                /> */}
            </div>
            <div className="order-1 mt-3 md:mt-0 md:order-3 col-span-9 md:col-span-9 xl:col-span-3">
              <CardColumn
                sponsor={navSponsor}
                withBackground={false}
                tools={toolsList ? [...toolsList.slice(0, 8)] : []}
              />
            </div>
          </div>
        </Container>

        {/* <SectionDivider py="py-3.5" transparentLine={true} /> */}
        {/* <div className="z-50 relative bg-[#fbfcff]">
          <HeroArticleSection
            user={user}
            cols={3}
            heroCardPost={heroPost}
            viewablePosts={morePosts}
            jobsSidebar={jobsSidebar}
            showBigPost={2}
            showTitle={false}
          />
        </div> */}
        <div className="mt-10">
          <NewsletterSection />
        </div>
        <div className="mt-14 py-4 pb-[100px] bg-[#f2f4fa]">
          {toolsList?.length > 0 ? (
            <ToolsCarouselSection toolsList={toolsList} sponsors={sponsors} />
          ) : null}
          {/* <Container maxWidth="max-w-[1320px] -mb-10 mt-12 z-30 relative">
          <TwoColumnCards />
        </Container> */}
        </div>

        <div className="z-50 py-10 relative px-3">
          <HeroArticleSection
            user={user}
            cols={4}
            heroCardPost={morePosts?.length > 3 ? morePosts[4] : null}
            viewablePosts={
              morePosts?.length > 5
                ? morePosts.slice(5, morePosts.length)
                : null
            }
            showBigPost={2}
            showTitle={false}
          />
        </div>
        {/* <SectionDivider py="py-2" transparentLine={false} /> */}

        <Container maxWidth="py-16 pt-14  bg-[#ffffff]">
          <div className="max-w-[1320px] mx-auto">
            <TwoColumnCards />
          </div>
        </Container>

        {/* <SectionDivider py='py-4' transparentLine={true} />
        
        <Container maxWidth="max-w-[1320px] z-30 relative">
          <div className="">
              <ToolLargeCardRow tools={toolsList.slice(5,9)} />
              <SectionDivider py="py-6" transparentLine={true}  />
              <ToolIconCardRow withBackground={true} tools={[...toolsList.slice(0,5), ...toolsList.slice(10,15)]} />       
              
          </div>
        </Container> */}

        {/* <SectionDivider py="py-6" transparentLine={true} /> */}

        {/* <SectionDivider />
        <div className="hidden md:block">
          <SponsorBannerFull/>
          <SectionDivider />
        </div> */}
        {/* <SectionDivider py="py-6" transparentLine={true} /> */}

        {/* <Container padding={false} maxWidth="relative z-0 bg-gray-50">
          <div class="relative bottom-0 w-full z-0">
            <img
              class="w-full translate-y-[4px] z-0"
              src="/static/images/tilt-section2.svg"
            />
            <div class="w-full h-[40px] md:h-[50px] translate-y-[2px] bg-[#dbeeff]"></div>
          </div>
        </Container> */}

        {/* <div className="relative">
          <Container maxWidth="w-full bg-[#dbeeff]  relative relative z-10">
            <div className="max-w-[1320px] mx-auto px-3 md:px-3 pb-16 ">
              <div className="flex justify-between mb-8">
                <h3 className="text-3xl text-black/90 font-semibold  max-w-md leading-[32px]">
                  Browse by <span className="text-underline">category</span>
                </h3>
                <div className="flex relative p-2">
                  <div className="hidden sm:inline text-md text-black/80 font-normal ">
                    <Link href={`/topics/`}>See all</Link>
                  </div>
                  <div className="my-auto">
                    <Link href={`/topics/`}>
                      <div className="bg-blue-200/60 outline outline-1 outline-blue-300/80 ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                        <ArrowRight
                          weight="bold"
                          size={14}
                          className="text-blue-900 my-auto"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pt-4 rounded-xl flex flex-wrap">
                <Link href={"/"}>
                  <div
                    className={`inline-block capitalize text-sm pr-4 pl-2 py-2 cursor-pointer bg-blue-50/50 outline outline-1 outline-blue-300/60 rounded-full mr-5 mb-3 text-blue-900 font-medium`}
                  >
                    <div className="flex">
                      <Compass
                        weight={`regular`}
                        className="my-auto p-0"
                        size={20}
                      />
                      <div className="ml-2 my-auto">Explore all topics</div>
                    </div>
                  </div>
                </Link>

                {popularTags.map((topic, i) => (
                  <div key={`topic_${i}`}>
                    <Link href={`/posts/${topic?.slug}/page/1/`}>
                      <div
                        className={`inline-block capitalize text-sm px-4 py-2 cursor-pointer bg-blue-50/50 outline outline-1 outline-blue-300/60 rounded-full mr-3 mb-3 text-blue-900 font-medium`}
                      >
                        {topic?.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div> */}
        {/* <SectionDivider />
        <TopicSpotlightSection title={'Topic spotlight:'} tagline={'Open Web'}/> */}
        <div className="relative bg-gray-50">
          {/* <SectionDivider py='py-6 pt-12' transparentLine={true} /> */}
          {/* <SectionDivider /> */}
          {TAB_ITEMS?.map((topic, index) => {
            return (
              <div
                key={`topicsection_${index}`}
                className={`z-40 ${index % 2 === 0 ? "bg-[#f2f4fa]" : ""} py-10 `}
              >
                <TopicSectionHome
                  tagline={topic.tagline}
                  showSidebar={false}
                  slug={topic.slug}
                  icon={topic.icon}
                  title={topic.name}
                  HeroPostRandomSection={topicRes[topic.slug]?.posts[0]}
                  OtherPostsRandomSection={topicRes[topic.slug]?.posts?.slice(
                    1,
                    5
                  )}
                  // heroJob={heroJob}
                  sponsors={sponsors}
                  toolsList={(
                    (topicRes && topicRes[topic.slug]?.tools) ||
                    []
                  ).slice(0, 10)}
                  authorsList={
                    (topicRes && topicRes[topic.slug]?.authors) || {}
                  }
                />

                {/* <SectionDivider py="py-12 opacity-70" transparentLine={true} /> */}
                {index == 1 ? (
                  <div className="mt-10 py-12 pt-2 -mb-10 bg-white">
                    <NewsletterSection />
                    {/* <SectionDivider py="py-12" transparentLine={true} /> */}
                  </div>
                ) : (
                  ""
                )}

                {index == 4 ? (
                  <div className="py-10 mt-8 -mb-10 bg-gray-50">
                    <Container maxWidth="max-w-[1320px]">
                      <TwoColumnCards />
                    </Container>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        {/* <BrowserView>
          <DesignTool allTools={toolsList} />
        </BrowserView> */}
      </Layout>
      {!user?.isLoggedIn && (
        <StickyFooterCTA
          title="Welcome to Prototypr"
          description="Join today to make posts and grow with us."
        />
      )}
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null, locale }) {
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  let allPosts = (await getCombinedPostsForHome(preview, 12, 0, sort)) || [];

  // let randomPosts = (await getRandomPostsForHome()) || [];
  let toolCount = 20;
  let allTools =
    (await getAllToolsForHome(preview, toolCount, 0, [
      "featured:desc",
      "date:desc",
    ])) || [];

  for (var x = 0; x < allTools?.data?.length; x++) {
    //generate blurhash here
    allTools.data[x].attributes.logoBase64 = createB64WithFallback(
      allTools.data[x]?.attributes?.logo?.data?.attributes?.blurhash
    );
    allTools.data[x].attributes.base64 = createB64WithFallback(
      allTools.data[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
    );
  }

  let allNews = (await getAllNews(preview, 15, 0)) || [];

  // let jobs = (await getAllJobs(null, 5, 1)) || [];
  // topic sections
  let topicRes = {};
  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
    let res =
      (await getCommonQuery(preview, [tag], "article", 12, 0, sort)) || [];

    //add blurhash to the images
    for (var x = 0; x < res?.data?.length; x++) {
      res.data[x].attributes.base64 = createB64WithFallback(
        res.data[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
      );
    }

    const topicToolsRes =
      (await getCommonQuery(
        preview,
        [TAB_ITEMS[index].toolSlug],
        "tool",
        8,
        0,
        sort
      )) || [];

    //extract authors from the postss while we don't have an endpoint for it
    const authors = makeAuthorList(res);

    //shuffle so it's different each time
    shuffleArray(res.data);
    shuffleArray(authors);
    shuffleArray(topicToolsRes.data);

    //add blurhash to the images
    for (var x = 0; x < topicToolsRes?.data?.length; x++) {
      topicToolsRes.data[x].attributes.logoBase64 = createB64WithFallback(
        topicToolsRes.data[x]?.attributes?.logo?.data?.attributes?.blurhash
      );
      topicToolsRes.data[x].attributes.base64 = createB64WithFallback(
        topicToolsRes.data[x]?.attributes?.featuredImage?.data?.attributes
          ?.blurhash
      );
    }

    const topicData = {
      authors: authors,
      posts: res.data,
      tools: topicToolsRes.data,
    };
    topicRes[tag] = topicData;
  }

  // const popularTags =
  //   (await getPopularTopics({ postType: "article", pageSize: 34 })) || [];

  allPosts = transformPostListOld(allPosts.data, locale);
  if (locale !== "es-ES") {
    shuffleArray(allPosts);
  }
  allTools = transformPostListOld(allTools.data, locale);

  //add blurhash to allPosts images
  for (var x = 0; x < allPosts?.length; x++) {
    allPosts[x].attributes.base64 = createB64WithFallback(
      allPosts[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
    );
  }

  // shuffleArray(allTools)
  // await generateCombinedRSS({ allPosts, allTools });
  // otherPosts = transformPostListOld(otherPosts.data, locale);
  allTools = formatAllTools({ tools: allTools, tagNumber: 1 });
  allNews = formatAllTools({ tools: allNews.data, tagNumber: 0 });

  const { navSponsor, sponsors } = await getSponsors();

  // for(var x = 0; x<allNews.tools.length;x++){
  //   allNews.tools[x].attributes.base64 = createB64WithFallback(allNews.tools[x]?.attributes?.featuredImage?.data?.blurhash);
  //   allTools.data[x].attributes.logoBase64 = createB64WithFallback(allTools.data[x]?.attributes?.logo?.data?.blurhash);
  // }

  let groupedNewsPosts = groupPostsByDate(allNews);

  return {
    props: {
      heroPost: allPosts?.length ? allPosts[0] : null,
      morePosts: allPosts?.length > 1 ? allPosts.slice(1) : null,
      allTools: allTools?.length ? allTools : null,
      allNews: allNews?.length ? allNews : null,
      groupedNewsPosts: groupedNewsPosts ? groupedNewsPosts : null,
      // popularTags,
      // otherPosts: otherPosts,
      // interviewPosts: interviews.data,
      topicRes: topicRes ? topicRes : null,
      preview,
      // jobs,
      // randomPosts: randomPosts.slice(0, 8),
      sponsors: sponsors?.length ? sponsors : [],
      navSponsor,
    },
    revalidate: 20,
  };
}
