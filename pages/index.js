import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/hero-post";
// import Layout from '@/components/layout'
import Layout from "@/components/new-index/layoutForIndex";
import Footer from "@/components/footer";
/**new index components */
import Intro from "@/components/new-index/Intro";
import EditorPick from "@/components/new-index/EditorPick";
import EditorPick2 from "@/components/new-index/EditorPick2";
import ProductList from "@/components/new-index/ProductList";
import DesignTool from "@/components/new-index/DesignTool";
import DesignTool2 from "@/components/new-index/DesignTool2";
import SourcePanel from "@/components/new-index/SourcePanel";
import TopicSpolights from "@/components/new-index/TopicSpolights";
import Aspiring from "@/components/new-index/Aspiring";
import Feeds from "@/components/new-index/Feeds";
import {
  getCombinedPostsForHome,
  getAllToolsForHome,
  getCommonQuery,
} from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
const TAB_ITEMS = [
  {
    slug: "",
    name: "accessibility",
  },
  {
    slug: "",
    name: "user-research",
  },
  {
    slug: "",
    name: "ux-writing",
  },
  {
    slug: "",
    name: "vr",
  },
  {
    slug: "",
    name: "code",
  },
];
const PAGE_SIZE = 12;

export default function Index({
  allPosts,
  preview,
  allTools,
  otherPosts,
  interviewPosts,
  topicRes,
}) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const coverImage = heroPost.attributes.legacyFeaturedImage
    ? heroPost.attributes.legacyFeaturedImage
    : "";

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>
            Prototypr - Prototyping, UX Design, Front-end Development and Beyond
            👾.
          </title>
        </Head>
        <Intro />
        <Container>
          <EditorPick2 header="Editor's Picks" post={heroPost} />
          <ProductList posts={morePosts} />
          <div className="mt-32 pb-10 px-3 xl:px-0">
            <h4 className="text-3xl text-gray-900 font-bold leading-6 text-title-1">
              Latest tools
            </h4>
          </div>
        </Container>
        <DesignTool allTools={allTools} />
        <Container>
          <SourcePanel />
          <TopicSpolights tabs={TAB_ITEMS} topics={topicRes} />
          <Aspiring posts={interviewPosts} />
          <Feeds posts={otherPosts} />
        </Container>
      </Layout>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getCombinedPostsForHome(preview, 7, 0)) || [];
  const allTools = (await getAllToolsForHome(preview, PAGE_SIZE, 0)) || [];
  const otherPosts = (await getCombinedPostsForHome(preview, 8, 7)) || [];
  const interviews =
    (await getCommonQuery(preview, ["interview"], "article", 4, 0)) || [];
  // console.log("interview data from home***********" + JSON.stringify(interviews))
  // console.log('alltools length*****' + allTools?.data.length)
  // console.log('home:allPosts**********' + JSON.stringify(allPosts.data))
  let topicRes = {};

  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].name;
    const res = (await getCommonQuery(preview, [tag], "article", 6, 0)) || [];
    topicRes[tag] = res.data;
  }

  return {
    props: {
      allPosts: allPosts.data,
      allTools: allTools.data,
      otherPosts: otherPosts.data,
      interviewPosts: interviews.data,
      topicRes,
      preview,
    },
  };
}
