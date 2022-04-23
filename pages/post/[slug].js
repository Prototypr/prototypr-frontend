import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
const TopicTopItem = dynamic(() => import("@/components/new-index/TopicTopItem"), { ssr: false });

import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import NoticeTranslation from '@/components/notice-translation'
import { FormattedMessage, useIntl } from "react-intl";
import { transformPost, transformPostList } from "@/lib/locale/transformLocale";

export default function Post({ post, preview, relatedPosts, combinedRelatedPosts}) {
  const router = useRouter()
  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const intl = useIntl();
  // console.log('locale changed********' + intl.locale);
  const locale = intl.locale ? intl.locale : "en-US";

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
                  {post.attributes?.title} | Prototypr
                </title>
                <meta property="og:image" content={post.attributes.ogImage} />
              </Head>
              {!post.currentLocaleAvailable && <NoticeTranslation/>}
              <PostHeader
                title={post.attributes?.title}
                coverImage={post.attributes.featuredImage?.data?.attributes?.url? post.attributes.featuredImage?.data?.attributes?.url:post.attributes.legacyFeaturedImage ? post.attributes.legacyFeaturedImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}
                date={post.attributes.date}
                author={post.attributes?.author?.data?.attributes}
                />
              <PostBody content={post.attributes?.content} />
            </article>
            <SectionSeparator />
            <h1 className="text-4xl font-semibold -mt-10 mb-12">{relatedPosts.length<2? `More Posts`:`Related Posts`}</h1>

            <div className="mt-10 mb-20 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {combinedRelatedPosts.length>0 && combinedRelatedPosts.map((item, index) => {
              // console.log(item)
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
  
  const data = await getPostAndMorePosts(params.slug, preview)

 let combinedRelatedPosts = {};
  let relatedPostData = data?.relatedPosts?.data;
  let morePostsData =  data?.morePosts?.data;
  combinedRelatedPosts.data = relatedPostData.concat(morePostsData);
  //limit related posts to 6
  if(combinedRelatedPosts.data?.length>6){
    combinedRelatedPosts.data = combinedRelatedPosts.data.slice(0, 6);
  }

  data?.posts.data[0] = transformPost(data?.posts.data[0], locale)
  combinedRelatedPosts.data = transformPostList(combinedRelatedPosts?.data, locale)

  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
        // content,
      },
      combinedRelatedPosts:combinedRelatedPosts.data,
      relatedPosts:data?.relatedPosts?.data
    },
  }
}

export async function getStaticPaths({locales}) {
  const allPosts = await getAllPostsWithSlug()
  
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      // console.log(post.attributes.slug)
      return `/post/${post.attributes.slug}`}) || [],
    fallback: true,
  }
}
