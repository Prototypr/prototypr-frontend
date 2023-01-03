import Container from "@/components/container";
// import Layout from "@/components/layout";
import Layout from "@/components/layoutForBlogPost";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";

// import { getAllPostsForPostsPage } from "@/lib/api";
// import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Waypoint } from "react-waypoint";
import { SIDEBAR_STICKY_OFFSET, topics } from "@/lib/constants";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";

export default function Index({ allPosts, preview }) {
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
        {/* <Head>
        <title>{intl.formatMessage({ id: "topics.header" })}.</title>
      </Head> */}
        <Container>
          <div className="w-full h-full grid grid-cols-12 gap-1  ">
            <div className="xl:px-10 md:px-8 pb-20 gap-2 col-span-12 lg:col-span-8">
              <div className="pt-5 text-md text-gray-700 pb-8">
                <Link href={`/`}>
                  <span className="hover:underline">Home</span>
                </Link>{" "}
                →{" "}
                <Link href={`/topics`}>
                  <span className="underline">Topics</span>
                </Link>
              </div>

              <section className="flex-col md:flex-row flex items-center md:justify-between">
                <h1 className="text-4xl font-bold tracking-tighter leading-tight mb-4">
                  {intl.formatMessage({ id: "topics.title" })}
                </h1>
              </section>

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-24">
                {topics.map((topic, i) => (
                  <Link key={i} href={`/posts/${topic.slug}/page/1`}>
                    <div
                      className={`group cursor-pointer flex relative ${topic.color} bg-gradient-to-br w-full p-4 rounded-lg h-32`}
                    >
                      <div className="my-auto mx-auto flex justify-between">
                        <h3 className="text-lg font-bold text-center text-white">
                          {intl.formatMessage({ id: topic.name })}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}

            <Sidebar
              // author={post.attributes?.author?.data?.attributes}
              // relatedPosts={relatedPosts}
              paddingTop="hidden md:block pt-6"
            />
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

// export async function getStaticProps({ preview = null }) {
//   const allPosts = (await getAllPostsForPostsPage(preview)) || [];

//   return {
//     props: { allPosts: allPosts.data, preview },
//   };
// }
