import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import Container from '@/components/container'
const NewPagination = dynamic(() => import("@/components/pagination"));
import Layout from '@/components/layout'
import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from '@/lib/api'
import Head from 'next/head'
import { transformPostList } from "@/lib/locale/transformLocale";
const Aspiring = dynamic(() => import("@/components/new-index/Aspiring"));
const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
const ProductList = dynamic(() => import("@/components/new-index/ProductList"));
const TopicTopItem = dynamic(() => import("@/components/new-index/TopicTopItem"), { ssr: false });

const PAGE_SIZE = 11;
const ALL_SLUGS = ["ux", "user-research","ui", "color", "career", "interview", "accessibility", "code", "vr", ]
export default function PostsPage({allPosts = [], heroPost=null,morePosts=[], preview, pagination = {},first4Posts=[],first2Posts=[], slug='', pageNo=1, tagName=''}) {

    const router = useRouter()

    const onPageNumChange = (pageNum) => {
        router.push(`/posts/${slug}/page/${pageNum}`)
    }

    return (
        <>
          <Layout activeNav={"posts"} preview={preview}>
            <Head>
              <title>Open design and tech stories for everyone to read</title>
            </Head>
            <Container>
            <h2 className='font-bold topic-title tracking-wide color-title-1 text-center mt-20 mb-5 capitalize'>{tagName}</h2>
            {first4Posts?.length>0  &&<Aspiring posts={first4Posts} showTitle={false} />}
            
            <section className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {first2Posts?.length>0 &&  first2Posts.map((item, index) => {
                    return <TopicTopItem key={`topic_${index}`} topic={item} />
                })}
            </section>
            {heroPost && <EditorPick2 post={heroPost} showTitle={false} />}
            {morePosts && <ProductList posts={morePosts} />}
           
            <NewPagination 
                total={pagination?.total}
                pageSize={PAGE_SIZE}
                currentPage={pagination?.page}
                onPageNumChange={(pageNum, slug) => {onPageNumChange(pageNum, slug)}}
            />

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
    const {pageNo, slug} = params
    
    let allPosts = (await getPostsByPageForPostsPage(preview, pageSize, pageNo, [slug],sort)) || []

    let tags = allPosts[1]
    allPosts = allPosts[0]
    const pagination = allPosts.meta.pagination
    
    let first4 = [],first2=[], nextPosts = [], morePosts = [], heroPost = null
    
    allPosts = transformPostList(allPosts.data, locale)
    
    // if first page, divide posts into sections
    if(pageNo == 1){
      first4 = allPosts.slice(0, 4);
      if(allPosts && allPosts.length>4){
        nextPosts = allPosts?.slice(4)
        heroPost = nextPosts[0];
        morePosts = nextPosts.slice(1);
      }
      
    }else{
     // otherwise, just send back the list without splicing
     first2 = allPosts.slice(0, 2);
     morePosts = allPosts.slice(2)
     
     nextPosts = allPosts
    }
    
    return {
        props: { 
          allPosts:nextPosts, preview, pagination,
          first4Posts: first4,
          first2Posts: first2,
          slug,
          tagName:tags?.data[0]?.attributes?.name,
          pageNo,
          morePosts,
          heroPost
        },
      }
    
    // const interviews =
    // (await getCommonQuery(preview, [slug], "article", 4, 0)) || [];

    // console.log("interview data from home***********" + JSON.stringify(interviews))
    
  }

  export async function getStaticPaths() {
    let pageCountArr = [];

    for(var z = 0;z<ALL_SLUGS.length;z++){
      const allPosts = (await getAllPostsForPostsPage(null, PAGE_SIZE, 0, [ALL_SLUGS[z]])) || []
      const pagination = allPosts.meta.pagination
      const pageCount = pagination.pageCount
      let arr = new Array(pageCount).fill('');
      let newArr = arr.map((i,index) => {
        return `/posts/${ALL_SLUGS[z]}/page/${index+1}`
      })
      pageCountArr = pageCountArr.concat(newArr)
    }

    return {
      paths: pageCountArr || [],
      fallback: true,
    }
  }