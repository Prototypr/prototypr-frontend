import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import Container from '@/components/container'
const NewPagination = dynamic(() => import("@/components/pagination"));
import Layout from '@/components/layout'
import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from '@/lib/api'
const Aspiring = dynamic(() => import("@/components/new-index/Aspiring"));
const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
const ProductList = dynamic(() => import("@/components/new-index/ProductList"));
const TopicTopItem = dynamic(() => import("@/components/new-index/TopicTopItem"), { ssr: false });

const PAGE_SIZE = 11;
const ALL_TAGS = ["ux", "user-research","ui", "color", "career", "interview", "accessibility", "code", "vr", ]
export default function PostsPage({allPosts = [], heroPost=null,morePosts=[], preview, pagination = {},first4Posts=[],first2Posts=[], tag='', pageNo=1, tagName=''}) {

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
          title: "Prototypr Design articles – free for everyone.",
          description:
            "Design content open and accessible to everyone, no paywall here.",
          //   image: "",
          canonical: "https://prototypr.io/posts",
          url: "https://prototypr.io/posts",
        }}
          activeNav={"posts"} preview={preview}>
            <Container>
            <h2 className='font-bold text-5xl md:text-6.5xl tracking-wide text-center mt-6 md:mt-10 md:my-8'>
                {tagName}
            </h2>
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
                onPageNumChange={(pageNum, tag) => {onPageNumChange(pageNum, tag)}}
            />

            </Container>
          </Layout>
        </>
      )
}

export async function getStaticProps({ preview = null, params,locale }) {
    let sort = ["featured:desc","tier:asc",  "date:desc"]
    if(locale === 'es-ES'){
      sort = ["esES:asc","featured:desc","tier:asc","date:desc"]
    }
    const pageSize = PAGE_SIZE
    const {tag} = params
    const pageNo = 1
    let allPosts = (await getPostsByPageForPostsPage(preview, pageSize, pageNo, [tag],sort)) || []

    let tags = allPosts[1]
    allPosts = allPosts[0]
    const pagination = allPosts.meta.pagination
    
    let first4 = [],first2=[], nextPosts = [], morePosts = [], heroPost = null
    
    // if first page, divide posts into sections
    if(pageNo == 1){
      first4 = allPosts.data.slice(0, 4);
      if(allPosts.data && allPosts.data.length>4){
        nextPosts = allPosts?.data.slice(4)
        heroPost = nextPosts[0];
        morePosts = nextPosts.slice(1);
      } 
    }
    
    return {
        props: { 
          allPosts:nextPosts, preview, pagination,
          first4Posts: first4,
          first2Posts: first2,
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
        return `/posts/${ALL_TAGS[z]}`
      })
      pageCountArr = pageCountArr.concat(newArr)
    }

    return {
      paths: pageCountArr || [],
      fallback: true,
    }
  }