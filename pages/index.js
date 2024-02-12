import dynamic from "next/dynamic";
// import { useState } from "react";
// import DiscoverSection from "@/components/v4/section/DiscoverSectionB";
import SectionDivider from "@/components/v4/section/SectionDivider";
import ToolIconCardRow from "@/components/v4/layout/ToolIconCardRow";
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
import { getAllJobs, getPopularTopics } from "@/lib/api";
import { ArrowRight, Compass } from "phosphor-react";

// import { HomePageNewNavBar } from "@/components/Navbar/Navbar";
// import {CaretRight} from 'phosphor-react'

import {
  getCombinedPostsForHome,
  getAllToolsForHome,
  getRandomPostsForHome,
  getCommonQuery,
  getActiveSponsors,
} from "@/lib/api";
import { useIntl } from "react-intl";
import { transformPostListOld } from "@/lib/locale/transformLocale";
import { useEffect } from "react";

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
import ToolLargeCardRow from "@/components/v4/layout/ToolLargeCardRow";
import Link from "next/link";
import Button from "@/components/Primitives/Button";
// import GiantTag from "@/components/v4/tag/GiantTag";
// import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
// import TopicSubscription from "@/components/Settings/topicsSubscription";
import { TAB_ITEMS } from "@/lib/constants";
// import GiantTag from "@/components/v4/tag/GiantTag";
import HeroArticleSection from "@/components/v4/section/HeroArticleSection";
import TopicSectionHome from "@/components/v4/section/TopicSectionHome";
import ToolsCarouselSection from "@/components/v4/section/ToolsCarouselSection";

export default function Index({
  preview,
  allTools,
  topicRes,
  jobs,
  randomPosts,
  sponsors,
  heroPost,
  morePosts,
  popularTags
}) {
  const intl = useIntl();

  const titleText = intl.formatMessage({ id: "index.header.title" });
  const descriptionText = intl.formatMessage({ id: "intro.description" });

  useEffect(() => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
    }
  }, []);

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });
  // const HeroPostRandomSection = randomPosts.filter((item, i) => i === 0);
  // const OtherPostsRandomSection = randomPosts.filter((item, i) => i !== 0);
  const heroJob = jobs.filter((item, i) => i === 0);
  const jobsSidebar = jobs.filter((item, i) => i !== 0);

  const toolsList = allTools

  return (
    <>
      <Layout
        navOffset={false}
        padding={false}
        preview={preview}
        background={"#EFF4FB"}
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
        
          {(!user?.isLoggedIn)?
          <>
          <IntroBanner
            sponsor={sponsors?.length ? sponsors[0] : null}/>
          <SectionDivider py={'py-1 sm:py-2 md:py-5'} transparentLine={true} />
          </>
          :<div className="pt-[100px]"/>}
          <div className='relative z-50 -mt-2'>
            <TagsNavRow/>
          </div>
                {/* <SectionDivider py='py-9' transparentLine={true} /> */}
        <ToolsCarouselSection/>
        <SectionDivider py='py-4' transparentLine={true} />
        {/* <div className="z-50 relative bg-gradient-to-br from-[#EFF4FB] to-[#b8d1f4]/10 pb-12"> */}
        <div className="z-50 relative bg-[#EFF4FB]">
          <SectionDivider py='py-2' transparentLine={true} />
            <HeroArticleSection
              user={user}
              cols={3}
              // cols={3}
              heroCardPost={heroPost}
              viewablePosts={morePosts}
              jobsSidebar={jobsSidebar}
              // showBigPost={false}
              showBigPost={2}
            />
            {/* <DiscoverSection
              user={user}
              heroCardPost={heroPost}
              viewablePosts={morePosts}
              jobsSidebar={jobsSidebar}
            /> */}
        </div>

        <SectionDivider py='py-7' transparentLine={true} />
        
        <Container maxWidth="max-w-[1320px] z-30 relative">
          {/* <div className="p-6 md:p-6 bg-white relative overflow-hidden rounded-3xl shadow-md"> */}
          <div className="">
              <ToolLargeCardRow tools={toolsList.slice(0,4)} />
              <SectionDivider py="py-6" transparentLine={true}  />
              <ToolIconCardRow withBackground={true} tools={toolsList.slice(5,15)} />       

              
            
          {/* <div className="flex mt-10">
            <Link href="/toolbox">
              <Button className="rounded-full bg-blue-600 px-6 py-4 leading-none text-white" variant="confirmBig">
                Open toolbox
              </Button>
            </Link>
          </div>      */}
          </div>
        </Container>
        {/* <div className="mt-20 mb-8">
          <NewsletterSection/>
        </div> */}
        <SectionDivider py='py-6' transparentLine={true}  />
   
        {/* <SectionDivider />
        <div className="hidden md:block">
          <SponsorBannerFull/>
          <SectionDivider />
        </div> */}
        <SectionDivider py="py-6" transparentLine={true} />
        
        <Container padding={false} maxWidth="relative z-0">
        <div class="relative bottom-0 w-full z-0">
          <img class="w-full translate-y-[4px] z-0" src="/static/images/tilt-section2.svg"/>
          <div class="w-full h-[40px] md:h-[50px] translate-y-[2px] bg-[#dbeeff]">
            </div>
          </div>
        </Container>
        
        <div className="relative">

        {/* <TopicSelectSection topics={TAB_ITEMS} /> */}
        <Container maxWidth="w-full bg-[#dbeeff]  relative relative z-10">
        {/* <img src='/static/images/toolpattern.svg' style={{opacity:0.37}} className="absolute top-0 -mt-[200px] left-0 w-full h-[124%] object-cover"/> */}
        {/* <img src='/static/images/toolpattern.svg' style={{opacity:0.37}} className="absolute top-0 -mt-[150px] left-0 w-full h-[124%] object-cover"/> */}

          <div className="max-w-[1320px] mx-auto px-6 pb-8 ">
          <div className="flex justify-between mb-8">
              <h3 className="text-3xl text-black/90 font-semibold font-inter max-w-md leading-[32px]">
              Browse by <span className="text-underline">category</span>
              </h3>
              <div className="flex relative p-2">
            <div className="hidden sm:inline text-md text-blue-800 font-normal font-inter">
            <Link href={`/topics/`}>See all</Link>
            </div>
            <div className="my-auto">
              <Link href={`/topics/`}>
                <div className="bg-blue-200/60 outline outline-1 outline-blue-300/80 ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                    <ArrowRight weight="bold" size={14} className="text-blue-900 my-auto"/>
                </div>
              </Link>
            </div>
          </div>
                {/* <div className="my-auto">
                <Link href='/topics'>
                  <div className="flex">
                    <div className="text-sm my-auto text-black opacity-60">See all <span className="hidden md:inline-block">topics</span></div>
                    <CaretRight className="opacity-60 my-auto" size={16} />
                  </div>
                </Link>
                </div> */}

            </div>
            {/* <div className="flex justify-start w-full">
              <h2 className="md:text-[28px] text-left mb-10 pt-4 text-[20px] max-w-lg leading-snug md:leading-[40px] md:leading-[48px] font-semibold font-inter text-[#0F1F40] ">
           Explore Topics 
            </h2>
            </div> */}
            <div className="pt-4 rounded-xl flex flex-wrap">
            <Link href={"/"}>
            <div
              className={`inline-block capitalize text-sm pr-4 pl-2 py-2 cursor-pointer bg-blue-50/50 outline outline-1 outline-blue-300/60 rounded-full mr-5 mb-3 text-blue-900 font-medium`}
            >
              <div className="flex">
          <Compass weight={`regular`} className="my-auto p-0" size={20} />
            <div className="ml-2 my-auto">Explore all topics</div>
          </div>
            </div>
          </Link>
         
              {popularTags.map((topic, i) => (
                <div key={`topic_${i}`}>
                      <Link href={`/posts/${topic?.slug}/page/1/`}>
                    <div  className={`inline-block capitalize text-sm px-4 py-2 cursor-pointer bg-blue-50/50 outline outline-1 outline-blue-300/60 rounded-full mr-3 mb-3 text-blue-900 font-medium`}>
                      {topic?.name}
                    </div>
                  </Link>
                </div>
                      ))}
            </div>
            {/* <JumboTagsSection popularTags={popularTags}/> */}
            {/* <PopularTagsSection popularTags={popularTags}/> */}
          </div>
        </Container>
        </div>
         {/* <SectionDivider />
        <TopicSpotlightSection title={'Topic spotlight:'} tagline={'Open Web'}/> */}
        <div className="relative bg-gradient-to-b from-[#dbeeff] via-[#EFF4FB] via-10% to-[#EFF4FB]">

          {/* <SectionDivider py='py-6 pt-12' transparentLine={true} /> */}
          {/* <SectionDivider /> */}
          {TAB_ITEMS?.map((topic, index) => {
            return (
              <div key={`topicsection_${index}`} className="z-40">
              <TopicSectionHome
                tagline={topic.tagline}
                showSidebar={false}
                slug={topic.slug}
                icon={topic.icon}
                title={topic.name}
                HeroPostRandomSection={topicRes[topic.slug]?.posts[0]}
                OtherPostsRandomSection={topicRes[topic.slug]?.posts?.slice(1, 5)}
                heroJob={heroJob}
                sponsors={sponsors}
                toolsList={topicRes[topic.slug]?.tools.slice(0, 7)}
                authorsList={topicRes[topic.slug]?.authors}
              />
              
              
               
            <SectionDivider py="py-12" transparentLine={false}/>
            {index==1?
                <div className="-mt-8">
                    <NewsletterSection/>
                   <SectionDivider py="py-12" transparentLine={false}/>
                  </div>:''
              }

            {index==4?
                <div className="mt-0">
                  <Container  maxWidth="max-w-[1320px]">
                  <TwoColumnCards/> 
                  </Container>
                  <SectionDivider py="py-12" transparentLine={false}/>
                  </div>:''
              }
              </div>
            );
          })}

        <SectionDivider transparentLine={true}/>

        </div>
          {/* <BrowserView>
          <DesignTool allTools={toolsList} />
        </BrowserView> */}
      </Layout>
      {!user?.isLoggedIn && <StickyFooterCTA title="Welcome to Prototypr"
      description="Join today to make posts and grow with us."
      />}
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null, locale }) {
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  let allPosts = (await getCombinedPostsForHome(preview, 5, 0, sort)) || [];

  let randomPosts = (await getRandomPostsForHome()) || [];
  let toolCount = 20;
  let allTools =
    (await getAllToolsForHome(preview, toolCount, 0, ["featured:desc","date:desc"])) || [];

  let jobs = (await getAllJobs(null, 5, 1)) || [];
  let sponsors = await getActiveSponsors();

  // topic sections
  let topicRes = {};
  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
    const res =
      (await getCommonQuery(preview, [tag], "article", 12, 0, sort)) || [];
    
    const topicToolsRes =
      (await getCommonQuery(preview, [TAB_ITEMS[index].toolSlug], "tool", 5, 0, sort)) || [];

      //extract authors from the postss while we don't have an endpoint for it
    const authors = makeAuthorList(res)
   
    //shuffle so it's different each time
    shuffleArray(res.data)
    shuffleArray(authors)
    shuffleArray(topicToolsRes.data)
     
    const topicData = {authors:authors, posts:res.data, tools:topicToolsRes.data}
    topicRes[tag] = topicData
  }

  const popularTags = (await getPopularTopics({postType:'article', pageSize:34})) || [];


  allPosts = transformPostListOld(allPosts.data, locale);
  if(locale!=='es-ES'){
    shuffleArray(allPosts)
  }
  allTools = transformPostListOld(allTools.data, locale);
  // shuffleArray(allTools)
  // await generateCombinedRSS({ allPosts, allTools });
  // otherPosts = transformPostListOld(otherPosts.data, locale);
  return {
    props: {
      heroPost: allPosts[0],
      morePosts: allPosts.slice(1),
      allTools: allTools,
      popularTags,
      // otherPosts: otherPosts,
      // interviewPosts: interviews.data,
      topicRes,
      preview,
      jobs,
      randomPosts: randomPosts.slice(0, 8),
      sponsors: sponsors?.posts?.length ? sponsors?.posts : [],
    },
    revalidate: 20,
  };
}