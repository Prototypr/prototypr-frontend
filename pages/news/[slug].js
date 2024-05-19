import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import { getAllPostsWithSlug, getNewsAndMoreNews } from "@/lib/api";
import Link from "next/link";
import NewsPageFeatured from "@/components/v4/layout/NewsPageFeatured";
import { groupPostsByDate } from "@/lib/utils/groupPostsByDate";
import AuthorCard from "@/components/toolbox/AuthorCard";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import Spinner from "@/components/atom/Spinner/Spinner";
import isoToReadableDate from "@/lib/utils/isoToReadableDate";
import SocialShare from "@/components/SocialShare";
import Image from "next/image";
import gumletLoader from "@/lib/imageloader";
import getSponsors from "@/lib/utils/getSponsors";
import ToolBackgroundCard from "@/components/v4/card/ToolBackgroundCard";

const Footer = dynamic(() => import("@/components/footer"));

// const RelatedPosts = dynamic(() => import("@/components/related-posts"), {
//   ssr: true,
// });
// const PostTitle = dynamic(() => import("@/components/post-title"), {
//   ssr: true,
// });
// const SponsorCard = dynamic(() => import("@/components/toolbox/SponsorCard"), {
//   ssr: true,
// });
// const AuthorNewsCredit = dynamic(
//   () => import("@/components/AuthorNewsCredit"),
//   { ssr: true }
// );

// function truncate(str, n) {
//   return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
// }

export default function Post({
  post,
  morePosts,
  preview,
  domain,
  link,
  postDate,
  date,
  groupedPosts,
  authorAvatar,
  relatedNews,
  sponsors,
  navSponsor,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />;
  }
  let content = "";
  let tags = "";
  if (post?.attributes.content) {
    // content = truncate(post?.attributes.content, 400);
    content = post?.attributes.content;
    tags = post.attributes.tags.data;
  }

  if (!post) {
    return (
      <>
        {/* <Layout> */}
        <div className="relative w-full h-full flex">
          <div className="my-auto mx-auto">
            <Spinner />
          </div>
        </div>
        {/* </Layout> */}
      </>
    );
  }

  const renderPosts = posts =>
    posts.map((post, index) => {
      const postDomain = getDomain(post?.attributes?.legacyAttributes?.link);

      const ogImage = post?.attributes?.seo?.opengraphImage
        ? post?.attributes?.seo?.opengraphImage
        : post?.attributes?.featuredImage?.data?.attributes?.url
          ? post?.attributes?.featuredImage?.data?.attributes?.url
          : post?.legacyFeaturedImage
            ? post?.legacyFeaturedImage?.mediaItemUrl
            : post?.ogImage
              ? post?.ogImage.opengraphImage
              : post?.attributes?.ogImage?.opengraphImage
                ? post?.attributes?.ogImage.opengraphImage
                : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
      return (
        <article
          key={index}
          className="group relative flex bg-white p-4 shadow-sm border border-gray-300/50 rounded-2xl"
        >
          <Link className="flex" href={`/news/${post?.attributes?.slug}`}>
            <div className="flex flex-col items-start pl-6 pr-3">
              <h3 className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                {/* <div className="absolute -inset-x-4 -inset-y-2 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-gray-800/50" /> */}
                <a href={post.url}>
                  <span className="absolute -inset-x-4 -inset-y-0 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                  <span className="relative z-10">
                    {post.attributes?.title}
                  </span>
                </a>
              </h3>
              <div className="z-10 mb-2 order-first">
                <div className="relative z-10 flex items-center text-base pl-2.5 border-l-2 border-gray-300/80">
                  <div className="text-sm my-auto font-base text-gray-500">
                    {formatDate(post?.attributes?.date)}
                  </div>
                </div>
              </div>
              <p className="relative z-10 text-sm line-clamp-2 overflow-hidden text-gray-600 dark:text-gray-400">
                <div
                  style={{ color: "#4a5568" }}
                  className="max-w-3xl text-base mb-2"
                  dangerouslySetInnerHTML={{ __html: post.attributes?.excerpt }}
                ></div>
              </p>
              <div className="z-10 mt-1 flex w-[fit-content]">
                <div className="my-auto flex rounded-full flex-col justify-center p-[1px] mr-0.5 bg-black/50">
                  <img
                    className="w-4 h-4 mx-auto my-auto rounded-full"
                    src={`https://www.google.com/s2/favicons?domain=${postDomain}`}
                  />
                </div>
                <div className="text-[10px] ml-1 text-gray-600 my-auto leading-none font-medium uppercase">
                  {postDomain}
                </div>
              </div>
            </div>
            <div className="relative flex-none group-hover:scale-[1.02] w-[120px] h-[120px] order-first transition transition-all duration-400">
              <img
                className="rounded-lg z-10 h-full w-full object-cover"
                src={ogImage}
              />
            </div>
            <div className="flex flex-col justify-center">
              <ChevronRightIcon
                width={20}
                height={20}
                className="text-gray-400 group-hover:text-gray-900 fill-current group-hover:translate-x-2 duration-150 ease-in-out"
              />
            </div>
          </Link>
        </article>
      );
    });

  const ogImage = post?.attributes?.seo?.opengraphImage
    ? post?.attributes?.seo?.opengraphImage
    : post?.attributes?.featuredImage?.data?.attributes?.url
      ? post?.attributes?.featuredImage?.data?.attributes?.url
      : post?.legacyFeaturedImage
        ? post?.legacyFeaturedImage?.mediaItemUrl
        : post?.ogImage
          ? post?.ogImage.opengraphImage
          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;

  return (
    <>
      <Layout
        padding={false}
        navOffset={false}
        sponsor={navSponsor}
        seo={{
          title: `${post?.attributes?.seo?.opengraphTitle ? post?.attributes?.seo?.opengraphTitle : post?.attributes?.title && post.attributes.title}`,
          description: `${post?.attributes?.seo?.opengraphDescription ? post?.attributes?.seo?.opengraphDescription : post?.attributes?.excerpt && post.attributes.excerpt}`,
          image: `${ogImage}`,
          canonical: `${post?.attributes?.seo?.canonical ? post?.attributes?.seo?.canonical : post?.attributes?.slug && `https://prototypr.io/news/${post?.attributes.slug}`}`,
          url: `${post?.attributes?.seo?.canonical ? post?.attributes?.seo?.canonical : post?.attributes?.slug && `https://prototypr.io/news/${post?.attributes.slug}`}`,
        }}
        // activeNav={"posts"}
        // navType={"full"}
        preview={preview}
      >
        <div className="w-full border-b border-gray-200 max-w-[1320px] bg-white mx-auto rounded-b-3xl overflow-hidden shadow-sm pt-[58px] bg-white z-50 w-full ">
          <div className="max-w-[1320px] bg-white z-50 py-2.5 px-6 mx-auto xl:px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex text-lg text-black/90">
                <Link href="/news">
                  <div className="font-black tracking-tight text-xl text-gray-700 my-auto">
                    News{" "}
                    <span className="hidden lg:inline-block">Explorer</span>
                  </div>
                </Link>
                <div className="mx-3 text-gray-400/90 my-auto">|</div>
                <div className="line-clamp-1 font-semibold my-auto tracking-tight">
                  <a
                    target={"_blank"}
                    href={post?.attributes?.link + "?ref=prototypr.io"}
                  >
                    {post?.attributes?.title}
                  </a>
                </div>
                {/* <div className="ml-3 flex font-base text-gray-500/90 my-auto">
                <img className="w-4 h-4 mr-1 my-auto" src={faviconUrl} />
                <div>{domain}</div>
              </div> */}
                <div className="hidden md:flex ml-4 w-[fit-content]">
                  <div className="my-auto flex rounded-full flex-col justify-center p-[1px] mr-0.5 bg-black/50">
                    <img
                      className="w-4 h-4 mx-auto my-auto rounded-full"
                      src={faviconUrl}
                    />
                  </div>
                  <div className="text-xs my-auto leading-none text-gray-500 ml-1 font-medium uppercase">
                    <a
                      target={"_blank"}
                      href={post?.attributes?.link + "?ref=prototypr.io"}
                    >
                      {domain}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Container
          padding={false}
          maxWidth="w-full px-3 xl:px-0 pb-20 mt-3 relative z-0 relative w-full h-full  max-w-[1320px] mx-auto"
        >
          <div className="grid gap-8 grid-cols-12 mt-8">
            <div className="col-span-12 lg:col-span-9 ">
              <NewsPageFeatured
                faviconUrl={faviconUrl}
                ogImage={ogImage}
                post={post}
                domain={domain}
                content={content}
                excerpt={post?.attributes?.excerpt}
                authorAvatar={authorAvatar}
                morePosts={
                  <div className="mt-8 hidden lg:block">
                    <h2 className="text-lg font-bold mb-6">Latest News</h2>
                    <div className="space-y-8">
                      {[
                        "today",
                        "yesterday",
                        "thisWeek",
                        "lastWeek",
                        "lastMonth",
                      ].map(group => {
                        let formattedGroup = group?.replace("last", "last ");
                        formattedGroup = formattedGroup?.replace(
                          "this",
                          "this "
                        );
                        return (
                          groupedPosts &&
                          groupedPosts[group] &&
                          groupedPosts[group].length > 0 && (
                            <section
                              key={group}
                              aria-labelledby={group}
                              className="lg:border-gray-200 md:pl-"
                            >
                              <div className="grid grid-cols-9 col-span-9 mb-3">
                                {/* <div className="col-span-9">
                                  <h2
                                    id={group}
                                    className="mb-6 lg:mb-1 w-[fit-content] lg:pr-4 lg:pl-2 border- border-gray-300/50 text-xl pt-0 leading-tight font-semibold text-black/90"
                                  >
                                    {formattedGroup?.charAt(0).toUpperCase() +
                                      formattedGroup?.slice(1)}
                                  </h2>
                                </div> */}
                                <div className="col-span-9 mb-8">
                                  <div className="space-y-4">
                                    {renderPosts(groupedPosts[group])}
                                  </div>
                                </div>
                              </div>
                            </section>
                          )
                        );
                      })}
                      {groupedPosts?.months &&
                        Object.entries(groupedPosts?.months).map(
                          ([month, posts]) => (
                            <section
                              key={month}
                              aria-labelledby={month}
                              className="lg:border-gray-400/60"
                            >
                              <div className="grid lg:grid-cols-12 bg-white border border-gray-300/50 shadow-sm p-4 pr-8 pb-8 rounded-xl  grid-cols-1 gap-y-6 ">
                                <h2
                                  id={month}
                                  className="text-lg col-span-12 font-semibold text-gray-800"
                                >
                                  {month}
                                </h2>
                                <div className="col-span-12">
                                  <div className="space-y-12">
                                    {renderPosts(posts)}
                                  </div>
                                </div>
                              </div>
                            </section>
                          )
                        )}
                    </div>
                  </div>
                }
              />
            </div>

            <div className="col-span-12 lg:col-span-3 ">
              <div className="p-4 bg-[#f4f4f4]/60 rounded-xl mb-4">
                {/* <h1
                  tabIndex={0}
                  className="text-sm text-gray-600 mb-3 tracking-tight"
                >
                  {post?.attributes?.creator ? "Contributors" : "Posted by"}
                </h1> */}
                <div className=" flex">
                  <AuthorCard
                    authorAvatar={authorAvatar}
                    title={post?.attributes?.creator ? "Curator" : null}
                    author={post?.attributes?.author}
                    avatar={post?.attributes?.author}
                  />
                  {post.attributes?.creator ? (
                    <div className="ml-10">
                      <AuthorCard
                        title={post?.attributes?.creator ? "Creator" : null}
                        author={post?.attributes?.creator}
                        avatar={post?.attributes?.creator}
                        authorAvatar={authorAvatar}
                      />
                    </div>
                  ) : null}
                </div>
                {/* <Link
                  target="_blank"
                  href={
                    post?.attributes?.legacyAttributes?.link
                      ? post?.attributes?.legacyAttributes?.link +
                        `?ref=prototypr`
                      : ""
                  }
                >
                  <button className="w-full rounded-xl  bg-blue-500 text-white h-[44px]">
                    Visit source
                  </button>
                </Link> */}
              </div>
              <div className="flex mb-4 flex-col gap-4 mt-4 p-4 rounded-2xl bg-[#f4f4f4]/60">
                <div className="text-gray-500">
                  <h3 className="text-sm tracking-tight  ">Curated</h3>
                  <div className="text-base tracking-tight font-medium text-gray-500">
                    {date}
                  </div>
                </div>
                <div className="text-gray-500 mt-1">
                  <h3 className="text-sm tracking-tight  ">Source</h3>
                  <a
                    href={post?.attributes?.link + "?ref=prototypr.io"}
                    target="_blank"
                  >
                    <div className="text-base tracking-tight font-medium text-gray-800">
                      {domain}
                    </div>
                  </a>
                </div>
                <div className="text-gray-500 mt-1">
                  <h3 className="text-sm tracking-tight ">Tags</h3>
                  {tags?.map((tag, index) => {
                    return (
                      // <Link href={`/toolbox/${tag.attributes.slug}/page/1/`}>
                      <div
                        key={index}
                        className="text-gray-800 capitalize tracking-tight font-medium"
                      >
                        {tag.attributes.name}
                      </div>
                      // </Link>
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

              {relatedNews && relatedNews.length > 0 ? (
                <div className="p-3 bg-[#f4f4f4]/60 rounded-xl">
                  <h1 tabIndex={0} className="text-sm mb-3 text-gray-500">
                    Related
                  </h1>
                  <div className="flex flex-col gap-4">
                    {relatedNews?.map((post, index) => {
                      const _ogImage = post?.featuredImage?.data?.attributes
                        ?.url
                        ? post?.featuredImage?.data?.attributes?.url
                        : post?.seo?.opengraphImage
                          ? post?.seo?.opengraphImage
                          : post?.legacyFeaturedImage
                            ? post?.legacyFeaturedImage?.mediaItemUrl
                            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

                      // const postDomain = getDomain(post?.legacyAttributes?.link);
                      return (
                        <article key={index} className="group relative flex">
                          <Link
                            className="flex"
                            href={`/${post.type == "bite" ? "news" : post.type == "tool" ? "toolbox" : post.type == "article" ? "post" : post.type}/${post?.slug}`}
                          >
                            <div className="flex flex-col items-start pl-2">
                              <h3 className="text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                                {/* <div className="absolute -inset-x-4 -inset-y-2 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-gray-800/50" />
                                <span className="absolute -inset-x-4 -inset-y-0 z-20 sm:-inset-x-6 sm:rounded-2xl" /> */}
                                <span className="relative z-10">
                                  {post?.title}
                                </span>
                              </h3>
                              <div className="z-10 mb-0.5 order-first">
                                <div className="relative z-10 flex items-center text-base pl-2.5 border-l-2 border-gray-300/80">
                                  <div className="text-xs my-auto font-base text-gray-500/90">
                                    {formatDate(post?.date)}
                                  </div>
                                </div>
                              </div>
                              <p className="relative z-10 text-sm line-clamp-2 overflow-hidden text-gray-600 dark:text-gray-400">
                                <div
                                  style={{ color: "#4a5568" }}
                                  className="max-w-3xl text-base mb-2"
                                  dangerouslySetInnerHTML={{
                                    __html: post.attributes?.excerpt,
                                  }}
                                ></div>
                              </p>
                              {/* {postDomain?<div className="z-10 mt-1 flex w-[fit-content]">
                                  <div className="my-auto flex rounded-full flex-col justify-center p-[1px] mr-0.5 bg-black/50">
                                    <img
                                      className="w-4 h-4 mx-auto my-auto rounded-full"
                                      src={`https://www.google.com/s2/favicons?domain=${postDomain}`}
                                    />
                                  </div>
                                  <div className="text-[10px] ml-1 text-gray-600 my-auto leading-none font-medium uppercase">
                                    {postDomain}
                                  </div>
                                </div>:null} */}
                            </div>
                            <div className="relative flex-none group-hover:scale-[1.02] w-[64px] h-[64px] order-first transition transition-all duration-400">
                              <Image
                                loader={gumletLoader}
                                width={100}
                                height={100}
                                className="rounded-lg z-10 h-full w-full object-cover"
                                src={_ogImage}
                              />
                            </div>
                            {/* <div className="flex flex-col justify-center">
                                <ChevronRightIcon
                                  width={20}
                                  height={20}
                                  className="text-gray-400 group-hover:text-gray-900 fill-current group-hover:translate-x-2 duration-150 ease-in-out"
                                />
                              </div> */}
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              <div className="mt-4">
                <ToolBackgroundCard
                  showAdTag={true}
                  height={"h-[220px] md:h-[310px] xl:h-[190px]"}
                  withBackground={true}
                  post={navSponsor}
                />
              </div>
              <div className="flex flex-col mt-3 gap-4">
                <div className="grid grid-cols-5 p-3 relative">
                  <div className="z-10 col-span-5 xl:col-span-5 relative">
                    <h3 className="font-bold drop-shadow-sm text-xl tracking-[-0.018em] text-gray-800">
                      Tomorrow's news, today
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                      AI-driven updates, curated by humans and hand-edited for
                      the Prototypr community
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
                    <SignupSidebar btnText={"Get it daily"} post={post} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Layout>

      <Footer />
    </>
  );
}

export async function getStaticProps({
  params,
  preview = null,
  type = "bite",
}) {
  const data = await getNewsAndMoreNews(params.slug, preview, type);

  //if no post found, 404
  if (!data?.posts?.data[0]) {
    return {
      props: {
        post: null,
      },
      revalidate: 30,
    };
  }

  const postData = data?.posts.data[0];

  //filter the content for posts before 2022
  if (new Date(postData.attributes.date) < new Date("2024-01-01")) {
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
    // postData.attributes.content = postData.attributes.content.replace(
    //truncate the content to 400 characters
    postData.attributes.content =
      postData.attributes?.content?.substring(0, 400) + "...";
  }

  let link = data?.posts.data[0].attributes.link;
  if (!link) {
    link = data?.posts.data[0].attributes.legacyAttributes?.link
      ? data?.posts.data[0].attributes.legacyAttributes?.link
      : "#";
  }
  //get url for link
  let domain = "";
  if (link) {
    domain = getDomain(link);
  }

  const authorAttributes = postData.attributes?.author?.data?.attributes;
  const authorAvatar = authorAttributes?.avatar?.data?.attributes?.url
    ? authorAttributes.avatar.data.attributes.url
    : authorAttributes?.legacyAvatar
      ? authorAttributes.legacyAvatar
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  let postDate = new Date(data?.posts.data[0]?.attributes?.date);
  const date = isoToReadableDate(postDate);
  // const relatedArticles = data?.posts.data[0]?.attributes?.relatedArticles
  //   ? data?.posts.data[0]?.attributes?.relatedArticles
  //   : [];
  const relatedNews = data?.posts.data[0]?.attributes?.relatedNews
    ? data?.posts.data[0]?.attributes?.relatedNews
    : [];

  let groupedPosts = groupPostsByDate(data.morePosts?.data);
  const { navSponsor, sponsors } = await getSponsors();

  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...postData,
      },
      domain,
      navSponsor,
      sponsors,
      link,
      groupedPosts: groupedPosts,
      date: date,
      postDate: JSON.stringify(postDate),
      morePosts: data.morePosts?.data,
      authorAvatar,
      relatedNews,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug("bite");

  return {
    paths:
      (allPosts &&
        allPosts.data?.map(post => {
          return `/news/${post.attributes.slug}`;
        })) ||
      [],
    fallback: true,
  };
}

export const getDomain = link => {
  let domain = link;
  if (link) {
    if (typeof link == "string") {
      let matches = link.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
      domain = matches && matches[1];
      if (domain) {
        domain = domain.replace("www.", "");
      }
    }
  }
  return domain;
};

export const formatDate = timestamp =>
  new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
