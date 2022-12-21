import dynamic from "next/dynamic";
import { useState } from "react";


import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
import TrendingFullWidth from "@/components/homepage/TrendingFullWidth";
/**new index components */
import { BrowserView } from "react-device-detect";
import Sidebar from "@/components/homepage/Sidebar";
const Footer = dynamic(() => import("@/components/footer"));
const DesignTool = dynamic(() => import("@/components/new-index/DesignTool"));

import { getAllJobs } from "@/lib/api";
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

import HeroGrid from "@/components/v4/hero/hero";
import TabSwitcher from "@/components/homepage/TabSwitcher";

const TAB_ITEMS = [
  {
    slug: "branding",
    name: "topicSpotlight.tabs.accessibility",
  },
  {
    slug: "product-design",
    name: "topicSpotlight.tabs.userResearch",
  },
  {
    slug: "ux",
    name: "topicSpotlight.tabs.userWriting",
  },
  {
    slug: "ai",
    name: "topicSpotlight.tabs.vr",
  },
  {
    slug: "design-psychology",
    name: "topicSpotlight.tabs.code",
  },
];
const PAGE_SIZE = 12;



export default function Index({
  preview,
  allTools,
  jobs,
  randomPosts,
  sponsors,

  topicRes,
  heroPost,
  morePosts,
}) {
  const intl = useIntl();
  const [currentTab, setCurrentTab] = useState("top_picks");
  const [heroCardPost, setHeroPost] = useState(heroPost);
  const [viewablePosts, setViewablePosts] = useState(morePosts);

  const titleText = intl.formatMessage({ id: "index.header.title" });
  const descriptionText = intl.formatMessage({ id: "intro.description" });

  useEffect(() => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
    }
  }, []);

  const onTabChange = (tab) => {
    setCurrentTab(tab.id);
    if (tab.slug === "top_picks") {
      setHeroPost(heroPost);
      setViewablePosts(morePosts);
    } else {
      const posts = topicRes[tab.slug];
      setHeroPost(posts[0]);
      setViewablePosts(posts.slice(1, 8));
    }
  };

  //   console.log(randomPosts);
  const HeroPostRandomSection = randomPosts.filter((item, i) => i === 0);
  const OtherPostsRandomSection = randomPosts.filter((item, i) => i !== 0);
  const heroJob = jobs.filter((item, i) => i === 0);
  const jobsSidebar = jobs.filter((item, i) => i !== 0);

  const first3Tools = allTools.slice(0, 3)
  const toolsList = allTools.slice(3, allTools.length)

  return (
    <>
      <Layout
        padding={false}
        preview={preview}
        // background={"#EFF4FB"}
        background={"#ffffff"}
        seo={{
          title: titleText,
          description: descriptionText,
          image: "",
          canonical: "https://prototypr.io",
          url: "https://prototypr.io",
        }}
      >
        <TrendingFullWidth sponsor={sponsors?.length ? sponsors[0] : null} tools={first3Tools}/>
        <Container maxWidth='max-w-[984px]'>
          {/* <Intro /> */}
          <div className="w-full h-full grid grid-cols-12 flex justify-center">
            <div className="w-full max-w-full flex flex-col pb-20 gap-2 col-span-12 lg:col-span-8 lg:pr-8 py-3">
              {/* <HomePageNewNavBar /> */}
              <TabSwitcher
                selectedTab={currentTab}
                onTabChange={onTabChange}
              />
              <HeroGrid
                postData={{ hero: heroCardPost, posts: viewablePosts }}
                sponsor={sponsors?.length ? sponsors[0] : null}
                jobFeature={heroJob}
              />
            </div>

            <Sidebar
              paddingTop="hidden ml-4 md:block pt-10"
              title="Jobs"
              type="jobs"
              content={jobsSidebar}
            />
          </div>
        </Container>

        <BrowserView>
          <DesignTool allTools={toolsList} />
        </BrowserView>

        <Container maxWidth='max-w-[984px]'>
        <div className="w-full mt-8 h-full grid grid-cols-12 flex justify-center">
            <div className="w-full max-w-full flex flex-col pb-20 gap-2 col-span-12 lg:col-span-8 lg:pr-8 py-3">
            <h1 className="font-semibold mb-3 px-4 md:px-0">More to explore</h1>

              <HeroGrid
                showTrending={true}
                type="random"
                postData={{
                  hero: HeroPostRandomSection[0],
                  posts: OtherPostsRandomSection,
                }}
                jobFeature={heroJob}
                sponsor={
                  sponsors?.length && sponsors.length > 1 ? sponsors[1] : null
                }
              />
            </div>

            <Sidebar 
            paddingTop="hidden ml-4 md:block pt-12 mt-2"
            title="Tools" type="tools" content={toolsList} />
          </div>
        </Container>
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

  let allPosts = (await getCombinedPostsForHome(preview, 8, 0, sort)) || [];
  let randomPosts = (await getRandomPostsForHome()) || [];
  let allTools =
    (await getAllToolsForHome(preview, PAGE_SIZE, 0, ["date:desc"])) || [];

  let jobs = (await getAllJobs(null, 5, 1)) || [];

  let sponsors = await getActiveSponsors();

  let topicRes = {};

  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
    const res =
      (await getCommonQuery(preview, [tag], "article", 9, 0, sort)) || [];
    topicRes[tag] = res.data;
  }

  allPosts = transformPostListOld(allPosts.data, locale);
  allTools = transformPostListOld(allTools.data, locale);
  // otherPosts = transformPostListOld(otherPosts.data, locale);
  return {
    props: {
      heroPost: allPosts[0],
      morePosts: allPosts.slice(1),
      allTools: allTools,
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
