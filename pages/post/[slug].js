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
import { useIntl } from "react-intl";

export default function Post({ post, morePosts, preview, relatedPosts, combinedRelatedPosts, title, content}) {
  const router = useRouter()
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />
  }
  const intl = useIntl();

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
                  {title[intl.locale]?title[intl.locale]:title['en-US']} | Prototypr
                </title>
                <meta property="og:image" content={post.attributes.ogImage} />
              </Head>
              {!title[intl.locale] && <NoticeTranslation/>}
              <PostHeader
                title={title[intl.locale]?title[intl.locale]:title['en-US']}
                coverImage={post.attributes.featuredImage?.data?.attributes?.url? post.attributes.featuredImage?.data?.attributes?.url:post.attributes.legacyFeaturedImage ? post.attributes.legacyFeaturedImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}
                date={post.attributes.date}
                author={post.attributes?.author?.data?.attributes}
                />
              <PostBody content={content[intl.locale]?content[intl.locale]:content['en-US']} />
            </article>
            <SectionSeparator />
            <h1 className="text-4xl font-semibold -mt-10 mb-12">{relatedPosts.length<2? `More Posts`:`Related Posts`}</h1>

            <div className="mt-10 mb-20 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {combinedRelatedPosts.length>0 && combinedRelatedPosts.map((item, index) => (
                <TopicTopItem key={index} topic={item?.attributes}/>
            ))}
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null, locales}) {

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


  let content={}
  let title={}

  //set the default locale (en-us)
  title['en-US']=data?.posts.data[0]?.attributes?.title
  content['en-US']=data?.posts.data[0]?.attributes?.content

  //get each localization and add the translation for title and content
  const localizations = data?.posts.data[0]?.attributes?.localizations?.data
  for(var x = 0;x<localizations.length;x++){
    title[localizations[x].attributes.locale]=localizations[x].attributes.title
    content[localizations[x].attributes.locale]=localizations[x].attributes.content
  }

  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
        // content,
      },
      title,
      content,
      combinedRelatedPosts:combinedRelatedPosts?.data,
      relatedPosts:data?.relatedPosts?.data,
      morePosts: data?.morePosts?.data,
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
