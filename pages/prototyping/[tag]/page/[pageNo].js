import Layout from "@/components/layoutForBlogPost";
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";

import {
  getAllPostsForToolsSubcategoryPage,
  getPostsByPageForToolsSubcategoryPage,
} from "@/lib/api";


import { find_page_slug_from_menu, get_slugs_from_menu } from '@/lib/menus/lib/getAllTagsFromMenu'

const PAGE_SIZE = 20;
import ALL_SLUGS_CATEGORY from "@/lib/menus/prototyping";

const BREADCRUMBS = {
    pageTitle:'Prototyping',
    links:[
        {name:'Home', slug:'/', svg:<svg className="w-4 h-4 inline my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z" fill="currentColor"/></svg>},
        {name:'Toolbox', slug:'/toolbox/page/1'},
        {name:'Prototyping', slug:'/prototyping/page/1'}
    ]
}

export default function ToolboxPage({
  allPosts = [],
  preview,
  pagination,
  tag,
  title
}) {
  //pagination is like {"total":48,"pageSize":13,"page":1,"pageCount":4}

  return (
    <Layout 
    seo={{
        title: "Prototypr Prototyping Toolbox.",
        description:
          "Find tools like Adobe XD, Sketch, Figma, Marvel, and InVision.",
        //   image: "",
        canonical: `https://prototypr.io/prototyping/${tag}/page/${pagination?.page}`,
        url: `https://prototypr.io/prototyping/${tag}/page/${pagination?.page}`,
      }}
    activeNav={"toolbox"} preview={preview}>
      
      <ToolboxIndexPage 
        filterCategories={ALL_SLUGS_CATEGORY}
        urlRoot={`/prototyping`}
        title={title}
        description="All the tools for prototyping apps and web products."
        pagination={pagination}
        pageSize={PAGE_SIZE} 
        allPosts={allPosts} 
        breadcrumbs={BREADCRUMBS}
        currentSlug={tag}
        />
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params, locale }) {
  let sort = ["date:desc"]
  if(locale === 'es-ES'){
    sort = ["esES:asc","date:desc"]
  }
  const pageSize = PAGE_SIZE;
  const { pageNo, tag } = params;

  const foundSlug = find_page_slug_from_menu(ALL_SLUGS_CATEGORY, tag)

  const allPosts =
    (await getPostsByPageForToolsSubcategoryPage(
      preview,
      pageSize,
      pageNo,
      foundSlug.tags,
      sort
    )) || [];
  const pagination = allPosts.meta.pagination;
  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
      tag,
      title:foundSlug?.title?foundSlug.title:'Design Tools'
    },revalidate: 20,
  };
}

export async function getStaticPaths() {
  let pageCountArr = [];
  //create the ALL_SLUGS from ALL_SLUGS_GROUPS
  const all_slugs = get_slugs_from_menu(ALL_SLUGS_CATEGORY)
  //now just same as the .map
  for(var z = 0;z<all_slugs.length;z++){
    var itemTags =(all_slugs[z].tags)
    const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, itemTags)) || []
    const pagination = allPosts.meta.pagination
    const pageCount = pagination.pageCount
    let arr = new Array(pageCount).fill('');
    let newArr = arr.map((i,index) => {
        return `/prototyping/${all_slugs[z].key}/page/${index+1}`
    })
    pageCountArr = pageCountArr.concat(newArr)
  }
  return {
    paths: pageCountArr || [],
    fallback: true,
  };
}
