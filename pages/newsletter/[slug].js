import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
// const MoreStories = dynamic(() => import("@/components/more-stories"));
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPost } from '@/lib/api'
import PostTitle from '@/components/post-title'
import { useIntl } from "react-intl";

export default function Post({ post, morePosts, preview }) {
      const intl = useIntl();

  const router = useRouter()
  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const title = post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphTitle: post?.attributes?.title && post.attributes.title
  const description = post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphDescription: post?.attributes?.excerpt && post.attributes.excerpt
  const image = post?.attributes?.seo?.opengraphImage?post?.attributes?.seo?.opengraphImage:  post?.attributes?.featuredImage?.data?.attributes?.url ? post?.attributes?.featuredImage?.data?.attributes?.url:post?.legacyFeaturedImage?post?.legacyFeaturedImage?.mediaItemUrl:post?.ogImage?post?.ogImage.opengraphImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
  const canonical = post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/newsletter/${post?.attributes.slug}`
  const url = post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/newsletter/${post?.attributes.slug}`

  return (
    <Layout 
     seo={{
      title:`${title}`,
      description:`${description}`,
      image:`${image}`,
      canonical: `${canonical}`,
      url: `${url}`
    }}
    activeNav={"posts"} preview={preview}>
      <Container>
        {/* <Header title="Newsletter"/> */}
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
            <div style={{maxWidth:'600px'}} className="mx-auto">
            { post?.attributes && 
                <h1 className="text-3xl font-semibold tracking-tighter leading-tight md:leading-tighter my-6 mt-12 text-center md:text-left">
                {post.attributes.title}
                </h1>}
            </div>
            <div className="newsletter-content">
              <PostBody content={post.attributes.content} />
            </div>
            </article>
            {/* <SectionSeparator /> */}
            {/* <h2 className="text-4xl -mt-12 mb-12 font-semibold"> {intl.formatMessage({ id: "newsletter.issue" })}</h2> */}
            {/* {morePosts.length > 0 && <MoreStories posts={morePosts} type="newsletter" route={'newsletter'} />} */}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null, postType="newsletter" }) {
  const data = await getPost(params.slug, preview, postType)
  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
        // content,
      },
      // morePosts: data?.morePosts.data,
    },
    revalidate: 20
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
