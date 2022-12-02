import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import Layout from '@/components/layout'
import { getAllJobsWithId, getJobPage } from '@/lib/api'
// import markdownToHtml from '@/lib/markdownToHtml'

import dynamic from 'next/dynamic'
const RelatedPosts = dynamic(() => import('@/components/related-posts'), { ssr: true })
const PostTitle = dynamic(() => import('@/components/post-title'), { ssr: true })
const SponsorCard = dynamic(() => import('@/components/toolbox/SponsorCard'), { ssr: true })
const AuthorNewsCredit = dynamic(() => import('@/components/AuthorNewsCredit'), { ssr: true })


export default function Post({ post, morePosts, preview, domain,link, postDate }) {
  const router = useRouter()
  

    let seoDescription = 'Job post on Prototypr'
  if(post?.attributes.content){
    seoDescription = truncate(post?.attributes.description, 400)
  }
  
  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />
  }
  const title = post?.attributes?.title
  const description = seoDescription
  const image = post?.attributes?.seo?.opengraphImage?post?.attributes?.seo?.opengraphImage:  post?.attributes?.featuredImage?.data?.attributes?.url ? post?.attributes?.featuredImage?.data?.attributes?.url:post?.legacyFeaturedImage?post?.legacyFeaturedImage?.mediaItemUrl:post?.ogImage?post?.ogImage.opengraphImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
  const canonical = post?.attributes?.id && `https://prototypr.io/jobs/${post?.attributes.id}`
  const url = post?.attributes?.id && `https://prototypr.io/jobs/${post?.attributes.id}`
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
        <div className="w-full mt-6 grid grid-rows-1 grid-cols-12 lg:gap-6 lg:px-4">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
          {/* center sidebar */}
          <div className="col-span-full lg:col-span-9">

            {/**Description */}
            <div className="mb-8">
              <div className="mb-6 relative bg-white px-6 py-6 rounded-lg w-full">
                <a href={link?link:''} className="hover:underline" target="_blank">
                <h1 className="text-xl  max-w-2xl font-medium">{post?.attributes.title}</h1>
                </a>
                {post && post.attributes && post.attributes.author && (
                  <div className="sm:hidden lg:block">
                    <AuthorNewsCredit author={post.attributes.author} postDate={postDate} domain={domain} link={link} />
                  </div>
                )}
                <div
                  style={{ color: "#4a5568"}}
                  className="py-3 max-w-3xl text-md mb-2"
                  dangerouslySetInnerHTML={{ __html: post?.attributes?.description }}
                ></div>
                
                {post?.attributes?.url && <div className="py-6"><a className="underline text-gray-600 font-semibold" href={post?.attributes.url} target="_blank">Apply</a></div>}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR START */}
          <div className="col-span-full mb-6 lg:mb-0 lg:col-span-3 order-last lg:order-last lg:block">
              <div className="sm:hidden block lg:block">
              <SponsorCard position="left" />
            </div>
              {
                morePosts && 
                <RelatedPosts 
                  relatedPosts={morePosts}
                  type={'post'}
                  title={'Top Stories'}
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

export async function getStaticProps({ params, preview = null, type = 'protobite' }) {
  const data = await getJobPage(params.id)

  //if no post found, 404
  if(!data?.jobs?.data[0]){
    return {
      props: {
        post: null,
      },
      revalidate:30
    }
  }
  
  let link = data?.jobs.data[0].attributes.link
  if(!link){
    link = data?.jobs.data[0].attributes.legacyAttributes?.link ? data?.jobs.data[0].attributes.legacyAttributes?.link:'#'
  }

  // const content = await markdownToHtml(data?.jobs[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.jobs.data[0],
        id:params.id
      },
      link,
    //   postDate:JSON.stringify(postDate),
    //   morePosts:relatedArticles,
    },
  }
}

export async function getStaticPaths() {
    const allPosts = await getAllJobsWithId()
    
    return {
      paths: allPosts && allPosts.data?.map((post) =>{ 
        return `/jobs/${post.id}`}) || [],
      fallback: true,
    }
  }