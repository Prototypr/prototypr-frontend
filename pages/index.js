import dynamic from "next/dynamic";
import { useState } from "react";

import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
/**new index components */
import { BrowserView } from "react-device-detect";

const Footer = dynamic(() => import("@/components/footer"));
const DesignTool = dynamic(() => import("@/components/new-index/DesignTool"));

import { getAllJobs } from "@/lib/api";
import { HomePageNewNavBar } from "@/components/Navbar/Navbar";

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
    <div className="flex flex-col grid gap-1 justify-end items-end">
      <a href={data.url} target="_blank" className="w-full">
        <div className="w-full rounded-[12px] h-auto bg-white border border-opacity-10 p-3 grid grid-cols-3 gap-2">
          <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden col-span-1">
            <img src={data.src} />
          </div>
          <div className="w-full col-span-2 flex flex-col grid gap-1">
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

const PrototyprNetworkCTA = ({ data }) => {
  return (
    <div className="flex flex-col gap-1 justify-end items-end">
      <div className="w-full rounded-[12px] h-auto bg-white p-6 flex flex-col gap-3 ">
        <div className="flex flex-col gap-2">
          <p className="text-black text-2xl font-inter">
            An Open Platform <br /> for Writers
          </p>
          <div>
            <a href="/write">
              <button className="px-4 py-2 text-white rounded-lg font-inter bg-blue-500 text-sm">
                Start Writing
              </button>
            </a>
          </div>
        </div>
        <img
          className="w-full"
          src="/static/images/proto-little-peeps.svg"
        ></img>
      </div>
    </div>
  );
};

const TabSwitchter = ({ selectedTab, onTabChange }) => {
  return (
    <div className="h-[50px] my-3">
      <div className="overflow-x-scroll overflow-y-hidden no-scrollbar flex w-full ">
        <div className="flex">
          {Tabs.map((tab) => {
            return (
              <span
                onClick={() => onTabChange(tab)}
                className={`px-3 py-2 block font-inter tracking-tight font-normal cursor-pointer min-w-max cursor w-full text-base  mx-2 rounded-full ${
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

const Sidebar = ({ title, content = [], type }) => {
  const sponsorData = {
    src: "/static/images/placeholder/sponsor-cat.png",
    heading: "A playful todolist to help you get your stuff done.",
    url: "https://catadoo.com/",
  };

  let slicedList = [...content.slice(0, 3)];

  return (
    <div className="relative min-h-screen col-span-2 hidden lg:block">
      <aside className=" border-l border-opacity-20 h-screen px-5  sticky top-0 py-0">
        <div className="flex flex-col grid gap-10 py-10">
          {type === "jobs" ? (
            <div className="mt-[164px]">
              <PrototyprNetworkCTA data={sponsorData} />
            </div>
          ) : (
            <div className="mt-[0]">
              <PrototyprNetworkCTA data={sponsorData} />
            </div>
          )}

          <div className="w-full flex flex-col grid gap-2">
            {type === "tools" && (
              <>
                <div className="flex flex-row justify-between items-baseline">
                  <h3 className="font-inter my-2 font-medium text-sm">
                    {title}
                  </h3>
                  <a
                    href={type === "jobs" ? "/jobs" : "/toolbox"}
                    className="font-inter text-sm text-gray-500 cursor-pointer"
                  >
                    See more {title} {"->"}
                  </a>
                </div>
                <div className="flex flex-col grid gap-3">
                  {slicedList.map((item, i) => {
                    const { title, legacyFeaturedImage, tags } =
                      item.attributes;
                    return (
                      <div
                        key={i}
                        className="w-full h-[100px] bg-white py-4 px-4 rounded-lg border border-opacity-5 border-black flex flex-col grid gap-2"
                      >
                        <div className="flex flex-row">
                          <div className="w-12 h-12 mr-2 relative border border-opacity-10 border-black rounded-lg overflow-hidden">
                            <img
                              className="relative"
                              src={legacyFeaturedImage?.logoNew}
                            />
                          </div>
                          <div className="flex flex-col grid gap-2">
                            <p className="text-sm font-inter">{title}</p>

                            {/* <div className="overflow-x-scroll max-w-[200px] overflow-y-hidden no-scrollbar flex grid gap-1 w-full ">
                              <div className="flex grid gap-2">
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
                            </div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {type === "jobs" && (
              <div className="flex rounded-lg flex-col gap-0 p-4">
                <div className="flex flex-row justify-between items-baseline">
                  <h3 className="font-inter my-1 font-medium text-sm">
                    {title}
                  </h3>
                  <a
                    href={type === "jobs" ? "/jobs" : "/toolbox"}
                    className="font-inter text-sm text-gray-500 cursor-pointer"
                  >
                    See more {title} {"->"}
                  </a>
                </div>
                <div className="flex flex-col grid gap-4 my-2">
                  {slicedList.map((item, i) => {
                    const {
                      title,
                      companyName,
                      salaryText,
                      companyLogo,
                      locations,
                    } = item;
                    return (
                      <>
                        <div
                          key={i}
                          className="w-full h-auto cursor-pointer flex flex-col"
                        >
                          <div className="flex flex-row bg-white  p-4 rounded-lg">
                            <div className="w-12 h-12 mr-2 relative border border-opacity-10 border-black rounded-lg overflow-hidden">
                              <img className="relative" src={companyLogo} />
                            </div>
                            <div className="flex flex-col grid gap-1 justify-center">
                              <p className="text-xs font-inter">{title}</p>
                              <div className="flex flex-row gap-1 text-xs text-gray-500">
                                <p className=" font-inter">{companyName},</p>
                                <p className=" font-inter">
                                  {locations[0]?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* {i !== slicedList.length - 1 && (
                            <div className="border-b border-black border-opacity-10 w-[100%] mx-auto"></div>
                          )} */}
                        </div>
                      </>
                    );
                  })}
                </div>
                <a
                  href={"/jobs/post"}
                  className="w-full flex flex-row justify-end font-inter text-gray-500 hover:underline cursor-pointer my-2"
                >
                  <div className="text-xs inline-flex">
                    <div className="mr-1">Hiring? Post a Job</div>
                    <div>{"->"}</div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

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
      setViewablePosts(posts.slice(1, 7));
    }
  };

  //   console.log(randomPosts);
  const HeroPostRandomSection = randomPosts.filter((item, i) => i === 0);
  const OtherPostsRandomSection = randomPosts.filter((item, i) => i !== 0);

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
            <div className="flex flex-col pb-20 gap-2 col-span-8 lg:col-span-6  md:pr-4 py-10">
              <HomePageNewNavBar />
              <TabSwitchter
                selectedTab={currentTab}
                onTabChange={onTabChange}
              />
              <HeroGrid
                postData={{ hero: heroCardPost, posts: viewablePosts }}
                sponsor={sponsors?.length ? sponsors[0] : null}
              />
            </div>

            <Sidebar title="Jobs" type="jobs" content={jobs} />
          </div>
        </Container>

        <BrowserView>
          <DesignTool allTools={allTools} />
        </BrowserView>

        <Container>
          <div className="w-full h-full  grid grid-cols-8 gap-1">
            <div className="flex flex-col grid gap-4 col-span-8 lg:col-span-6 md:pr-4 py-10">
              <HeroGrid
                type="random"
                postData={{
                  hero: HeroPostRandomSection[0],
                  posts: OtherPostsRandomSection,
                }}
                sponsor={
                  sponsors?.length && sponsors.length > 1 ? sponsors[1] : null
                }
              />
            </div>

            <Sidebar title="Tools" type="tools" content={allTools} />
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

  let allPosts = (await getCombinedPostsForHome(preview, 7, 0, sort)) || [];
  let randomPosts = (await getRandomPostsForHome()) || [];
  let allTools =
    (await getAllToolsForHome(preview, PAGE_SIZE, 0, ["date:desc"])) || [];

  let jobs = (await getAllJobs(null, 4, 1)) || [];

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
      randomPosts: randomPosts.slice(0, 7),
      sponsors: sponsors?.posts?.length ? sponsors?.posts : [],
    },
    revalidate: 20,
  };
}
