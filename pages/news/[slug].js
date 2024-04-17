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
  groupedPosts,
  authorAvatar,
  relatedNews,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />;
  }
  let content = "";
  if (post?.attributes.content) {
    // content = truncate(post?.attributes.content, 400);
    content = post?.attributes.content;
  }
  // const tags = post.attributes.tags.data;

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
        <article key={index} className="group relative flex">
          <Link className="flex" href={`/news/${post?.attributes?.slug}`}>
            <div className="flex flex-col items-start pl-6 pr-3">
              <h3 className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                <div className="absolute -inset-x-4 -inset-y-2 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-gray-800/50" />
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
        <div className="w-full border-b border-gray-200 shadow-sm pt-[58px] bg-white z-50 w-full ">
          <div className="max-w-[1320px] py-2.5 px-6 mx-auto xl:px-3">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex text-lg text-black/90">
                <Link href="/news">
                  <div className="font-black tracking-tight text-xl text-sky-500 my-auto">
                    News{" "}
                    <span className="hidden lg:inline-block">Explorer</span>
                  </div>
                </Link>
                <div className="mx-3 text-gray-400/90 my-auto">|</div>
                <div className="line-clamp-1 font-semibold my-auto tracking-tight">
                  {post?.attributes?.title}
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
                    {domain}
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
          <div className="grid gap-3 grid-cols-12 mt-8">
            <div className="col-span-12 lg:col-span-9 ">
              <NewsPageFeatured
                faviconUrl={faviconUrl}
                ogImage={ogImage}
                post={post}
                domain={domain}
                content={content}
                excerpt={post?.attributes?.excerpt}
                authorAvatar={authorAvatar}
              />
            </div>

            <div className="col-span-12 lg:col-span-3 ">
              {/* <div className="bg-white p-3 rounded-2xl border border-gray-300/70 shadow-sm"> */}
              {/* <h1
                  tabIndex={0}
                  className="text-base mb-3 font-semibold tracking-tight"
                >
                  References
                </h1> */}

              {/* {post?.attributes?.outgoingLinks?.length ? (
                  <>
                    <h1
                      tabIndex={0}
                      className="text-base mb-0.5 mt-4 font-semibold tracking-tight"
                    >
                      Referenced Links
                    </h1>
                    <p className="text-xs text-gray-500 mb-3">
                      Articles and links referenced in this post
                    </p>
                    <div className=" mb-3 flex flex-col gap-1 pr-1">
                      {post.attributes.outgoingLinks.map((link, index) => (
                        <a
                          href={`${link.url}?ref=prototypr`}
                          target="_blank"
                          className="text-sm"
                        >
                          <div key={index} className="flex items-center mb-2">
                            {link.imageUrl ? (
                              <img
                                src={link.imageUrl}
                                className="w-10 h-10 my-auto rounded-lg border border-gray-50 mr-2"
                              />
                            ) : (
                              <div className="h-10 w-10 my-auto bg-gray-100/80 border border-gray-100 rounded-lg mr-2 flex flex-col justify-center">
                                <LinkIcon className={'mx-auto text-gray-500/80 w-5 h-5'} />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <div className="text-gray-700 text-xs font-semibold">
                                {link.title
                                  ? link.title
                                  : link.text
                                    ? link.text
                                    : link.url}
                              </div>
                              <div className="text-gray-400 text-xs max-w-[200px] truncate">
                                {link.rootDomain?link.rootDomain:link.url}
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )} */}
              {/* </div> */}
              {/* <button>View</button> */}
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
                <Link
                  target="_blank"
                  href={
                    post?.attributes?.legacyAttributes?.link
                      ? post?.attributes?.legacyAttributes?.link +
                        `?ref=prototypr`
                      : ""
                  }
                >
                  <button className="w-full rounded-xl  bg-blue-500 text-white font-medium h-[44px]">
                    Visit source
                  </button>
                </Link>
              </div>
              {relatedNews && relatedNews.length > 0 ? (
                <div className="bg-white p-3 mt-3 rounded-2xl border border-gray-300/70 shadow-sm">
                  <h1
                    tabIndex={0}
                    className="text-base mb-3 font-semibold tracking-tight"
                  >
                    Related
                  </h1>
                  <div className="flex flex-col gap-4 mt-4">
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
                              <img
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
              <div className="flex flex-col mt-3 gap-4">
                <div className="bg-white grid grid-cols-5 p-3 relative rounded-2xl border border-gray-300/70 shadow-sm">
                  <div className="z-10 col-span-5 xl:col-span-5 relative">
                    <h3 className="font-bold drop-shadow-sm text-xl tracking-[-0.018em] text-gray-800">
                    Tomorrow's news, today
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                     AI-driven updates, curated by humans and hand-edited for the Prototypr community
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
                    <SignupSidebar btnText={'Get it daily'} post={post} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-9 mt-3">
              <h2 className="text-lg font-bold mb-2">Latest</h2>
              <div className="space-y-8">
                {["today", "yesterday", "lastWeek", "lastMonth"].map(
                  group =>
                    groupedPosts[group] &&
                    groupedPosts[group].length > 0 && (
                      <section
                        key={group}
                        aria-labelledby={group}
                        className="lg:border-gray-200 md:pl-"
                      >
                        <div className="grid grid-cols-9 col-span-9 bg-white py-6 px-4 shadow-sm rounded-2xl border border-gray-300/50 mb-3">
                          <div className="col-span-9 lg:col-span-2">
                            <h2
                              id={group}
                              className="mb-6 lg:mb-1 w-[fit-content] lg:pr-4 lg:pl-2 border- border-gray-300/50 text-xl pt-0 leading-tight font-semibold text-black/90"
                            >
                              {group.charAt(0).toUpperCase() + group.slice(1)}
                            </h2>
                          </div>
                          <div className="col-span-9 lg:col-span-7 mb-8">
                            <div className="space-y-16 max-w-2xl mx-auto">
                              {renderPosts(groupedPosts[group])}
                            </div>
                          </div>
                        </div>
                      </section>
                    )
                )}
                {groupedPosts?.months &&
                  Object.entries(groupedPosts?.months).map(([month, posts]) => (
                    <section
                      key={month}
                      aria-labelledby={month}
                      className="lg:border-gray-400/60"
                    >
                      <div className="grid lg:grid-cols-12 bg-white border border-gray-300/50 shadow-sm p-4 pr-8 pb-8 rounded-xl  grid-cols-1 gap-y-6 ">
                        <h2
                          id={month}
                          className="text-lg col-span-3 font-semibold text-gray-800"
                        >
                          {month}
                        </h2>
                        <div className="col-span-12 lg:col-span-9">
                          <div className="space-y-12">{renderPosts(posts)}</div>
                        </div>
                      </div>
                    </section>
                  ))}
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

  // const relatedArticles = data?.posts.data[0]?.attributes?.relatedArticles
  //   ? data?.posts.data[0]?.attributes?.relatedArticles
  //   : [];
  const relatedNews = data?.posts.data[0]?.attributes?.relatedNews
    ? data?.posts.data[0]?.attributes?.relatedNews
    : [];

  let groupedPosts = groupPostsByDate(data.morePosts?.data);

  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
      },
      domain,
      link,
      groupedPosts: groupedPosts,
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
