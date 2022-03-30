import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/hero-post";
// import Layout from '@/components/layout'
import Layout from "@/components/new-index/layoutForIndex";
import Footer from "@/components/footer";
/**new index components */
import Intro from "@/components/new-index/Intro";
import EditorPick from "@/components/new-index/EditorPick";
import ProductList from "@/components/new-index/ProductList";
import DesignTool from "@/components/new-index/DesignTool";
import SourcePanel from "@/components/new-index/SourcePanel";
import TopicSpolights from "@/components/new-index/TopicSpolights";
import Aspiring from "@/components/new-index/Aspiring";
import Feeds from "@/components/new-index/Feeds";
import { getCombinedPostsForHome, getAllToolsForHome } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
const PAGE_SIZE = 12;

export default function Index({ allPosts, preview, allTools }) {
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
        <Container>
          <Intro />
          <EditorPick post={heroPost} />
          <ProductList posts={morePosts} />
          <div className="mt-32 pb-10">
            <h4 className="text-4xl font-bold leading-6 text-title-1">
              Design tools
            </h4>
          </div>
        </Container>
        <DesignTool allTools={allTools} />
        <Container>
          <SourcePanel />
          <TopicSpolights />
          <Aspiring />
          <Feeds />
        </Container>
      </Layout>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getCombinedPostsForHome(preview)) || [];
  const allTools = (await getAllToolsForHome(preview, PAGE_SIZE, 0)) || [];
  // console.log('alltools length*****' + allTools?.data.length)
  // console.log('home:allPosts**********' + allPosts.data.length)
  return {
    props: {
      allPosts: allPosts.data,
      allTools: allTools.data,
      preview,
    },
  };
}
