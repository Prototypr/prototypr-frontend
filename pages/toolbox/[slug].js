import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/tools/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllToolsWithSlug, getToolsAndMoreTools } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
// import markdownToHtml from '@/lib/markdownToHtml'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout activeNav={"toolbox"} preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.attributes.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={post.attributes.ogImage} />
              </Head>
              <PostHeader
                title={post.attributes.title}
                coverImage={post.attributes.legacyFeaturedImage ? post.attributes.legacyFeaturedImage:''}
                date={post.attributes.date}
                author={post.attributes.author?post.attributes.author.data.attributes:null}
                type="toolbox"
                />
              <PostBody content={post.attributes.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories type={'toolbox'} posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getToolsAndMoreTools(params.slug, preview)
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
  const allPosts = await getAllToolsWithSlug()
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      return `/toolbox/${post.attributes.slug}`}) || [],
    fallback: true,
  }
}
