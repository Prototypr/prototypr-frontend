import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";
import Date from "@/components/date";

// const TopicTopItem = dynamic(
//   () => import("@/components/new-index/TopicTopItem"),
//   { ssr: true }
// );
import ProductItem from "@/components/new-index/ProductItem";


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
import { useEffect, useState } from "react";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import { SIDEBAR_STICKY_OFFSET, TOTAL_STATIC_POSTS } from "@/lib/constants";
import PostHeader from "@/components/post-header";
import Avatar from "@/components/avatar";
import SocialShare from "@/components/SocialShare";
const StickyFooterCTA = dynamic(() => import("@/components/StickyFooterCTA"), {
  ssr: false,
});
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

export default function Post({ post, preview, relatedPosts, postContent }) {
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

    console.log(image)
    console.log(post)
  const canonical = post?.attributes?.seo?.canonical
    ? post?.attributes?.seo?.canonical
    : post?.attributes?.slug &&
      `https://prototypr.io/post/${post?.attributes.slug}`;
  const url = post?.attributes?.seo?.canonical
    ? post?.attributes?.seo?.canonical
    : post?.attributes?.slug &&
      `https://prototypr.io/post/${post?.attributes.slug}`;

      const author = post.attributes?.author?.data?.attributes
      const avatar = author?.avatar?.data?.attributes?.url
    ? author?.avatar?.data?.attributes?.url
    : author?.legacyAvatar
    ? author?.legacyAvatar
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

    const authorName=`${author?.firstName ? author?.firstName:''}${author?.lastName ? ' '+author?.lastName:''} ${(!author?.firstName && !author?.lastName) ? author?.name:''}`

    // const github = getGithubHandle(author?.github);
    // const twitter = getTwitterHandle(author?.twitter);
    // const dribbble = getDribbbleHandle(author?.dribbble);
    // const kofi = getKofiHandle(author?.kofi);

const date = post.attributes.date
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

  useEffect(()=>{
    var tweets = document.getElementsByClassName('twitter-tweet')
    
    for(var x = 0;x<tweets.length;x++){
      let id = tweets[x]?.getAttribute('tweetId')
      tweets[x].outerHTML=`<div class="twitter-tweet" tweetId="${id}"></div>`
      
      window?.twttr?.widgets?.createTweet(id, tweets[x]);

    }

  },[post.attributes?.content])

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
      <Container padding={false} maxWidth="max-w-full mx-auto -mt-[96px] bg-gray-100/20">
        <div className="w-full h-full grid grid-cols-12 gap-1 mx-auto px-3 md:px-0 mx-auto">
          {user?.isAdmin && (
            <div className="fixed bottom-0 mb-16 z-50 border border-gray-100 bg-white mr-16 right-0 p-4 rounded shadow">
              <p className="text-sm">Hi, Admin 👩‍✈️</p>
              <button className="p-1 mt-3 px-3 text-sm text-white bg-purple-600 shadow rounded">
                <Link href={`/p/${post?.id}`}>Edit</Link>
              </button>
            </div>
          )}

          {/* <Alert preview={preview} /> */}
          <main className="pb-20 gap-2 col-span-12 lg:col-span-12 overflow-x-hidden px-3 md:px-8 xl:px-0">
            {/* {post?.id && process.env.NODE_ENV === "production" && (
              <WMPostTracker postId={post?.id} post={post} />
            )} */}
            {router.isFallback ? (
              <h1 className="text-6xl font-inter-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center md:text-left">
                Loading
              </h1>
            ) : (
              <>
                  {/* <img src={'/static/images/check.svg'} className="absolute opacity-20 p-6 h-[298px] mt-[60px] top-0 left-0 w-full object-cover"/> */}
                 
                 <div className="relative pt-[96px]">

                    <div 
                    style={{"backgroundImage":"linear-gradient(rgba(32, 52, 144,0.2) 1px, transparent 1px), linear-gradient(to right, rgba(32, 52, 144,0.2) 1px, rgba(247, 247, 247,0.2) 1px)","backgroundSize":"26px 26px"}}
                    className="relative mx-auto w-[1301px] border-b border-b-indigo-500/30 border-r border-indigo-500/10 max-w-full z-10">
                          {!post.currentLocaleAvailable && <NoticeTranslation />}

                        <div className="pt-4">

                          <div className=" flex mb-3 justify-center flex-wrap">
                        {tags.map((tag, index) => {
                              return (
                                <Link
                href={`/toolbox/${tag.attributes.slug}/page/1`}
                className="flex"
              >

                                <div className={`inline-block capitalize text-base px-3 py-1 cursor-pointer bg-blue-100/60 rounded-full ${index==tags?.length-1?'':'mr-3'} mb-3 text-blue-900 text-[15px] font-base outline outline-1 outline-blue-200 flex flex-col justify-center`}>
                                  {tag.attributes.name}
                                </div>
              </Link>
                              );
                            })}
                      </div>
                        </div>
                      <div className="pb-[114px]">
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
                      {/* <p className="mx-auto text-center text-md my-3 text-black/70"><Date dateString={post.attributes.date} /></p> */}
                      </div>

                      </div>
                      <div className="h-[550px] w-[1020px] bg-blue-50 border border-[3px] border-white mx-auto z-30 -mt-[80px] relative rounded-2xl shadow-md outline outline-1 outline-gray-300/20 overflow-hidden">
                        <div className="animate-pulse z-10 absolute top-0 left-0 duration-50 h-[544px] w-[1014px] bg-gray-100 mx-auto z-30 rounded-2xl"/>
                        <Image width={1014} height={544} loader={gumletLoader} className="h-full z-20 relative h-[544px] w-full object-cover rounded-2xl max-w-[1014px] mx-auto" src={image}/>
                      </div>
                   
                   <div className="w-full flex justify-between max-w-[1020px] mx-auto mt-6">

                      {author ?(        <div className="">
          <div className="flex justify-between">
            <div className="max-w-2xl">
            
                <Link href={`/people/${author.slug}`}>
                  <div className="cursor-pointer block">
                  <div className="flex items-center justify-between">
                      <div className="w-12 h-12 relative mr-4 my-auto">
                        {avatar && (
                          <Image
                            src={`${
                              avatar.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
                            }${avatar}`}
                            width={0}
                            height={0}
                            className="rounded-full w-full h-full object-cover"
                            alt={authorName}
                            loader={gumletLoader}
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-lg hover:underline font-medium">{authorName}</div>
                        {date && (
                          <div className="text-base text-black/80">
                            Published <Date dateString={date} />
                          </div>
                        )}
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
              ):null}
          <SocialShare
            slug={post?.attributes?.slug}
            title={title}
            authorTwitter={author?.twitter}
          />
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
                    <div className="z-0 -mt-4 h-[80%] w-full bg-gradient-to-b from-blue-100/60 via-blue-100/50 to-gray-100/20 absolute top-0 left-0"/>

                 </div>
                <article className="z-10 relative">
                  {/* <Head> */}
                  {/* <title>
                  {post.attributes?.title} | Prototypr
                </title> */}
                  {/* <meta property="og:image" content={post.attributes.ogImage} /> */}
                  {/* </Head> */}
               
                  <div className="max-w-[60rem] mx-auto blog-content">
                    <div
                      className="max-w-full w-full mt-12"
                      dangerouslySetInnerHTML={{
                        __html: postContent,
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
       {!user?.isLoggedIn && <StickyFooterCTA title="Get the latest stories"
      description="Join today to make posts and grow with us."
      />}
          
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

const Sidebar = ({ relatedPosts,tags, paddingTop, author }) => {
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
                  <div className={`${stickyPaddingTop=='pt-0'?'w-[80px] h-[80px] mb-3':'w-[44px] h-[44px] mb-1'} relative border border-gray-100 rounded-full shadow-sm `}>
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
                      <h1 className={`${stickyPaddingTop=='pt-0'?'text-xl':'text-base'} mt-1 font-semibold leading-normal text-gray-800`}>
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
              {/* tag cloud */}
              <div className="font-inter bg-white mt-3 p-6 rounded-xl border border-black/8">
                    <h3 className="text-base font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap">
                      {tags.map((tag, index) => {
                        return (
                          <Link href={`/posts/${tag?.attributes?.slug}/page/1`}>
                            <div className={`inline-block text-sm px-3 py-1.5 bg-[#eef1f8] bg-opacity-60 border border-gray-200 rounded-full mr-3 mb-3`}>
                            {tag?.attributes?.name}
                        </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
              {/* EMAIL FORM */}
              <div className="w-full mt-6 rounded-xl p-5 border border-black/8">
                <h3 className="text-base font-semibold mb-2 text-gray-900">
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
  const removeFirstImageIfMatchModule = await import('@/lib/removeFirstImage');
  const removeFirstImageIfMatch = removeFirstImageIfMatchModule.default;

  const post = data?.posts?.data[0]
  const image = post?.attributes?.seo?.opengraphImage
    ? post?.attributes?.seo?.opengraphImage
    : post?.attributes?.featuredImage?.data?.attributes?.url
    ? post?.attributes?.featuredImage?.data?.attributes?.url
    : post?.legacyFeaturedImage
    ? post?.legacyFeaturedImage?.mediaItemUrl
    : post?.ogImage
    ? post?.ogImage.opengraphImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  let html = removeFirstImageIfMatch(post?.attributes?.content, image)

  return {
    props: {
      preview,
      postContent:html,
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
      : TOTAL_STATIC_POSTS
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