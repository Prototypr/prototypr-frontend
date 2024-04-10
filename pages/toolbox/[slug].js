import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import Image from "next/image";

import ErrorPage from "next/error";
import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
// import stc from "string-to-color";
// import { ToolBoxDisplay } from "../../components/toolbox/ToolboxGrid";
import gumletLoader from "@/components/new-index/gumletLoader";
import useUser from "@/lib/iron-session/useUser";
// import { SealQuestion } from "@phosphor-icons/react";
import { SocialShareVertical } from "@/components/SocialShare";

import Carousel from "@/components/carousel";
const StickyFooterCTA = dynamic(() => import("@/components/StickyFooterCTA"), {
  ssr: false,
});
// const AuthorCard = dynamic(() => import("@/components/toolbox/AuthorCard"));
// const SponsorCard = dynamic(() => import("@/components/toolbox/SponsorCard"));
// const RelatedPosts = dynamic(() => import("@/components/related-posts"));
// const VisitCard = dynamic(() => import("@/components/toolbox/VisitCard"));
// const Contributors = dynamic(() => import("@/components/toolbox/Contributors"));

import {
  getAllPostsWithSlug,
  getTool,
  // getAllToolsForHomeStatic,
  getPopularTopics,
} from "@/lib/api";
// import ToolCard from "@/components/v4/card/ToolCard";
// import BigTag from "@/components/v4/tag/BigTag";
import Footer from "@/components/footer";
import NewsletterSection from "@/components/v4/section/NewsletterSection";
// import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";
import PopularTagsSection from "@/components/v4/section/PopularTagsSection";
import SectionDivider from "@/components/v4/section/SectionDivider";
import Link from "next/link";
import Button from "@/components/Primitives/Button";
import { TOTAL_STATIC_POSTS } from "@/lib/constants";
import ToolLargeCardRow from "@/components/v4/layout/ToolLargeCardRow";
import AuthorCard from "@/components/toolbox/AuthorCard";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
// import ToolCard from "@/components/v4/card/ToolCard";
// import WeeMan from "@/components/images/weeMan";
import buildToolboxGallery, {
  getToolboxFeaturedImage,
  getToolboxLogo,
} from "@/lib/utils/buildGallery";
import { formatAllTools } from "@/lib/utils/formatToolContent";
import ToolIconCard from "@/components/v4/card/ToolIconCard";

const ToolContent = ({
  post,
  gallery,
  relatedPosts,
  popularTags,
  layout,
  logo,
  featuredImage,
  date,
  authorAvatar,
  updatedAtDate,
}) => {
  const { user } = useUser();
  const tags = post.attributes.tags.data;

  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("id", "twitter-widget");
    s.setAttribute("async", "true");

    if (!document.getElementById("twitter-widget")) {
      document.head.appendChild(s);
    }

    if (window.$crisp) {
      // window.$crisp.push(["config", "position:reverse", true])
      // window.$crisp.push(['do', 'chat:close']);
      window.$crisp.push(["do", "chat:hide"]);
    }
  }, []);

  useEffect(() => {
    var tweets = document.getElementsByClassName("twitter-tweet");

    for (var x = 0; x < tweets.length; x++) {
      let id = tweets[x]?.getAttribute("tweetId");
      tweets[x].outerHTML = `<div class="twitter-tweet" tweetId="${id}"></div>`;

      window?.twttr?.widgets?.createTweet(id, tweets[x]);
    }
  }, [post.attributes?.content]);

  return (
    <>
      <div className="w-full mx-auto">
        <Container
          padding={false}
          maxWidth="w-full xl:mb-3 -mt-[96px] p-6 md:px-3 xl:p-0 relative z-0"
        >
          <div className="grid grid-cols-12 gap-3 md:px-0 h-full w-full mx-auto max-w-[1315px] mt-[44px] lg:mt-[76px]">
            <div
              className={`col-span-12 border border-1 border-[#dadee5] shadow-sm h-full rounded-2xl mx-auto relative overflow-hidden p-2 leading-tight w-full`}
            >
              <Image
                className="bg-gray-700 rounded-2xl object-cover"
                layout="fill"
                objectFit="cover"
                src={featuredImage}
              />
              <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-gray-900/0 to-black left-0 rounded-2xl z-0" />
              <div className="relative w-full max-w-[1320px] mx-auto h-full flex flex-col-reverse justify-between">
                {/* <div style={{pointerEvents:'none'}} className="bg-black pointer-none opacity-[20%] w-full h-full absolute left-0 top-0"/> */}
                <div className="w-full z-10 grid grid-cols-3 gap-16 flex pt-0 md:pt-6 p-6 justify-between ">
                  <div className="flex order-2 md:order-1 col-span-3 md:col-span-2 w-full flex-col justify-between">
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col">
                        <div className="flex max-w-[94%] flex-col">
                          <div className="mr-4 mb-3 flex-none w-[74px] h-[74px] md:w-[88px] md:h-[88px] my-auto shadow-sm rounded-2xl p-[3px] bg-white border border-gray-300">
                            <Image
                              loader={gumletLoader}
                              priority={false < 2 ? `true` : `false`}
                              data-priority={false < 2 ? `true` : `false`}
                              fetchpriority={false < 2 ? "true" : "false"}
                              data-gmlazy={false < 2 ? `false` : `true`}
                              width="100"
                              height="100"
                              alt="Brand logo for external website's link"
                              className="rounded-2xl h-full w-full object-cover bg-white"
                              src={logo}
                            />
                          </div>
                          <div className="flex flex-col text-white justify-center">
                            <h1 className="text-5xl line-clamp-2 mb-0 tracking-tight font-semibold drop-shadow-lg text-white">
                              {post?.attributes?.title}
                            </h1>
                            {post?.attributes?.excerpt ? (
                              <p className="text-base line-clamp-2 text-white mt-2 max-w-[800px]">
                                {post?.attributes?.excerpt}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex md:hidden mt-4 flex-none">
                            <div className="flex justify-end">
                              <a
                                target={"_blank"}
                                href={
                                  post?.attributes?.link + "?ref=prototypr.io"
                                }
                              >
                                <Button
                                  className="rounded-full text-base bg-blue-600 font-medium text-white px-6 py-2 h-[28px] leading-none"
                                  variant={"confirmBig"}
                                >
                                  Visit site
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex order-1 md:order-2 col-span-3 md:col-span-1 flex-col justify-end">
                    <div className="flex text-base text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1.5"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180Zm28-72c0,17.38-13.76,31.93-32,35.28V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36S168,88.15,168,108Z"></path>
                      </svg>
                      <div className="mb-4">
                        <div className="inline">
                          Is this your tool?{" "}
                          <Link
                            className="underline"
                            href={`/toolbox/post/${post.id}/claim`}
                          >
                            Claim this page
                          </Link>
                          .
                        </div>
                      </div>
                    </div>
                    {/* hide on mobile */}
                    <div className="hidden md:flex flex-none">
                      <div className="flex justify-end">
                        <a
                          target={"_blank"}
                          href={post?.attributes?.link + "?ref=prototypr.io"}
                        >
                          <Button
                            className="rounded-full text-base bg-blue-600 font-medium text-white px-6 py-2 h-[28px] leading-none"
                            variant={"confirmBig"}
                          >
                            Visit site
                          </Button>
                          {/* <Button
                            className="rounded-full uppercase text-xs bg-blue-600 font-medium text-white px-6 py-0.5 h-[28px] leading-none"
                            variant={"confirmBig"}
                          >
                            Get
                          </Button> */}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-3 text-white flex flex-col-reverse">
                  <div className="flex flex-row flex-wrap gap-2">
                    {tags.map((tag, i) => {
                      if (i < 4) {
                        return (
                          <Link
                            href={`/toolbox/${tag.attributes.slug}/page/1/`}
                          >
                            <button
                              className={`px-3 h-6 text-sm capitalize rounded-full border border-opacity-50 border-white bg-black/40 backdrop-blur-md`}
                            >
                              {tag.attributes.name}
                            </button>
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* Content under header */}
        <Container maxWidth="w-full relative z-10">
          <div className="grid grid-cols-3 lg:grid-cols-12 gap-3 max-w-[1320px] mx-auto md:px-0 h-full">
            <div className="col-span-3 lg:col-span-9 flex flex-col gap-3 ">
              {gallery.length ? (
                <div
                  className={`col-span-3 order-2 lg:order-1 ${gallery?.length ? "md:pl-0 rounded-xl" : ""}`}
                >
                  <div className="h-full min-h-[230px]">
                    <Carousel gallery={gallery} />
                  </div>
                </div>
              ) : null}
              <div
                className={`order-1 col-span-3 lg:order-3 bg-white p-6 rounded-2xl border border-gray-300/70 shadow-sm flex justify-between`}
              >
                <div className="hidden xl:block">
                  <div className="flex flex-col">
                    <div className="text-gray-600 rounded-lg p-1 px-2">
                      <h1 className="text-sm tracking-tight font-medium ">
                        Last edited
                      </h1>
                      <div className="text-sm tracking-tight text-gray-500">
                        {updatedAtDate}
                      </div>
                      {/* <div className="w-6 h-6 rounded-full mb-0.5 border border-1 mt-2 overflow-hidden relative border-gray-100 shadow-sm">
                        {authorAvatar && (
                          <Image
                            tabIndex={0}
                            layout="fill"
                            objectFit="cover"
                            src={authorAvatar}
                            className="rounded-full "
                            alt="Author profile picture"
                          />
                        )}
                      </div> */}
                    </div>

                    <div className="mt-12">
                      <SocialShareVertical
                        title={post.attributes.title}
                        slug={post.attributes.slug}
                      />
                    </div>
                  </div>
                </div>
                <div className="max-w-[680px] w-full mx-auto">
                  <h2 class="text-3xl font-medium mb-4 tracking-tight">
                    Overview
                  </h2>
                  <div className="blog-content toolbox-content">
                    <div
                      style={{
                        color: "#222",
                        fontSize: "18px",
                        lineHeight: "33px",
                      }}
                      className="mt-3 popup-modal-content"
                      dangerouslySetInnerHTML={{
                        __html: post.attributes.content,
                      }}
                    ></div>
                    {/* {!gallery?.length ? (
                      <Image
                        // layout="fill"
                        // objectFit="cover"
                        width="800"
                        height="600"
                        alt="Product screenshot"
                        className="rounded-2xl object-cover"
                        src={
                          post.attributes?.featuredImage?.data?.attributes?.url
                            ? post.attributes.featuredImage.data.attributes.url
                            : post.attributes?.legacyFeaturedImage
                              ? post.attributes?.legacyFeaturedImage.mediaItemUrl
                              : post.attributes?.ogImage
                                ? post.attributes?.ogImage.opengraphImage
                                : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                        }
                      />
                    ) : (
                      ""
                    )} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-3 flex flex-col gap-3">
              {post?.attributes?.author && (
                <div className="bg-white p-3 rounded-2xl border border-gray-300/70 shadow-sm">
                  <h1
                    tabIndex={0}
                    className="text-base mb-3 font-semibold tracking-tight"
                  >
                    {post?.attributes?.creator ? "Contributors" : "Posted by"}
                  </h1>
                  <div className=" mb-3 flex">
                    <AuthorCard
                      authorAvatar={authorAvatar}
                      title={post?.attributes?.creator ? "Curator" : null}
                      author={post.attributes.author}
                      avatar={post.attributes?.author}
                    />
                    {post.attributes?.creator ? (
                      <div className="ml-10">
                        <AuthorCard
                          title={post?.attributes?.creator ? "Creator" : null}
                          author={post.attributes.creator}
                          avatar={post.attributes?.creator}
                          authorAvatar={authorAvatar}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4">
                <div className="bg-white grid grid-cols-5 p-3 relative rounded-2xl border border-gray-300/70 shadow-sm">
                  <div className="z-10 col-span-5 xl:col-span-5 relative">
                    <h3 className="font-bold drop-shadow-sm text-xl tracking-[-0.018em] text-gray-800">
                      Get weekly handpicked tools
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                      Join the 1000s who receive curated products from Graeme @
                      Prototypr.
                    </p>
                  </div>
                  {/* <div className="hidden xl:block z-10 col-span-1 relative">
                    <WeeMan />
                  </div> */}

                  {/* <img
                    className="hidden sm:block w-[200px] top-0 mt-8 md:-mt-6 absolute right-0 -mr-20"
                    src={
                      "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/7432cc558c73394df5d2c21a3ee18cd5.png?updated_at=2022-12-14T17:59:46.805Z"
                    }
                  /> */}
                  <div className="col-span-12 relative z-10">
                    <SignupSidebar post={post} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white relative rounded-2xl border border-gray-300/70 shadow-sm pb-3">
                  <h1
                    tabIndex={0}
                    className="text-base mb-3 font-semibold tracking-tight px-3 pt-3 tracking-tight"
                  >
                    Related tools
                  </h1>
                  {/* <ToolCard
                    border={false}
                    posts={relatedPosts}
                    columns={"grid-cols-1"}
                    type="toolboxContentPage"
                  /> */}
                  {relatedPosts?.map((tool, index) => {
                    return (
                      <div key={index} className="flex flex-col px-3">
                       {index!==0? <div className={`my-3 flex flex-col first:border-t-none border-t border-gray-100`} />:''}
                        <div className="">
                          <ToolIconCard
                            withBackground={false}
                            tool={tool}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <div className="order-5">
              <ToolCard
                posts={relatedPosts}
                columns={"grid-cols-1"}
                type="toolboxContentPage"
              />
            </div> */}
          </div>
        </Container>
        <Container maxWidth="w-full relative z-10">
          <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-4 md:px-0 h-full">
            <SectionDivider py="py-3" transparentLine={true} />
          </div>
          <Container maxWidth="max-w-[1320px]">
            <div
              className={`pb-0 border-l-[0.19rem] border-b-[0.18rem] border-sky-500 opacity-10 rounded-bl-xl pt-6`}
            >
              {/* <div className={` bg-opacity-[0.08] bg-sky-500 h-[3px] w-full pl-3`} /> */}
            </div>
          </Container>
        </Container>
      </div>

      <Container maxWidth="hidden xl:block w-full pb-24 bg-gradient-to-tr from-[#fefefe] to-sky-100/20 relative z-10">
        {/* <img src="/static/images/bendy9.svg" className="absolute top-0 -mt-[2.9%] z-10 left-0 w-full gm-added gm-observing gm-observing-cb" loading="lazy"/> */}
        {relatedPosts?.length ? (
          <div className="z-30 relative max-w-[1320px] mx-auto md:px-3">
            <div classsName="flex flex-col px-3 z-30">
              <h3 className="text-2xl pt-12 mb-6 text-black/90 font-medium font-inter max-w-md tracking-tight">
                Related tools
              </h3>
              {/* <ToolLargeCardRow title={`Related to ${post?.attributes?.title}`} tools={relatedPosts.slice(0,4)} /> */}
              <ToolLargeCardRow
                showTitle={false}
                tools={relatedPosts.slice(0, 4)}
              />
            </div>
            <img
              src="/static/images/toolbox/squares2.svg"
              className="w-full h-[128%] absolute object-cover opacity-20"
            />
          </div>
        ) : null}
      </Container>
      <Container maxWidth="w-full pb-16 bg-[#fefefe] relative z-10 pt-0">
        <div className="max-w-[1320px] pt-0 -mt-8 mb-8 mx-auto h-full">
          <div className="mb-20">
            <NewsletterSection
              padding={false}
              title="Get the best tools every week"
            />
          </div>
          {/* <SectionDivider/>      
        <h2 className="text-lg mb-4 font-semibold tracking-tight">More on Prototypr</h2>
        <TwoColumnCards/>
        <SectionDivider/> */}
          <div className="mt-2">
            <h2 className="text-lg mb-4 font-semibold tracking-tight">
              Popular topics
            </h2>
            <PopularTagsSection popularTags={popularTags} />
          </div>
        </div>
      </Container>

      {!user?.isLoggedIn && (
        <StickyFooterCTA
          title="Welcome to Prototypr"
          description="Join today to make posts and grow with us."
        />
      )}
      {/* <NewsletterSection title="Get the best tools every week"/> */}
    </>
  );
};

export default function Post({
  post,
  relatedPosts,
  gallery,
  preview,
  popularTags,
  layout,
  logo,
  featuredImage,
  date,
  updatedAtDate,
  authorAvatar,
}) {
  const router = useRouter();

  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
    }
  }, []);

  return (
    <Layout
      padding={false}
      // background={"RGBA(204, 230, 255, 0.9)"}
      background={"#fbfcff"}
      maxWidth={"search-wide"}
      seo={{
        title: `${
          post?.attributes?.seo?.opengraphTitle
            ? post?.attributes?.seo?.opengraphTitle
            : post?.attributes?.title && post.attributes.title
        }`,
        description: `${
          post?.attributes?.seo?.opengraphDescription
            ? post?.attributes?.seo?.opengraphDescription
            : post?.attributes?.excerpt && post.attributes.excerpt
        }`,
        image: `${
          post?.attributes?.seo?.opengraphImage
            ? post?.attributes?.seo?.opengraphImage
            : post?.attributes?.featuredImage?.data?.attributes?.url
              ? post?.attributes?.featuredImage?.data?.attributes?.url
              : post?.legacyFeaturedImage
                ? post?.legacyFeaturedImage?.mediaItemUrl
                : post?.ogImage
                  ? post?.ogImage.opengraphImage
                  : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
        }`,
        canonical: `${
          post?.attributes?.seo?.canonical
            ? post?.attributes?.seo?.canonical
            : post?.attributes?.slug &&
              `https://prototypr.io/toolbox/${post?.attributes.slug}`
        }`,
        url: `${
          post?.attributes?.seo?.canonical
            ? post?.attributes?.seo?.canonical
            : post?.attributes?.slug &&
              `https://prototypr.io/toolbox/${post?.attributes.slug}`
        }`,
      }}
      activeNav={"toolbox"}
      preview={preview}
    >
      {/* <Container>
        <div className="w-full mt-6 md:mt-6 grid grid-rows-1 grid-cols-24 lg:gap-6">
          {router.isFallback ? (
            <h1 className="text-6xl font-inter-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center md:text-left">
              Loading...
            </h1>
          ) : (
            <ToolContent post={post} />
          )}
        </div>
      </Container> */}
      {/* <div className="w-full mt-6 md:mt-6 grid grid-rows-1 grid-cols-24 lg:gap-6"> */}
      <ToolContent
        date={date}
        featuredImage={featuredImage}
        logo={logo}
        layout={layout}
        popularTags={popularTags}
        post={post}
        gallery={gallery}
        relatedPosts={relatedPosts}
        authorAvatar={authorAvatar}
        updatedAtDate={updatedAtDate}
      />
      {/* </div> */}

      <Footer />
    </Layout>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  const data = await getTool(params.slug, preview);

  let relatedPostsData = data?.posts?.data[0]?.attributes?.relatedTools
    ? data?.posts?.data[0]?.attributes?.relatedTools
    : false;

  relatedPostsData = formatAllTools({ tools: relatedPostsData, tagNumber: 1 });
  // no point transforming these, cos they're all english anyway
  // const postData = transformPost(data?.posts.data[0], locale)
  const postData = data?.posts.data[0];
  const popularTags =
    (await getPopularTopics({ postType: "article", pageSize: 8 })) || [];

  // no point transforming these, cos they're all english anyway
  // relatedPostsData = transformPostList(relatedPostsData, locale)

  let layout = 1;
  //if post content is less than 1000 words, use layout 2
  if (postData.attributes.content?.length < 1000) {
    layout = 2;
  }

  const logo = getToolboxLogo({ post: postData });
  const featuredImage = getToolboxFeaturedImage({ post: postData, logo });
  //build the gallery here
  let PHOTO_SET = [];
  const item = data?.posts.data[0];

  PHOTO_SET = buildToolboxGallery({ item, PHOTO_SET, featuredImage });

  const date = isoToReadableDate(postData.attributes.date);
  const updatedAtDate = isoToReadableDate(postData.attributes.updatedAt);

  const authorAttributes = postData.attributes?.author?.data?.attributes;
  const authorAvatar = authorAttributes?.avatar?.data?.attributes?.url
    ? authorAttributes.avatar.data.attributes.url
    : authorAttributes?.legacyAvatar
      ? authorAttributes.legacyAvatar
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  return {
    props: {
      preview,
      post: {
        ...postData,
      },
      gallery: PHOTO_SET,
      relatedPosts: relatedPostsData,
      popularTags: popularTags,
      layout,
      logo,
      featuredImage,
      date,
      updatedAtDate,
      authorAvatar,
      // morePosts: data?.morePosts.data,
    },
    revalidate: 40,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug("tool", TOTAL_STATIC_POSTS);
  // const homePageTools = await getAllToolsForHomeStatic()
  // let mergedSlugs = {
  //   ...allPosts,
  //   ...homePageTools
  // };

  return {
    paths:
      (allPosts &&
        allPosts.data?.map(post => {
          return `/toolbox/${post.attributes.slug}`;
        })) ||
      [],
    fallback: "blocking",
  };
}

function isoToReadableDate(isoTimestamp) {
  const date = new Date(isoTimestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  // const year = date.getFullYear().toString().substr(-2);
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
}

// function isoToReadableDate(isoTimestamp) {
//   const date = new Date(isoTimestamp);
//   const day = date.getDate();
//   const ordinalSuffix = getOrdinalSuffix(day);
//   const month = date.toLocaleString("default", { month: "long" });
//   const year = date.getFullYear().toString().substr(-2);
//   return `${day}${ordinalSuffix} ${month} '${year}`;
// }

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
