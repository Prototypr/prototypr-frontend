import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
import Layout from '@/components/layout'
import Container from '@/components/container'
const MoreStories = dynamic(() => import("@/components/more-stories"));
import NewPagination from '@/components/pagination'
import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));
import PostTitle from '@/components/post-title'

import get_all_tags from '@/lib/menus/lib/getAllTagsFromMenu'
import ALL_SLUGS_CATEGORY from '@/lib/menus/realityTools'

const PAGE_SIZE = 12;

const BREADCRUMBS = {
    pageTitle:'Mixed Reality',
    links:[
        {name:'Home', slug:'/'},
        {name:'Toolbox', slug:'/toolbox/page/1'},
        // {name:'UX Tools', slug:'/toolbox/ux-tools/page/1'}
    ]
  }

export default function ToolboxPage({allPosts = [], preview, pagination}) {
    //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
    const router = useRouter()

    const onPageNumChange = (pageNo) => {
        router.push(`/toolbox/augmented-reality-tools/page/${pageNo}`)
      }

    return (
        <Layout activeNav={'toolbox'} preview={preview}>
            <Container>
            {router.isFallback ? (
                 <PostTitle>Loading…</PostTitle>
                ) :
                <>  
                {
                allPosts.length > 0 &&
                (
                        <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
                            <div className="grid-cols-1 hidden lg:block">
                            <div className='w-full min-h-screen  flex flex-col'>
                                <Breadcrumbs 
                                urlRoot={'/toolbox/augmented-reality-tools'}
                                title={BREADCRUMBS.pageTitle}
                                links={BREADCRUMBS.links}
                                />
                                <FilterCategory
                                urlRoot={'/toolbox/augmented-reality-tools'}
                                items={ALL_SLUGS_CATEGORY} 
                                key={'uxtools_item_'} 
                                // slug={slug}
                                />
                            </div>
                            </div>
                            <div className="col-span-3">
                                <MoreStories posts={allPosts} type="toolbox" />
                            </div>
                        </div>
                )
            }
            </>}
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
    var all_tags = get_all_tags(ALL_SLUGS_CATEGORY)
    const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, page, all_tags )) || []
    
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination
        },
    }
  }

export async function getStaticPaths() {
    var all_tags = get_all_tags(ALL_SLUGS_CATEGORY)

    const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, all_tags)) || []
    const pagination = allPosts.meta.pagination
    const pageCount = pagination.pageCount
    const pageCountArr = new Array(pageCount).fill(' ');
    return {
        paths: pageCountArr && pageCountArr.map((pageNo, index) => {
            return `/toolbox/augmented-reality-tools/page/${index}`
        }) || [],
        fallback: true,
    }
}