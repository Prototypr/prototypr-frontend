import Container from "@/components/container";
// import Layout from "@/components/layout";
import Layout from "@/components/new-index/layoutForIndex";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import BreadCrumbs from "@/components/v4/layout/Breadcrumbs";

// import { getAllPostsForPostsPage } from "@/lib/api";
// import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Waypoint } from "react-waypoint";
import { SIDEBAR_STICKY_OFFSET, topics } from "@/lib/constants";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
import { getPopularTopics } from "@/lib/api";
import { Tag } from "phosphor-react";

export default function Index({ popularTags, preview }) {
  const intl = useIntl();

  return (
    <>
      <Layout
        maxWidth={"max-w-[1320px] search-wide"}
        seo={{
          title: "Prototypr Topics - Design, UX, UI, accessibility...",
          description:
            "Browse design topics on Prototoypr. Discover the category you want to learn about.",
          canonical: "https://prototypr.io/topics",
          url: "https://prototypr.io/topics",
        }}
        activeNav={"posts"}
        preview={preview}
      >
        <Container maxWidth="max-w-[1320px]" >
          <div className="bg-gray-500 relative bg-opacity-5 overflow-hidden p-6 border-gray-200 rounded-2xl">
            {/* <div className="z-20 relative"> */}
            <div className="w-full backdrop-blur-sm backdrop-opacity-20 w-full h-full">
            <BreadCrumbs tagName={false}/>
                <div className="inline-flex my-4">
                  {/* <div className="p w-8 h-8 my-auto mr-3 rounded-full border-gray-300 bg-white"> */}
                    <Tag className="my-auto mx-auto mr-2.5 my-auto" size={24}/>
                  {/* </div> */}
                  <h2 className="text-5xl my-auto font-bold text-gray-900 capitalize">{intl.formatMessage({ id: "topics.title" })}</h2>
                </div>
              </div>
          </div>
        </Container>
        {/* <Head>
        <title>{intl.formatMessage({ id: "topics.header" })}.</title>
      </Head> */}
       <Container maxWidth="max-w-[1320px]" >
        <div className="mt-6 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 pb-24">
                {popularTags.map((topic, i) => (
                 <CategoriesIconCard withBackground={true} key={i} index={i} topic={topic}/>
                ))}
              </div>
        </Container>
      </Layout>
    </>
  );
}

const Sidebar = ({ relatedPosts, paddingTop, author }) => {
  const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-0");

  const _handleWaypointEnter = () => {
    setStickyPaddingTop("pt-0");
  };
  const _handleWaypointLeave = () => {
    setStickyPaddingTop(SIDEBAR_STICKY_OFFSET);
  };

  return (
    <div
      className={`${paddingTop} relative col-span-4 max-w-[410px] border-l border-opacity-20`}
    >
      <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
      <div
        className={`${stickyPaddingTop} absolute transition transition-all duration-300 sticky top-0 min-h-screen hidden lg:block`}
      >
        <aside className="h-screen px-10 sticky top-0 py-0">
          <div className="flex flex-col grid gap-6">
            <PrototyprNetworkCTA />
            <div>
              {/* EMAIL FORM */}
              <div className="w-full bg-blue-100 rounded-xl p-5 border border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Get the roundup
                </h3>
                <p className="text-base text-gray-500 mb-6">
                  Get a curated selection of the best articles and topics from
                  Prototypr in your inbox.
                </p>
                <SignupSidebar />
              </div>

              <div className="mt-6">
                <SponsorSidebarCard sponsorLocation="topics" page={"/topics"} />
              </div>
            </div>

            {/* <div className="w-full flex flex-col grid gap-2">

            {relatedPosts?.data?.length > 0 &&
              relatedPosts.data.map((item, index) => {
                return (
                  <ProductItem key={`product_item_${index}`} post={item} />
                  // <TopicTopItem key={index} topic={item}/>
                );
              })}
            </div> */}
          </div>
        </aside>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const popularTags = (await getPopularTopics({postType:'article'})) || [];

  return {
    props: { popularTags: popularTags },
    revalidate:8640//24 hrs
  };
}
