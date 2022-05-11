import { useState } from 'react'
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Container from '@/components/container'
const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));

import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'
import { find_page_slug_from_menu, get_slugs_from_menu } from '@/lib/menus/lib/getAllTagsFromMenu'

import ALL_SLUGS_CATEGORY from '@/lib/menus/realityTools'

const PAGE_SIZE = 13;

const BREADCRUMBS = {
    pageTitle:'Miex Reality',
    links:[
        {name:'Home', slug:'/'},
        {name:'Toolbox', slug:'/toolbox/page/1'}
    ]
}

export default function ToolboxPage({allPosts = [], preview, pagination,tag}) {
    //pagination is like {"total":48,"pageSize":13,"page":1,"pageCount":4}
    const router = useRouter()

    const [selectedFilter, setSelectedFilter] = useState("")
    const onPageNumChange = (pageNo) => {
        router.push({
            pathname:`/toolbox/augmented-reality-tools/[tag]/page/${pageNo}`,
            query: {
                tag
            }
        })
      }

    return (
        <Layout 
        seo={{
        title: `${tag} – AR/VR design tools | Prototypr Toolbox | Page ${pagination?.page}`,
        description:
          "Find the best design tools for Augmented Reality, Virtual reality, Mixed Reality, and more.",
        //   image: "",
        canonical:`https://prototypr.io/toolbox/augmented-reality-tools/${tag}/page/${pagination?.page}`,
        url: `https://prototypr.io/toolbox/augmented-reality-tools/${tag}/page/${pagination?.page}`,
      }}
        activeNav={'toolbox'} preview={preview}>
            <Container>
            {
                    allPosts.length > 0 && 
                    (<div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
                    <div className="grid-cols-1 hidden lg:block">
                        <div className='w-full min-h-screen  flex flex-col'>
                        <Breadcrumbs 
                    urlRoot={'/toolbox/augmented-reality-tools'}
                    title={BREADCRUMBS.pageTitle}
                    links={BREADCRUMBS.links}
                    currentSlug={tag}
                    />
                    <FilterCategory 
                        urlRoot={'/toolbox/augmented-reality-tools'}
                        items={ALL_SLUGS_CATEGORY} 
                        key={'uxtools_item_'} 
                        slug={tag}/>
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
    const {pageNo, tag} = params;
    const foundSlug = find_page_slug_from_menu(ALL_SLUGS_CATEGORY, tag)

    const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, foundSlug.tags )) || []
    // console.log('page info**********' + JSON.stringify(allPosts.meta.pagination))
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination,tag
        },revalidate: 20,
    }
  }

export async function getStaticPaths() {
    let pageCountRes = 0;
    let pageCountArr = [];
    const all_slugs = get_slugs_from_menu(ALL_SLUGS_CATEGORY)
    //now just same as the .map
    for(var z = 0;z<all_slugs.length;z++){
        var itemTags =(all_slugs[z].tags)
        const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, itemTags)) || []
        const pagination = allPosts.meta.pagination
        const pageCount = pagination.pageCount
        let arr = new Array(pageCount).fill('');
        let newArr = arr.map((i,index) => {
            return `/toolbox/augmented-reality-tools/${all_slugs[z].key}/page/${index+1}`
        })
        pageCountArr = pageCountArr.concat(newArr)
    }

    // ALL_SLUGS.map(async (item, index)  => {
    //     const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, item.tags)) || []
    //     const pagination = allPosts.meta.pagination
    //     const pageCount = pagination.pageCount
    //     let arr = new Array(pageCount).fill('');
    //     let newArr = arr.map((i,index) => {
    //         return `toolbox/augmented-reality-tools/${item.key}/page/${index+1}`
    //     })
    //     pageCountArr = pageCountArr.concat(newArr)
    // })
    return {
        paths: pageCountArr || [],
        fallback: true,
    }
}