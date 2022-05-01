import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import ErrorPage from "next/error";
import Container from "@/components/container";
import Layout from "@/components/layout";
const PopupGallery = dynamic(() => import("@/components/gallery/PopupGallery"));
const AuthorCard = dynamic(() => import("@/components/toolbox/AuthorCard"));
const SponsorCard = dynamic(() => import("@/components/toolbox/SponsorCard"));
const RelatedPosts = dynamic(() => import("@/components/related-posts"));

import Contributors from "@/components/toolbox/Contributors";
import PostTitle from '@/components/post-title'
import VisitCard from "@/components/toolbox/VisitCard";
import { getAllPostsWithSlug, getRelatedTools, getToolsAndMoreTools } from "@/lib/api";
import { useIntl } from 'react-intl';
import { transformPost, transformPostList } from "@/lib/locale/transformLocale";

export default function Post({ post, relatedPosts, gallery, preview }) {
  const intl = useIntl();
  // const locale = intl.locale ? intl.locale : "en-US";
  const router = useRouter();
  //TODO: what is withAuthUser
  const withAuthUser = {};

  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout 
    seo={{
        title:`${post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphTitle: post?.attributes?.title && post.attributes.title}`,
        description:`${post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphDescription: post?.attributes?.excerpt && post.attributes.excerpt}`,
        image:`${post?.attributes?.seo?.opengraphImage?post?.attributes?.seo?.opengraphImage:  post?.attributes?.featuredImage?.data?.attributes?.url ? post?.attributes?.featuredImage?.data?.attributes?.url:post?.legacyFeaturedImage?post?.legacyFeaturedImage?.mediaItemUrl:post?.ogImage?post?.ogImage.opengraphImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}`,
        canonical: `${post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/toolbox/${post?.attributes.slug}`}`,
        url: `${post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/toolbox/${post?.attributes.slug}`}`
      }}
    activeNav={"toolbox"} preview={preview}>
      <Container>
        <div className="w-full mt-6 grid grid-rows-1 grid-cols-24 lg:gap-6">
          {/* left sidebar */}
          {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
          <div
            className="md:col-span-5 hidden lg:block"
          >
            {post && post.attributes && post.attributes.author && (
              <div className="sm:hidden lg:block">
                <AuthorCard author={post.attributes.author} avatar={post.attributes?.author} />
              </div>
            )}
            <div className="mt-6 sm:hidden block lg:block lg:mt-6">
              <SponsorCard position="left" />
            </div>
            {/**Contributors */}
            <Contributors withAuthUser={withAuthUser} />
          </div>
          {/* center sidebar */}
          <div className="col-span-full lg:col-span-13">
            {post && post.attributes && (
              <PopupGallery
                // body={content}
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

            {/**Comments */}
            {/* <Comment
              withAuthUser={withAuthUser}
              setUserAuthenticated={setUserAuthenticated}
              titleClass="text-sm font-semibold hidden text-gray-800"
              item={post?.attributes}
            /> */}
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
  const data = await getToolsAndMoreTools(params.tag, preview);
  //get the tags for the next query
  let tags = data?.posts.data[0].attributes.tags
  let tagsArr = []
  if(tags.data){
    for(var x = 0;x<tags.data.length;x++){
      tagsArr.push(tags.data[x].attributes.slug)
    }
  }
  let relatedPostsData = await getRelatedTools(tagsArr,params.tag, preview);

  //build the gallery here
  let PHOTO_SET = [];
  const item = data?.posts.data[0]
  if (item && item.attributes.legacyMedia) {
    if (item.attributes.legacyMedia.gallery && item.attributes.legacyMedia.gallery.length) {
      item.attributes.legacyMedia.gallery.forEach((galleryItem, index) => {
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

  data?.posts.data[0] = transformPost(data?.posts.data[0], locale)
  relatedPostsData = transformPostList(relatedPostsData?.posts.data, locale)




  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
      },
      gallery:PHOTO_SET,
      relatedPosts:relatedPostsData,
      // morePosts: data?.morePosts.data,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug("tool");
  return {
    paths:
      (allPosts &&
        allPosts.data?.map((post) => {
          return `/toolbox/${post.attributes.slug}`;
        })) ||
      [],
    fallback: true,
  };
}
