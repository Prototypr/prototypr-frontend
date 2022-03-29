import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/posts/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
/**component from new layout */
import AuthorCard from "@/components/toolbox/AuthorCard";
import SponsorCard from "@/components/toolbox/SponsorCard";
import Contributors from "@/components/toolbox/Contributors";
import VisitCard from "@/components/toolbox/VisitCard";
import RelatedTool from "@/components/toolbox/RelatedTool";

import { getAllPostsWithSlug, getPostAndMorePosts, getRelatedTools } from '@/lib/api'
import PostTitle from '@/components/post-title'

import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
// import markdownToHtml from '@/lib/markdownToHtml'
import dynamic from 'next/dynamic'
const TimeAgo = dynamic(() => import('react-timeago'), { ssr: false })

export default function Post({ post, morePosts,relatedPosts, preview }) {
  console.log("blog page:post*********" + JSON.stringify(post?.attributes))
  const router = useRouter()
  //TODO: what is withAuthUser
  const withAuthUser = {};
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />
  }

  const d = new Date(post?.attributes?.date)


  const getDesc = () => {
    const may_2020 = new Date('2020-05-01');

    const post_date = new Date(post?.attributes.date);
    const post_content = post?.attributes.content
    const meta_description = post?.attributes.og_description

    if (post_date.getTime() > may_2020.getTime()) {
      //if we're past may 1st 2020, it's okay to return the post content
      if (post_content) {
        return (<div dangerouslySetInnerHTML={{ __html: post_content }} />)
      } else if (meta_description) {
        return (<div dangerouslySetInnerHTML={{ __html: meta_description }} />)
      } else {
        return ('')
      }
    }
    //if before 2020, only return meta description
    else {
      if (meta_description) {
        return (<div dangerouslySetInnerHTML={{ __html: meta_description }} />)
      } else {
        return ('')
      }

    }
  }

  const getPopupImage = () => {
    var image = post.image
    if (!image) {
      if (post.img_url) {
        return post.img_url
      }
      if (post.meta && post.meta.img_url) {
        if (post.meta.img_url[0] && post.meta.img_url[0].raw) {
          return image = post.meta.img_url[0].raw
        }
      }
    }
    if (!post) {
      return false
    }
    if (post.logo) {
      if (thumbnailWidth !== 'w-32') {
        return post.logo
      }
    }
    if (post.image) {
      return post.image
    }
    if (post.fimg_url) {
      return post.fimg_url
    }

    var placeholder = 'http://prototypr.io/wp-content/uploads/2017/10/20-01.png';
    if (post.og_image && (post.og_image !== '' || typeof og_image !== 'undefined')) {
      return post.og_image;
    }
    else return null
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
                <div className="col-span-full lg:col-span-13 flex flex-col">

                <div className="relative bg-white p-6 pt-6 rounded-lg shadow w-full gallery-rounded">
                      <div className="flex mb-6">
                        <div className="hover:bg-gray-100">
                          <a href={"https://blog.prototypr.io/being-a-design-intern-at-dunzo-ccebe8a6eac7?source=rss----eb297ea1161a---4?ref=prototyprio"}>

                            <h1 className="text-lg tracking-tight mr-2 leading-tight font-medium text-gray-900">
                              <div dangerouslySetInnerHTML={{ __html: "Being a design intern at Dunzo" }} />
                            </h1>
                            <div className="flex mt-1">
                              <div className=" pr-1 text-sm md:text-base text-blue-700 ">
                                blog.prototypr.io
                              </div>
                              <div className="md:block my-auto text-gray-500 text-xs " style={{ paddingLeft: "0.1rem", paddingRight: '0.1rem' }}>•</div>
                              <TimeAgo className="text-gray-700 text-base md:px-1" date={d} />
                            </div>
                          </a>
                        </div>
                        {/* <VoteButton
                          withUserLikes={withUserLikes}
                          user={withAuthUser}
                          updateUserLikes={(likes) => updateUserLikes(likes)}
                          position={"right"} initialLikes={userLikes} size=""
                          item={post} /> */}

                      </div>
                      <div className="pb-3">{getDesc()}</div>
                      <a href={"https://blog.prototypr.io/being-a-design-intern-at-dunzo-ccebe8a6eac7?source=rss----eb297ea1161a---4?ref=prototyprio"}>
                        <img className="rounded-md" alt={"Being a design intern at Dunzo"} src={"https://prototypr.io/wp-content/uploads/2020/08/1G7GioLR6VT5LfN_m7y23Dw.jpeg"} />
                      </a>
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

export async function getStaticProps({ params, preview = null, type="protobite" }) {
  const data = await getPostAndMorePosts(params.slug, preview, type)
  // const content = await markdownToHtml(data?.posts[0]?.content || '')

  let tags = data?.posts.data[0].attributes.tags
  let tagsArr = []
  if(tags.data){
    for(var x = 0;x<tags.data.length;x++){
      tagsArr.push(tags.data[x].attributes.slug)
    }
  }

  const relatedPostsData = await getRelatedTools(tagsArr,params.slug, preview);

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
  const allPosts = await getAllPostsWithSlug('blog')
  
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      return `/newsletter/${post.attributes.slug}`}) || [],
    fallback: true,
  }
}
