import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
import Footer from "@/components/footer";
/**new index components */
import Intro from "@/components/new-index/Intro";
import EditorPick2 from "@/components/new-index/EditorPick2";
import ProductList from "@/components/new-index/ProductList";
import DesignTool from "@/components/new-index/DesignTool";
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
import { FormattedMessage, useIntl } from 'react-intl';
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
  allPosts,
  preview,
  allTools,
  otherPosts,
  interviewPosts,
  topicRes,
}) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const coverImage =
  heroPost.attributes.featuredImage?.data?.attributes?.url?
  heroPost.attributes.featuredImage?.data?.attributes?.url:
  heroPost.attributes.legacyFeaturedImage
    ? heroPost.attributes.legacyFeaturedImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  const intl = useIntl();

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>
            {intl.formatMessage({id: "index.header.title"})}
            👾.
          </title>
        </Head>
        <Container>
          <Intro />
          <EditorPick2 header={intl.formatMessage({ id: "editpicker.title"})} post={heroPost} />
          <ProductList posts={morePosts} />
          <div className="mt-32 pb-10 px-3 xl:px-0">
            <h4 className="text-3xl text-gray-900 font-bold leading-6 text-title-1">
              {intl.formatMessage({id: "designtool.title"})}
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

export async function getStaticProps({ preview = null, locale}) {

  let sort = ["featured:desc","tier:asc",  "date:desc"]
  if(locale=='es-ES'){
    sort = ["esES:asc","featured:desc","tier:asc",  "date:desc"]
  }

  const allPosts = (await getCombinedPostsForHome(preview, 7, 0, sort)) || [];
  const allTools = (await getAllToolsForHome(preview, PAGE_SIZE, 0)) || [];
  const otherPosts = (await getCombinedPostsForHome(preview, 8, 7)) || [];
  const interviews =
    (await getCommonQuery(preview, ["interview"], "article", 4, 0)) || [];
  let topicRes = {};

  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
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
    revalidate: 20,
  };
}

// export const getStaticPaths = ({ locales }) => {
//   return {
//     paths: [
//       { params: {}, locale: 'en-US' },
//       { params: { }, locale: 'en-ES' },
//     ],
//     fallback: true,
//   }
// }