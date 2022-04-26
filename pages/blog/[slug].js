import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import Layout from '@/components/layout'
import AuthorNewsCredit from "@/components/AuthorNewsCredit";
import SponsorCard from "@/components/toolbox/SponsorCard";
import PostTitle from '@/components/post-title'
import RelatedPosts from "@/components/related-posts";
import { getAllPostsWithSlug, getNewsAndMoreNews } from '@/lib/api'
// import markdownToHtml from '@/lib/markdownToHtml'

export default function Post({ post, morePosts, preview, domain,link, postDate }) {
  const router = useRouter()
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout 
    seo={{
        title:`${post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphTitle: post?.attributes?.title && post.attributes.title}`,
        description:`${post?.attributes?.seo?.opengraphTitle?post?.attributes?.seo?.opengraphDescription: post?.attributes?.excerpt && post.attributes.excerpt}`,
        image:`${post?.attributes?.seo?.opengraphImage?post?.attributes?.seo?.opengraphImage:  post?.attributes?.featuredImage?.data?.attributes?.url ? post?.attributes?.featuredImage?.data?.attributes?.url:post?.legacyFeaturedImage?post.legacyFeaturedImage.mediaItemUrl:post?.ogImage?post.ogImage.opengraphImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}`,
        canonical: `${post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/blog/${post?.attributes.slug}`}`,
        url: `${post?.attributes?.seo?.canonical?post?.attributes?.seo?.canonical: post?.attributes?.slug && `https://prototypr.io/blog/${post?.attributes.slug}`}`
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
              <div className="mb-6 relative bg-white px-6 pt-6 rounded-lg w-full">
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
                  dangerouslySetInnerHTML={{ __html: post?.attributes.content }}
                ></div>
                {post?.attributes.legacyAttributes?.imgUrl ? <a href={link?link:''} target="_blank"><img className="rounded" src={post?.attributes.legacyAttributes?.imgUrl}/></a>:
                post?.attributes.legacyAttributes?.ogImage && <a href={link?link:''} target="_blank"><img className="rounded" src={post?.attributes.legacyAttributes?.ogImage}/></a>}
                {link && <div className="py-6"><a className="underline text-gray-600 font-semibold" href={post?.attributes.legacyAttributes?.link} target="_blank">Read more</a></div>}
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
                  type={'blog'}
                  title={'More posts'}
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
  const data = await getNewsAndMoreNews(params.slug, preview, type)
  
  let link = data?.posts.data[0].attributes.link
  if(!link){
    link = data?.posts.data[0].attributes.legacyAttributes?.link ? data?.posts.data[0].attributes.legacyAttributes?.link:'#'
  }
  //get url for link
  let domain = ''
  if(link){
    if (typeof link == 'string') {
      let matches = link.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
      domain = matches && matches[1];
      if (domain) {
        domain = domain.replace('www.', '')
      }
    }
  }
  
  let postDate = new Date(data?.posts.data[0]?.attributes?.date);
  
  
  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
      },
      domain,
      link,
      postDate:JSON.stringify(postDate),
      morePosts: data?.morePosts.data,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug('protobite')
  
  return {
    paths: allPosts && allPosts.data?.map((post) =>{ 
      return `/blog/${post.attributes.slug}`}) || [],
    fallback: true,
  }
}
