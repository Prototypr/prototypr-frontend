import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/posts/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import AuthorCard from "@/components/toolbox/AuthorCard";
import SponsorCard from "@/components/toolbox/SponsorCard";
import Contributors from "@/components/toolbox/Contributors";
import PostTitle from '@/components/post-title'
import VisitCard from "@/components/toolbox/VisitCard";
import RelatedTool from "@/components/toolbox/RelatedTool";
import { getAllPostsWithSlug, getPostAndMorePosts, getRelatedTools } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
// import markdownToHtml from '@/lib/markdownToHtml'

export default function Post({ post, morePosts,relatedPosts, preview }) {
  console.log("news page:post*********" + JSON.stringify(post?.attributes))
  const router = useRouter()
    //TODO: what is withAuthUser
    const withAuthUser = {};
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout activeNav={"posts"} preview={preview}>
      <Container>
        <div className="w-full mt-6 grid grid-rows-1 grid-cols-24 lg:gap-6">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
          <div
            className="md:col-span-5 hidden lg:block"
          >
            {post && post.attributes && post.attributes.author && (
              <div className="sm:hidden lg:block">
                <AuthorCard author={post.attributes.author} />
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

            {/**Description */}
            <div className="mb-8">
              <div className="popup-modal mb-6 relative bg-white p-6 pt-3 rounded-lg w-full">
                <div
                  style={{ color: "#4a5568", marginBottom: "1rem" }}
                  className="py-3 popup-modal-content"
                  dangerouslySetInnerHTML={{ __html: post?.attributes.content }}
                ></div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR START */}
          <div className="col-span-full mb-6 lg:mb-0 lg:col-span-6 order-first lg:order-last lg:block">
              <VisitCard 
                tags={post?.attributes.tags}
                title={post?.attributes.title}
                link={post?.attributes.link}
                useNextImage={true}
                logoNew={post?.attributes.legacyFeaturedImage?.logoNew}
              />
              {
                relatedPosts && 
                <RelatedTool 
                  relatedPosts={relatedPosts}
                />
              }
          </div>

          </>
        )}
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null, type = 'bite' }) {
  const data = await getPostAndMorePosts(params.slug, preview, type)
  let tags = data?.posts.data[0].attributes.tags
  let tagsArr = []
  if(tags.data){
    for(var x = 0;x<tags.data.length;x++){
      tagsArr.push(tags.data[x].attributes.slug)
    }
  }
  // console.log('news pages:tagsArr*******' + tagsArr)
  // console.log('params.slug*******' + params.slug)
  const relatedPostsData = await getRelatedTools(tagsArr,params.slug, preview);

  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
        // content,
      },
      relatedPosts:relatedPostsData?.posts.data,
      morePosts: data?.morePosts.data,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug('bite')
  
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      return `/news/${post.attributes.slug}`}) || [],
    fallback: true,
  }
}
