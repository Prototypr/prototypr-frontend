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
import { SealQuestion } from "@phosphor-icons/react";

import Carousel from '@/components/carousel'
const PopupGallery = dynamic(() => import("@/components/gallery/PopupGallery"), {
  ssr: true,
});
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
  getAllToolsForHomeStatic,
  getPopularTopics,
} from "@/lib/api";
import ToolCard from "@/components/v4/card/ToolCard";
// import BigTag from "@/components/v4/tag/BigTag";
import Footer from "@/components/footer";
import NewsletterSection from "@/components/v4/section/NewsletterSection";
import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";
import PopularTagsSection from "@/components/v4/section/PopularTagsSection";
import SectionDivider from "@/components/v4/section/SectionDivider";
import Link from "next/link";
import Button from "@/components/Primitives/Button";

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
      <Container padding={false} maxWidth="w-full relative z-0" >
        <img src='/static/images/toolbox/squares.svg' className="border-b border-gray-200/90 opacity absolute w-full h-full object-cover top-0 left-0"/>

          <div className="pt-[132px] shadow-md -mt-[96px] md:pt-[112px] pb-[182px] relative overflow-hidden p-6 border-gray-200">
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
                          className="rounded-2xl bg-white"
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

              <div className="flex text-base top-0 right-0 mt-6 text-gray-600">
                <SealQuestion size={24} className="mr-1.5"/>
                <div className="my-auto">
                  <div className="inline">Is this your tool? <Link className="underline" href={`/toolbox/post/${post.id}/claim`}>Claim this page</Link>.</div>
                </div>
              </div>
              <div>
              <div className="mt-3">
                {tags.map((tag) => {
                      return (
                        <span className="px-4 py-0.5 text-sm mr-2 capitalize rounded-full text-gray-600 border border-opacity-10 border-white bg-black bg-opacity-5 backdrop-blur-md">
                          {tag.attributes.name}
                        </span>
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
        <Container maxWidth="w-full bg-white relative z-10 pt-8">
          <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-6 xl:gap-0 px-3 md:px-0 h-full">
          <div className="col-span-12 lg:col-span-12">
            <div className="-mt-[190px] mt-8 mb-6 rounded-xl">
              {/* <h3 class="text-lg font-bold">Gallery</h3> */}
              {/* {post?.attributes && (
                  <PopupGallery
                    item={post.attributes}
                    gallery={gallery}
                    rounded={true}
                    arrows={false}
                  />
                )} */}
                  <Carousel gallery={gallery}/>
              </div>
              <div className="max-w-[1100px] mx-auto w-full">
                <div className="max-w-[900px] mx-auto">
                  <h3 class="text-2xl font-semibold mb-8">Overview</h3>
                    <div
                        style={{ color: "#222", fontSize: "18px", lineHeight: '33px' }}
                        className="mt-3 popup-modal-content"
                        dangerouslySetInnerHTML={{
                          __html: post.attributes.content,
                        }}
                      ></div>
                  </div>
                </div>
              
          </div>
          {/* right panel */}
          {/* <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col mt-0 lg:-mt-[214px] gap-6 xl:gap-10">
                <div className="font-inter bg-white p-6 rounded-xl shadow-sm border border-black/5">
                    <h3 className="text-lg font-bold mb-3">Tags</h3>
                    <div className="flex flex-wrap">
                      {tags.map((tag, index) => {
                        return (
                          <Link href={`/toolbox/${tag?.attributes?.slug}/page/1`}>
                            <div className={`inline-block text-sm px-3 py-1.5 bg-[#eef1f8] bg-opacity-60 border border-gray-200 rounded-full mr-3 mb-3`}>
                            {tag?.attributes?.name}
                        </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                <div className="flex mb-6 flex-col">
                  <h2 className="text-lg mb-3 mt-3 xl:mt-6 font-bold">
                    Related to {post?.attributes?.title}
                  </h2>
                  <ToolCard posts={relatedPosts} columns={'grid-cols-1'} type="toolboxContentPage" />
                </div>
              </div>
          </div> */}
          </div>
        </Container>
      </div>
      <Container maxWidth=" w-full pb-16 bg-white relative z-10 pt-8">
          <div className="max-w-[1320px] pt-6 border-t border-black/15 mx-auto px-3 md:px-0 h-full">
        <div className="mb-8">
          <NewsletterSection padding={false} title="Get the best tools every week"/>
        </div>
        <SectionDivider/>
      
        {/* <SectionDivider transparentLine={false}/> */}
        <h2 className="text-lg mb-4 font-semibold">More on Prototypr</h2>
        <TwoColumnCards/>
        <SectionDivider/>
        <div className="mt-2">
          <h2 className="text-lg mb-4 font-semibold">Popular topics</h2>
          <PopularTagsSection popularTags={popularTags}/>
        </div>
        </div>
      </Container>

      {!user?.isLoggedIn && <StickyFooterCTA title="Get the latest stories"
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
      background={"RGBA(204, 230, 255, 0.9)"}
      // background={"#fff"}
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
  const allPosts = await getAllPostsWithSlug("tool", 5000);
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