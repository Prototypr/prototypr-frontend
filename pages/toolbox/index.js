import Layout from "@/components/new-index/layoutForIndex";

import {
  getAllPostsForToolsPage,
  getCommonQuery,
  getPostsByPageForToolsPage,
} from "@/lib/api";
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";

// import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";
import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";
import ToolsTagsNavRow from "@/components/v4/section/ToolsTagsNavRow";
import TwoColumnCards from "@/components/v4/layout/TwoColumnCards";
import ToolsLayout from "@/components/v4/layout/toolbox/ToolsLayout";
import ToolIconCard from "@/components/v4/card/ToolIconCard";
import Container from "@/components/container";
import Link from "next/link";
import { CaretRight } from "phosphor-react";
import TopicSection from "@/components/v4/section/TopicSection";
import SectionDivider from "@/components/v4/section/SectionDivider";
import NewsletterSection from "@/components/v4/section/NewsletterSection";
import HeadingSeeAllRow from "@/components/v4/text/HeadingSeeAllRow";
import { useIntl } from "react-intl";
import Footer from "@/components/footer";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/v4/card/ToolCard";
import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";
import ToolBoxHero from "@/components/toolbox/toolboxHero";

const TAB_ITEMS = [
  {
    slug: "ai",
    toolSlug: "ai",
    name: "topicSpotlight.tabs.ai",
    subheader: "Here come the bots!",
    image: "/static/images/toolbox/bot-pattern.svg",
    color: "#ED7DFF",
  },
  {
    slug: "accessibility",
    toolSlug: "accessibility",
    name: "topicSpotlight.tabs.accessibility",
    subheader: "Make your interfaces usable for all",
    image: "/static/images/toolbox/leaf-pattern.svg",
    color: "#2F9A75",
  },
  {
    slug: "design-system",
    toolSlug: "design-system",
    name: "topicSpotlight.tabs.designSystems",
    subheader: "Everything starts with a component",
    image: "/static/images/toolbox/planet-pattern.svg",
    color: "#06195E",
  },

  {
    slug: "ux-tools",
    toolSlug: "ux",
    name: "topicSpotlight.tabs.uxTools",
    subheader: "Everything starts with a component",
    image: "/static/images/toolbox/shape-pattern.svg",
    color: "#353535",
  },
];
const PAGE_SIZE = 20;

export default function ToolboxPage({ allPosts = [], topicPosts = [] }) {
  const intl = useIntl();

  return (
    <>
      <Layout
        padding={false}
        topPadding={false}
        maxWidth={"max-w-[1400px] search-wide"}
        background={"#F1F3F9"}
        seo={{
          title: `Prototypr Toolbox - new design, UX and coding tools`,
          description:
            "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
          canonical: `https://prototypr.io/toolbox`,
          url: `https://prototypr.io/toolbox`,
        }}
        activeNav={"toolbox"}
      >
        <ToolBoxHero />
        <div className="w-full pb-14">
          <div className="w-full h-auto gridBg rounded-2xl bg-[#3574F0] max-w-7xl mx-auto p-5">
            <div className="flex flex-col gap-2 justify-between ">
              <h3 className="font-normal text-[24px] text-white text-opacity-70">
                Got a design or developer tool? Launch with us
              </h3>
              <div>
                <button className="px-6 py-4 font-medium bg-white rounded-full text-black text-xs">
                  Launch a Tool {"->"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <ToolsTagsNavRow />
        </div>
        <Container maxWidth="max-w-[1320px] pb-20">
          <HeadingSeeAllRow
            link="/toolbox/page/1"
            title="Featured tools"
            subheader="Discover handpicked weekly tools."
          />

          {allPosts.length > 0 && (
            <>
              <TwoColumnCards
                image={"/static/images/toolbox/toolbox-main.svg"}
                color="#3574F0"
                posts={allPosts.slice(0, 2)}
                repeat={false}
                imageSize={"cover"}
                backgroundPosition={"center center"}
                content={{
                  title: "Explore our Toolbox",
                  description:
                    "Discover new tools that can help you become a better designer.",
                }}
              />
              <div className="py-6">
                <ToolCard
                  posts={allPosts.slice(2, allPosts.length)}
                  type="toolbox"
                  columns={"grid-cols-2"}
                />
              </div>
            </>
          )}

          <SectionDivider />
          <div className="-mt-8">
            <NewsletterSection />
            <SectionDivider />
          </div>
          {TAB_ITEMS?.map((topic, index) => {
            const titleText = intl.formatMessage({
              id: topicPosts[topic.slug].title,
            });
            const subheading = intl.formatMessage({
              id: topicPosts[topic.slug].subheader,
            });
            return (
              <>
                <HeadingSeeAllRow
                  link="/toolbox/page/1"
                  title={titleText}
                  subheader={subheading}
                />
                <TwoColumnCards
                  posts={topicPosts[topic.slug].posts?.slice(0, 2)}
                  image={topic.image}
                  color={topic.color}
                />
                {/* <ToolsLayout posts={topicPosts[topic.slug].posts?.slice(2,allPosts.length)} type="toolbox" /> */}
                <div className="py-6">
                  <ToolCard
                    posts={topicPosts[topic.slug].posts?.slice(
                      2,
                      allPosts.length
                    )}
                    columns={"grid-cols-2"}
                    type="toolbox"
                  />
                </div>
                {index !== TAB_ITEMS.length - 1 ? <SectionDivider /> : ""}
              </>
            );
          })}
        </Container>
      </Layout>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null, params, locale }) {
  // let sort = ["featured:desc","promoted:asc", "tier:asc","date:desc"];
  let sort = ["featured:asc", "date:desc"];
  if (locale === "es-ES") {
    sort = ["esES:asc", "date:desc"];
  }
  const pageSize = 8;
  const page = 1;
  const allPosts =
    (await getPostsByPageForToolsPage(preview, pageSize, page, sort)) || [];

  // topic sections
  let topicRes = {};
  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
    const topicToolsRes =
      (await getCommonQuery(
        preview,
        [TAB_ITEMS[index].toolSlug],
        "tool",
        11,
        0,
        sort
      )) || [];

    topicRes[tag] = {
      posts: topicToolsRes.data,
      title: TAB_ITEMS[index].name,
      subheader: TAB_ITEMS[index].subheader,
    };
  }

  return {
    props: {
      allPosts: allPosts.data,
      topicPosts: topicRes,
    },
    revalidate: 20,
  };
}
