import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";

// const TopicTopItem = dynamic(
//   () => import("@/components/new-index/TopicTopItem"),
//   { ssr: true }
// );
import ProductItem from "@/components/new-index/ProductItem";

const PostHeader = dynamic(() => import("@/components/post-header"), {
  ssr: true,
});
const AuthorBio = dynamic(() => import("@/components/authorBio"), {
  ssr: true,
});
const SourcePanel = dynamic(() => import("@/components/new-index/SourcePanel"));
import { useIntl } from "react-intl";

import Layout from "@/components/layoutForBlogPost";

import { getAllPostsWithSlug, getPost } from "@/lib/api";
const NoticeTranslation = dynamic(
  () => import("@/components/notice-translation"),
  { ssr: true }
);

import { transformPost, transformPostList } from "@/lib/locale/transformLocale";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";
import { motion } from "framer-motion";

const WMPostTracker = dynamic(
  () => import("@/components/WebMonetization/WMPostTracker"),
  {
    ssr: false,
  }
);
const KoFiButton = dynamic(
  () => import("@/components/ko-fi-button/Ko-Fi-Button"),
  { ssr: false }
);

function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

const StickyFooterCTA = () => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      const p = getScrollPercent();

      if (p > 4 && p < 85) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  return (
    <div className="w-full grid place-items-center relative ">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 },
          },
          hidden: { opacity: 0, y: 100, transition: { duration: 0.2 } },
        }}
        className="fixed bottom-0 rounded-none sm:bottom-10 max-w-2xl w-full px-5 py-4 h-auto sm:rounded-lg border border-black border-opacity-10 bg-[#3574F0] z-[100]"
      >
        <div className="w-full flex flex-col gap-4 sm:gap-3 sm:flex-row justify-between">
          <div className="flex flex-row justify-center items-center gap-4 sm:gap-8">
            <div>
              <svg
                width="35"
                height="41"
                viewBox="0 0 35 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.409489 41.0005C0.182943 41.0005 0 40.8138 0 40.5827V14.9456C0 6.70841 6.54424 0.0302734 14.6184 0.0302734C14.844 0.0302734 15.0279 0.216933 15.0279 0.448081V26.0852C15.0269 34.3223 8.48268 41.0005 0.409489 41.0005Z"
                  fill="white"
                />
                <path
                  d="M20.6181 30.4709C20.3129 30.4709 20.0664 30.2185 20.0664 29.908V0.562879C20.0664 0.252426 20.3138 0 20.6181 0C28.5605 0 34.9995 6.56981 34.9995 14.6735V15.7974C34.9995 23.9011 28.5605 30.4709 20.6181 30.4709Z"
                  fill="#61BEEC"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-medium text-white">
                Learn. Create. Publish.
              </h1>
              <p className="text-sm max-w-md text-white text-opacity-80">
                Discover the people, ideas, and process behind designing and
                building great products.
              </p>
            </div>
          </div>
          <button className="px-7 h-10 sm:h-auto text-sm text-black shadow-sm py-0 rounded-full bg-white">
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function Post({ post, preview, relatedPosts }) {
  const router = useRouter();

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  console.log(post.id);
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

  const paymentPointer =
    post?.attributes?.author?.data?.attributes?.paymentPointer;
  const intl = useIntl();

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

  return (
    <Layout
      maxWidth={"max-w-[1320px] search-wide"}
      padding={false}
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
      <Container>
        <div className="w-full h-full grid grid-cols-12 gap-1  ">
          {user?.isAdmin && (
            <div className="fixed bottom-0 mb-16 z-50 border border-gray-100 bg-white mr-16 right-0 p-4 rounded shadow">
              <p className="text-sm">Hi, Admin 👩‍✈️</p>
              <button className="p-1 mt-3 px-3 text-sm text-white bg-purple-600 shadow rounded">
                <Link href={`/p/${post?.id}`}>Edit</Link>
              </button>
            </div>
          )}

          {/* <Alert preview={preview} /> */}
          <main className="pb-20 gap-2 col-span-12 lg:col-span-8  px-3 md:px-8 xl:px-0 py-10">
            {post?.id && process.env.NODE_ENV === "production" && (
              <WMPostTracker postId={post?.id} post={post} />
            )}
            {router.isFallback ? (
              <h1 className="text-6xl font-inter-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center md:text-left">
                Loading
              </h1>
            ) : (
              <>
                <article>
                  {/* <Head> */}
                  {/* <title>
                  {post.attributes?.title} | Prototypr
                </title> */}
                  {/* <meta property="og:image" content={post.attributes.ogImage} /> */}
                  {/* </Head> */}
                  {!post.currentLocaleAvailable && <NoticeTranslation />}
                  <StickyFooterCTA />

                  <PostHeader
                    slug={post?.attributes?.slug}
                    title={post?.attributes?.title}
                    coverImage={
                      post?.attributes?.featuredImage?.data?.attributes?.url
                        ? post?.attributes?.featuredImage?.data?.attributes?.url
                        : post?.attributes?.legacyFeaturedImage
                        ? post?.attributes?.legacyFeaturedImage
                        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                    }
                    date={post.attributes.date}
                    author={post.attributes?.author?.data?.attributes}
                    template={post.attributes?.template}
                  />
                  <div className="max-w-[45rem] mx-auto blog-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.attributes?.content,
                      }}
                    />
                  </div>
                </article>
                <div>
                  <AuthorBio
                    slug={post?.attributes?.slug}
                    title={post?.attributes?.title}
                    author={post?.attributes?.author?.data?.attributes}
                  />
                </div>
              </>
            )}
          </main>

          <Sidebar
            author={post.attributes?.author?.data?.attributes}
            relatedPosts={relatedPosts}
            paddingTop="hidden md:block pt-[76px]"
          />
        </div>
      </Container>
      <section className="bg-gray-100">
        <hr className="border-accent-2" />
        <div
          style={{ maxWidth: "1200px" }}
          className="px-6 md:px-0 mx-auto pb-20 mt-20"
        >
          <h1 className="text-4xl font-inter-serif font-semibold -mt-3 mb-12">
            Related Articles
          </h1>
          <div className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {relatedPosts?.data?.length > 0 &&
              relatedPosts.data.map((item, index) => {
                return (
                  <ProductItem key={`product_item_${index}`} post={item} />
                  // <TopicTopItem key={index} topic={item}/>
                );
              })}
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
            "w-full font-inter-serif mb-4 mt-12 border rounded-lg pb-0 pt-8 border-gray-100"
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

const Sidebar = ({ relatedPosts, paddingTop, author }) => {
  const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-0");

  const _handleWaypointEnter = () => {
    setStickyPaddingTop("pt-0");
  };
  const _handleWaypointLeave = () => {
    setStickyPaddingTop(SIDEBAR_STICKY_OFFSET);
  };

  const avatar = author?.avatar?.data?.attributes?.url
    ? author?.avatar?.data?.attributes?.url
    : author?.legacyAvatar
    ? author?.legacyAvatar
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  const github = getGithubHandle(author?.github);
  const twitter = getTwitterHandle(author?.twitter);
  const dribbble = getDribbbleHandle(author?.dribbble);
  const kofi = getKofiHandle(author?.kofi);

  return (
    <div className={`${paddingTop} relative col-span-4 max-w-[410px]`}>
      <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
      <div
        className={`${stickyPaddingTop} absolute transition transition-all duration-300 sticky top-0 min-h-screen hidden lg:block`}
      >
        <aside className="h-screen px-10 sticky top-0 py-0">
          <div className="flex flex-col grid gap-10">
            <div>
              {author ? (
                <div className="flex rounded-xl flex-col">
                  <div className="w-[80px] h-[80px] relative border border-gray-100 rounded-full shadow-sm mb-3">
                    {avatar ? (
                      <Link href={`/people/${author.slug}`}>
                        <Image
                          src={avatar}
                          objectFit="cover"
                          layout="fill"
                          className="rounded-full"
                          alt={"user avatar"}
                          loader={gumletLoader}
                        />
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link href={`/people/${author.slug}`}>
                      <h1 className="text-xl mt-1 font-semibold leading-normal text-gray-800">
                        {/* {author?.name ? author?.name : ""} */}
                        {`${author?.firstName ? author?.firstName : ""}
                  ${author?.lastName ? " " + author?.lastName : ""}
                  ${
                    !author?.firstName && !author?.lastName ? author?.name : ""
                  }`}
                      </h1>
                    </Link>
                    {author?.jobrole && (
                      <h3 className="text-gray-500 line-clamp-1 text-sm font-normal leading-normal mb-1 text-gray-700">
                        {author?.jobrole}
                      </h3>
                    )}
                    {author?.bio && (
                      <div
                        style={{ maxWidth: "40rem" }}
                        className="text-sm  line-clamp-3 overflow-hidden text-gray-500 mt-3 max-w-lg"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: author.bio,
                          }}
                        />
                      </div>
                    )}
                    <div className="flex mt-4 z-20">
                      {author?.url && (
                        <a href={author?.url}>
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              marginTop: "2px",
                            }}
                            className="text-sm flex justify-center flex-start leading-normal mr-2 text-gray-600 font-normal p-1 bg-gray-200 shadow-sm rounded-full p-1"
                          >
                            <img
                              className=" my-auto "
                              data-src="/static/images/icons/link.svg"
                            />
                            {/* <div className=""><a className="underline text-gray-600" target="_blank" href={this.props.user.url}>{this.props.user.url.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, "")}</a></div> */}
                          </div>
                        </a>
                      )}

                      {twitter && (
                        <a
                          className="link block mr-2"
                          href={`https://twitter.com/${twitter}`}
                          target="_blank"
                        >
                          <img
                            style={{ width: "28px" }}
                            className=" bg-white rounded-full shadow-sm hover:shadow-md"
                            data-src="/static/images/icons/twitter.svg"
                          />
                        </a>
                      )}
                      {dribbble && (
                        <a
                          className="link block mr-2"
                          href={`https://dribbble.com/${dribbble}`}
                          target="_blank"
                        >
                          <img
                            style={{ width: "28px" }}
                            className=" bg-white rounded-full shadow-sm hover:shadow-md"
                            data-src="/static/images/icons/dribbble.svg"
                          />
                        </a>
                      )}
                      {github && (
                        <a
                          className="link block mr-2"
                          href={`https://github.com/${github}`}
                          target="_blank"
                        >
                          <img
                            style={{ width: "28px" }}
                            className=" bg-white rounded-full shadow-sm hover:shadow-md"
                            data-src="/static/images/icons/github.svg"
                          />
                        </a>
                      )}
                      {kofi ? (
                        <div className="mb-3 inline-block">
                          <KoFiButton
                            color="#53b1e6"
                            label={"Buy me a coffee"}
                            kofiId={kofi}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {author?.availability == "1" && (
                      <a
                        className="cursor-pointer"
                        target="_blank"
                        href={`${author?.url ? author?.url : "#"}`}
                      >
                        <div className="bg-blue-800 mr-2 mb-2 mt-4 uppercase text-white text-xs px-3 py-2 rounded inline-block">
                          <span className="hidden sm:block">
                            🔥 Available for hire
                          </span>
                          <span className="sm:hidden">🔥 Hire me</span>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* EMAIL FORM */}
              <div className="w-full mt-6 rounded-xl p-5 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Dive deeper
                </h3>
                <p className="text-base text-gray-500 mb-6">
                  Get a curated selection of the best articles from Prototypr in
                  your inbox.
                </p>
                <SignupSidebar />
              </div>

              <div className="mt-8">
                <SponsorSidebarCard
                  sponsorLocation="article"
                  page={"/article/*"}
                />
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
  //   console.log(data?.posts.data[0]?.attributes?.relatedArticles)

  return {
    props: {
      preview,
      post: {
        ...postData,
      },
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
      ? 20
      : 5000
  );
  // const homePosts = await getCombinedPostsForHomeStatic()

  // let mergedSlugs = {
  //   ...allPosts,
  //   ...homePosts
  // };

  return {
    paths:
      (allPosts &&
        allPosts.data?.map((post) => {
          // console.log(post.attributes.slug)
          return `/post/${post.attributes.slug}`;
        })) ||
      [],
    fallback: "blocking",
  };
}

function getTwitterHandle(string) {
  if (!string) {
    return false;
  }
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("twitter.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return "@" + result;
}
function getDribbbleHandle(string) {
  if (!string) {
    return false;
  }
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("dribbble.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
}
function getKofiHandle(string) {
  if (!string) {
    return false;
  }
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("kofi.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
}
function getGithubHandle(string) {
  if (!string) {
    return false;
  }
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("github.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
}
