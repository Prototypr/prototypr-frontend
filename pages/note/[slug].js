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
import { addTwitterScript } from "@/lib/addTwitterScript";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";
import getSponsors from "@/lib/utils/getSponsors";

import AdCard from "@/components/v4/card/AdCard";
import { NoteReceipt, PenLineSimple } from "@/components/icons";
import AuthorSidebar from "@/components/AuthorSidebar";
import LikeButton from "@/components/LikeButton";
import isoToReadableDate from "@/lib/utils/isoToReadableDate";
import { Note } from "@phosphor-icons/react";

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
  date,
}) {
  const router = useRouter();

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  if (!router.isFallback && !post?.attributes?.slug) {
    return (
      <>
        {JSON.stringify(post)}
        <ErrorPage statusCode={404} />
      </>
    );
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

  const authorName = `${author?.firstName ? author?.firstName : ""}${
    author?.lastName ? " " + author?.lastName : ""
  } ${!author?.firstName && !author?.lastName ? author?.name : ""}`;

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
              <Link href={`/n/${post?.id}`}>
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
              <Link href={`/n/${post?.id}`}>
                <div className="flex text-gray-700">
                  <PenLineSimple className="w-4 h-4 my-auto mr-2" />
                  <div className="my-auto text-sm">Edit</div>
                </div>
              </Link>
              {/* </button> */}
            </div>
          ) : null}

          {/* <Alert preview={preview} /> */}
          <main className="gap-2 col-span-12 lg:col-span-12 px-0 ">
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
                <div className="h-fit overflow-hidden bg-gray-100">
                  <div className="w-[758px] group z-10 flex items-center justify-center bg-gray-50 mx-auto mt-32 mb-20 relative rounded-sm rounded-b-none shadow-lg h-fit">
                    <div className="group relative w-full h-full overflow-hidden bg-white group-hover:border-gray-100  shadow-lg p-6 transform -rotate-0 hover:rotate-0 transition-all duration-500 ease-in-out border border-opacity-0 border-gray-400 group-hover:border-opacity-100">
                      <div className="inset-0 z-0">
                        <div className="relative bg-white p-6 flex flex-col justify-start h-full z-10">
                          <div className="mb-6 text-xs flex font-medium text-gray-500 tracking-tight uppercase p-1 px-2 bg-gray-100 rounded-full w-fit">
                           <Note className="w-4 h-4 mr-1" />
                           <div className="text-[11px]">Note</div>
                          </div>
                          <h1 className="text-[44px] tracking-tight mb-6 w-full leading-tight md:max-w-[90%] text-black/90  font-medium text-left drop-shadow-sm">
                            {title}
                          </h1>
                          {author ? (
                            <div className="mb-3">
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
                                          <div className="tracking-tight text-sm mb-0 pb-0 hover:underline font-medium">
                                            {authorName}
                                          </div>
                                          <div className="text-black/80">
                                            <Date
                                              className="text-sm"
                                              dateString={post.attributes.date}
                                            />
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

                          <div className="my-3 py-3 border-b border-t border-gray-200">
                            <SocialShare
                              slug={post?.attributes?.slug}
                              title={title}
                              authorTwitter={author?.twitter}
                              postType="note"
                            />
                          </div>
                          <div
                            className="max-w-full blog-content w-[44rem] mt-6 mx-auto"
                            dangerouslySetInnerHTML={{
                              __html: postContent,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="absolute inset-0 bg-gray-50 -left-1 top-0.5 transform -rotate-[1.5deg] -z-10 shadow-md transition-all duration-500 ease-in-out group-hover:-left-0.5 group-hover:-top-[2px] group-hover:rotate-0 border-l border-gray-50 border border-opacity-0 group-hover:border-gray-100 group-hover:border-opacity-100" />
                    <div className="absolute inset-0 bg-white/80 -right-0.5 top-0.5 transform rotate-[1.5deg] -z-20 shadow-md transition-all duration-500 ease-in-out group-hover:-left-[4px] group-hover:right-0 group-hover:-top-[4px] group-hover:rotate-0 border-l border-t border-gray-50 border-opacity-0 group-hover:border-gray-100 group-hover:border-opacity-100" />
                    <div className="absolute inset-0 -right-0.5 top-0 transform rotate-[1.5deg] -z-50 shadow-md transition-all duration-500 ease-in-out group-hover:right-0.5 group-hover:-top-0.5 group-hover:rotate-0 border-l group-hover:border-gray-100 border-opacity-0 group-hover:border-opacity-100" /> */}
                    <div className="absolute inset-0 bg-gray-50 -left-1 top-0.5 transform -rotate-[1.5deg] -z-10 shadow-md transition-all duration-500 ease-in-out border-l border-gray-50 border border-opacity-0" />
                    <div className="absolute inset-0 bg-white/80 -right-0.5 top-0.5 transform rotate-[1.5deg] -z-20 shadow-md transition-all duration-500 ease-in-out border-l border-t border-gray-50 border-opacity-0" />
                    <div className="absolute inset-0 -right-0.5 top-0 transform rotate-[1.5deg] -z-50 shadow-md transition-all duration-500 ease-in-out border-l border-opacity-0" />
                  </div>
                </div>
                {/* <Head> */}
                {/* <title>
                  {post.attributes?.title} | Prototypr
                </title> */}
                {/* <meta property="og:image" content={post.attributes.ogImage} /> */}
                {/* </Head> */}
                {/* <div className="hidden sticky top-6 mt-8 h-fit lg:col-span-1 lg:block">
                    <LikeButton post={post} user={user} />
                  </div> */}
                {/* <div className="max-w-full col-span-12 md:col-span-9 lg:col-span-8 md:pr-4 lg:pr-0">
                  <div>
                    <AuthorBio
                      showShare={false}
                      authorAvatar={avatar}
                      slug={post?.attributes?.slug}
                      title={post?.attributes?.title}
                      author={post?.attributes?.author?.data?.attributes}
                    />
                  </div>
                </div> */}
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
  const data = await getPost(params.slug, preview, "note");
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
    "note",
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
          return `/note/${post.attributes.slug}`;
        })) ||
      [],
    fallback: "blocking",
  };
}
