import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import Layout from "@/components/new-index/layoutForIndex";
import { getAllPostsWithSlug, getNewsletter } from '@/lib/api'
import { FormattedMessage } from "react-intl";

const PostPreview = dynamic(() => import("@/components/post-preview"));


const PostTitle = dynamic(() => import('@/components/post-title'), { ssr: true })
const PostBody = dynamic(() => import('@/components/post-body'), { ssr: true })


export default function Post({ post, morePosts, preview }) {

  const router = useRouter()
  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const title = post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphTitle: post?.attributes?.title && post.attributes.title
  const description = post?.attributes?.seo?.opengraphDescription?post?.attributes?.seo?.opengraphDescription: post?.attributes?.excerpt && post.attributes.excerpt
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
      <Container maxWidth="max-w-[986px]">
        {/* <Header title="Newsletter"/> */}
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
            <div style={{maxWidth:'600px'}} className="mx-auto">
            { post?.attributes && 
                <h1 className="text-3xl font-inter-serif font-semibold tracking-tighter leading-tight md:leading-tighter my-6 mt-12 text-center md:text-left">
                {post.attributes.title}
                </h1>}
            </div>
            <div className="newsletter-content">
              <PostBody content={post.attributes.content} />
            </div>
            </article>
            <hr className="border-accent-2 mt-28 mb-24" />
            <h2 className="text-4xl -mt-12 mb-12 font-semibold"> 
            <FormattedMessage id="newsletter.issue" />
            </h2>
            {morePosts.length > 0 && 
            <div
            className={`grid grid-cols-1 md:grid-cols-2 md:gap-y-10 gap-y-10 lg:gap-y-10 gap-x-10 md:gap-x-10 pb-16`}
          >
            {morePosts.map((post, i) => {
                return (
                  <PostPreview
                    key={post.slug}
                    title={post.title}
                    coverImage={
                      post.featuredImage?.data?.attributes?.url
                        ? post.featuredImage.data.attributes.url
                        : post.legacyFeaturedImage
                        ? post.legacyFeaturedImage
                        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                    }
                    date={post.date}
                    author={
                      post.author && post.author.data
                        ? post.author.data.attributes
                        : null
                    }
                    slug={post.slug}
                    excerpt={post.excerpt}
                    type={'newsletter'}
                    route={'newsletter'}
                    tag={
                      post.tags &&
                      post.tags.data &&
                      post.tags.data[0]
                        ? post.tags.data[0]
                        : null
                    }
                  />
                );
              
            })}
          </div>            
            }
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null, postType="newsletter" }) {
  const data = await getNewsletter(params.slug, preview, postType)

  //if no post found, 404
  if(!data?.posts?.data[0]){
    return {
      props: {
        post: null,
      },
      revalidate:30
    }
  }
  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  const relatedNewsletters =  data?.posts.data[0]?.attributes?.relatedNewsletters?
  data?.posts.data[0]?.attributes?.relatedNewsletters:[]
  
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
        // content,
      },
      morePosts: relatedNewsletters,
    },
    revalidate: 20
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug('newsletter', 1000)
  
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      return `/newsletter/${post.attributes.slug}`}) || [],
    fallback: true,
  }
}
