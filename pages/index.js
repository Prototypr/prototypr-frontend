import dynamic from "next/dynamic";

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

const TAB_ITEMS = [
  {
    slug: "accessibility",
    name: "topicSpotlight.tabs.accessibility",
  },
  {
    slug: "user-research",
    name: "topicSpotlight.tabs.userResearch",
  },
  {
    slug: "ux-writing",
    name: "topicSpotlight.tabs.userWriting",
  },
  {
    slug: "vr",
    name: "topicSpotlight.tabs.vr",
  },
  {
    slug: "code",
    name: "topicSpotlight.tabs.code",
  },
];
const PAGE_SIZE = 12;

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

  const titleText = intl.formatMessage({ id: "index.header.title" });
  const descriptionText = intl.formatMessage({ id: "intro.description" });
  const editorPickTitle = intl.formatMessage({ id: "editpicker.title" });
  const designToolTitle = intl.formatMessage({ id: "designtool.title" });
  const sourcePanelTitle = intl.formatMessage({
    id: "navbar.contentitem.title2",
  });
  const sourcePanelDescription = intl.formatMessage({
    id: "sourcepanel.desc2",
  });

  return (
    <>
      <Layout
        preview={preview}
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
          <EditorPick2 lazy={false} header={editorPickTitle} post={heroPost} />
          <ProductList posts={morePosts} />
          <div className="hidden md:block mt-32 pb-10 px-3 xl:px-0">
            <h4 className="text-3xl text-gray-900 font-bold leading-6 text-title-1">
              {designToolTitle}
            </h4>
          </div>
        </Container>
        <BrowserView>
          <DesignTool allTools={allTools} />
        </BrowserView>
        <Container>
          <SourcePanel title={sourcePanelTitle} desc={sourcePanelDescription} />

          <BrowserView>
            <TopicSpotlights tabs={TAB_ITEMS} topics={topicRes} />
          </BrowserView>
          <Aspiring posts={interviewPosts} />
          <Feeds posts={otherPosts} />
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
