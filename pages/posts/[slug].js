import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
// import Header from '@/components/posts/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
// import markdownToHtml from '@/lib/markdownToHtml'

export default function Post({ post, morePosts, preview, relatedPosts, combinedRelatedPosts }) {
  const router = useRouter()
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout background="#fff" activeNav={"posts"} preview={preview}>
      <Container>
        {/* <Header /> */}
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.attributes.title} | Prototypr
                </title>
                <meta property="og:image" content={post.attributes.ogImage} />
              </Head>
              <PostHeader
                title={post.attributes.title}
                coverImage={post.attributes.legacyFeaturedImage ? post.attributes.legacyFeaturedImage:''}
                date={post.attributes.date}
                author={post.attributes.author?post.attributes.author.data.attributes:null}
                />
              <PostBody content={post.attributes.content} />
            </article>
            <SectionSeparator />
            <h1 className="text-4xl font-semibold -mt-10 mb-12">{relatedPosts.length<2? `More Posts`:`Related Posts`}</h1>
            {combinedRelatedPosts.length>0 && <MoreStories posts={combinedRelatedPosts} route={'posts'}/>}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  // const content = await markdownToHtml(data?.posts[0]?.content || '')
// console.log(data)

 let combinedRelatedPosts = {};
  let relatedPostData = data?.relatedPosts?.data;
  let morePostsData =  data?.morePosts?.data;
  combinedRelatedPosts.data = relatedPostData.concat(morePostsData);
  //limit related posts to 6
  if(combinedRelatedPosts.data?.length>6){
    combinedRelatedPosts.data = combinedRelatedPosts.data.slice(0, 6);
  }
    
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
        // content,
      },
      combinedRelatedPosts:combinedRelatedPosts?.data,
      relatedPosts:data?.relatedPosts?.data,
      morePosts: data?.morePosts?.data,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      // console.log(post.attributes.slug)
      return `/posts/${post.attributes.slug}`}) || [],
    fallback: true,
  }
}
