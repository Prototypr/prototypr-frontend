import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/tools/intro'
import NewPagination from '@/components/pagination'
import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'
import FilterCategory from '@/components/FilterCategory'
const PAGE_SIZE = 12;
const ALL_SLUGS = ["chat", "conversational", "chatbot"]

const ALL_SLUGS_CATEGORY = [{
    key: "chat_design",
    name: "Chat Design",
    tags: ["prototyping", "chat"]
},{
    key: "platforms",
    name: "Platforms",
    tags: ["tool", "chat"]
},{
    key: "chatbot_generators",
    name: "Chatbot Generators",
    tags: ["generator", "chat"]
},{
    key: "curated_resources",
    name: "Curated Resources",
    tags: ["resource", "chat"]
}]

export default function ToolboxPage({allPosts = [], preview, pagination}) {
    //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
    // let heroPost;
    // let morePosts;
    // let coverImage;
    // if (allPosts && allPosts.length) {
    //     heroPost = allPosts[0]
    //     morePosts = allPosts.slice(1)
    //     coverImage = heroPost.attributes.legacyFeaturedImage ? heroPost.attributes.legacyFeaturedImage:''
    // }
    const router = useRouter()

    const onPageNumChange = (pageNo) => {
        router.push(`/toolbox/conversational-design-tools/page/${pageNo}`)
      }

    return (
        <Layout activeNav={'toolbox'} preview={preview}>
            <Container>
            {/* {
                pagination && pagination.page == 1 && (
                    <>
                        <Intro title={'Conversational Design'} />
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
            } */}
            {
                allPosts.length > 0 &&
                (
                    <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
                        <div className="grid-cols-1 hidden lg:block">
                            <div className='w-full h-screen  flex flex-col'>
                            <h1 className="font-semibold text-xl my-4">All Tools</h1>
                            <div className="display-none mb-8 lg:block text-gray-800">
                            <div className="px-2">
                                <h1 className="font-semibold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">UX Tools</h1>
                            </div>
                            {
                                ALL_SLUGS_CATEGORY && ALL_SLUGS_CATEGORY.map((item, index) => {
                                    return (
                                        <div className="cursor-pointer text-sm" key={`toobox_cat_${index}`}>
                                            <Link href={`/toolbox/conversational-design-tools/${item.key}/page/1`}>
                                                <div className="text-gray-700 hover:text-blue-500 p-2 rounded">
                                                {item.name}
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    </div>
                    <div className="col-span-3">
                        <MoreStories posts={allPosts} type="toolbox" />
                    </div>
                </div>
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
    const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, page, ALL_SLUGS )) || []
    
    console.log(allPosts)
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination
        },
    }
  }

export async function getStaticPaths() {
    const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, ALL_SLUGS)) || []
    const pagination = allPosts.meta.pagination
    const pageCount = pagination.pageCount
    const pageCountArr = new Array(pageCount).fill(' ');
    return {
        paths: pageCountArr && pageCountArr.map((pageNo) => {
            return `/toolbox/conversational-design-tools/page/${pageNo}`
        }) || [],
        fallback: true,
    }
}