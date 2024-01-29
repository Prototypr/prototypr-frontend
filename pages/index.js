import dynamic from "next/dynamic";
// import { useState } from "react";
import DiscoverSection from "@/components/v4/section/DiscoverSectionB";
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

// import { HomePageNewNavBar } from "@/components/Navbar/Navbar";
import {CaretRight} from 'phosphor-react'

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

import TopicSectionC from "@/components/v4/section/TopicSectionC";
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
import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";
import { MotionSliderToolCard } from "@/components/toolbox/ToolboxHeroWithEmailSignup";
// import GiantTag from "@/components/v4/tag/GiantTag";
// import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
// import TopicSubscription from "@/components/Settings/topicsSubscription";
import { TAB_ITEMS, ProductListData, ProductListData2 } from "@/lib/constants";

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
        <div className="z-50 relative pt-[40px]">
          <div className="text-xs font-medium mb-2 text-center text-gray-500/90 uppercase">Prototypr Toolbox</div>
          <h2 className="text-3xl font-bold mb-[42px] text-center text-gray-800">Tools to shape every idea</h2>
            <div className="pb-3">
              <MotionSlider
                  duration={50}
                  slides={ProductListData.map((data, i) => {
                    return (
                      <MotionSliderToolCard
                        title={data.title}
                        slug={data.slug}
                        subtext={data.description}
                        image={data.image}
                      />
                    );
                  })}
                />
            </div>
            <div className="pt- ">
              <MotionSlider
                duration={35}
                slides={ProductListData2.map((data, i) => {
                  return (
                    <MotionSliderToolCard
                      slug={data.slug}
                      title={data.title}
                      subtext={data.description}
                      image={data.image}
                    />
                  );
                })}
              />
            </div>
            <div className="w-full flex mt-2 -mb-6 justify-center">
            <div variant="ghostSmallBlue" className="rounded-full mb-[42px] mt-4">Get the newsletter</div>
          </div>
        </div>
        <SectionDivider py='py-4' transparentLine={true} />
        <div className="z-50 relative bg-[#EFF4FB]">
          <SectionDivider py='py-3.5' transparentLine={true} />
            <DiscoverSection
              user={user}
              heroCardPost={heroPost}
              viewablePosts={morePosts}
              jobsSidebar={jobsSidebar}
            />
        </div>

        <SectionDivider py='py-6' transparentLine={true} />
        
        <Container maxWidth="max-w-[1320px] z-30 relative">
          <div className="p-6 md:p-10 bg-white relative overflow-hidden rounded-xl shadow-sm">
              <ToolLargeCardRow tools={toolsList.slice(0,5)} />
              <SectionDivider py="py-6" transparentLine={true}  />
              <ToolIconCardRow tools={toolsList.slice(5,15)} />       

              
          <div className="flex mt-10">
            <Link href="/toolbox">
              <Button className="rounded-full bg-blue-600 px-6 py-4 leading-none text-white" variant="confirmBig">
                Open toolbox
              </Button>
            </Link>
          </div>     
          </div>
        </Container>
        
        <SectionDivider py='py-6' transparentLine={true}  />
        <Container  maxWidth="max-w-[1320px]">
        <TwoColumnCards/> 
        </Container>
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
        {/* <TopicSelectSection topics={TAB_ITEMS} /> */}
        <Container maxWidth="w-full bg-[#dbeeff]  rounded-b-[3.5rem] relative relative z-10">
        {/* <img src="/static/images/bendy9.svg" className="absolute bottom-0 -mb-[12%] mb-12 z-20 left-0 w-full"/> */}
        {/* <img src='/static/images/toolpattern.svg' style={{opacity:0.37}} className="absolute top-0 -mt-[200px] left-0 w-full h-[124%] object-cover"/> */}
        {/* <img src='/static/images/toolpattern.svg' style={{opacity:0.37}} className="absolute top-0 -mt-[150px] left-0 w-full h-[124%] object-cover"/> */}

          <div className="max-w-[1320px] mx-auto px-6 pb-16 ">
          <div className="flex justify-between mb-8">
              <h3 className="text-[24px] text-[#0F1F40] font-semibold font-inter max-w-md leading-[32px]">
              Explore Topics
              </h3>
                <div className="my-auto">
                <Link href='/topics'>
                  <div className="flex">
                    <div className="text-sm my-auto text-black opacity-60">See all topics</div>
                    <CaretRight className="opacity-60 my-auto" size={16} />
                  </div>
                </Link>
                </div>

            </div>
            {/* <div className="flex justify-start w-full">
              <h2 className="md:text-[28px] text-left mb-10 pt-4 text-[20px] max-w-lg leading-snug md:leading-[40px] md:leading-[48px] font-semibold font-inter text-[#0F1F40] ">
           Explore Topics 
            </h2>
            </div> */}
            <div className="pt-4 rounded-xl flex flex-wrap">
              {popularTags.map((topic, i) => (
                <div key={`topic_${i}`}>
                      <Link href={`/posts/${topic?.slug}/page/1/`}>
                    <div  className={`inline-block capitalize text-sm px-4 py-2 cursor-pointer bg-[#d0e3fe] rounded-full mr-3 mb-3 text-gray-800 font-medium`}>
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
         {/* <SectionDivider />
        <TopicSpotlightSection title={'Topic spotlight:'} tagline={'Open Web'}/> */}
        <SectionDivider py='py-6 pt-12' transparentLine={true} />
        {/* <SectionDivider /> */}
        {TAB_ITEMS?.map((topic, index) => {
          return (
            <div key={`topicsection_${index}`} className="z-40">
            <TopicSectionC
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
              {index!==TAB_ITEMS.length-1?
                <>
                {/* <SectionDivider /> */}
                <div className="w-full pb-16"></div>
                </>
                :<div className="w-full pb-16"></div>
                }
               {index==1?
               <div className="-mt-8">
                  <NewsletterSection/>
                {/* <SectionDivider /> */}
                <div className="w-full pb-16"></div>
                </div>:''
            }
            </div>
          );
        })}
          {/* <BrowserView>
          <DesignTool allTools={toolsList} />
        </BrowserView> */}

      </Layout>
      {!user?.isLoggedIn && <StickyFooterCTA title="Get the latest stories"
      description="Earn rewards, get published, and collect tools."
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
      (await getCommonQuery(preview, [TAB_ITEMS[index].toolSlug], "tool", 12, 0, sort)) || [];

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