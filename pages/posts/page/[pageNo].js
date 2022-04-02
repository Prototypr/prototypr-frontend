import { useRouter } from 'next/router'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/posts/intro'
import NewPagination from '@/components/pagination'
import Layout from '@/components/layout'
import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
const PAGE_SIZE = 12;
export default function PostsPage({allPosts = [], preview, pagination = {}}) {
    let heroPost;
    let morePosts = [];
    let coverImage;
    if (allPosts.length && pagination.page && pagination.page == 1) {
        heroPost = allPosts[0]
        morePosts = allPosts.slice(1)
        coverImage = heroPost.attributes.legacyFeaturedImage ? heroPost.attributes.legacyFeaturedImage:''
    }
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
                pagination.page && pagination.page == 1 && (
                    <>
                        <Intro />
                        {heroPost && (
                             <HeroPost
                             title={heroPost.attributes.title}
                             coverImage={coverImage}
                             date={heroPost.attributes.date}
                             author={(heroPost.attributes.author &&heroPost.attributes.author.data) ?heroPost.attributes.author.data.attributes:'https://prototypr.gumlet.io/wp-content/uploads/2021/09/2021-09-17-10-09-02.2021-09-17-10_10_54-f3ijc-1.gif'}
                             slug={heroPost.attributes.slug}
                             excerpt={heroPost.attributes.excerpt}
                           />
                        )}
                    </>
                )
            }
            {
                pagination.page && pagination.page == 1 ? (
                    morePosts.length > 0 && <MoreStories posts={morePosts} />
                ): (
                    allPosts.length > 0 && <MoreStories posts={allPosts} />
                )
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
    const page = params.pageNo
    const allPosts = (await getPostsByPageForPostsPage(preview, pageSize, page)) || []
    const pagination = allPosts.meta.pagination
    return {
      props: { allPosts:allPosts.data, preview, pagination },
    }
  }

  export async function getStaticPaths() {
      const allPosts = (await getAllPostsForPostsPage(null, PAGE_SIZE, 0)) || []
      const pagination = allPosts.meta.pagination
      const pageCount = pagination.pageCount
      const pageCountArr = new Array(pageCount).fill(' ')
      return {
        paths: pageCountArr && pageCountArr.map((pageNo) => {
            return `/posts/page/${pageNo}`
        }) || [],
        fallback: true,
      }
  }