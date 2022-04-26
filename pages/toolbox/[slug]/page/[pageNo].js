import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Container from '@/components/container'
const MoreStories = dynamic(() => import("@/components/more-stories"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));

const NewPagination = dynamic(() => import("@/components/pagination"));
import PostTitle from '@/components/post-title'

import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'

import ALL_SLUGS_GROUPS from '@/lib/menus/allTools'
import { find_page_slug_from_menu, get_slugs_from_menu } from '@/lib/menus/lib/getAllTagsFromMenu'

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
            pathname:`/toolbox/[slug]/page/${pageNo}`,
            query: {
                slug
            }
        })
      }

    return (
        <Layout 
        seo={{
        title: `${slug} – design tools | Prototypr Toolbox | Page ${pagination?.page}`,
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        canonical:`https://prototypr.io/toolbox/${slug}/page/${pagination?.page}`,
        url: `https://prototypr.io/toolbox/${slug}/page/${pagination?.page}`,
      }}
        activeNav={'toolbox'} preview={preview}>
            <Container>
            {router.isFallback ? (
                 <PostTitle>Loading…</PostTitle>
                ) :
                <>  
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
    const {pageNo, slug} = params;
    // const foundSlug = ALL_SLUGS.find((SLUG, index) => {
    //     return slug === SLUG.key
    // })
    const foundSlug = find_page_slug_from_menu(ALL_SLUGS_GROUPS, slug)

    const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, foundSlug.tags )) || []
    // const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, ["whiteboard"] )) || []
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination,slug
        },
    }
  }

export async function getStaticPaths() {
    let pageCountRes = 0;
    let pageCountArr = [];

    //create the ALL_SLUGS from ALL_SLUGS_GROUPS
    const all_slugs = get_slugs_from_menu(ALL_SLUGS_GROUPS)
    //now just same as the .map
    for(var z = 0;z<all_slugs.length;z++){
        var itemTags =(all_slugs[z].tags)
        const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, itemTags)) || []
        const pagination = allPosts.meta.pagination
        const pageCount = pagination.pageCount
        let arr = new Array(pageCount).fill('');
        let newArr = arr.map((i,index) => {
            return `/toolbox/${all_slugs[z].key}/page/${index+1}`
        })
        pageCountArr = pageCountArr.concat(newArr)
    }

    /**
     * this was not doing anything, because .map doesn't wait
     * - you would have to use a promise?
     */
    // ALL_SLUGS.map(async (item, index)  => {
    //     console.log(item.tags)
    //     const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, item.tags)) || []
    //     // const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0,["whiteboard"])) || []
    //     const pagination = allPosts.meta.pagination
    //     const pageCount = pagination.pageCount
    //     let arr = new Array(pageCount).fill('');
    //     let newArr = arr.map((i,index) => {
    //         return `toolbox/${item.key}/page/${index+1}`
    //     })
    //     pageCountArr = pageCountArr.concat(newArr)
    // })

    // console.log(pageCountArr)
    return {
        paths: pageCountArr || [],
        fallback: true,
    }
}