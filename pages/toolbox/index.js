import Layout from "@/components/new-index/layoutForIndex";

import {
  getAllPostsForToolsPage,
  getCommonQuery,
  getPostsByPageForToolsPage,
} from "@/lib/api";
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexNew";
import {
  getAllPostsForToolsPage,
  getCommonQuery,
  getPostsByPageForToolsPage,
} from "@/lib/api";
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

const TAB_ITEMS = [
  {
    slug: "ai",
    toolSlug: "ai",
    name: "topicSpotlight.tabs.ai",
    subheader: "Here come the bots!",
    // icon:<Robot size={ICON_SIZE}/>
  },
  {
    slug: "accessibility",
    toolSlug: "accessibility",
    name: "topicSpotlight.tabs.accessibility",
    subheader: "Make your interfaces usable for all",
    // icon:<Wheelchair size={ICON_SIZE} />
  },
  {
    slug: "design-system",
    toolSlug: "design-system",
    name: "topicSpotlight.tabs.designSystems",
    subheader: "Everything starts with a component",
    // icon:<Wheelchair size={ICON_SIZE} />
  },
];
const PAGE_SIZE = 20;

const BREADCRUMBS = {
  pageTitle: "Toolbox",
  links: [
    {
      name: "Home",
      slug: "/",
      svg: (
        <svg
          className="w-4 h-4 inline my-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ],
};

const ToolBoxHero = () => {
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full h-[600px] ">
        <div className="max-w-7xl mx-auto grid place-items-center h-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-[52px] leading-[63px] font-bold">
              Discover Tools, <br /> make life easier.
            </h1>
            <div>
              <input
                style={{
                  boxShadow:
                    "0px 100px 80px rgba(0, 0, 0, 0.00696822), 0px 30.1471px 24.1177px rgba(0, 0, 0, 0.01), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.0130318), 0px 4.5288px 3.62304px rgba(0, 0, 0, 0.02)",
                }}
                type="text"
                className="max-w-[400px] rounded-[12px] h-[72px] px-4 w-[400px] border-2 border-[#E6E6E6] bg-white"
                placeholder="Search over 15,000+ Tools..."
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full py-5 h-auto flex flex-col gap-2">
        <div className="grid grid-cols-5 gap-4">
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default function ToolboxPage({ allPosts = [], topicPosts = [] }) {
  const intl = useIntl();

  return (
    <>
      <Layout
        maxWidth={"max-w-[1400px] search-wide"}
        seo={{
          title: `Prototypr Toolbox - new design, UX and coding tools`,
          description:
            "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
          //   image: "",
          canonical: `https://prototypr.io/toolbox`,
          url: `https://prototypr.io/toolbox`,
        }}
        activeNav={"toolbox"}
      >
        <ToolsTagsNavRow />
        <Container maxWidth="max-w-[1320px] pb-20">
          <HeadingSeeAllRow
            link="/toolbox/page/1"
            title="Featured tools"
            extraTextHighlight="for creators"
          />

          {allPosts.length > 0 && (
            <>
              <TwoColumnCards posts={allPosts.slice(0, 2)} />
              <div className="py-6">
                <ToolCard
                  posts={allPosts.slice(2, allPosts.length)}
                  type="toolbox"
                />
              </div>
            </>
          )}
          <SectionDivider />
          <div className="-mt-8">
            <NewsletterSection />
            <SectionDivider />
          </div>

          <div>
            {TAB_ITEMS.map((topic, index) => {
              const titleText = intl.formatMessage({
                id: topicPosts[topic.slug].title,
              });
              const subheading = intl.formatMessage({
                id: topicPosts[topic.slug].subheader,
              });
              return (
                <>
                  <TwoColumnCards posts={allPosts.slice(0, 2)} />
                  <ToolsLayout
                    posts={allPosts.slice(2, allPosts.length)}
                    type="toolbox"
                  />
                </>
              );
            })}
          </div>

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
                />
                {/* <ToolsLayout posts={topicPosts[topic.slug].posts?.slice(2,allPosts.length)} type="toolbox" /> */}
                <div className="py-6">
                  <ToolCard
                    posts={topicPosts[topic.slug].posts?.slice(
                      2,
                      allPosts.length
                    )}
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
