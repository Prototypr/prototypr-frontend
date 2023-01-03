import dynamic from "next/dynamic";
import { useState } from "react";
import DiscoverSection from "@/components/v4/section/DiscoverSection";
import SectionDivider from "@/components/v4/section/SectionDivider";
import ToolIconCardRow from "@/components/v4/layout/ToolIconCardRow";
import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
import TrendingFullWidth from "@/components/homepage/TrendingFullWidth";
import IntroBanner from "@/components/v4/hero/IntroBanner";
/**new index components */
import { BrowserView } from "react-device-detect";
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

import generateCombinedRSS from "@/lib/rss/generateAllRSS";
import TopicSection from "@/components/v4/section/TopicSection";
import TopicsDiscoverSection from "@/components/v4/section/TopicsDiscoverSection";

const PAGE_SIZE = 12;

const TAB_ITEMS = [
  {
    slug: "branding",
    name: "topicSpotlight.tabs.branding",
  },
  {
    slug: "design-psychology",
    name: "topicSpotlight.tabs.psychology",
  },
  {
    slug: "ai",
    name: "topicSpotlight.tabs.ai",
  },
  {
    slug: "accessibility",
    name: "topicSpotlight.tabs.accessibility",
  },

  {
    slug: "product-design",
    name: "topicSpotlight.tabs.productDesign",
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

  const HeroPostRandomSection = randomPosts.filter((item, i) => i === 0);
  const OtherPostsRandomSection = randomPosts.filter((item, i) => i !== 0);
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
        background={"#F7F7F8"}
        // background={"#ffffff"}
        seo={{
          title: titleText,
          description: descriptionText,
          image: "",
          canonical: "https://prototypr.io",
          url: "https://prototypr.io",
        }}
      >
        <IntroBanner
          sponsor={sponsors?.length ? sponsors[0] : null}
          tools={first3Tools}
        />
        <DiscoverSection
          heroCardPost={heroCardPost}
          viewablePosts={viewablePosts}
          jobsSidebar={jobsSidebar}
        />

        <SectionDivider />
        <ToolIconCardRow tools={toolsList} />
        <SectionDivider />
        <TopicsDiscoverSection topics={TAB_ITEMS} />
        {/* <BrowserView>
          <DesignTool allTools={toolsList} />
        </BrowserView> */}

        <SectionDivider />
        {TAB_ITEMS?.map((topic, index) => {
          return (
            <TopicSection
              title={topic.name}
              HeroPostRandomSection={topicRes[topic.slug][0]}
              OtherPostsRandomSection={topicRes[topic.slug].slice(1, 5)}
              heroJob={heroJob}
              sponsors={sponsors}
              toolsList={toolsList}
            />
          );
        })}
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

  let topicRes = {};

  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
    const res =
      (await getCommonQuery(preview, [tag], "article", 5, 0, sort)) || [];
    topicRes[tag] = res.data;
  }

  allPosts = transformPostListOld(allPosts.data, locale);
  allTools = transformPostListOld(allTools.data, locale);

  await generateCombinedRSS({ allPosts, allTools });

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
