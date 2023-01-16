import dynamic from "next/dynamic";
import { useState } from "react";
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

import { getAllJobs, getPopularTopics } from "@/lib/api";

// import { HomePageNewNavBar } from "@/components/Navbar/Navbar";

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

import {Robot, Swatches, HandEye, Wheelchair, FlowArrow} from 'phosphor-react'
import NewsletterSection from "@/components/v4/section/NewsletterSection";
import { makeAuthorList, shuffleArray } from "@/lib/utils/postUtils";
import useUser from "@/lib/iron-session/useUser";
import TagsNavRow from "@/components/v4/section/TagsNavRow";
import SponsorBannerFull from "@/components/v4/banner/SponsorBannerFull";
// import TopicSpotlightSection from "@/components/v4/section/TopicSpotlightSection";
// import PopularTagsSection from "@/components/v4/section/PopularTagsSection";
import Container from "@/components/container";
import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";
import JumboTagsSection from "@/components/v4/section/JumboTagsSection";
import ToolLargeCardRow from "@/components/v4/layout/ToolLargeCardRow";
import Link from "next/link";
import Button from "@/components/Primitives/Button";


const PAGE_SIZE = 12;

const ICON_SIZE = 32
const TAB_ITEMS = [
  {
    slug: "branding",
    toolSlug:'color',
    name: "topicSpotlight.tabs.branding",
    icon:<Swatches size={ICON_SIZE} />,
    tagline:'Tell your story'
  },
  {
    slug: "design-psychology",
    toolSlug:'analytics',
    name: "topicSpotlight.tabs.psychology",
    icon:<HandEye size={ICON_SIZE} />,
    tagline:`Analyze your user`
  },
  {
    slug: "ai",
    toolSlug:'ai',
    name: "topicSpotlight.tabs.ai",
    icon:<Robot size={ICON_SIZE}/>,
    tagline:'The bots are here!'
  },
  {
    slug: "accessibility",
    toolSlug:'accessibility',
    name: "topicSpotlight.tabs.accessibility",
    icon:<Wheelchair size={ICON_SIZE} />,
    tagline:'Design inclusively'
  },

  {
    slug: "product-design",
    toolSlug:'resource',
    name: "topicSpotlight.tabs.productDesign",
    icon:<FlowArrow weight="duotone" size={ICON_SIZE} />,
    tagline:'Kick it off'
  },
  // {
  //   slug: "ux",
  //   name: "topicSpotlight.tabs.userWriting",
  // },
];

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
  const [heroCardPost, setHeroPost] = useState(heroPost);
  const [viewablePosts, setViewablePosts] = useState(morePosts);

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
        <SectionDivider transparentLine={true} />
        </>
        :''}
        <TagsNavRow/>
        <SectionDivider py='py-3.5' transparentLine={true} />
        <DiscoverSection
          user={user}
          heroCardPost={heroCardPost}
          viewablePosts={viewablePosts}
          jobsSidebar={jobsSidebar}
        />

       
        <SectionDivider py='py-6' transparentLine={true}  />
        <Container  maxWidth="max-w-[1320px]">
        <TwoColumnCards/> 
        </Container>
        <SectionDivider py='py-6' transparentLine={true} />
        <Container maxWidth="max-w-[1320px] z-30 relative">
          <div className="p-6 md:p-10 bg-white relative overflow-hidden rounded-xl shadow-sm">
              <ToolLargeCardRow tools={toolsList.slice(0,5)} />
              <SectionDivider py="py-6" transparentLine={true}  />
              <ToolIconCardRow tools={toolsList.slice(5,15)} />       

              
          <div className="flex mt-10">
            <Link href="/toolbox">
              <Button className="rounded-full bg-blue-600 text-white" variant="confirmBig">
                Open toolbox
              </Button>
            </Link>
          </div>     
          </div>
        </Container>
        {/* <SectionDivider />
        <div className="hidden md:block">
          <SponsorBannerFull/>
          <SectionDivider />
        </div> */}
        <SectionDivider py="py-6" transparentLine={true} />
        <Container padding={false} maxWidth="relative z-0">
        <div class="absolute bottom-0 w-full z-0">
          <img class="w-full translate-y-[4px] z-0" src="/static/images/tilt-section2.svg"/>
          <div class="w-full h-[100px] md:h-[100px] translate-y-[2px] bg-[#CCE6FF]">
            </div>
          </div>
        </Container>
        {/* <TopicSelectSection topics={TAB_ITEMS} /> */}
        <Container maxWidth="w-full bg-[#CCE6FF] rounded-b-[3.5rem] relative relative z-20">
        {/* <img src='/static/images/toolpattern.svg' style={{opacity:0.37}} className="absolute top-0 -mt-[200px] left-0 w-full h-[124%] object-cover"/> */}
        {/* <img src='/static/images/toolpattern.svg' style={{opacity:0.37}} className="absolute top-0 -mt-[150px] left-0 w-full h-[124%] object-cover"/> */}

          <div className="max-w-[1320px] mx-auto px-6 rounded-b-[3.5rem] pb-28 ">
            <div className="flex justify-start w-full">
              <h2 className="md:text-[32px] text-left mb-10 pt-4 text-[20px] max-w-lg leading-snug md:leading-[40px] md:leading-[48px] font-semibold font-inter text-[#0F1F40] ">
           From design to code, and everything in between 
            </h2>
            </div>
            <JumboTagsSection popularTags={popularTags}/>
            {/* <PopularTagsSection popularTags={popularTags}/> */}
          </div>
        </Container>
         {/* <SectionDivider />
        <TopicSpotlightSection title={'Topic spotlight:'} tagline={'Open Web'}/> */}
        <SectionDivider py='py-6' transparentLine={true} />
        {/* <SectionDivider /> */}
        {TAB_ITEMS?.map((topic, index) => {
          return (
            <>
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
            </>
          );
        })}
          {/* <BrowserView>
          <DesignTool allTools={toolsList} />
        </BrowserView> */}

      </Layout>
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

  const popularTags = (await getPopularTopics({postType:'article', pageSize:8})) || [];


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