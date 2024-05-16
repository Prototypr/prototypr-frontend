import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect } from "react";
// import Button from "@/components/Primitives/Button";
import Link from "next/link";
import ErrorPage from "next/error";
// import Image from "next/image";
import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
import isoToReadableDate from "@/lib/utils/isoToReadableDate";
// import stc from "string-to-color";
// import { ToolBoxDisplay } from "../../components/toolbox/ToolboxGrid";
import useUser from "@/lib/iron-session/useUser";
// import { SealQuestion } from "@phosphor-icons/react";
// import { SocialShareVertical, SocialShare } from "@/components/SocialShare";
import SocialShare from "@/components/SocialShare";

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

import { TOTAL_STATIC_POSTS } from "@/lib/constants";
import ToolLargeCardRow from "@/components/v4/layout/ToolLargeCardRow";
import AuthorCard from "@/components/toolbox/AuthorCard";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import ToolCard from "@/components/v4/card/ToolCard";
// import WeeMan from "@/components/images/weeMan";
import buildToolboxGallery, {
  getToolboxFeaturedImage,
  getToolboxLogo,
} from "@/lib/utils/buildGallery";
import { formatAllTools } from "@/lib/utils/formatToolContent";
import ToolIconCard from "@/components/v4/card/ToolIconCard";
import HeroCardSection from "@/components/toolbox/HeroCardSection";
import { addTwitterScript } from "@/components/Editor/editorHooks/libs/addTwitterScript";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";
import getSponsors from "@/lib/utils/getSponsors";
import ToolBackgroundCard from "@/components/v4/card/ToolBackgroundCard";

const ToolContent = ({
  post,
  gallery,
  relatedPosts,
  popularTags,
  layout,
  logo,
  logoBase64,
  featuredImage,
  base64,
  date,
  authorAvatar,
  updatedAtDate,
  navSponsor,
  sponsors,
}) => {
  const { user } = useUser();
  const tags = post.attributes.tags.data;

  console.log(sponsors);
  console.log(navSponsor);

  useEffect(() => {
    addTwitterScript();
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
        {/* <Container
          padding={false}
          maxWidth="w-full xl:mb-3 -mt-[96px] p-6 md:px-3 xl:p-0 relative z-0"
        >
          <div className="grid grid-cols-12 gap-3 md:px-0 h-full w-full mx-auto max-w-[1320px] mt-[44px] lg:mt-[76px]">
            <HeroCard logo={logo} post={post} tags={tags} featuredImage={featuredImage} />
          </div>
        </Container> */}
        {/* Content under header */}
        <Container maxWidth="w-full relative z-10">
          <div className="grid grid-cols-3 lg:grid-cols-12 gap-3 xl:gap-7 max-w-[1320px] mx-auto md:px-0 h-full">
            <div className="col-span-3 border border-gray-300/60 rounded-2xl overflow-hidden lg:col-span-9 flex flex-col gap-3 bg-white">
              <div className="grid gap-3 md:px-0 -mb-4">
                <HeroCardSection
                  post={post}
                  tags={tags}
                  featuredImage={featuredImage}
                />
              </div>
              {gallery.length ? (
                <div
                  // className={`relative lg:bg-gradient-to-b backdrop-blur-sm from-black via-white to-white -mt-3 z-20 py-6 pt-0 lg:pt-5 col-span-3 order-2 pl-6 lg:order-1 ${gallery?.length ? "" : ""}`}
                  className={`relative -mt-8 mb-3 z-20 pt-0 col-span-3 order-2 mx-6 lg:order-1 ${gallery?.length ? "" : ""}`}
                >
                  {/* <div className="hidden lg:block h-full w-full -mt-5 bg-gradient-to-b from-white/[0.01] to-white/[0.3] absolute left-0" /> */}
                  <div className="h-full min-h-[240px]">
                    <Carousel gallery={gallery} />
                  </div>
                </div>
              ) : null}
              <div
                className={`order-1 col-span-3 lg:order-3 bg-white p-6 lg:pt-0 lg:pb-12 rounded-2xl flex justify-between`}
              >
                {/* <div className="hidden xl:block">
                  <div className="flex flex-col">
                    <div className="text-gray-600 rounded-lg p-1 px-2">
                      <h1 className="text-sm tracking-tight font-medium ">
                        Last edited
                      </h1>
                      <div className="text-sm tracking-tight text-gray-500">
                        {updatedAtDate}
                      </div>
                      <div className="w-6 h-6 rounded-full mb-0.5 border border-1 mt-2 overflow-hidden relative border-gray-100">
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
                      </div>
                    </div>

                    <div className="mt-12">
                      <SocialShareVertical
                        title={post.attributes.title}
                        slug={post.attributes.slug}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="max-w-[680px] w-full mx-auto">
                  <h2 class="text-2xl font-medium mb-4 tracking-tight">
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
            <div className="col-span-3 h-fit lg:col-span-3 flex flex-col gap-3">
              {/* <div className="flex flex-none">
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
                  </a>
                </div>
              </div> */}
              <div className="p-1 pt-0.5 rounded-2xl h-fit border-gray-300/60">
                {post?.attributes?.author && (
                  <div className="p-4 rounded-2xl bg-[#f4f4f4]/60">
                    {/* <h1
                      tabIndex={0}
                      className="text-sm mb-3 font-medium tracking-tight"
                    >
                      {post?.attributes?.creator ? "Contributors" : "Posted by"}
                    </h1> */}
                    <div className="flex">
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
                    {/* <Link
                    target="_blank"
                    href={post?.attributes?.link + "?ref=prototypr"}
                  >
                    <button className="w-full rounded-xl  bg-blue-500 text-white font-medium h-[44px]">
                      Visit source
                    </button>
                  </Link> */}
                  </div>
                )}

                {/* <div className="h-[1px] pb-2 -mt-3 px-3">
                  <div className="bg-gray-100 h-[1px]"></div>
                </div> */}
                <div className="flex flex-col gap-4 mt-4 p-4 rounded-2xl bg-[#f4f4f4]/60">
                  <div className="text-gray-500">
                    <h3 className="text-sm tracking-tight  ">Published</h3>
                    <div className="text-base tracking-tight font-medium text-gray-500">
                      {date}
                    </div>
                  </div>
                  <div className="text-gray-500 mt-1">
                    <h3 className="text-sm tracking-tight ">Tags</h3>
                    {tags?.map((tag, index) => {
                      return (
                        <Link href={`/toolbox/${tag.attributes.slug}/page/1/`}>
                          <div
                            key={index}
                            className="text-gray-800 tracking-tight font-medium"
                          >
                            {tag.attributes.name}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-2">
                    <SocialShare
                      size={22}
                      title={post.attributes.title}
                      slug={post.attributes.slug}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <ToolBackgroundCard
                    showAdTag={true}
                    height={"h-[220px] md:h-[310px] xl:h-[190px]"}
                    withBackground={true}
                    post={navSponsor}
                  />
                </div>

                <div className="flex flex-col gap-4 mt-4 rounded-2xl bg-[#f4f4f4]/60">
                  <div className="relative rounded-2xl pb-3">
                    <h1
                      tabIndex={0}
                      className="text-sm mb-3 text-gray-500 tracking-tight px-3 pt-3"
                    >
                      Related tools
                    </h1>

                    <div className="flex flex-col pt-1 grid grid-cols-6 gap-6">
                      {relatedPosts?.map((tool, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col px-3 col-span-6 sm:col-span-3 lg:col-span-6 xl:col-span-6"
                          >
                            <div className="">
                              <ToolIconCard
                                withBackground={false}
                                tool={tool}
                              />
                            </div>
                          </div>
                        );
                      })}
                      {/* <ToolCard
                    border={false}
                    posts={sponsors}
                    withBackground={false}
                    columns={"grid-cols-1"}
                    type="toolboxContentPage"
                  /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-5 p-3 relative rounded-2xl">
                  <div className="z-10 col-span-5 xl:col-span-5 relative">
                    <h3 className="font-bold drop-shadow-sm text-lg tracking-[-0.018em] text-gray-800">
                      Get weekly handpicked tools
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
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
                preload={false}
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
  navSponsor,
  sponsors,
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
      sponsor={navSponsor}
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
        sponsors={sponsors}
        navSponsor={navSponsor}
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
  let postData = data?.posts.data[0];
  const popularTags =
    (await getPopularTopics({ postType: "article", pageSize: 8 })) || [];

  // no point transforming these, cos they're all english anyway
  // relatedPostsData = transformPostList(relatedPostsData, locale)

  let layout = 1;
  //if post content is less than 1000 words, use layout 2
  if (postData.attributes.content?.length < 1000) {
    layout = 2;
  }

  /**
   * replace images with gumlet loader
   */
  if (postData.attributes.content?.length) {
    const gumletPostContentLoaderModule = await import(
      "@/lib/gumletPostContentLoader"
    );
    const gumletPostContentLoader = gumletPostContentLoaderModule.default;

    let html = gumletPostContentLoader(postData.attributes.content);
    if (html) {
      postData.attributes.content = html;
    }
  }

  const { logo, base64: logoBase64 } = getToolboxLogo({ post: postData });

  postData.attributes.logoBase64 = logoBase64;
  postData.attributes.logo = logo;

  //build the gallery here
  // let PHOTO_SET = [];
  const item = data?.posts.data[0];

  let PHOTO_SET = (await buildToolboxGallery({ item })) || [];
  const { featuredImage, base64 } = await getToolboxFeaturedImage({
    post: postData,
    gallery: PHOTO_SET,
  });

  postData.attributes.base64 = base64;

  //if there is no gallery, add a default image
  if (!PHOTO_SET.length) {
    let base64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABLCAQAAAA1k5H2AAAAi0lEQVR42u3SMQEAAAgDoC251a3gL2SgmfBYBRAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARCAgwWEOSWBnYbKggAAAABJRU5ErkJggg==`;

    PHOTO_SET.push({
      base64: base64,
      thumbnail: featuredImage
        ? featuredImage
        : "https://prototypr.gumlet.com/https://prototypr-media.sfo2.digitaloceanspaces.com/uploads/2021/04/Screen-Shot-2021-04-30-at-4.37.37-PM.png",
      original: featuredImage
        ? featuredImage
        : "https://prototypr.gumlet.com/https://prototypr-media.sfo2.digitaloceanspaces.com/uploads/2021/04/Screen-Shot-2021-04-30-at-4.37.37-PM.png",
      originalAlt: "Screenshot of product",
      thumbnailAlt: "Smaller procut screenshot thumbnail",
      type: "image",
    });
  }

  const date = isoToReadableDate(postData.attributes.date);
  const updatedAtDate = isoToReadableDate(postData.attributes.updatedAt);

  const authorAttributes = postData.attributes?.author?.data?.attributes;
  const authorAvatar = authorAttributes?.avatar?.data?.attributes?.url
    ? authorAttributes.avatar.data.attributes.url
    : authorAttributes?.legacyAvatar
      ? authorAttributes.legacyAvatar
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  const { navSponsor, sponsors } = await getSponsors();

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
      logoBase64,
      featuredImage: featuredImage ? featuredImage : null,
      base64,
      date,
      updatedAtDate,
      authorAvatar,
      sponsors: sponsors?.length ? sponsors : [],
      navSponsor,
      // morePosts: data?.morePosts.data,
    },
    // revalidate: 40,
  };
}

export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug("tool", TOTAL_STATIC_POSTS);
  const allPosts = await getAllPostsWithSlug(
    "tool",
    process.env.NODE_ENV ||
      process.env.NEXT_PUBLIC_HOME_URL.indexOf("localhost") > -1
      ? TOTAL_STATIC_POSTS
      : 20
  );

  return {
    paths:
      (allPosts &&
        allPosts.data?.map(post => {
          // add blurhash to allPosts images
          post.attributes.base64 = createB64WithFallback(
            post?.attributes?.featuredImage?.data?.attributes?.blurhash
          );
          post.attributes.logoBase64 = createB64WithFallback(
            post?.attributes?.logo?.data?.attributes?.blurhash
          );

          //this is the part that fails
          return `/toolbox/${post.attributes.slug}`;
        })) ||
      [],
    fallback: "blocking",
  };
}
