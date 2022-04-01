import { useRouter } from 'next/router'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import NewPagination from '@/components/pagination'
import Layout from '@/components/layout'
import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from '@/lib/api'
import Head from 'next/head'

const PAGE_SIZE = 12;
const ALL_SLUGS = ["ux", "user-research","ui", "color", "career", "interview", "accessibility", "code", "vr", ]
export default function PostsPage({allPosts = [], preview, pagination = {}}) {

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
            {
                allPosts.length > 0 && <MoreStories posts={allPosts} />
            }
            <NewPagination 
                total={pagination?.total}
                pageSize={PAGE_SIZE}
                currentPage={pagination?.page}
                onPageNumChange={(pageNum) => {onPageNumChange(pageNum)}}
            />

            </Container>
          </Layout>
        </>
      )
}

export async function getStaticProps({ preview = null, params }) {
    const pageSize = PAGE_SIZE
    const {pageNo, slug} = params
    const allPosts = (await getPostsByPageForPostsPage(preview, pageSize, pageNo, [slug])) || []
  
    const pagination = allPosts.meta.pagination
    return {
      props: { allPosts:allPosts.data, preview, pagination },
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

    // foreach is not synchronous
    // ALL_SLUGS.forEach(async (item) => {
    //   const allPosts = (await getAllPostsForPostsPage(null, PAGE_SIZE, 0, [item])) || []
    //   const pagination = allPosts.meta.pagination
    //   const pageCount = pagination.pageCount
    //   let arr = new Array(pageCount).fill('');
    //   let newArr = arr.map((i,idx) => {
    //     return `/posts/${item}/page/${idx+1}`
    //   })
    //   pageCountArr = pageCountArr.concat(newArr)
    // })

    return {
      paths: pageCountArr || [],
      fallback: true,
    }
  }