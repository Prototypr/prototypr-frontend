import Container from "@/components/container";
// import Layout from "@/components/layout";
import Layout from "@/components/layoutForBlogPost";

import { getAllJobs } from "@/lib/api";

import Link from "next/link";
import Button from "@/components/Primitives/Button";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
// import Contributors from "@/components/toolbox/Contributors";
import JobPostCard from "@/components/Jobs/JobCard";
import { useState } from "react";
import { Waypoint } from "react-waypoint";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";

const PAGE_SIZE = 12;

const seo = {
  title: "Designer Jobs Board",
  description:
    "A job board for designers, developers, and creative people. Find your next remote job, or one in your location.",
  url: "https://prototypr.io/jobs",
  image: "https://prototypr.io/static/images/jobs-seo.png",
};

const Index = ({ jobs }) => {
  return (
    <Layout
      maxWidth={"max-w-[1320px] search-wide"}
      seo={seo}
      showWriteButton={false}
      background="#eff4fb"
    >
      <Container>
        <div className="w-full h-full grid grid-cols-12 gap-1  ">
          <div className="max-w-[46rem] mx-auto pb-20  px-3 md:px-8 xl:px-0 gap-2 col-span-12 lg:col-span-8">
            <div className="pt-5 text-md text-gray-700 pb-8">
              <Link href={`/`}>
                <span className="hover:underline">Home</span>
              </Link>{" "}
              →{" "}
              <Link href={`/jobs`}>
                <span className="underline">Jobs</span>
              </Link>
            </div>
            <div className="mb-6 col-start-1 col-end-4 md:col-start-1 md:col-end-5">
              <h1 className="text-lg md:text-xl font-medium">Now Hiring</h1>
            </div>
            <div className="w-full h-full col-start-1 col-end-7 md:col-start-1 md:col-end-5 flex flex-col pb-10 lg:pr-6">
              {jobs.map((job, i) => {
                return <JobPostCard job={job} key={i} />;
              })}
            </div>
          </div>
          <Sidebar
            // author={post.attributes?.author?.data?.attributes}
            // relatedPosts={relatedPosts}
            paddingTop="hidden md:block pt-6"
          />
          {/* <div className="w-full h-full mb-5 col-start-1 col-end-7 md:col-start-5 md:col-end-7 ">
         
            <div className="w-full bg-blue-50 rounded-md p-5 border border-gray-300">
              <h3 className="text-xl font-medium mb-2 text-gray-900">Get Prototypr Weekly</h3>
              <p className="text-base text-gray-600 mb-6">Stay up to date with design news, tools, and jobs.</p>
            <SignupSidebar/>

            </div>
            <Contributors className="border border-gray-300 rounded"/>
          </div> */}
        </div>
      </Container>
    </Layout>
  );
};

export default Index;

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
          <div className="w-full mb-8">
            <Link href="/jobs/post">
              <Button variant="fullWidthJob" className="px-0 py-1">
                Post a Job for $200
              </Button>
            </Link>
          </div>

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
                <SponsorSidebarCard sponsorLocation="jobs" page={"/jobs"} />
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

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const page = 0;
  let allPosts = (await getAllJobs(preview, pageSize, page)) || [];

  const pagination = allPosts?.meta?.pagination;

  return {
    props: {
      // jobs: allPosts?.data?allPosts.data:null,
      jobs: allPosts,
      preview,
      pagination: pagination ? pagination : null,
    },
    revalidate: 40,
  };
}
