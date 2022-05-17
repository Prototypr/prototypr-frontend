import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
const TopicTopItem = dynamic(() => import("@/components/new-index/TopicTopItem"), { ssr: true });
const PostHeader = dynamic(() => import("@/components/post-header"), { ssr: true });

import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPost, getCombinedPostsForHomeStatic } from '@/lib/api'
import Head from 'next/head'
const NoticeTranslation = dynamic(() => import("@/components/notice-translation"), { ssr: true });

import { transformPost, transformPostList } from "@/lib/locale/transformLocale";

export default function Post({ post, preview, relatedPosts}) {
  const router = useRouter()
  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const title = post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphTitle: post?.attributes?.title && post.attributes.title
  const description = post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphDescription: post?.attributes?.excerpt && post.attributes.excerpt
  const image = post?.attributes?.seo?.opengraphImage?post?.attributes?.seo?.opengraphImage:  post?.attributes?.featuredImage?.data?.attributes?.url ? post?.attributes?.featuredImage?.data?.attributes?.url:post?.legacyFeaturedImage?post?.legacyFeaturedImage?.mediaItemUrl:post?.ogImage?post?.ogImage.opengraphImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
  const canonical = post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/post/${post?.attributes.slug}`
  const url = post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/post/${post?.attributes.slug}`

  return (
    <Layout
    seo={{
      title:`${title}`,
      description:`${description}`,
      image:`${image}`,
      canonical: `${canonical}`,
      url: `${url}`
    }}
     background="#fff" activeNav={"posts"} preview={preview}>
      <Container>
        {router.isFallback ? (
          <h1 className="text-6xl font-noto-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center md:text-left">
          Loading
        </h1>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.attributes?.title} | Prototypr
                </title>
                <meta property="og:image" content={post.attributes.ogImage} />
              </Head>
              {!post.currentLocaleAvailable && <NoticeTranslation/>}
              <PostHeader
                title={post?.attributes?.title}
                coverImage={post?.attributes?.featuredImage?.data?.attributes?.url? post?.attributes?.featuredImage?.data?.attributes?.url:post?.attributes?.legacyFeaturedImage ? post?.attributes?.legacyFeaturedImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}
                date={post.attributes.date}
                author={post.attributes?.author?.data?.attributes}
                template={post.attributes?.template}
                />
                <div className="max-w-2xl mx-auto blog-content">
                <div
                  dangerouslySetInnerHTML={{ __html: post.attributes?.content }}
                />
              </div>
            </article>
            <hr className="border-accent-2 mt-28 mb-24" />
            <h1 className="text-4xl font-noto-serif font-semibold -mt-10 mb-12">More Posts</h1>

            <div className="mt-10 mb-20 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {relatedPosts?.data?.length>0 && relatedPosts.data.map((item, index) => {
              return(
                <TopicTopItem key={index} topic={item}/>
            )})}
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null, locale}) {

  const data = await getPost(params.slug, preview)

 let relatedPosts = {};

  const postData = transformPost(data?.posts.data[0], locale)
  relatedPosts.data = transformPostList(data?.posts.data[0].attributes.relatedArticles, locale)

  return {
    props: {
      preview,
      post: {
        ...postData,
      },
      relatedPosts:relatedPosts
    },
    revalidate: 20,
  }
}

export async function getStaticPaths({locales}) {
  
  const allPosts = await getAllPostsWithSlug('article',5000)
  // const homePosts = await getCombinedPostsForHomeStatic()

  // let mergedSlugs = {
  //   ...allPosts,
  //   ...homePosts
  // };
  
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      // console.log(post.attributes.slug)
      return `/post/${post.attributes.slug}`}) || [],
    fallback: 'blocking',
  }
}