import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import Container from '@/components/container'
const NewPagination = dynamic(() => import("@/components/pagination"));
// import Layout from '@/components/layout'
import Layout from "@/components/layoutForBlogPost";

import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from '@/lib/api'
// import Head from 'next/head'
import { transformPostList } from "@/lib/locale/transformLocale";
const Aspiring = dynamic(() => import("@/components/new-index/Aspiring"));
const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
const ProductList = dynamic(() => import("@/components/new-index/ProductList"));
// const TopicTopItem = dynamic(() => import("@/components/new-index/TopicTopItem"), { ssr: false });

const PAGE_SIZE = 10;
const ALL_TAGS = ["ux", "user-research","ui", "color", "career", "interview", "accessibility", "code", "vr", ]
export default function PostsPage({allPosts = [], heroPost=null,morePosts=[], preview, pagination = {},firstPost=[], tag='', pageNo=1, tagName=''}) {

    const router = useRouter()

    const onPageNumChange = (pageNum) => {
        router.push(`/posts/${tag}/page/${pageNum}`)
    }
    if(tagName=='Interview'){
        tagName="Interviews"
    }else if(tagName=='UX'){
        tagName="UX Design"
    }else if(tagName=='UI'){
        tagName = 'UI Design'
    }


    return (
        <>
          <Layout
           seo={{
          title: `${tagName} | design articles on Prototypr | Page ${pagination?.page}`,
          description:
            `Articles on ${tagName} - design content open and accessible to everyone, no paywall here.`,
          //   image: "",
          canonical:`https://prototypr.io/posts/${tag}/page/${pagination?.page}`,
          url: `https://prototypr.io/posts/page/${tag}/${pagination?.page}`,
        }}
           activeNav={"posts"} preview={preview}>
            <Container>
              <div className="pt-24 xl:px-24">
                <h2 className='font-bold text-5xl md:text-6.5xl tracking-wide text-center mt-6 md:mt-10 md:my-8'>
                    {tagName}
                </h2>            
                
                <section className={`mt-10`}>
                {firstPost?.length>0 &&  firstPost.map((item, index) => {
                    return <EditorPick2 post={item} showTitle={false} />
                        // return <TopicTopItem key={`topic_${index}`} topic={item} />
                    })}
                </section>
                {heroPost && <EditorPick2 post={heroPost} showTitle={false} />}
                {morePosts && <ProductList posts={morePosts} />}
              
                <NewPagination 
                    total={pagination?.total}
                    pageSize={PAGE_SIZE}
                    currentPage={pagination?.page}
                    onPageNumChange={(pageNum, tag) => {onPageNumChange(pageNum, tag)}}
                />
              </div>

            </Container>
          </Layout>
        </>
      )
}

export async function getStaticProps({ preview = null, params, locale }) {
    let sort = ["featured:desc","tier:asc",  "date:desc"]
    if(locale === 'es-ES'){
      sort = ["esES:desc","featured:desc","tier:asc","date:desc"]
    }
    const pageSize = PAGE_SIZE
    const {pageNo, tag} = params
    
    let allPosts = (await getPostsByPageForPostsPage(preview, pageSize, pageNo, [tag],sort)) || []

    let tags = allPosts[1]
    allPosts = allPosts[0]
    const pagination = allPosts.meta.pagination
    
    let firstPost=[], nextPosts = [], morePosts = [], heroPost = null
    
    allPosts = transformPostList(allPosts.data, locale)
    
     // otherwise, just send back the list without splicing
     firstPost = allPosts.slice(0, 1);
     morePosts = allPosts.slice(1)
     
     nextPosts = allPosts
    
    return {
        props: { 
          allPosts:nextPosts, preview, pagination,
          firstPost: firstPost,
          tag,
          tagName:tags?.data[0]?.attributes?.name,
          pageNo,
          morePosts,
          heroPost
        },revalidate: 20,
      }
    
    // const interviews =
    // (await getCommonQuery(preview, [tag], "article", 4, 0)) || [];

    // console.log("interview data from home***********" + JSON.stringify(interviews))
    
  }

  export async function getStaticPaths() {
    let pageCountArr = [];

    for(var z = 0;z<ALL_TAGS.length;z++){
      const allPosts = (await getAllPostsForPostsPage(null, PAGE_SIZE, 0, [ALL_TAGS[z]])) || []
      const pagination = allPosts.meta.pagination
      const pageCount = pagination.pageCount
      let arr = new Array(pageCount).fill('');
      let newArr = arr.map((i,index) => {
        return `/posts/${ALL_TAGS[z]}/page/${index+1}`
      })
      pageCountArr = pageCountArr.concat(newArr)
    }

    return {
      paths: pageCountArr || [],
      fallback: true,
    }
  }