import dynamic from "next/dynamic";
import { useState } from "react";

import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
/**new index components */
import { BrowserView } from "react-device-detect";

// const Intro = dynamic(() => import("@/components/new-index/Intro"));
const Footer = dynamic(() => import("@/components/footer"));
const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
// import EditorPick2 from "@/components/new-index/EditorPick2";
const ProductList = dynamic(() => import("@/components/new-index/ProductList"));
const DesignTool = dynamic(() => import("@/components/new-index/DesignTool"));
const SourcePanel = dynamic(() => import("@/components/new-index/SourcePanel"));
const TopicSpotlights = dynamic(() =>
  import("@/components/new-index/TopicSpotlights")
);
const Aspiring = dynamic(() => import("@/components/new-index/Aspiring"));
const Feeds = dynamic(() => import("@/components/new-index/Feeds"));

import {
  getCombinedPostsForHome,
  getAllToolsForHome,
  getCommonQuery,
} from "@/lib/api";
import { useIntl } from "react-intl";
import { transformPostListOld } from "@/lib/locale/transformLocale";
import { useEffect } from "react";

import HeroGrid from "@/components/v4/hero/hero";

const Tabs = [
  { label: "Top Picks", color: "#4053FF", id: "top_picks", slug: "top_picks" },
  { label: "Branding", color: "#FFC10F", id: "branding", slug: "branding" },
  {
    label: "Product Design",
    color: "#FE9BE8",
    id: "product_design",
    slug: "product-design",
  },
  { label: "UX Design", color: "#9360FF", id: "ux", slug: "ux" },

  { label: "AI", color: "#4053FF", id: "vr", slug: "ai" },
  {
    label: "Psychology",
    color: "#22AA79",
    id: "service",
    slug: "design-psychology",
  },
];

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

const SponsorCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-1 justify-end items-end">
      <a href={data.url} target="_blank" className="w-full">
        <div className="w-full rounded-[12px] h-auto bg-white border border-opacity-10 p-3 grid grid-cols-3 gap-2">
          <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden col-span-1">
            <img src={data.src} />
          </div>
          <div className="w-full col-span-2 flex flex-col gap-1">
            <p className="w-auto max-w-[150px] text-[#6B6B6B] font-medium tracking-[-0.1px] text-[13px] font-inter ">
              {data.heading}
            </p>
            <div>
              <span className="text-[10px] px-3 py-1 bg-[#FFF7E1] border border-yellow-700 border-opacity-10 rounded-full">
                Sponsored
              </span>
            </div>
          </div>
        </div>
      </a>
      <a href={"/sponsor"}>
        <span className="text-[12px] text-gray-500">Want to sponsor?</span>
      </a>
    </div>
  );
};

const TabSwitchter = ({ selectedTab, onTabChange }) => {
  return (
    <div className="h-[50px]">
      <div className="overflow-x-scroll overflow-y-hidden no-scrollbar flex w-full ">
        <div className="flex">
          {Tabs.map((tab) => {
            return (
              <span
                onClick={() => onTabChange(tab)}
                className={`px-6 block font-medium cursor-pointer min-w-max cursor w-full text-xs py-2 mx-2 rounded-full ${
                  selectedTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-gray-500"
                }  border hover:bg-blue-600 hover:text-white`}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ title, content = [] }) => {
  const sponsorData = {
    src: "/static/images/placeholder/sponsor-cat.png",
    heading: "A playful todolist to help you get your stuff done.",
    url: "https://catadoo.com/",
  };

  let slicedList = content.slice(0, 4);

  return (
    <div className="relative min-h-screen col-span-2">
      <aside className=" border-l border-opacity-20 h-screen px-5  sticky top-0 py-0">
        <div className="flex flex-col gap-10 py-10">
          <SponsorCard data={sponsorData} />
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row justify-between items-baseline">
              <h3 className="font-inter my-2 font-medium text-sm">{title}</h3>
              <a className="font-inter text-sm text-gray-500 cursor-pointer">
                See more {title} {"->"}
              </a>
            </div>
            <div className="flex flex-col gap-3">
              {slicedList.map((item, i) => {
                const { title, legacyFeaturedImage, tags } = item.attributes;
                return (
                  <div
                    key={i}
                    className="w-full h-[100px] bg-white py-4 px-4 rounded-lg border border-opacity-5 border-black flex flex-col gap-2"
                  >
                    <div className="flex flex-row gap-2">
                      <div className="w-12 h-12 relative border border-opacity-10 border-black rounded-lg overflow-hidden">
                        <img
                          className="relative"
                          src={legacyFeaturedImage?.logoNew}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-inter">{title}</p>

                        <div className="overflow-x-scroll max-w-[200px] overflow-y-hidden no-scrollbar flex gap-1 w-full ">
                          <div className="flex gap-2">
                            {tags?.data?.map((x, i) => {
                              const item = x?.attributes;

                              return (
                                <span
                                  key={i}
                                  className={`px-3 block rounded-sm bg-gray-200 font-inter cursor-pointer min-w-max cursor w-full text-[10px] py-[2px] `}
                                >
                                  {item.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default function Index({
  preview,
  allTools,
  otherPosts,
  interviewPosts,
  topicRes,
  heroPost,
  morePosts,
}) {
  const intl = useIntl();
  const [currentTab, setCurrentTab] = useState("top_picks");
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
      setViewablePosts(morePosts);
    } else {
      const posts = topicRes[tab.slug];
      console.log("setting new posts -", tab.slug, posts);
      setViewablePosts(posts);
    }
  };

  return (
    <>
      <Layout
        padding={false}
        preview={preview}
        background={"#EFF4FB"}
        seo={{
          title: titleText,
          description: descriptionText,
          image: "",
          canonical: "https://prototypr.io",
          url: "https://prototypr.io",
        }}
      >
        <Container>
          {/* <Intro /> */}
          <div className="w-full h-full grid grid-cols-8 gap-1  ">
            <div className="flex flex-col pb-20 gap-2 col-span-6  pr-4 py-10">
              <TabSwitchter
                selectedTab={currentTab}
                onTabChange={onTabChange}
              />
              <HeroGrid postData={{ hero: heroPost, posts: viewablePosts }} />
            </div>

            <Sidebar title="Jobs" />
          </div>
        </Container>

        <BrowserView>
          <DesignTool allTools={allTools} />
        </BrowserView>

        <Container>
          <div className="w-full h-full  grid grid-cols-8 gap-1">
            <div className="flex flex-col gap-4 col-span-6  pr-4 py-10">
              <HeroGrid postData={{ hero: heroPost, posts: morePosts }} />
            </div>

            <Sidebar title="Tools" content={allTools} />
          </div>
        </Container>

        {/* <BrowserView>
          <TopicSpotlights tabs={TAB_ITEMS} topics={topicRes} />
        </BrowserView> */}
        {/* <Container>
          <SourcePanel title={sourcePanelTitle} desc={sourcePanelDescription} />

          <Aspiring posts={interviewPosts} />
          <Feeds posts={otherPosts} />
        </Container> */}
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

  let allPosts = (await getCombinedPostsForHome(preview, 7, 0, sort)) || [];
  let allTools =
    (await getAllToolsForHome(preview, PAGE_SIZE, 0, ["date:desc"])) || [];
  let otherPosts = (await getCombinedPostsForHome(preview, 9, 8, sort)) || [];
  const interviews =
    (await getCommonQuery(preview, ["interview"], "article", 4, 0, sort)) || [];
  let topicRes = {};

  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
    const res =
      (await getCommonQuery(preview, [tag], "article", 6, 0, sort)) || [];
    topicRes[tag] = res.data;
  }

  allPosts = transformPostListOld(allPosts.data, locale);
  allTools = transformPostListOld(allTools.data, locale);
  otherPosts = transformPostListOld(otherPosts.data, locale);

  return {
    props: {
      heroPost: allPosts[0],
      morePosts: allPosts.slice(1),
      allTools: allTools,
      otherPosts: otherPosts,
      interviewPosts: interviews.data,
      topicRes,
      preview,
    },
    revalidate: 20,
  };
}
