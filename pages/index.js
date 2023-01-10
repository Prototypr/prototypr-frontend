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

import TopicSection from "@/components/v4/section/TopicSection";
// import TopicSelectSection from "@/components/v4/section/TopicSelectSection";

import {Robot, Swatches, HandEye, Wheelchair, FlowArrow} from 'phosphor-react'
import NewsletterSection from "@/components/v4/section/NewsletterSection";
import { makeAuthorList, shuffleArray } from "@/lib/utils/postUtils";
import useUser from "@/lib/iron-session/useUser";
import TagsNavRow from "@/components/v4/section/TagsNavRow";
import SponsorBannerFull from "@/components/v4/banner/SponsorBannerFull";
import TopicSpotlightSection from "@/components/v4/section/TopicSpotlightSection";
import PopularTagsSection from "@/components/v4/section/PopularTagsSection";
import Container from "@/components/container";
import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";


const PAGE_SIZE = 12;

const ICON_SIZE = 32
const TAB_ITEMS = [
  {
    slug: "branding",
    toolSlug:'color',
    name: "topicSpotlight.tabs.branding",
    icon:<Swatches size={ICON_SIZE} />
  },
  {
    slug: "design-psychology",
    toolSlug:'analytics',
    name: "topicSpotlight.tabs.psychology",
    icon:<HandEye size={ICON_SIZE} />
  },
  {
    slug: "ai",
    toolSlug:'ai',
    name: "topicSpotlight.tabs.ai",
    icon:<Robot size={ICON_SIZE}/>
  },
  {
    slug: "accessibility",
    toolSlug:'accessibility',
    name: "topicSpotlight.tabs.accessibility",
    icon:<Wheelchair size={ICON_SIZE} />
  },

  {
    slug: "product-design",
    toolSlug:'resource',
    name: "topicSpotlight.tabs.productDesign",
    icon:<FlowArrow size={ICON_SIZE} />
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

  const first3Tools = allTools.slice(0, 5);
  const toolsList = allTools.slice(5, allTools.length);

  return (
    <>
      <Layout
        padding={false}
        preview={preview}
        // background={"#EFF4FB"}
        // background={"#F7F7F8"}
        background={"#ffffff"}
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
          sponsor={sponsors?.length ? sponsors[0] : null}
          tools={first3Tools}
        />
        <SectionDivider transparentLine={true} />
        </>
        :''}
        <TagsNavRow/>
        <DiscoverSection
          user={user}
          heroCardPost={heroCardPost}
          viewablePosts={viewablePosts}
          jobsSidebar={jobsSidebar}
        />

       
        <SectionDivider  />
        <Container  maxWidth="max-w-[1320px]">
        <TwoColumnCards posts={morePosts.slice(0,2)}/> 
        </Container>
        <SectionDivider transparentLine={true} />
        <ToolIconCardRow tools={toolsList} />
        <SectionDivider />
        <SponsorBannerFull/>
        <SectionDivider />
        <SectionDivider transparentLine={true} />
        {/* <TopicSelectSection topics={TAB_ITEMS} /> */}
        <Container  maxWidth="max-w-[1320px]">
          <h2 className="text-3xl mb-6 font-bold text-gray-900">
          Browse by <span className="text-gray-500">topic</span>
          </h2>
          <PopularTagsSection popularTags={popularTags}/>
        </Container>
         {/* <SectionDivider />
        <TopicSpotlightSection title={'Topic spotlight:'} tagline={'Open Web'}/> */}
        <SectionDivider transparentLine={true} />
        <SectionDivider />
        {TAB_ITEMS?.map((topic, index) => {
          return (
            <>
            <TopicSection
              slug={topic.slug}
              icon={topic.icon}
              title={topic.name}
              HeroPostRandomSection={topicRes[topic.slug]?.posts[0]}
              OtherPostsRandomSection={topicRes[topic.slug]?.posts?.slice(1, 5)}
              heroJob={heroJob}
              sponsors={sponsors}
              toolsList={topicRes[topic.slug]?.tools.slice(0, 8)}
              authorsList={topicRes[topic.slug]?.authors}
            />
              {index!==TAB_ITEMS.length-1?
                <SectionDivider />:<div className="w-full pb-16"></div>}
               {index==1?
               <div className="-mt-8">
                  <NewsletterSection/>
                <SectionDivider />
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
    (await getAllToolsForHome(preview, toolCount, 0, ["date:desc"])) || [];

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
  shuffleArray(allTools)

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