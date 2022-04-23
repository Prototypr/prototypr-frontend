import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
const MoreStories = dynamic(() => import("@/components/more-stories"));

import Layout from '@/components/layout'
import Container from '@/components/container'
const NewPagination = dynamic(() => import("@/components/pagination"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));

import { getPostsByPageForToolsSubcategoryPage } from '@/lib/api'

import ALL_SLUGS_GROUPS from '@/lib/menus/allTools'

const PAGE_SIZE = 12;

const BREADCRUMBS = {
    pageTitle:'Toolbox',
    links:[
        {name:'Home', slug:'/'},
        {name:'Toolbox', slug:'/toolbox/page/1'}
    ]
}

export default function ToolboxPage({allPosts = [], preview, pagination,slug}) {
    //pagination is like {"total":48,"pageSize":13,"page":1,"pageCount":4}
    const router = useRouter()

    const onPageNumChange = (pageNo) => {
        router.push({
            pathname:`/toolbox/page/${pageNo}`
        })
      }

    return (
        <Layout activeNav={'toolbox'} preview={preview}>
            <Container>
            {
                allPosts.length > 0 && 
                    (<div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
                    <div className="grid-cols-1 hidden lg:block">
                    <div className="w-full min-h-screen  flex flex-col">
                   
                    <Breadcrumbs 
                    urlRoot={'/toolbox'}
                    title={BREADCRUMBS.pageTitle}
                    links={BREADCRUMBS.links}
                    currentSlug={slug}
                    />
                    <FilterCategory 
                        urlRoot={'/toolbox'}
                        items={ALL_SLUGS_GROUPS} 
                        key={'uxtools_item_'} 
                        slug={slug}/>
              </div>
                       
                    </div>
                    <div className="col-span-3">
                        <MoreStories posts={allPosts} type="toolbox" />
                    </div>
                </div>)
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

    const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize )) || []
    // const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, ["whiteboard"] )) || []
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination
        },
    }
  }