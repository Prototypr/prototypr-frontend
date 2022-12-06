import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import Layout from '@/components/layout'
import { getAllJobsWithId, getJobPage } from '@/lib/api'
// import markdownToHtml from '@/lib/markdownToHtml'

import dynamic from 'next/dynamic'
import { LocationIcon, MoneyIcon } from '@/components/icons'
import Button from '@/components/Primitives/Button'
import Link from 'next/link'
const RelatedPosts = dynamic(() => import('@/components/related-posts'), { ssr: true })
const PostTitle = dynamic(() => import('@/components/post-title'), { ssr: true })
const SponsorCard = dynamic(() => import('@/components/toolbox/SponsorCard'), { ssr: true })
const AuthorNewsCredit = dynamic(() => import('@/components/AuthorNewsCredit'), { ssr: true })
const TimeAgo = dynamic(() => import("react-timeago"), { ssr: false });


export default function Post({ post, morePosts, preview, domain,link, postDate }) {
  const router = useRouter()
  

    let seoDescription = 'Job post on Prototypr'
  if(post?.attributes?.content){
    seoDescription = truncate(post?.attributes?.description, 400)
  }
  
  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />
  }

  const title = post?.attributes?.title
  const description = seoDescription
  const image = post?.attributes?.seo?.opengraphImage?post?.attributes?.seo?.opengraphImage:  post?.attributes?.featuredImage?.data?.attributes?.url ? post?.attributes?.featuredImage?.data?.attributes?.url:post?.legacyFeaturedImage?post?.legacyFeaturedImage?.mediaItemUrl:post?.ogImage?post?.ogImage.opengraphImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
  const canonical = post?.attributes?.id && `https://prototypr.io/jobs/${post?.attributes?.id}`
  const url = post?.attributes?.id && `https://prototypr.io/jobs/${post?.attributes?.id}`

  const locations = post?.attributes?.locations?.data
  const skills = post?.attributes?.skills?.data
  
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
        <div className="w-full mt-6 grid grid-rows-1 grid-cols-12 lg:gap-6">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
          {/* center sidebar */}
          <div className="relative col-span-full lg:col-span-9">

            {/**Description */}
            <div className="mb-8">
              <div className="mb-6 relative bg-white px-6 py-6 rounded-lg w-full">
                {post?.attributes?.company?.data?.attributes?.logo?.data?.attributes?.url?
                <img style={{width:95, height:95}} className="rounded-full border border-gray-100 mb-6" src={post?.attributes?.company?.data?.attributes?.logo?.data?.attributes?.url}/>:''}
                <h1 className="text-3xl mb-2 max-w-2xl font-medium">{post?.attributes.title}</h1>
                <div className='flex'>
                <h2 className='text-xl mb-1 font-medium'>{post?.attributes?.company?.data?.attributes?.name}</h2>
             
                </div>
                <div className='flex'>
                  {locations?.length?
                  <LocationIcon/>:''}
                  {locations[0]?.attributes?.name && 
                  locations.map((location, index)=>
                    <div className="ml-1 flex my-auto rounded-lg">
                    
                    <p className="mr-2 text-gray-600 my-auto text-md font-base">
                    {location?.attributes?.name}
                    </p>
                    {/* {(index<location.length )? <span>•</span>:''} */}
                  </div>
                  )
                    }
                    <span className="text-gray-600">•</span>
                  {(post?.attributes?.salarymin && post?.attributes?.salarymax)? 
              <>
              <div className="flex ml-2 flex-row gap-0.5">
                <MoneyIcon/>
                <div className="ml-1 text-gray-600 my-auto text-md font-base">
                  {`$${post.attributes.salarymin/1000}k – $${(post.attributes.salarymax/1000)}k`}
                </div>
              </div>
              </>
              :''}
                </div>
                  
                  
                <div className="gap-2 mt-3 flex flex-row">
                {skills[0]?.attributes?.name && 
                skills.map((skill, map)=>
                <span
                className="py-1 px-3 text-xs rounded-full bg-purple-100 text-purple-600 text-md"
                key={skill?.attributes?.name}
              >
                {skill?.attributes?.name}
              </span>
                )
                 
                  }
                </div>
                <div className='mt-8 pt-8 border-t border-gray-100'>
                  <h3 className='text-2xl font-medium mb-2 text-gray-900'>Job description</h3>
                  <span className="inline text-gray-500 text-md font-base">Posted </span>
                  {post?.attributes?.date?
                  <TimeAgo
                  className="text-gray-500 text-md font-base"
                  date={post?.attributes?.date}
                />:''}
                </div>
                
                {post && post?.attributes && post?.attributes?.author && (
                  <div className="sm:hidden lg:block">
                    <AuthorNewsCredit author={post.attributes.author} postDate={postDate} domain={domain} link={link} />
                  </div>
                )}
                <div
                  style={{ color: "#4a5568"}}
                  className="py-3 mt-4 max-w-3xl text-md mb-2"
                  dangerouslySetInnerHTML={{ __html: post?.attributes?.description }}
                ></div>
                
                {/* {post?.attributes?.url && <div className="py-6"><a className="underline text-gray-600 font-semibold" href={post?.attributes.url} target="_blank">Apply</a></div>} */}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR START */}
          <div className="col-span-full mb-6 lg:mb-0 lg:col-span-3 order-last lg:order-last lg:block">
          <div className="w-full mb-6 pt-4 pb-6 px-6 rounded-lg bg-white col-start-5 col-end-7 md:col-start-5 md:col-end-7 ">
          <div className="w-full">
            <h3 className='text-xl font-medium mb-2 text-gray-900'>Apply Today</h3>
            <p className="text-base text-gray-600 mb-4">{post?.attributes?.company?.data?.attributes?.name} accepts applications on their company website.</p>
              <Link href={post?.attributes?.url}>
                <Button variant="fullWidthJob" className="px-0 py-1">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
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
  
  let link = data?.jobs?.data[0]?.attributes?.link
  if(!link){
    link = data?.jobs?.data[0]?.attributes?.legacyAttributes?.link ? data?.jobs?.data[0]?.attributes?.legacyAttributes?.link:'#'
  }



  // const content = await markdownToHtml(data?.jobs[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.jobs?.data[0],
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
        return `/jobs/${post?.id}`}) || [],
      fallback: true,
    }
  }