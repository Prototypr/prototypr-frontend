import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import ErrorPage from "next/error";
import Container from "@/components/container";
import Layout from "@/components/layout";
const PopupGallery = dynamic(() => import("@/components/gallery/PopupGallery"));
const AuthorCard = dynamic(() => import("@/components/toolbox/AuthorCard"));
const SponsorCard = dynamic(() => import("@/components/toolbox/SponsorCard"));
const RelatedPosts = dynamic(() => import("@/components/related-posts"));
const VisitCard = dynamic(() => import("@/components/toolbox/VisitCard"));
const Contributors = dynamic(() => import("@/components/toolbox/Contributors"));

import { getAllPostsWithSlug, getTool, getAllToolsForHomeStatic } from "@/lib/api";

export default function Post({ post, relatedPosts, gallery, preview }) {

  const router = useRouter();

  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout 
    seo={{
        title:`${post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphTitle: post?.attributes?.title && post.attributes.title}`,
        description:`${post?.attributes?.seo?.opengraphDescription?post?.attributes?.seo?.opengraphDescription: post?.attributes?.excerpt && post.attributes.excerpt}`,
        image:`${post?.attributes?.seo?.opengraphImage?post?.attributes?.seo?.opengraphImage:  post?.attributes?.featuredImage?.data?.attributes?.url ? post?.attributes?.featuredImage?.data?.attributes?.url:post?.legacyFeaturedImage?post?.legacyFeaturedImage?.mediaItemUrl:post?.ogImage?post?.ogImage.opengraphImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}`,
        canonical: `${post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/toolbox/${post?.attributes.slug}`}`,
        url: `${post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/toolbox/${post?.attributes.slug}`}`
      }}
    activeNav={"toolbox"} preview={preview}>
      <Container>
        <div className="w-full mt-6 md:mt-6 grid grid-rows-1 grid-cols-24 lg:gap-6">
          {/* left sidebar */}
          {router.isFallback ? (
            <h1 className="text-6xl font-noto-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center md:text-left">
            Loading...
          </h1>
        ) : (
          <>
          <div
            className="md:col-span-5 hidden lg:block"
          >
            {post?.attributes?.author && (
              <div className="sm:hidden lg:block">
                <AuthorCard author={post.attributes.author} avatar={post.attributes?.author} />
              </div>
            )}
            <div className="mt-6 sm:hidden block lg:block lg:mt-6">
              <SponsorCard position="left" />
            </div>
            {/**Contributors */}
            <Contributors />
          </div>
          {/* center sidebar */}
          <div className="col-span-full lg:col-span-13">
            {post?.attributes && (
              <PopupGallery
                item={post.attributes}
                gallery={gallery}
                rounded={true}
                arrows={false}
              />
            )}

            {/**Description */}
            <div className="mb-8">
              {/* <h1 className="hidden sm:block mt-6 text-sm font-semibold mb-3">
                Description
              </h1> */}
              <div className="popup-modal mb-6 relative bg-white p-6 pt-3 rounded-lg w-full">
                <div
                  style={{ color: "#4a5568", marginBottom: "1rem" }}
                  className="py-3 popup-modal-content"
                  dangerouslySetInnerHTML={{ __html: post.attributes.content }}
                ></div>
              </div>
            </div>
          </div>
          {/* RIGHT SIDEBAR START */}
          <div className="col-span-full mb-6 lg:mb-0 lg:col-span-6 order-first lg:order-last lg:block">
              <VisitCard 
                tags={post?.attributes.tags}
                title={post.attributes.title}
                link={post?.attributes.link}
                useNextImage={true}
                logoNew={post?.attributes.legacyFeaturedImage?.logoNew}
              />
              {
                relatedPosts && 
                <RelatedPosts
                  title={'Related tools'} 
                  relatedPosts={relatedPosts}
                  img={post.attributes?.legacyFeaturedImage?.logoNew}
                />
              }
          </div>
          </>)}
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  const data = await getTool(params.slug, preview);

  let relatedPostsData = data.posts.data[0].attributes.relatedTools

  //build the gallery here
  let PHOTO_SET = [];
  const item = data?.posts.data[0]

  // new gallry
  if(item && item.attributes.gallery?.data?.length){
    item.attributes.gallery.data.forEach((galleryItem, index) => {
      galleryItem.medium =  galleryItem.attributes.url.replace('https://prototypr-media.sfo2.digitaloceanspaces.com','https://prototyprio.gumlet.io')
      PHOTO_SET.push({
        thumbnail:
          galleryItem.attributes.url.indexOf("https://") == -1
            ? "https://prototypr.gumlet.com" + galleryItem.attributes.url
            : galleryItem.attributes.url,
        original:
          galleryItem.attributes.url.indexOf("https://") == -1
            ? "https://prototypr.gumlet.com" + galleryItem.attributes.url
            : galleryItem.attributes.url,
        originalAlt:galleryItem.attributes.alternativeText? galleryItem.attributes.alternativeText: "Screenshot of product",
        thumbnailAlt:galleryItem.attributes.alternativeText? galleryItem.attributes.alternativeText: "Screenshot of product",
        type: "image",
        // srcSet: galleryItem.srcSet,
        // sizes: galleryItem.sizes?galleryItem.sizes:{},
      });
    })
  }

  // legacy gallery
  else if (item && item.attributes.legacyMedia) {
    if (item.attributes.legacyMedia.gallery && item.attributes.legacyMedia.gallery.length) {
      item.attributes.legacyMedia.gallery.forEach((galleryItem, index) => {
       //make nextjs preload the gumlet image
        galleryItem.medium =  galleryItem.medium.replace('https://prototypr-media.sfo2.digitaloceanspaces.com','https://prototyprio.gumlet.io')
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
  const postData = data?.posts.data[0]

  // no point transforming these, cos they're all english anyway
  // relatedPostsData = transformPostList(relatedPostsData, locale)

  return {
    props: {
      preview,
      post: {
        ...postData,
      },
      gallery:PHOTO_SET,
      relatedPosts:relatedPostsData,
      // morePosts: data?.morePosts.data,
    },
    revalidate: 20
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
    fallback: 'blocking',
  };
}
