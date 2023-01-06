import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import Image from "next/image";

import ErrorPage from "next/error";
import Container from "@/components/container";
import Layout from "@/components/layout";
import stc from "string-to-color";

import { ToolBoxDisplay } from "../../components/toolbox/ToolboxGrid";
import gumletLoader from "@/components/new-index/gumletLoader";
import useUser from "@/lib/iron-session/useUser";

const PopupGallery = dynamic(() => import("@/components/gallery/PopupGallery"));
const AuthorCard = dynamic(() => import("@/components/toolbox/AuthorCard"));
const SponsorCard = dynamic(() => import("@/components/toolbox/SponsorCard"));
const RelatedPosts = dynamic(() => import("@/components/related-posts"));
const VisitCard = dynamic(() => import("@/components/toolbox/VisitCard"));
const Contributors = dynamic(() => import("@/components/toolbox/Contributors"));

import {
  getAllPostsWithSlug,
  getTool,
  getAllToolsForHomeStatic,
} from "@/lib/api";

const ToolContent = ({ post, gallery, relatedPosts }) => {
  const { user } = useUser();
  const tags = post.attributes.tags.data;
  return (
    <>
      <div className="w-full">
        <div
          style={{
            backgroundColor: stc(post?.attributes?.title),
            backgroundImage: `url(${"/static/images/proto-bg.svg"})`,
          }}
          className="h-[450px] w-full p-5 md:p-10 flex flex-col justify-center "
        >
          <div className="max-w-4xl w-full mx-auto px-5">
            <div className="flex flex-col gap-2 justify-between">
              <div className="w-[70px] h-[70px] shadow-md rounded-3xl bg-white">
                <Image
                  loader={gumletLoader}
                  priority={false < 2 ? `true` : `false`}
                  data-priority={false < 2 ? `true` : `false`}
                  fetchpriority={false < 2 ? "true" : "false"}
                  data-gmlazy={false < 2 ? `false` : `true`}
                  width="100"
                  height="100"
                  alt="Brand logo for external website's link"
                  className=" border rounded-2xl bg-white"
                  src={post?.attributes?.legacyFeaturedImage?.logoNew}
                />
              </div>
              <div className="flex flex-col gap-3 justify-between">
                <h1 className="text-4xl my-0 py-0 text-white font-bold">
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
                <div className="flex flex-row gap-2">
                  {tags.map((tag) => {
                    return (
                      <span className="px-4 py-0.5 text-sm capitalize rounded-full text-white border border-opacity-25 border-white bg-white bg-opacity-20 backdrop-blur-md">
                        {tag.attributes.name}
                      </span>
                    );
                  })}
                </div>
                <div>
                  <a
                    target={"_blank"}
                    href={post?.attributes?.link + "?ref=prototypr.io"}
                  >
                    <button className="max-w-[200px] w-full py-4 bg-white rounded-full">
                      Visit Site
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto py-5 px-5 h-full">
          {post?.attributes && (
            <PopupGallery
              item={post.attributes}
              gallery={gallery}
              rounded={true}
              arrows={false}
            />
          )}
          <div
            style={{ color: "#333", marginBottom: "1rem", fontSize: "18px" }}
            className="py-10 popup-modal-content"
            dangerouslySetInnerHTML={{
              __html: post.attributes.content,
            }}
          ></div>
          <div className="my-5">
            <hr />
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold">
                Discover more <br /> Similar Tools
              </h2>
              <ToolBoxDisplay posts={relatedPosts} type="toolboxContentPage" />
            </div>
            <div className="my-3">
              <hr />
            </div>
            {/* <div className="flex flex-col gap-3 pb-5">
              <h2 className="text-3xl font-bold">
                Discover more <br /> Related Content
              </h2>
              <div className="w-full grid grid-cols-2 gap-5">
                <div className="w-full h-[100px] bg-gray-100"></div>
                <div className="w-full h-[100px] bg-gray-100"></div>
                <div className="w-full h-[100px] bg-gray-100"></div>
                <div className="w-full h-[100px] bg-gray-100"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default function Post({ post, relatedPosts, gallery, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post?.attributes.slug) {
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
      background={"#fff"}
      maxWidth={"max-w-[1200px] search-wide"}
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
      <ToolContent post={post} gallery={gallery} relatedPosts={relatedPosts} />
      {/* </div> */}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  const data = await getTool(params.slug, preview);

  let relatedPostsData = data.posts.data[0].attributes.relatedTools;

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
