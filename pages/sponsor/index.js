import Container from "@/components/container";
// import Layout from "@/components/layout";
import Layout from "@/components/layoutForBlogPost";

import { getAllJobs } from "@/lib/api";

import Link from "next/link";
import Button from "@/components/Primitives/Button";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
// import Contributors from "@/components/toolbox/Contributors";

import { currentWeekNumber } from "@/components/Sponsor/lib/weekNumber";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";

const PAGE_SIZE = 12;

const seo = {
  title: `Sponsor Prototypr`,
  description: `Sponsor the Prototypr weekly newsletter and support the platform.`,
  // image:``,
  canonical: `https://prototypr.io/sponsor`,
  url: `https://prototypr.io/sponsor`,
};

const SponsorPackages = {
  newsletter: [
    {
      image: "/static/images/sponsor-nl-main-cover.png",
      title: "Featured Sponsor (One Week)",
      desp: "A large banner featured in it's own section of the newsletter, plus your logo on the site-wide navbar.",
      ctaText: "Book for $600",
      link: "/sponsor/booking?type=banner",
    },
    {
      image: "/static/images/sponsor-nl-link-cover.png",
      title: "Sponsored Link (One Week)",
      desp: "A sponsored article or tool in a section of the newsletter as a link with your logo.",
      ctaText: "Book for $300",
      link: "/sponsor/booking?type=link",
    },
  ],
  website: [
    {
      image: "/static/images/sponsor-web-main.png",
      title: "Main Sponsor  (One Week)",
      desp: "A sponsor card on the homepage and article pages",
      ctaText: "Book for $900",
      link: "",
    },
    {
      image: "/static/images/sponsor-web-topic.png",
      title: "Topic Sponsor (One Week)",
      desp: "A sponsor card on a topic page and related articles.",
      ctaText: "Book for $500",
      link: "",
    },
    {
      image: "/static/images/sponsor-web-tool.png",
      title: "Sponsored Tool (One Week)",
      desp: "A sponsored tool in the toolbox. Showed on every toolbox page.",
      ctaText: "Book for $100",
      link: "",
    },
  ],
};

const Index = () => {
  const [weekNumber, setWeekNumber] = useState();
  const [selectedPackage, setSelectedPackage] = useState("Newsletter");

  useEffect(() => {
    const week = currentWeekNumber();
    setWeekNumber(week);
  }, []);

  return (
    <Layout
      maxWidth={"max-w-[1320px] search-wide"}
      seo={seo}
      showWriteButton={false}
      background="#eff4fb"
    >
      <Container>
        <div className="w-full h-full grid grid-cols-1 gap-1  ">
          <div className="max-w-[46rem] mx-auto pb-20 px-3 md:px-8 xl:px-0 gap-2 col-span-12 lg:col-span-8">
            {/* <div className="pt-5 text-md text-gray-700 pb-8">
              <Link href={`/`}>
                <span className="hover:underline">Home</span>
              </Link>{" "}
              →{" "}
              <Link href={`/sponsor`}>
                <span className="underline">Sponsor</span>
              </Link>
            </div> */}
            <div className=" w-full">
              <div className="flex w-full">
                <div className="w-full bg-white p-5 md:p-10 rounded-2xl">
                  <div className=" w-full flex flex-col gap-5 mb-5">
                    <h1 className="text-2xl md:text-4xl max-w-3xl font-bold tracking-tighter leading-tight">
                      Promote your product <br /> to Prototypr readers 
                    </h1>
                    <p className=" text-base text-[#807F7F] max-w-lg">
                      Got an article or product you'd like to share with the
                      Prototypr audience? We run 2 sponsor packages - a featured
                      placement, or a sponsored link.
                    </p>
                    <p className="w-full bg-[#F8A4FF] text-opacity-80 text-white border rounded-xl border-[#E19DDF] px-5 py-3">
                      This is an automated booking system. To book a slot,
                      please sign up. After you sign up, you can pick a slot
                      based on the availability. For any queries, {' '}
                      <div className="inline underline cursor-pointer text-white font-medium"
                      onClick={()=>{
                        if(window.$crisp){
                          window.$crisp.push(['do', 'chat:open']);
                        }
                      }}
                      >click here to chat</div>, or email
                      <span className="text-white">
                        {" "}
                        graeme@prototypr.io{" "}
                      </span>{" "}.
                    </p>
                  </div>
                  {/* <hr /> */}
                  {/* <div className="flex flex-col gap-4 py-10">
                    <h2 className="text-2xl max-w-xs font-bold">
                      Where would you like to reach your audience?
                    </h2>
                    <div className="w-full flex flex-row gap-2">
                      <button
                        onClick={() => setSelectedPackage("Newsletter")}
                        className={`w-full h-20  ${
                          selectedPackage === "Newsletter"
                            ? "border-[#5380D6] border bg-[#DCEEFF] text-[#5380D6]"
                            : "border-[#D1D1D1] border bg-gray-50 text-[#B8B4B4]"
                        } rounded-lg`}
                      >
                        Newsletter
                      </button>
                      <button
                        onClick={() => setSelectedPackage("Website")}
                        className={`w-full h-20  ${
                          selectedPackage === "Website"
                            ? "border-[#5380D6] border bg-[#DCEEFF] text-[#5380D6]"
                            : "border-[#D1D1D1] border bg-gray-50 text-[#B8B4B4]"
                        } rounded-lg`}
                      >
                        Website
                      </button>
                    </div>
                  </div> */}
                  <hr />
                  <div className="w-full py-5">
                    {selectedPackage === "Newsletter" ? (
                      <div>
                        <div className="flex flex-col gap-4">
                          {/* <h2 className="text-3xl font-bold">Newsletter</h2> */}
                          <h2 className="text-3xl font-bold">Placement Options</h2>
                          <p className=" text-base text-[#807F7F] max-w-lg">
                            Reach an audience of 25k+ subscribers consisting of
                            developers, designers and marketers who are looking
                            for the latest tools and articles that can help them
                            grow.
                          </p>
                          <div className="grid grid-col-1 md:grid-cols-2 gap-4 ">
                            {SponsorPackages.newsletter.map((pk, i) => {
                              return (
                                <div className="bg-white h-auto flex flex-col justify-center items-center gap-4 w-full rounded-2xl p-4 border border-opacity-20">
                                  <div
                                    style={{
                                      backgroundImage: `url("${pk.image}")`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center center",
                                    }}
                                    className="w-full h-[200px] bg-gray-100 rounded-lg relative overflow-hidden"
                                  ></div>
                                  <div className="flex flex-col gap-2">
                                    <h3 className="text-base font-semibold">
                                      {pk.title}
                                    </h3>
                                    <p className="text-[#7A7A7A] text-base">
                                      {pk.desp}
                                    </p>
                                    <a href={pk.link}>
                                      <button className="w-full py-4 rounded-lg bg-[#0F8CFF] text-white">
                                        {pk.ctaText}
                                      </button>
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-col gap-4">
                          <h2 className="text-3xl font-bold">Website</h2>
                          <p className=" text-base text-[#807F7F] max-w-lg">
                            Reach an audience of 50k+ monthly viewers consisting
                            of developers, designers and marketers who are
                            looking for the latest tools and articles that can
                            help them grow. Place highly targeted ads for topics
                            like AI, Product Design etc.
                          </p>
                          <div className="grid grid-col-1 md:grid-cols-2 gap-4 ">
                            {SponsorPackages.website.map((pk, i) => {
                              return (
                                <div className="bg-white h-auto flex flex-col justify-center items-center gap-4 w-full rounded-2xl p-4 border border-opacity-20">
                                  <div
                                    style={{
                                      backgroundImage: `url("${pk.image}")`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center center",
                                    }}
                                    className="w-full h-[200px] bg-gray-100 rounded-lg relative overflow-hidden"
                                  ></div>
                                  <div className="flex flex-col gap-2">
                                    <h3 className="text-base font-semibold">
                                      {pk.title}
                                    </h3>
                                    <p className="text-[#7A7A7A] text-base">
                                      {pk.desp}
                                    </p>
                                    <a href={pk.link}>
                                      <button className="w-full py-4 rounded-lg bg-[#0F8CFF] text-white">
                                        {pk.ctaText}
                                      </button>
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="mb-8">
                    <div className="mb-6 rounded-lg p-4">
                      <h1 className="text-lg mb-1 md:text-xl font-medium">
                        Featured package
                      </h1>
                      <p className="mb-6">
                        The large banner in the newsletter, and featured on the
                        website:
                      </p>
                      <div className="flex flex-col xl:flex-row">
                        <img
                          style={{ maxWidth: 300 }}
                          className="mb-6 xl:mb-0 md:mr-3 object-cover rounded border border-gray-200 shadow"
                          src="https://ucarecdn.com/2963e430-e355-473d-bada-a5b9f2499d01/screenshot-2020-09-22-at-20.56.18.png"
                        />
                        <img
                          className="xl:max-h-[180px] height-auto rounded border border-gray-200 shadow"
                          src="https://ucarecdn.com/c855f91d-3882-4611-98c0-e62e0f2f4504/single-pages.png"
                        />
                      </div>
                      <div className="w-full mt-7 mb-1">
                        <Link href="/sponsor/booking?type=banner">
                          <Button variant="confirm">Buy for $600</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-6 rounded-lg bg-white shadow border border-gray-200 p-4">
                      <h1 className="text-lg mb-1 md:text-xl font-medium">
                        Promoted link
                      </h1>
                      <p className="mb-6">
                        A promoted article or tool only in the newsletter:
                      </p>
                      <img
                        style={{ maxWidth: 300 }}
                        className="rounded border border-gray-200 shadow"
                        src="https://ucarecdn.com/27e76335-6f67-4d5b-a037-310a25b07711/featured-article-sponsor.png"
                      />

                      <div className="w-full mt-7 mb-1">
                        <Link href="/sponsor/booking?type=link">
                          <Button variant="confirm">Buy for $400</Button>
                        </Link>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* <Sidebar
      paddingTop="hidden md:block pt-12"
      /> */}
        </div>
      </Container>
    </Layout>
  );
};

export default Index;

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
                <SponsorSidebarCard />
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
