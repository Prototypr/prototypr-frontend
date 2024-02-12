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

import Carousel from '@/components/carousel'
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

const ToolContent = ({ post, gallery, relatedPosts, popularTags }) => {
  const { user } = useUser();
  const tags = post.attributes.tags.data;

  let tool = post.attributes

  let coverImage =   
  // tool.legacyMedia?.logoNew?tool.legacyMedia?.logoNew:
  // tool.legacyMedia?.mediaItemUrl?tool.legacyMedia?.mediaItemUrl:
  // tool.legacyMedia?.imgUrl?tool.legacyMedia?.imgUrl:
  tool.featuredImage?.data?.attributes?.url
    ? tool.featuredImage.data.attributes.url
    : tool.legacyFeaturedImage
    ? tool.legacyFeaturedImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
    
    coverImage = (tool?.legacyMedia?.logoNew || coverImage?.logoNew || tool.legacyMedia?.mediaItemUrl ||tool.legacyFeaturedImage?.mediaItemUrl)

  return (
    <>
      <div className="w-full mx-auto">
      <Container padding={false} maxWidth="w-full relative z-0 " >
        <img src='/static/images/toolbox/squares.svg' className="border-b border-gray-200/90 opacity absolute w-full h-full object-cover top-0 left-0"/>

          <div className={`${gallery?.length?'pb-[98px]':'pb-[54px]'} pt-[90px] md:pt-[132px] shadow-md -mt-[96px] md:pt-[112px] relative overflow-hidden p-6 border-gray-200`}>
          <div
          style={{
            // backgroundColor:`${stc(post?.attributes?.title)}`,
            // backgroundImage: `url(${"/static/images/proto-bg.svg"})`,
          }}
          className="relative w-full max-w-[900px] mx-auto flex flex-col justify-center"
        >
            {/* <div style={{pointerEvents:'none'}} className="bg-black pointer-none opacity-[20%] w-full h-full absolute left-0 top-0"/> */}
          <div className="w-full z-10 mx-auto">
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row">

                      <div className="mr-4 mb-4 md:mb-0 w-[64px] h-[64px] shadow-sm rounded-2xl p-[3px] bg-white border border-gray-300">
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
                          src={coverImage}
                        />
                      </div>
                        <div className="flex flex-col justify-center">
                          <h1 className="text-3xl text-black/90 font-semibold drop-shadow-sm">
                            {post?.attributes?.title}
                          </h1>
                          {/* {post?.attributes?.author && (
                            <div className="sm:hidden lg:block">
                              <AuthorCard
                                author={post.attributes.author}
                                avatar={post.attributes?.author}
                              />
                            </div>
                          )} */}
                          {/* <div className="hidden md:flex mb-3 flex-row">
                            {tags.map((tag) => {
                              return (
                                <span className="px-4 py-0.5 text-sm mr-2 capitalize rounded-full text-gray-600 border border-opacity-10 border-white bg-black bg-opacity-5 backdrop-blur-md">
                                  {tag.attributes.name}
                                </span>
                              );
                            })}
                          </div> */}
                          {/* <div className="text-sm mt-1 top-0 right-0 text-gray-600">
                            Is this your tool? <Link className="underline" href={`/toolbox/post/${post.id}/claim`}>Claim this page</Link>.
                          </div> */}
                        </div>
                  </div>
                </div>

                <div className="flex mt-6 md:mt-0 md:flex-col md:justify-center">
                  <div className="flex justify-end">
                    <a
                      target={"_blank"}
                      href={post?.attributes?.link + "?ref=prototypr.io"}
                    >
                      <Button className="rounded-full bg-blue-600 font-semibold text-white px-6 py-4 leading-none" variant={"confirmBig"}>
                        Visit Site
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex text-base top-0 right-0 mt-6 text-black/80">
                {/* <SealQuestion size={24} className="mr-1.5"/> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180Zm28-72c0,17.38-13.76,31.93-32,35.28V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36S168,88.15,168,108Z"></path></svg>
                <div className="my-auto">
                  <div className="inline">Is this your tool? <Link className="underline" href={`/toolbox/post/${post.id}/claim`}>Claim this page</Link>.</div>
                </div>
              </div>
              <div>
              <div className="mt-6 flex flex-wrap">
                {tags.map((tag) => {
                      return (
                        <Link
        href={`/toolbox/${tag.attributes.slug}/page/1`}
        className="flex"
      >

                        <div className="inline-block capitalize text-base px-3 py-1 cursor-pointer bg-blue-100/60 rounded-full mr-3 mb-3 text-blue-900 text-[15px] font-base outline outline-1 outline-blue-200/80 flex flex-col justify-center">
                          {tag.attributes.name}
                        </div>
      </Link>
                      );
                    })}
              </div>
              </div>
            </div>
          </div>
        </div>
            {/* <img src="/static/images/surf.svg" className="absolute -mt-1  w-full bottom-0 z-40 left-0"/> */}
    
          </div>
        </Container>
        <Container maxWidth="w-full bg-[#fefefe] relative z-10 pt-8">
          <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-6 xl:gap-0 md:px-0 h-full">
          <div className="col-span-12 lg:col-span-12">
            <div className={`${gallery?.length?'-mt-[125px] mt-8 mb-6 pl-3 md:pl-0 rounded-xl':''} `}>
              {/* <h3 class="text-lg font-bold">Gallery</h3> */}
              {/* {post?.attributes && (
                  <PopupGallery
                    item={post.attributes}
                    gallery={gallery}
                    rounded={true}
                    arrows={false}
                  />
                )} */}
                 {gallery?.length ? <Carousel gallery={gallery}/>:''}
              </div>
              <div className="max-w-[1100px] mx-auto px-6 w-full">
                <div className="max-w-[900px] mx-auto">
                  <h2 class="text-2xl font-medium mb-8">Overview</h2>
                    <div
                        style={{ color: "#222", fontSize: "18px", lineHeight: '33px' }}
                        className="mt-3 popup-modal-content"
                        dangerouslySetInnerHTML={{
                          __html: post.attributes.content,
                        }}
                      ></div>
                  {!gallery?.length ?<Image
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
                />:''}
                 {post?.attributes?.author && (
                  <>
                  <h1 tabIndex={0} className="mt-10 text-sm mb-3 font-semibold">{post?.attributes?.creator?'Contributors':'Posted by'}</h1> 
                            <div className=" mb-3 flex">
                              <AuthorCard
                                title={post?.attributes?.creator?"Curator":null}
                                author={post.attributes.author}
                                avatar={post.attributes?.author}
                              />
                              {post.attributes?.creator ?<div className="ml-10">
                                <AuthorCard
                                title={post?.attributes?.creator?"Creator":null}
                                author={post.attributes.creator}
                                  avatar={post.attributes?.creator}
                                />
                              </div>:null}
                            </div>
                  </>
                          )}
                  </div>
                </div>
          </div>
          <SectionDivider py="py-3" transparentLine={true}/>
          </div>
          <Container maxWidth="max-w-[1320px]">
          <div className={`pb-0 border-l-[0.19rem] border-b-[0.18rem] border-sky-500 opacity-10 rounded-bl-xl pt-6`}>
            {/* <div className={` bg-opacity-[0.08] bg-sky-500 h-[3px] w-full pl-3`} /> */}
          </div>
        </Container>

        </Container>
      </div>

      <Container maxWidth=" w-full pb-24 bg-gradient-to-tr from-[#fefefe] to-sky-100/20 relative z-10">
      {/* <img src="/static/images/bendy9.svg" className="absolute top-0 -mt-[2.9%] z-10 left-0 w-full gm-added gm-observing gm-observing-cb" loading="lazy"/> */}
      {relatedPosts?.length ? 
                <div className="z-30 relative max-w-[1320px] mx-auto px-6 md:px-3">
                  <img src="/static/images/toolbox/squares2.svg" className="w-full h-[128%] absolute object-cover opacity-20"/>
                  <div classsName="flex flex-col px-3 z-30">
                  <h3 className="text-2xl pt-12 mb-6 text-black/90 font-medium font-inter max-w-md">
                    Related tools
                  </h3>
                  {/* <ToolLargeCardRow title={`Related to ${post?.attributes?.title}`} tools={relatedPosts.slice(0,4)} /> */}
                  <ToolLargeCardRow showTitle={false} tools={relatedPosts.slice(0,4)} />
                  {/* <ToolCard posts={relatedPosts} columns={'grid-cols-1'} type="toolboxContentPage" /> */}
                  </div>
                </div>
               :null }
        </Container>
      <Container maxWidth="w-full pb-16 bg-[#fefefe] relative z-10 pt-0">
          <div className="max-w-[1320px] pt-0 -mt-8 mb-8 mx-auto px-3 h-full">
        <div className="mb-20">
          <NewsletterSection padding={false} title="Get the best tools every week"/>
        </div>
        {/* <SectionDivider/>      
        <h2 className="text-lg mb-4 font-semibold">More on Prototypr</h2>
        <TwoColumnCards/>
        <SectionDivider/> */}
        <div className="mt-2">
          <h2 className="text-lg mb-4 font-semibold">Popular topics</h2>
          <PopularTagsSection popularTags={popularTags}/>
        </div>
        </div>
      </Container>

      {!user?.isLoggedIn && <StickyFooterCTA title="Welcome to Prototypr"
      description="Join today to make posts and grow with us."
      />}
      {/* <NewsletterSection title="Get the best tools every week"/> */}
    </>
  );
};

export default function Post({ post, relatedPosts, gallery, preview, popularTags }) {
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
      background={"#fff"}
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
        <ToolContent popularTags={popularTags} post={post} gallery={gallery} relatedPosts={relatedPosts} />
      {/* </div> */}

      <Footer/>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  const data = await getTool(params.slug, preview);

  let relatedPostsData = data?.posts?.data[0]?.attributes?.relatedTools?data?.posts?.data[0]?.attributes?.relatedTools:false;

  //build the gallery here
  let PHOTO_SET = [];
  const item = data?.posts.data[0];

  // new gallry
  if (item && item.attributes.gallery?.data?.length) {
    item.attributes.gallery.data.forEach((galleryItem, index) => {
      galleryItem.medium = galleryItem.attributes.url.replace(
        "https://prototypr-media.sfo2.digitaloceanspaces.com",
        "https://prototyprio.gumlet.io"
      );
      PHOTO_SET.push({
        thumbnail:
          galleryItem.attributes.url.indexOf("https://") == -1
            ? "https://prototypr.gumlet.com" + galleryItem.attributes.url
            : galleryItem.attributes.url,
        original:
          galleryItem.attributes.url.indexOf("https://") == -1
            ? "https://prototypr.gumlet.com" + galleryItem.attributes.url
            : galleryItem.attributes.url,
        originalAlt: galleryItem.attributes.alternativeText
          ? galleryItem.attributes.alternativeText
          : "Screenshot of product",
        thumbnailAlt: galleryItem.attributes.alternativeText
          ? galleryItem.attributes.alternativeText
          : "Screenshot of product",
        type: "image",
        // srcSet: galleryItem.srcSet,
        // sizes: galleryItem.sizes?galleryItem.sizes:{},
      });
    });
  }

  // legacy gallery
  else if (item && item.attributes.legacyMedia) {
    if (
      item.attributes.legacyMedia.gallery &&
      item.attributes.legacyMedia.gallery.length
    ) {
      item.attributes.legacyMedia.gallery.forEach((galleryItem, index) => {
        //make nextjs preload the gumlet image
        galleryItem.medium = galleryItem.medium.replace(
          "https://prototypr-media.sfo2.digitaloceanspaces.com",
          "https://prototyprio.gumlet.io"
        );
        PHOTO_SET.push({
          thumbnail:
            galleryItem.thumb.indexOf("https://") == -1
              ? "https://prototypr.gumlet.com" + galleryItem.thumb
              : galleryItem.thumb,
          original:
            galleryItem.medium.indexOf("https://") == -1
              ? "https://prototypr.gumlet.com" + galleryItem.medium
              : galleryItem.medium,
          originalAlt: "Screenshot of product",
          thumbnailAlt: "Smaller procut screenshot thumbnail",
          type: "image",
          // srcSet: galleryItem.srcSet,
          // sizes: galleryItem.sizes?galleryItem.sizes:{},
        });
      });
    }
  }

  // no point transforming these, cos they're all english anyway
  // const postData = transformPost(data?.posts.data[0], locale)
  const postData = data?.posts.data[0];
  const popularTags = (await getPopularTopics({postType:'article', pageSize:8})) || [];

  // no point transforming these, cos they're all english anyway
  // relatedPostsData = transformPostList(relatedPostsData, locale)
  
  return {
    props: {
      preview,
      post: {
        ...postData,
      },
      gallery: PHOTO_SET,
      relatedPosts: relatedPostsData,
      popularTags:popularTags
      // morePosts: data?.morePosts.data,
    },
    // revalidate: 20
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
        allPosts.data?.map((post) => {
          return `/toolbox/${post.attributes.slug}`;
        })) ||
      [],
    fallback: "blocking",
  };
}