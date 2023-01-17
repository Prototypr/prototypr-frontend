import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const NewPagination = dynamic(() => import("@/components/pagination"));
// import Layout from '@/components/layout'
// import Layout from "@/components/layoutForBlogPost";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
import Footer from "@/components/footer";
import LargePostGridB from "@/components/v4/layout/LargePostGridB";

import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
import BreadCrumbs from "@/components/v4/layout/Breadcrumbs";
import { getAllPostsForPostsPage, getCommonQuery, getPostsByPageForPostsPage } from "@/lib/api";
// import Head from 'next/head'
import { transformPostList } from "@/lib/locale/transformLocale";
import { useState } from "react";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import { Waypoint } from "react-waypoint";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";
import TopicSection from "@/components/v4/section/TopicSection";
import { makeAuthorList, shuffleArray } from "@/lib/utils/postUtils";
import { Tag } from "phosphor-react/dist";
// import SmallPostsGroup from "@/components/v4/layout/SmallPostsSection";
// import Image from "next/image";
// const Aspiring = dynamic(() => import("@/components/new-index/Aspiring"));
// const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
// const ProductList = dynamic(() => import("@/components/new-index/ProductList"));
// const TopicTopItem = dynamic(() => import("@/components/new-index/TopicTopItem"), { ssr: false });

const PAGE_SIZE = 11;
const ALL_TAGS = [
  "ux",
  "user-research",
  "ui",
  "color",
  "career",
  "interview",
  "accessibility",
  "code",
  "vr",
];
export default function PostsPage({
  allPosts = [],
  tools=[],
  heroPost = null,
  morePosts = [],
  preview,
  pagination = {},
  // firstPost = [],
  tag = "",
  pageNo = 1,
  tagName = "",
  authors=[]
}) {
  const router = useRouter();

  const onPageNumChange = (pageNum) => {
    router.push(`/posts/${tag}/page/${pageNum}`);
  };
  if (tagName == "Interview") {
    tagName = "Interviews";
  } else if (tagName == "UX") {
    tagName = "UX Design";
  } else if (tagName == "UI") {
    tagName = "UI Design";
  }

  return (
    <>
      <Layout
        navOffset={false}
          // maxWidth={'max-w-[1320px] search-wide'}
        seo={{
          title: `${tagName} | design articles on Prototypr | Page ${pagination?.page}`,
          description: `Articles on ${tagName} - design content open and accessible to everyone, no paywall here.`,
          //   image: "",
          canonical: `https://prototypr.io/posts/${tag}/page/${pagination?.page}`,
          url: `https://prototypr.io/posts/page/${tag}/${pagination?.page}`,
        }}
        padding={false}
        activeNav={"posts"}
        preview={preview}
      >
      <div className="mb-8 top-0 w-full">
        <Container padding={false} maxWidth="w-full" >
          <div className="pt-[120px] pb-[120px] bg-[#CCE6FF]/90 relative overflow-hidden p-6 border-gray-200">
            
            <img src="/static/images/angleshape.svg" className="absolute -mb-[2%] w-full bottom-0 z-40 left-0"/>

            {/* <div className="z-20 relative"> */}
            <div className="w-full max-w-[1320px] px-3 mx-auto backdrop-blur-sm backdrop-opacity-20 w-full h-full">
              <BreadCrumbs background={false}tagName={tagName}/>
                <div className="inline-flex my-4">
                  {/* <div className="p w-8 h-8 my-auto mr-3 rounded-full border-gray-300 bg-white"> */}
                    <Tag className="mt-6 mx-auto mr-3 my-auto opacity-60" size={38}/>
                  {/* </div> */}
                  <h2 className="text-[#0F1F40] max-w-md mb-8 mt-3 md:max-w-lg font-semibold text-5xl md:text-[56px] font-inter leading-[50px] md:leading-[60px] capitalize">{tagName}</h2>
                </div>
              </div>
          </div>
        </Container>
      </div>
      {/* <div className="h-[232px]"/> */}
        {allPosts?.length?
        <div className="pb-10 -mt-32 z-50 relative">
            <TopicSection
                  showTitle={false}
                  showSidebar={false}
                  showTopicCloud={true}
                  icon={null}
                  title={tagName}
                  authorsList={authors}
                  HeroPostRandomSection={allPosts[0]}
                  currentPage={pagination?.page}
                  OtherPostsRandomSection={allPosts?.slice(0, 6)}
                  // show more posts underneath the tools section if there's enough to show
                  extendedPosts={allPosts?.length>5?allPosts.slice(6,allPosts.length):false}
                  paginationComponent={ <NewPagination
                    total={pagination?.total}
                    pageSize={PAGE_SIZE}
                    currentPage={pagination?.page}
                    onPageNumChange={(pageNum, tag) => {
                      onPageNumChange(pageNum, tag);
                    }}
                  />}
                  // heroJob={heroJob}
                  // sponsors={sponsors}
                  toolsList={tools?.slice(0, 4)}
                  // authorsList={topicRes[topic.slug]?.authors}
                />
        </div>:''}
            {/* todo show loading state above */}
        
      </Layout>

        <Footer />
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

export async function getStaticProps({ preview = null, params, locale }) {
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale === "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }
  const pageSize = PAGE_SIZE;
  const { pageNo, tag } = params;

  let allPosts =
    (await getPostsByPageForPostsPage(
      preview,
      pageSize,
      pageNo,
      [tag],
      sort
    )) || [];


  let tags = allPosts[1];
  allPosts = allPosts[0];
  const pagination = allPosts.meta.pagination;

  let nextPosts = [],
    morePosts = [],
    heroPost = null;

  allPosts = transformPostList(allPosts.data, locale);

  
  const topicToolsRes =
  (await getCommonQuery(null, [tag], "tool", 12, 0, sort)) || [];

  const authors = makeAuthorList(allPosts)
  shuffleArray(authors)

  // otherwise, just send back the list without splicing
  // firstPost = allPosts.slice(0, 1);
  // morePosts = allPosts.slice(1);
  morePosts = allPosts;

  nextPosts = allPosts;

  return {
    props: {
      allPosts: nextPosts,
      preview,
      pagination,
      tag,
      tagName: tags?.data[0]?.attributes?.name,
      pageNo,
      morePosts,
      heroPost,
      tools:topicToolsRes?.data,
      authors:authors
    },
    revalidate: 20,
  };

  // const interviews =
  // (await getCommonQuery(preview, [tag], "article", 4, 0)) || [];

  // console.log("interview data from home***********" + JSON.stringify(interviews))
}

export async function getStaticPaths() {
  let pageCountArr = [];

  for (var z = 0; z < ALL_TAGS.length; z++) {
    const allPosts =
      (await getAllPostsForPostsPage(null, PAGE_SIZE, 0, [ALL_TAGS[z]])) || [];

    const pagination = allPosts.meta.pagination;
    const pageCount = pagination.pageCount;
    let arr = new Array(pageCount).fill("");
    let newArr = arr.map((i, index) => {
      return `/posts/${ALL_TAGS[z]}/page/${index + 1}`;
    });
    pageCountArr = pageCountArr.concat(newArr);
  }

  return {
    paths: pageCountArr || [],
    fallback: true,
  };
}
