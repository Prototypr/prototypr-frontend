import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import Layout from "@/components/layout";
import Layout from "@/components/layoutForBlogPost";

import Container from "@/components/container";
const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));
import PostTitle from '@/components/post-title'

import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from "@/lib/api";

import ALL_SLUGS_GROUPS from '@/lib/menus/allTools'
import Link from "next/link";

const PAGE_SIZE = 12;


const BREADCRUMBS = {
  pageTitle:'Toolbox',
  links:[
      {name:'Home', slug:'/'},
  ]
}

export default function ToolboxPage({
  allPosts = [],
  preview,
  pagination = {},
}) {
  //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push(`/toolbox/page/${pageNo}`);
  };

  return (
    <Layout
    seo={{
        title: `Prototypr Toolbox - new design, UX and coding tools | Page ${pagination?.page}`,
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        canonical:`https://prototypr.io/toolbox/${pagination?.page}`,
        url: `https://prototypr.io/toolbox/${pagination?.page}`,
      }}
     activeNav={"toolbox"} preview={preview}>
      <Container>
      {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) :
        <>        
        {allPosts.length > 0 && (
          <div className="w-full h-full grid grid-cols-12 gap-1  ">
            <Sidebar/>
            <div className="xl:max-w-[56rem] md:max-w-[48rem] w-full px-3 md:px-8 lg:px-0 mx-auto pt-28 pb-20 gap-2 col-span-12 md:col-span-10 py-10">
                <div className="pt-5 text-md text-gray-700 pb-8">
                    <Breadcrumbs 
                    urlRoot={''}
                    title={'All Tools'}
                    currentSlug={`toolbox`}
                    links={BREADCRUMBS.links}
                    />
                  </div>
              <div className="col-span-3">
                <MoreStories posts={allPosts} type="toolbox" />
                <NewPagination
                  total={pagination?.total}
                  pageSize={PAGE_SIZE}
                  currentPage={pagination?.page}
                  onPageNumChange={(pageNum) => {
                    onPageNumChange(pageNum);
                  }}
                />
            </div>
            </div>
          </div>
        )}
        </>}

      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params,locale }) {
  let sort = ["date:desc"]
  if(locale === 'es-ES'){
    sort = ["esES:asc","date:desc"]
  }
  const pageSize = PAGE_SIZE;
  const page = params.pageNo;
  const allPosts =
    (await getPostsByPageForToolsPage(preview, pageSize, page, sort)) || [];
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
  const allPosts = (await getAllPostsForToolsPage(null, PAGE_SIZE, 0, "tool")) || [];
  const pagination = allPosts.meta.pagination;
  const pageCount = pagination.pageCount;
  const pageCountArr = new Array(pageCount).fill(" ");
  return {
    paths:
      (pageCountArr &&
        pageCountArr.map((pageNo, index) => {
          return `/toolbox/page/${index}`;
        })) ||
      [],
    fallback: true,
  };
}


const Sidebar = () =>{
  return(
    <div className="hidden md:block relative col-span-2 max-w-[410px] border-r border-opacity-20">
              <div className="w-full min-h-screen pt-32 flex flex-col">
             
              <div className="pt-24">
                <FilterCategory
                urlRoot={'/toolbox'}
                items={ALL_SLUGS_GROUPS} 
                key={'uxtools_item_'} 
                slug={'/toolbox'}/>
              </div>
              </div>
            </div>
  )
}