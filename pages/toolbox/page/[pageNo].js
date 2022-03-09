import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/tools/intro'
import NewPagination from '@/components/pagination'
import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from '@/lib/api'
const PAGE_SIZE = 13;

export default function ToolboxPage({allPosts = [], preview, pagination = {}}) {
    //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
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
        router.push(`/toolbox/page/${pageNo}`)
      }

    return (
        <Layout preview={preview}>
            <Container>
            {
                pagination && pagination.page == 1 && (
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
                            type="toolbox"
                            />
                        )}   
                    </>
                )
            }
            {
                pagination.page && pagination.page == 1 ? (
                    morePosts.length > 0 && <MoreStories posts={morePosts} type="toolbox" />
                ): (
                    allPosts.length > 0 && <MoreStories posts={allPosts} type="toolbox" />
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
    )
}

export async function getStaticProps({ preview = null, params}) {
    const pageSize = PAGE_SIZE
    const page = params.pageNo
    const allPosts = (await getPostsByPageForToolsPage(preview, pageSize, page )) || []
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination
        },
    }
  }

export async function getStaticPaths() {
    const allPosts = (await getAllPostsForToolsPage(null, PAGE_SIZE, 0)) || []
    const pagination = allPosts.meta.pagination
    const pageCount = pagination.pageCount
    const pageCountArr = new Array(pageCount).fill(' ');
    return {
        paths: pageCountArr && pageCountArr.map((pageNo) => {
            return `/toolbox/page/${pageNo}`
        }) || [],
        fallback: true,
    }
}