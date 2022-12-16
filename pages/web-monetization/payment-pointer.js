import dynamic from "next/dynamic";

import { useRouter } from "next/router";
// import ErrorPage from "next/error";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";

// import ProductItem from "@/components/new-index/ProductItem";

const PostHeader = dynamic(() => import("@/components/post-header"), {
  ssr: true,
});
import { useIntl } from "react-intl";

import Layout from "@/components/layout-post";
// const NoticeTranslation = dynamic(
//   () => import("@/components/notice-translation"),
//   { ssr: true }
// );

import { useEffect } from "react";
const WMPostTracker = dynamic(() => import("@/components/WebMonetization/WMPostTracker"), {
  ssr: false,
});
import { uphold_html } from "@/components/posts/html/uphold";

export default function Post({ post, preview, relatedPosts }) {
  const router = useRouter();

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });


  // if (!router.isFallback && !post?.attributes?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  const intl = useIntl();

  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("id", "twitter-widget");
    s.setAttribute("async", "true");

    if (!document.getElementById("twitter-widget")) {
      document.head.appendChild(s);
    }

    if(window.$crisp){
      // window.$crisp.push(["config", "position:reverse", true])
      // window.$crisp.push(['do', 'chat:close']);
      window.$crisp.push(['do', 'chat:hide']);
    }

  }, []);

  return (
    <Layout
      seo={{
        title: `How to Set up a Digital Wallet at Uphold`,
        description: `To collect micropayments, you need a digital wallet in which to receive the money. Here at Prototypr, we let content creators use our digital wallet, so you don’t have to sign up for one yourself.`,
        image: `https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/7b0fd1ecf66bd1c9789e0069e7c7ad1e.png`,
        canonical: `https://prototypr.io/web-monetization/payment-pointer`,
        url: `https://prototypr.io/web-monetization/payment-pointer`,
        monetization: `$ilp.uphold.com/KFf2ZdYLXnj9`,
      }}
      background="#fff"
      activeNav={"posts"}
    >
      <div
        className={`min-h-screen px-2 md:px-8`}
        style={{ background: "#fff" }}
      >        
        <main
          className="pt-24 md:pt-24 -mt-3 mx-auto"
          style={{ maxWidth: "1200px" }}
        >
          {(post?.id && (process.env.NODE_ENV==='production')) && 
          <WMPostTracker postId={post?.id} post={post}/>}
          <Container>
              <>
                <article>
                  {/* {!post.currentLocaleAvailable && <NoticeTranslation />} */}
                  {/* <NoticeTranslation /> */}
                  <PostHeader
                    slug={''}
                    title={'How to Set up a Digital Wallet'}
                    coverImage={"https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/725185bb6c4bb16f695df44eb7f98526.png"}
                    // date={post.attributes.date}
                    // author={post.attributes?.author?.data?.attributes}
                    template={3}
                  />
                  <div className="guide-layout px-8 md:px-6 pt-6 md:pt-12 bg-white max-w-5xl mx-auto md:-mt-[240px] rounded-xl shadow-lg max-w-2xl mx-auto blog-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: uphold_html,
                      }}
                    />
                  </div>
                </article>
                <div>
                  {/* <AuthorBio
                    slug={post?.attributes?.slug}
                    title={post?.attributes?.title}
                    author={post?.attributes?.author?.data?.attributes}
                  /> */}
                </div>
                {/* {post.attributes?.template !== 2 && (
                  <SourcePanel
                    titleSize={"lg:text-5xl"}
                    className={
                      "w-full font-inter-serif mb-4 mt-16 border rounded-lg pb-0 pt-8 border-gray-100"
                    }
                    title={intl.formatMessage({ id: "newsletterPanel.title3" })}
                    desc={intl.formatMessage({ id: "newsletterPanel.desc3" })}
                  />
                )} */}
              </>
          </Container>
        </main>
      </div>
      {/* <section className="bg-gray-100">
        <hr className="border-accent-2" />
        <div
          style={{ maxWidth: "1200px" }}
          className="px-6 md:px-0 mx-auto pb-20 mt-20"
        >
          <h1 className="text-4xl font-inter-serif font-semibold -mt-3 mb-12">
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
      </section> */}
    </Layout>
  );
}

// export async function getStaticProps({ params, preview = null, locale }) {
//   const data = await getPost(params.slug, preview);
//   //if no post found, 404
//   if (!data?.posts?.data[0]) {
//     return {
//       props: {
//         post: null,
//       },
//       //   revalidate:30
//     };
//   }

//   let relatedPosts = {};

//   const postData = transformPost(data?.posts.data[0], locale);
//   relatedPosts.data = transformPostList(
//     data?.posts.data[0].attributes.relatedArticles,
//     locale
//   );
//   //   console.log(data?.posts.data[0]?.attributes?.relatedArticles)

//   return {
//     props: {
//       preview,
//       post: {
//         ...postData,
//       },
//       relatedPosts: relatedPosts,
//     },
//     // revalidate: 20,
//   };
// }

// export async function getStaticPaths({ locales }) {
//   const allPosts = await getAllPostsWithSlug("article", 5000);
//   // const homePosts = await getCombinedPostsForHomeStatic()

//   // let mergedSlugs = {
//   //   ...allPosts,
//   //   ...homePosts
//   // };

//   return {
//     paths:
//       (allPosts &&
//         allPosts.data?.map((post) => {
//           // console.log(post.attributes.slug)
//           return `/post/${post.attributes.slug}`;
//         })) ||
//       [],
//     fallback: "blocking",
//   };
// }
