import { useRouter } from 'next/router'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import NewPagination from '@/components/pagination'
import Layout from '@/components/layout'
import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
const PAGE_SIZE = 12;
const ALL_SLUGS = ["ux", "ui", "color", "career"]
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
    // console.log('res*********' + allPosts.data.length)
    // console.log('allPosts.meta.pagination*****' + JSON.stringify(allPosts.meta.pagination));
    const pagination = allPosts.meta.pagination
    return {
      props: { allPosts:allPosts.data, preview, pagination },
    }
  }

  export async function getStaticPaths() {
    let pageCountArr = [];

    ALL_SLUGS.forEach(async (item) => {
      const allPosts = (await getAllPostsForPostsPage(null, PAGE_SIZE, 0, [item])) || []
      const pagination = allPosts.meta.pagination
      const pageCount = pagination.pageCount
      let arr = new Array(pageCount).fill('');
      let newArr = arr.map((i,idx) => {
        return `/posts/${item}/page/${idx+1}`
      })
      pageCountArr = pageCountArr.concat(newArr)
    })

    return {
      paths: pageCountArr || [],
      fallback: true,
    }
  }