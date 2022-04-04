import { useRouter } from 'next/router'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import NewPagination from '@/components/pagination'
import Layout from '@/components/layout'
import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from '@/lib/api'
import Head from 'next/head'
import Aspiring from "@/components/new-index/Aspiring";
import EditorPick from "@/components/new-index/EditorPick";
import TopicItem from "@/components/new-index/TopicItem"
import {
  getCombinedPostsForHome,
  getAllToolsForHome,
  getCommonQuery,
} from "@/lib/api";

const PAGE_SIZE = 12;
const ALL_SLUGS = ["ux", "user-research","ui", "color", "career", "interview", "accessibility", "code", "vr", ]
export default function PostsPage({allPosts = [], preview, pagination = {},interviewPosts}) {

    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);
    const router = useRouter()

    const onPageNumChange = (pageNo) => {
        router.push(`/posts/page/${pageNo}`)
    }

    return (
        <>
          <Layout activeNav={"posts"} preview={preview}>
            <Head>
              <title>Open design and tech stories for everyone to read</title>
            </Head>
            <Container>
            <h2 className='font-bold topic-title tracking-wide color-title-1 text-center mt-20 mb-5'>Accessibility</h2>
            <Aspiring posts={interviewPosts} showTitle={false} />
            <EditorPick post={heroPost} showTitle={false} />
            <section className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {
                morePosts.length ? morePosts.map((item, index) => {
                    return <TopicItem key={`topic_${index}`} topic={item?.attributes} />
                }): null
            }
            </section>
            {/* {
                allPosts.length > 0 && <MoreStories posts={allPosts} />
            }
            <NewPagination 
                total={pagination?.total}
                pageSize={PAGE_SIZE}
                currentPage={pagination?.page}
                onPageNumChange={(pageNum) => {onPageNumChange(pageNum)}}
            /> */}

            </Container>
          </Layout>
        </>
      )
}

export async function getStaticProps({ preview = null, params }) {
    const pageSize = PAGE_SIZE
    const {pageNo, slug} = params
    const allPosts = (await getPostsByPageForPostsPage(preview, pageSize, pageNo, [slug])) || []
  
    const interviews =
    (await getCommonQuery(preview, [slug], "article", 4, 0)) || [];

    // console.log("interview data from home***********" + JSON.stringify(interviews))
    const pagination = allPosts.meta.pagination
    return {
      props: { 
        allPosts:allPosts.data, preview, pagination,
        interviewPosts: interviews.data,
      },
    }
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