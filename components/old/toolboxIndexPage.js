import Layout from "@/components/new-index/layoutForIndex";
import dynamic from "next/dynamic";

import {
  // getAllPostsForToolsPage,
  getCommonQuery,
  getPostsByPageForToolsPage,
} from "@/lib/api";
// import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";

// import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";
// import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";
import ToolsTagsNavRow from "@/components/v4/section/ToolsTagsNavRow";
import ToolLargeCard from "@/components/v4/card/ToolLargeCard";

import TwoColumnCards from "@/components/v4/layout/TwoColumnCards";
// import ToolsLayout from "@/components/v4/layout/toolbox/ToolsLayout";
// import ToolIconCard from "@/components/v4/card/ToolIconCard";
import Container from "@/components/container";
// import Link from "next/link";
// import { CaretRight } from "phosphor-react";
// import TopicSection from "@/components/v4/section/TopicSection";
import SectionDivider from "@/components/v4/section/SectionDivider";
import NewsletterSection from "@/components/v4/section/NewsletterSection";
import HeadingSeeAllRow from "@/components/v4/text/HeadingSeeAllRow";
import { useIntl } from "react-intl";
import Footer from "@/components/footer";
// import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/v4/card/ToolCard";
// import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";
import ToolBoxHero from "@/components/toolbox/toolboxHero";
// import ToolIconCard from "@/components/v4/card/ToolIconCard";
import useUser from "@/lib/iron-session/useUser";
import Link from "next/link";
const StickyFooterCTA = dynamic(() => import("@/components/StickyFooterCTA"), {
  ssr: false,
});
const TAB_ITEMS = [
  {
    slug: "ai",
    toolSlug: "ai",
    name: "topicSpotlight.tabs.ai",
    subheader: "Here come the bots!",
    image: "/static/images/toolbox/bot-pattern.svg",
    color: "#ED7DFF",
    content: {
      title: "Try some AI tools",
      description: "Automate your workflow with AI.",
    },
    link:'/toolbox/ai/page/1'
  },
  {
    slug: "accessibility",
    toolSlug: "accessibility",
    name: "topicSpotlight.tabs.accessibility",
    subheader: "Make your interfaces usable for all.",
    image: "/static/images/toolbox/leaf-pattern.svg",
    color: "#2F9A75",
    content: {
      title: "Browse Accessibility",
      description: "Build accessible products with these accessibility tools.",
    },
    link:'/toolbox/accessibility/page/1'
  },
  {
    slug: "design-system",
    toolSlug: "design-system",
    name: "topicSpotlight.tabs.designSystems",
    subheader: "Everything starts with a component.",
    image: "/static/images/toolbox/planet-pattern.svg",
    color: "#06195E",
    content: {
      title: "Design System Tools",
      description: "Tools to make and manage your design systems better.",
    },
    link:'/toolbox/design-systems/page/1'
  },

  {
    slug: "ux-tools",
    toolSlug: "ux",
    name: "topicSpotlight.tabs.uxTools",
    subheader: "Everything starts with research.",
    image: "/static/images/toolbox/shape-pattern.svg",
    color: "#353535",
    content: {
      title: "UX Tools",
      description:
        "Build better products and keep users happy with these UX tools.",
    },
    link:'/toolbox/ux/page/1'
  },
];
// const PAGE_SIZE = 20;

export default function ToolboxPage({ allPosts = [], topicPosts = [], featuredPosts=[] }) {
  const intl = useIntl();
  const { user } = useUser({
    redirectIfFound: false,
  });

  return (
    <>
      <Layout
        padding={false}
        navOffset={false}
        topPadding={false}
        maxWidth={"max-w-[1400px] search-wide"}
        background={"#EFF4FB"}
        // background={"#F1F3F9"}
        seo={{
          title: `Prototypr Toolbox - new design, UX and coding tools`,
          description:
            "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
          canonical: `https://prototypr.io/toolbox`,
          url: `https://prototypr.io/toolbox`,
        }}
        activeNav={"toolbox"}
      >
        {!user?.isLoggedIn && <StickyFooterCTA title="Welcome to Prototypr"
      description="Join today to make posts and grow with us."
      />}
        <ToolBoxHero />

        {/* <SectionDivider transparentLine={true}/> */}
        <div className="w-full pb-14 px-4">
          <Link href="/toolbox/post">
            <div className="w-full h-auto gridBg rounded-2xl bg-[#3574F0] max-w-7xl mx-auto p-5">
              <div className="flex flex-col gap-2 justify-between ">
                <h3 className="font-normal text-[24px] text-white text-opacity-80">
                  Got a design or developer tool? Launch with us
                </h3>
                <div>
                  <button className="px-6 py-4 font-medium bg-white rounded-full text-black text-xs">
                    Post a Tool {"->"}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <Container maxWidth="pb-20 bg-blue-100/60  border-t border-gray-300">
          {/* <HeadingSeeAllRow
            link="/toolbox/page/1"
            title="Featured tools"
            subheader="Discover handpicked weekly tools."
          /> */}
          <div className="max-w-[1320px] pt-12 mx-auto flex flex-col lg:flex-row justify-between">
            <div className="md:px-1 w-full lg:w-1/2 flex flex-col justify-center mb-8 pr-0 lg:pr-10">
                <h3 className="font-bold mb-1 text-[24px] md:text-[36px]">
                  New in the Toolbox
                </h3>
                <p className="text-[#757575] text-[16px] md:text-[21px] max-w-[480px] pr-6 md:pr-0 md:max-w-[420px]">
                 The best tools for designers, developers, and product makers, hand picked weekly by a small team of humans.
                </p>
            </div>
            <div className="w-full lg:w-1/2">

            {allPosts.length > 0 && (
            <>
                <ToolCard
                    posts={allPosts.slice(0, 6)}
                    tagNumber={1}
                    type="toolbox"
                    columns={"md:grid-cols-2"}
                  />
            </>
          )}
            </div>
          </div>
          </Container>


          <Container maxWidth="pb-16 bg-blue-100/60 ">
            <div className="max-w-[1320px] mx-auto">
                  <TwoColumnCards
                    image={"/static/images/toolbox/toolbox-main.svg"}
                    color="#3574F0"
                    // posts={allPosts.slice(0, 2)}
                    repeat={false}
                    imageSize={"cover"}
                    backgroundPosition={"center center"}
                    link={`/toolbox/page/1`}
                    content={{
                      title: "Explore all tools",
                      description:
                        "All the tools to speed up your design workflow in one place.",
                      }}
                  />
            </div>
          </Container>
          <Container maxWidth="pb-8 md:pb-10 pt-6">
          <div className="max-w-[1320px] mx-auto">
            {/* {allPosts.length > 0 && (
                  <>
                  <div className="py-6">
                      <ToolCard
                        posts={allPosts.slice(6, 12)}
                        type="toolbox"
                        tagNumber={1}
                        columns={"lg:grid-cols-3"}
                      />
                    </div>
                    </>
                )} */}
                <h3 className="font-bold text-[24px] md:text-[36px] mb-6 mt-6">
                  Featured
                </h3>
                <div className={`grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-10`}>
                  {featuredPosts.slice(0,3).map((tool, index) => {
                    return (
                      <div key={index}>
                      <ToolLargeCard cardHeight="h-[220px] md:h-[234px]" logoHeight="w-[66px] h-[66px]"  tool={tool?.attributes} />
                      </div>
                    );
                  })}
                  </div>
                    {allPosts.length > 0 && (
                  <>
                  <div className="py-6">
                      <ToolCard
                        posts={allPosts.slice(6, 12)}
                        type="toolbox"
                        tagNumber={1}
                        columns={"lg:grid-cols-3"}
                      />
                    </div>
                    </>
                )}
                <TwoColumnCards
                  height="h-auto mt-12 md:h-[300px]"
                  image={TAB_ITEMS[0].image}
                  color={TAB_ITEMS[0].color}
                  link={TAB_ITEMS[0].link}
                  content={TAB_ITEMS[0].content}
                />
                {/* <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-10`}>
                  {allPosts.slice(6,10).map((tool, index) => {
                    return (
                      <div key={index}>
                      <ToolLargeCard  tool={tool?.attributes} />
                      </div>
                    );
                  })}
                  </div>
                  <div className={`grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6`}>
                  {allPosts.slice(10,17).map((tool, index) => {
                    return (
                      <div key={index}>
                      <ToolIconCard tool={tool?.attributes} />
                      </div>
                      );
                    })}
                  </div> */}
          </div>
          </Container>
            <Container maxWidth="pb-16 pt-0">
            <div className="max-w-[1320px] mx-auto">
              <div className="flex grid gap-4 flex-col md:flex-row grid-cols-12">
               <div className="col-span-12 md:col-span-6">
               <TwoColumnCards
                  image={TAB_ITEMS[2].image}
                  color={TAB_ITEMS[2].color}
                  content={TAB_ITEMS[2].content}
                  link={TAB_ITEMS[2].link}
                />
                </div>
               <div className="col-span-12 md:col-span-6">
               <TwoColumnCards
                  image={TAB_ITEMS[1].image}
                  color={TAB_ITEMS[1].color}
                  content={TAB_ITEMS[1].content}
                  link={TAB_ITEMS[1].link}
                />
               </div>
              </div>
            </div>
            </Container>
            <Container maxWidth="pb-10">
            <div className="max-w-[1320px] mx-auto">
              {/* <h3 className="font-medium mb-6 text-[24px] md:text-[32px]">
                  Find your topic
                </h3> */}
              <ToolsTagsNavRow />
            </div>
            </Container>  
          <SectionDivider />
            <Container maxWidth="pb-10">
            <div className="max-w-[1320px] mx-auto">
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
                    {/* <TwoColumnCards
                      posts={topicPosts[topic.slug].posts?.slice(0, 2)}
                      image={topic.image}
                      color={topic.color}
                      content={topic.content}
                      link={topic.link}
                    /> */}
                    {/* <ToolsLayout posts={topicPosts[topic.slug].posts?.slice(2,allPosts.length)} type="toolbox" /> */}
                    <div className="py-6">
                      <ToolCard
                        posts={topicPosts[topic.slug].posts?.slice(
                          0,
                          6
                        )}
                        columns={"lg:grid-cols-2"}
                        type="toolbox"
                      />
                    </div>
                    {index !== TAB_ITEMS.length - 1 ? <SectionDivider /> : ""}
                  </>
                );
              })}
            </div>
            </Container>
            <div className="-mt-8 mb-20">
            <NewsletterSection />
          </div>
      </Layout>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null, params, locale }) {
  // let sort = ["featured:desc","promoted:asc", "tier:asc","date:desc"];
  let sort = ["date:desc"];
  let featureSort = ["featured:desc","date:desc"];
  if (locale === "es-ES") {
    sort = ["esES:asc", "date:desc"];
  }
  const pageSize = 17;
  const page = 1;
  const allPosts =
    (await getPostsByPageForToolsPage(preview, pageSize, page, sort)) || [];
  const featuredPosts =
    (await getPostsByPageForToolsPage(preview, 3, page, featureSort)) || [];

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
      featuredPosts:featuredPosts.data
    },
    revalidate: 20,
  };
}
