import Layout from "@/components/layoutForBlogPost";

import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";

import ALL_SLUGS_GROUPS from '@/lib/menus/allTools'
import { find_page_slug_from_menu, get_slugs_from_menu } from '@/lib/menus/lib/getAllTagsFromMenu'
import { useEffect } from "react";

const PAGE_SIZE = 12;

const BREADCRUMBS = {
    pageTitle:'Toolbox',
    links:[
      {name:'Home', slug:'/', svg:<svg className="w-4 h-4 inline my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z" fill="currentColor"/></svg>},
      {name:'Toolbox', slug:'/toolbox/page/1'}
    ]
}

export default function ToolboxPage({title,allPosts = [], preview, pagination,tag}) {


      useEffect(()=>{
        if(window.$crisp){
          window.$crisp.push(['do', 'chat:show']);
        }
      },[])

    return (
        <Layout 
        seo={{
        title: `${tag} – design tools | Prototypr Toolbox | Page ${pagination?.page}`,
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        canonical:`https://prototypr.io/toolbox/${tag}/page/${pagination?.page}`,
        url: `https://prototypr.io/toolbox/${tag}/page/${pagination?.page}`,
      }}
        activeNav={'toolbox'} preview={preview}>
            <ToolboxIndexPage 

        paginationRoot={`/toolbox`}
        filterCategories={ALL_SLUGS_GROUPS}
        urlRoot={`/toolbox`}
        title={title}
        currentSlug={tag}
        description="All your design tools in one place, updated weekly"
        pagination={pagination}
        pageSize={PAGE_SIZE} 
        allPosts={allPosts} 
        breadcrumbs={BREADCRUMBS}/>
        </Layout>
    )
}

export async function getStaticProps({ preview = null, params}) {
    const pageSize = PAGE_SIZE
    const {pageNo, slug} = params;
    // const foundSlug = ALL_SLUGS.find((SLUG, index) => {
    //     return slug === SLUG.key
    // })
    //assign slug to tag
    let tag = slug

    const foundSlug = find_page_slug_from_menu(ALL_SLUGS_GROUPS, tag)

    const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, foundSlug.tags )) || []
    // const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, ["whiteboard"] )) || []
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination,tag,
            title:foundSlug?.title?foundSlug.title:'Design Tools'

        },revalidate: 20,
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