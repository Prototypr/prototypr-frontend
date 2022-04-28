import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
const MoreStories = dynamic(() => import("@/components/more-stories"));
import Header from '@/components/posts/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout 
     seo={{
        title:`${post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphTitle: post?.attributes?.title && post.attributes.title}`,
        description:`${post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphDescription: post?.attributes?.excerpt && post.attributes.excerpt}`,
        image:`${post?.attributes?.seo?.opengraphImage?post?.attributes?.seo?.opengraphImage:  post?.attributes?.featuredImage?.data?.attributes?.url ? post?.attributes?.featuredImage?.data?.attributes?.url:post?.legacyFeaturedImage?post.legacyFeaturedImage.mediaItemUrl:post?.ogImage?post.ogImage.opengraphImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}`,
        canonical: `${post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/newsletter/${post?.attributes.slug}`}`,
        url: `${post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/newsetter/${post?.attributes.slug}`}`
    }}
    activeNav={"posts"} preview={preview}>
      <Container>
        <Header title="Newsletter"/>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
             {(post&& post.attributes) && <PostHeader
                title={post.attributes.title}
                coverImage={post.attributes.featuredImage?.data?.attributes?.url? post.attributes.featuredImage?.data?.attributes?.url:post.attributes.legacyFeaturedImage ? post.attributes.legacyFeaturedImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}
                date={post.attributes.date}
                author={(post.attributes.author && post.attributes.author.data)?post.attributes.author.data.attributes:{}}
                />}
              <PostBody content={post.attributes.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} route={'newsletter'} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null, postType="newsletter" }) {
  const data = await getPostAndMorePosts(params.slug, preview, postType)
  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
        // content,
      },
      morePosts: data?.morePosts.data,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug('newsletter')
  
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      return `/newsletter/${post.attributes.slug}`}) || [],
    fallback: true,
  }
}
