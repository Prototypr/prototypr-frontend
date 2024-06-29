import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";
import Date from "@/components/date";

// import ProductItem from "@/components/new-index/ProductItem";

const AuthorBio = dynamic(() => import("@/components/authorBio"), {
  ssr: true,
});
// const SourcePanel = dynamic(() => import("@/components/new-index/SourcePanel"));
import { useIntl } from "react-intl";

import Layout from "@/components/layoutForBlogPost";

import { getAllPostsWithSlug, getPost } from "@/lib/api";
const NoticeTranslation = dynamic(
  () => import("@/components/notice-translation"),
  { ssr: true }
);

import { transformPost, transformPostList } from "@/lib/locale/transformLocale";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import { TOTAL_STATIC_POSTS } from "@/lib/constants";
import PostHeader from "@/components/post-header";
import SocialShare from "@/components/SocialShare";
import PostGroupRow from "@/components/v4/layout/PostGroupRow";
import { addTwitterScript } from "@/components/Editor/editorHooks/libs/addTwitterScript";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";
import getSponsors from "@/lib/utils/getSponsors";

import AdCard from "@/components/v4/card/AdCard";
import { PenLineSimple } from "@/components/icons";
import AuthorSidebar from "@/components/AuthorSidebar";
import LikeButton from "@/components/LikeButton";
import isoToReadableDate from "@/lib/utils/isoToReadableDate";

// import ToolBackgroundCard from "@/components/v4/card/ToolBackgroundCard";
const StickyFooterCTA = dynamic(() => import("@/components/StickyFooterCTA"), {
  ssr: false,
});
// const WMPostTracker = dynamic(
//   () => import("@/components/WebMonetization/WMPostTracker"),
//   {
//     ssr: false,
//   }
// );

export default function Post({
  post,
  preview,
  relatedPosts,
  postContent,
  sponsors,
  navSponsor,
  date
}) {
  const router = useRouter();

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const tags = post?.attributes?.tags?.data;
  const title = post?.attributes?.seo?.opengraphTitle
    ? post?.attributes?.seo?.opengraphTitle
    : post?.attributes?.title && post.attributes.title;
  const description = post?.attributes?.seo?.opengraphDescription
    ? post?.attributes?.seo?.opengraphDescription
    : post?.attributes?.excerpt && post.attributes.excerpt;
  const image = post?.attributes?.seo?.opengraphImage
    ? post?.attributes?.seo?.opengraphImage
    : post?.attributes?.featuredImage?.data?.attributes?.url
      ? post?.attributes?.featuredImage?.data?.attributes?.url
      : post?.legacyFeaturedImage
        ? post?.legacyFeaturedImage?.mediaItemUrl
        : post?.ogImage
          ? post?.ogImage.opengraphImage
          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  const canonical = post?.attributes?.seo?.canonical
    ? post?.attributes?.seo?.canonical
    : post?.attributes?.slug &&
      `https://prototypr.io/post/${post?.attributes.slug}`;
  const url = post?.attributes?.seo?.canonical
    ? post?.attributes?.seo?.canonical
    : post?.attributes?.slug &&
      `https://prototypr.io/post/${post?.attributes.slug}`;

  const author = post.attributes?.author?.data?.attributes;
  const avatar = author?.avatar?.data?.attributes?.url
    ? author?.avatar?.data?.attributes?.url
    : author?.legacyAvatar
      ? author?.legacyAvatar
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  const authorName = `${author?.firstName ? author?.firstName : ""}${author?.lastName ? " " + author?.lastName : ""} ${!author?.firstName && !author?.lastName ? author?.name : ""}`;

  const paymentPointer =
    post?.attributes?.author?.data?.attributes?.paymentPointer;
  const intl = useIntl();

  useEffect(() => {
    addTwitterScript();
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
    <Layout
      maxWidth={"max-w-[1350px] search-wide"}
      padding={false}
      sponsor={navSponsor}
      seo={{
        title: `${title}`,
        description: `${description}`,
        image: `${image}`,
        canonical: `${canonical}`,
        url: `${url}`,
        monetization: `${paymentPointer}`,
      }}
      background="#fff"
      activeNav={"posts"}
      preview={preview}
    >
      <Container
        padding={false}
        maxWidth="max-w-full mx-auto -mt-[96px] bg-gray-100/20"
      >
        <div className="w-full h-full grid grid-cols-12 gap-1 mx-auto mx-auto bg-gray-100/20">
          {user?.isAdmin && (
            <div className="fixed bottom-0 mb-6 z-50 border border-gray-200 bg-white mr-20 right-0 p-2 px-3 rounded-full shadow-sm">
              {/* <button className="p-1 px-3 text-sm text-white bg-purple-600 shadow rounded"> */}
              <Link href={`/p/${post?.id}`}>
                <div className="flex text-gray-700">
                  <PenLineSimple className="w-4 h-4 my-auto mr-2" />
                  <div className="my-auto text-sm">Edit</div>
                </div>
              </Link>
              {/* </button> */}
            </div>
          )}
          {!user?.isAdmin && user?.id == post?.attributes?.author?.data?.id ? (
            <div className="fixed bottom-0 mb-6 z-50 border border-gray-200 bg-white mr-20 right-0 p-2 px-3 rounded-full shadow-sm">
              {/* <button className="p-1 px-3 text-sm text-white bg-purple-600 shadow rounded"> */}
              <Link href={`/p/${post?.id}`}>
                <div className="flex text-gray-700">
                  <PenLineSimple className="w-4 h-4 my-auto mr-2" />
                  <div className="my-auto text-sm">Edit</div>
                </div>
              </Link>
              {/* </button> */}
            </div>
          ) : null}

          {/* <Alert preview={preview} /> */}
          <main className="pb-20 gap-2 col-span-12 lg:col-span-12 px-0 ">
            {/* {post?.id && process.env.NODE_ENV === "production" && (
              <WMPostTracker postId={post?.id} post={post} />
            )} */}
            {router.isFallback ? (
              <h1 className="text-6xl  font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center md:text-left">
                Loading
              </h1>
            ) : (
              <>
                {/* <img src={'/static/images/check.svg'} className="absolute opacity-20 p-6 h-[298px] mt-[60px] top-0 left-0 w-full object-cover"/> */}

                <div className="relative pt-[128px]">
                  <div
                    // style={{
                    //   backgroundImage:
                    //     "linear-gradient(rgba(32, 52, 144,0.10) 1px, transparent 1px), linear-gradient(to right, rgba(32, 52, 144,0.10) 1px, rgba(247, 247, 247,0.10) 1px)",
                    //   backgroundSize: "26px 26px",
                    // }}
                    className="relative -mt-[96px] md:-mt-0 pt-[64px] md:pt-0 mx-auto w-[1351px] max-w-full z-10 px-3 md:px-3"
                  >
                    {!post.currentLocaleAvailable && <NoticeTranslation />}

                    <div className="pt-4 w-[1350px] max-w-full mx-auto w-full">
                      <p className="text-left md:px-1 mt-3 md:mt-0 mb-10 text-base tracking-tight text-black/80">
                        <Date dateString={post.attributes.date} />
                      </p>
                    </div>
                    <div className="pb-[112px]">
                      <PostHeader
                        slug={post?.attributes?.slug}
                        title={post?.attributes?.title}
                        coverImage={
                          post?.attributes?.featuredImage?.data?.attributes?.url
                            ? post?.attributes?.featuredImage?.data?.attributes
                                ?.url
                            : post?.attributes?.legacyFeaturedImage
                              ? post?.attributes?.legacyFeaturedImage
                              : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                        }
                        date={post.attributes.date}
                        author={post.attributes?.author?.data?.attributes}
                        template={post.attributes?.template}
                      />
                      <div className="w-full flex justify-start w-[1350px] max-w-full mx-auto mt-4 mb-6 md:mb-1 px-0">
                        <div className="flex flex-col md:flex-row justify-between w-full">
                          {author ? (
                            <div className="mb-4 md:mb-0">
                              <div className="flex justify-between">
                                <div className="max-w-2xl">
                                  <Link href={`/people/${author.slug}`}>
                                    <div className="cursor-pointer block">
                                      <div className="flex items-center justify-between mr-1">
                                        {avatar && (
                                          <Image
                                            key={authorName}
                                            src={`${
                                              avatar.startsWith("/")
                                                ? process.env
                                                    .NEXT_PUBLIC_STRAPI_API_URL
                                                : ""
                                            }${avatar}`}
                                            width={54}
                                            height={54}
                                            className="rounded-full object-cover w-[44px] h-[44px] md:w-[54px] md:h-[54px] mr-2 md:mr-3"
                                            alt={authorName}
                                            loader={gumletLoader}
                                          />
                                        )}
                                        <div className="flex flex-col justify-center">
                                          <div className="text-lg tracking-tight md:text-xl mb-0 pb-0 hover:underline font-medium">
                                            {authorName}
                                          </div>
                                          {/* {date && (
                          <div className="text-base text-black/80">
                            Published <Date dateString={date} />
                          </div>
                        )} */}
                                        </div>
                                      </div>
                                      {/* <Avatar
                      date={post.attributes.date}
                      name={
                      `${author?.firstName ? author?.firstName:''}
                        ${author?.lastName ? ' '+author?.lastName:''}
                        ${(!author?.firstName && !author?.lastName) ? author?.name:''}`
                      }
                      picture={avatar}
                    /> */}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          <div className="mb-2 md:mb-0 flex my-auto justify-start flex-wrap">
                            {tags.map((tag, index) => {
                              if (index < 3) {
                                return (
                                  <Link
                                    href={`/posts/${tag.attributes.slug}/page/1`}
                                    className="flex"
                                  >
                                    <button
                                      className={`inline-block h-8 capitalize font-medium text-base px-3 tracking-tight cursor-pointer bg-[#e0e4ea] hover:bg-gray-300 hover:text-black transition transition-all duration-400 rounded-full ${index == tags?.length - 1 ? "" : "mr-3"} text-black/80 text-[15px] font-base flex flex-col justify-center mb-2`}
                                    >
                                      {tag.attributes.name}
                                    </button>
                                  </Link>
                                );
                              }
                            })}
                          </div>
                        </div>
                        {/* <div className=" flex mb-3 justify-center">
                        {tags.map((tag, index) => {
                              return (
                                <Link
                href={`/toolbox/${tag.attributes.slug}/page/1`}
                className="my-auto"
              >

                                <div className={`inline-block capitalize text-base px-3 py-1 cursor-pointer bg-blue-100/60 rounded-full ${index==tags?.length-1?'':'mr-3'} mb-3 text-blue-900 text-[15px] font-base outline outline-1 outline-blue-200 flex flex-col justify-center`}>
                                  {tag.attributes.name}
                                </div>
              </Link>
                              );
                            })}
                      </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 xl:px-0 max-w-full w-[1350px] mx-auto z-30 -mt-[132px] md:-mt-[86px] relative md:rounded-3xl">
                    <div className="relative rounded-2xl shadow-md max-w-full border border-gray-100/80">
                      <div className="animate-pulse z-10 absolute top-0 left-0 duration-50  max-w-full md:bg-gray-100 mx-auto z-30 rounded-2xl" />
                      <Image
                        key={image}
                        width={1020}
                        placeholder="blur"
                        blurDataURL={post?.attributes?.base64}
                        height={550}
                        loader={gumletLoader}
                        className="h-full z-20 relative w-full object-contain rounded-2xl max-w-full"
                        src={image}
                      />
                    </div>
                  </div>

                  <div className="z-0 -mt-4 h-[60%] w-full bg-gradient-to-b from-blue-100/50 to-gray-100/20 absolute top-0 left-0" />
                </div>
                <article className="z-10 relative px-6 lg:px-0 max-w-full w-[1350px] mx-auto grid grid-cols-12">
                  {/* <Head> */}
                  {/* <title>
                  {post.attributes?.title} | Prototypr
                </title> */}
                  {/* <meta property="og:image" content={post.attributes.ogImage} /> */}
                  {/* </Head> */}
                  <div className="hidden sticky top-6 mt-8 h-fit lg:col-span-1 lg:block">
                    <LikeButton post={post} user={user} />
                  </div>
                  <div className="max-w-full col-span-12 md:col-span-9 lg:col-span-8 lg:pl-[14%] md:pr-4 lg:pr-0">
                    <div
                      className="max-w-full blog-content w-[44rem] mt-10 mx-auto"
                      dangerouslySetInnerHTML={{
                        __html: postContent,
                      }}
                    />
                    <div>
                      <AuthorBio
                        authorAvatar={avatar}
                        slug={post?.attributes?.slug}
                        title={post?.attributes?.title}
                        author={post?.attributes?.author?.data?.attributes}
                      />
                    </div>
                  </div>

                  <div className="hidden md:block pt-10 col-span-3">
                    <div className="flex justify-end w-full">
                      {/* <SocialShare
                        slug={post?.attributes?.slug}
                        title={title}
                        authorTwitter={author?.twitter}
                      /> */}
                      <AuthorSidebar
                        post={post}
                        date={date}
                        navSponsor={navSponsor}
                        tags={tags}
                      />
                    </div>
                    {/* <div className="h-[220px] md:h-[310px] xl:h-[220px] transition transition-all duration-400 hover:h-[290px] mt-8 sticky">
                        <AdCard
                          showAdTag={true}
                          height={
                            "h-[220px] md:h-[310px] xl:h-[220px] hover:h-[290px]"
                          }
                          withBackground={true}
                          post={navSponsor}
                        />
                      </div> */}
                    <div className="flex flex-col justify-evenly h-full">
                      <div className="flex w-full justify-end">
                        <div className="h-[220px] md:h-[310px] xl:h-[220px] w-full max-w-[274px] transition transition-all duration-400 hover:h-[290px] mt-8 sticky">
                          <AdCard
                            showAdTag={true}
                            height={
                              "h-[220px] md:h-[310px] xl:h-[220px] hover:h-[290px] "
                            }
                            withBackground={true}
                            post={navSponsor}
                          />
                        </div>
                      </div>
                      <div className="flex w-full justify-end">
                        <div className="h-[220px] md:h-[310px] w-full xl:h-[220px] max-w-[274px] transition transition-all duration-400 hover:h-[290px] mt-8 sticky">
                          <AdCard
                            showAdTag={true}
                            height={
                              "h-[220px] md:h-[310px] xl:h-[220px] hover:h-[290px]"
                            }
                            withBackground={true}
                            post={navSponsor}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </>
            )}
          </main>

          {/* <Sidebar
            tags={tags}
            author={post.attributes?.author?.data?.attributes}
            relatedPosts={relatedPosts}
            paddingTop="hidden md:block pt-[76px]"
          /> */}
        </div>
        {/* <div className="grid grid-cols-12">
          <div className="gap-0 col-span-12 lg:col-span-8">
          {!user?.isLoggedIn && <StickyFooterCTA title="The best stories every week"buttonText="Sign up for free" />}
          </div>
        </div> */}
        {!user?.isLoggedIn && (
          <StickyFooterCTA
            title="Welcome to Prototypr"
            description="Join today to make posts and grow with us."
          />
        )}
      </Container>
      <section className="bg-gray-100 relative">
        <hr className="border-accent-2" />
        <img
          src="/static/images/toolbox/squares2.svg"
          class="w-full h-[100%] absolute object-cover opacity-20"
          loading="lazy"
        ></img>
        <div
          style={{ maxWidth: "1200px" }}
          className="px-6 md:px-0 mx-auto pb-20 relative z-10 mt-20"
        >
          <h1 className="text-2xl  font-medium -mt-3 -mb-3">
            Related Articles
          </h1>
          <div className="mt-10">
            {relatedPosts?.data?.length > 0 ? (
              <PostGroupRow smallPosts={relatedPosts.data} />
            ) : null}
          </div>
        </div>
        {/* {post.attributes?.template !== 2 && (
          <section className="bg-gray-100">
           <div
           style={{ maxWidth: "1200px" }}
           className="px-6 md:px-0 mx-auto pb-12 mt-20"
         >
        <SourcePanel
          titleSize={"lg:text-5xl"}
          className={
            "w-full  mb-4 mt-12 border rounded-lg pb-0 pt-8 border-gray-100"
          }
          title={intl.formatMessage({ id: "newsletterPanel.title3" })}
          desc={intl.formatMessage({ id: "newsletterPanel.desc3" })}
        />
        </div>
        </section>
      )} */}
      </section>
    </Layout>
  );
}
export async function getStaticProps({ params, preview = null, locale }) {
  const data = await getPost(params.slug, preview);
  //if no post found, 404
  if (!data?.posts?.data[0]) {
    return {
      props: {
        post: null,
      },
      //   revalidate:30
    };
  }

  let relatedPosts = {};

  const postData = transformPost(data?.posts.data[0], locale);
  relatedPosts.data = transformPostList(
    data?.posts.data[0].attributes.relatedArticles,
    locale
  );

  for (let i = 0; i < relatedPosts.data.length; i++) {
    relatedPosts.data[i].base64 = createB64WithFallback(
      relatedPosts?.data[i]?.featuredImage?.data?.attributes?.blurhash
    );
  }

  //   console.log(data?.posts.data[0]?.attributes?.relatedArticles)
  const removeFirstImageIfMatchModule = await import("@/lib/removeFirstImage");
  const removeFirstImageIfMatch = removeFirstImageIfMatchModule.default;

  const gumletPostContentLoaderModule = await import(
    "@/lib/gumletPostContentLoader"
  );
  const gumletPostContentLoader = gumletPostContentLoaderModule.default;

  const post = data?.posts?.data[0];

  post.attributes.base64 = createB64WithFallback(
    post?.attributes?.featuredImage?.data?.attributes?.blurhash
  );

  const image = post?.attributes?.featuredImage?.data?.attributes?.url
    ? post?.attributes?.featuredImage?.data?.attributes?.url
    : post?.attributes?.seo?.opengraphImage
      ? post?.attributes?.seo?.opengraphImage
      : post?.legacyFeaturedImage
        ? post?.legacyFeaturedImage?.mediaItemUrl
        : post?.ogImage
          ? post?.ogImage.opengraphImage
          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  let html = removeFirstImageIfMatch(post?.attributes?.content, image);
  html = gumletPostContentLoader(html);

  const { navSponsor, sponsors } = await getSponsors();

  const insertBannerAdsModule = await import("@/lib/insertBannerAds");
  const insertBannerAds = insertBannerAdsModule.default;

  html = insertBannerAds(html, navSponsor, sponsors);

  
  const date = isoToReadableDate(post.attributes.date);

  return {
    props: {
      preview,
      postContent: html,
      post: {
        ...postData,
      },
      sponsors: sponsors?.length ? sponsors : [],
      navSponsor,
      date,
      relatedPosts: relatedPosts,
    },
    // revalidate: 20,
  };
}

export async function getStaticPaths({ locales }) {
  const allPosts = await getAllPostsWithSlug(
    "article",
    process.env.NODE_ENV ||
      process.env.NEXT_PUBLIC_HOME_URL.indexOf("localhost") > -1
      ? TOTAL_STATIC_POSTS
      : 20
  );

  return {
    paths:
      (allPosts &&
        allPosts.data?.map(post => {
          // console.log(post.attributes.slug)
          return `/post/${post.attributes.slug}`;
        })) ||
      [],
    fallback: "blocking",
  };
}
