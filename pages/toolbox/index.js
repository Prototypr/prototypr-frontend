import Layout from "@/components/new-index/layoutForIndex";

import { getAllPostsForToolsPage, getCommonQuery, getPostsByPageForToolsPage } from "@/lib/api";
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexNew";
import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";
import ToolsTagsNavRow from "@/components/v4/section/ToolsTagsNavRow";
import TwoColumnCards from "@/components/v4/layout/TwoColumnCards";
import ToolsLayout from "@/components/v4/layout/toolbox/ToolsLayout";
import Container from "@/components/container";
import Link from "next/link";
import { CaretRight } from "phosphor-react";
import TopicSection from "@/components/v4/section/TopicSection";
import SectionDivider from "@/components/v4/section/SectionDivider";
import NewsletterSection from "@/components/v4/section/NewsletterSection";
const TAB_ITEMS = [
  {
    slug: "ai",
    toolSlug:'ai',
    name: "topicSpotlight.tabs.ai",
    // icon:<Robot size={ICON_SIZE}/>
  },
  {
    slug: "accessibility",
    toolSlug:'accessibility',
    name: "topicSpotlight.tabs.accessibility",
    // icon:<Wheelchair size={ICON_SIZE} />
  },
  {
    slug: "design-systems",
    toolSlug:'design-systems',
    name: "topicSpotlight.tabs.accessibility",
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

export default function ToolboxPage({
  allPosts = [],
  topicPosts=[],
}) {

  return (
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
      <ToolsTagsNavRow/>
      <Container maxWidth="max-w-[1320px]">
      <div className="flex justify-between">
        <h3 className="font-bold text-2xl mt-6 mb-6 px-1">
          Featured tools <span className="text-gray-400">for creators</span>
        </h3>
          <Link href='/toolbox/page/1'>
            <div className="flex mt-6">
              <div className="text-sm my-auto  text-black opacity-60">See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link>

      </div>
      {allPosts.length > 0 && (
              <>
                <TwoColumnCards posts={allPosts.slice(0,2)}/>
                <ToolsLayout posts={allPosts.slice(2,allPosts.length)} type="toolbox" />
              </>
            )}
        <SectionDivider />
        <div className="-mt-8">
                  <NewsletterSection/>
                <SectionDivider />
                </div>
        {TAB_ITEMS?.map((topic, index) => {
          return (
            <>
            {topicPosts[topic.slug]?.length > 0 && (
              <>
                <TwoColumnCards posts={topicPosts[topic.slug].slice(0,2)}/>
                <ToolsLayout posts={topicPosts[topic.slug].slice(2,allPosts.length)} type="toolbox" />
              </>
            )}
            </>
          );
        })}
      </Container>
      
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params, locale }) {
  // let sort = ["featured:desc","promoted:asc", "tier:asc","date:desc"];
  let sort = ["featured:desc", "tier:asc","date:desc"];
  if (locale === "es-ES") {
    sort = ["esES:asc", "date:desc"];
  }
  const pageSize = 8;
  const page = 1;
  const allPosts =(await getPostsByPageForToolsPage(preview, pageSize, page, sort)) || [];

    // topic sections
    let topicRes = {};
    for (let index = 0; index < TAB_ITEMS.length; index++) {
      const tag = TAB_ITEMS[index].slug;
      const topicToolsRes =
        (await getCommonQuery(preview, [TAB_ITEMS[index].toolSlug], "tool", 8, 0, sort)) || [];
         
      topicRes[tag] = topicToolsRes.data
    }

  return {
    props: {
      allPosts: allPosts.data,
      topicPosts: topicRes,
    },
    revalidate: 20,
  };
}