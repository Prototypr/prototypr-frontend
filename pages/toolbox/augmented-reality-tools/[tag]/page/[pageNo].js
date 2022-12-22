import Layout from "@/components/layoutForToolboxIndex";
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";


import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'
import { find_page_slug_from_menu, get_slugs_from_menu } from '@/lib/menus/lib/getAllTagsFromMenu'

import ALL_SLUGS_CATEGORY from '@/lib/menus/realityTools'

const PAGE_SIZE = 20;

const BREADCRUMBS = {
    pageTitle:'Miex Reality',
    links:[
        {name:'Home', slug:'/', svg:<svg className="w-4 h-4 inline my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z" fill="currentColor"/></svg>},
        {name:'Toolbox', slug:'/toolbox/page/1'},
        {name:'AR/VR', slug:'/augmented-reality-tools/page/1'},
    ]
}

export default function ToolboxPage({title,allPosts = [], preview, pagination,tag}) {

    return (
        <Layout 
       maxWidth={"search-wide max-w-[1380px]"}
        seo={{
        title: `${tag} – AR/VR design tools | Prototypr Toolbox | Page ${pagination?.page}`,
        description:
          "Find the best design tools for Augmented Reality, Virtual reality, Mixed Reality, and more.",
        //   image: "",
        canonical:`https://prototypr.io/toolbox/augmented-reality-tools/${tag}/page/${pagination?.page}`,
        url: `https://prototypr.io/toolbox/augmented-reality-tools/${tag}/page/${pagination?.page}`,
      }}
        activeNav={'toolbox'} preview={preview}>
           <ToolboxIndexPage 
           paginationRoot={`/toolbox/augmented-reality-tools`}
        filterCategories={ALL_SLUGS_CATEGORY}
        urlRoot={`/toolbox/augmented-reality-tools`}
        title={title}
        description="Find the best design tools for Augmented Reality, Virtual reality, Mixed Reality, and more."
        pagination={pagination}
        pageSize={PAGE_SIZE} 
        allPosts={allPosts} 
        breadcrumbs={BREADCRUMBS}
        currentSlug={tag}
        />
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
            allPosts: allPosts.data, preview, pagination,tag,
            title:foundSlug?.title?foundSlug.title:'Design Tools'
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