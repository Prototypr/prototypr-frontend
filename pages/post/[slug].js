import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
const TopicTopItem = dynamic(
  () => import("@/components/new-index/TopicTopItem"),
  { ssr: true }
);
import ProductItem from "@/components/new-index/ProductItem";

const PostHeader = dynamic(() => import("@/components/post-header"), {
  ssr: true,
});
const AuthorBio = dynamic(() => import("@/components/authorBio"), {
  ssr: true,
});
const SourcePanel = dynamic(() => import("@/components/new-index/SourcePanel"));
import { useIntl } from "react-intl";

import Layout from "@/components/layout-post";
import { getAllPostsWithSlug, getPost } from "@/lib/api";
const NoticeTranslation = dynamic(
  () => import("@/components/notice-translation"),
  { ssr: true }
);

import { transformPost, transformPostList } from "@/lib/locale/transformLocale";
import { useEffect } from "react";

export default function Post({ post, preview, relatedPosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />;
  }

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
  }, []);

  return (
    <Layout
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
      <div
        className={`min-h-screen px-3 md:px-8`}
        style={{ background: "#fff" }}
      >
        {/* <Alert preview={preview} /> */}
        <main
          className="pt-24 md:pt-36 -mt-3 mx-auto"
          style={{ maxWidth: "1200px" }}
        >
          <Container>
            {router.isFallback ? (
              <h1 className="text-6xl font-noto-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center md:text-left">
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
                  <div className="max-w-2xl mx-auto blog-content">
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
                {post.attributes?.template !== 2 && (
                  <SourcePanel
                    titleSize={"lg:text-5xl"}
                    className={
                      "w-full font-noto-serif mb-4 mt-16 border rounded-lg pb-0 pt-8 border-gray-100"
                    }
                    title={intl.formatMessage({ id: "newsletterPanel.title3" })}
                    desc={intl.formatMessage({ id: "newsletterPanel.desc3" })}
                  />
                )}
              </>
            )}
          </Container>
        </main>
      </div>
      <section className="bg-gray-100">
        <hr className="border-accent-2" />
        <div
          style={{ maxWidth: "1200px" }}
          className="px-6 md:px-0 mx-auto pb-20 mt-20"
        >
          <h1 className="text-4xl font-noto-serif font-semibold -mt-3 mb-12">
            Related Posts
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
  //   console.log(data?.posts.data[0]?.attributes?.relatedArticles)

  return {
    props: {
      preview,
      post: {
        ...postData,
      },
      relatedPosts: relatedPosts,
    },
    revalidate: 20,
  };
}

export async function getStaticPaths({ locales }) {
  const allPosts = await getAllPostsWithSlug("article", 5000);
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
