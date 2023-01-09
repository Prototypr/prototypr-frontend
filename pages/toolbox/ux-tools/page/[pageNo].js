
import Layout from "@/components/layoutForToolboxIndex";


import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";


import get_all_tags from '@/lib/menus/lib/getAllTagsFromMenu'
import ALL_SLUGS_GROUPS from "@/lib/menus/uxTools";

const PAGE_SIZE = 20;

const BREADCRUMBS = {
    pageTitle:'UX Tools',
    links:[
      {name:'Home', slug:'/', svg:<svg className="w-4 h-4 inline my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z" fill="currentColor"/></svg>},
      {name:'Toolbox', slug:'/toolbox'},
        // {name:'UX Tools', slug:'/toolbox/ux-tools/page/1'}
    ]
  }


export default function ToolboxPage({ allPosts = [], preview, pagination }) {


  return (
    <Layout 
    seo={{
        title: `Prototypr Toolbox: UX Tools | ${pagination?.page}`,
        description:
          "The best User Experience tools: Research, Heatmaps, Analytics, Collaboration and more.",
        //   image: "",
        canonical:`https://prototypr.io/toolbox/ux-tools/page/${pagination?.page}`,
        url: `https://prototypr.io/toolbox/ux-tools/page/${pagination?.page}`,
      }}
    activeNav={"toolbox"} preview={preview}>
      <ToolboxIndexPage 
      paginationRoot={`/toolbox/ux-tools`}
        filterCategories={ALL_SLUGS_GROUPS}
        urlRoot={`/toolbox/ux-tools`}
        title="All UX Tools"
        description="Everything user research, testing, analysis and more."
        pagination={pagination}
        pageSize={PAGE_SIZE} 
        allPosts={allPosts} 
        breadcrumbs={BREADCRUMBS}/>
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const page = params.pageNo;

  var all_tags = get_all_tags(ALL_SLUGS_GROUPS)
  const allPosts =
    (await getPostsByPageForToolsSubcategoryPage(
      preview,
      pageSize,
      page,
      // ALL_SLUGS
      all_tags
    )) || [];

  const pagination = allPosts.meta.pagination;
  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
    },revalidate: 20,
  };
}

export async function getStaticPaths() {

  var all_tags = get_all_tags(ALL_SLUGS_GROUPS)
  const allPosts =
    (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, all_tags)) ||
    [];
  const pagination = allPosts.meta.pagination;
  const pageCount = pagination.pageCount;
  const pageCountArr = new Array(pageCount).fill(" ");
  return {
    paths:
      (pageCountArr &&
        pageCountArr.map((pageNo, index) => {
          return `/toolbox/ux-tools/page/${index}`;
        })) ||
      [],
    fallback: true,
  };
}