import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Container from "@/components/container";
const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));
import PostTitle from '@/components/post-title'

import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from "@/lib/api";

import ALL_SLUGS_GROUPS from '@/lib/menus/allTools'

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
        title: `Prototypr Toolbox - new design, UX and coding tools | Page ${pageNo}`,
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        canonical:`https://prototypr.io/toolbox/${pageNo}`,
        url: `https://prototypr.io/toolbox/${pageNo}`,
      }}
     activeNav={"toolbox"} preview={preview}>
      <Container>
      {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) :
        <>        
        {allPosts.length > 0 && (
          <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
            <div className="grid-cols-1 hidden lg:block">
              <div className="w-full min-h-screen  flex flex-col">
              <Breadcrumbs 
                    urlRoot={'/toolbox'}
                    title={BREADCRUMBS.pageTitle}
                    links={BREADCRUMBS.links}
                    />
              <FilterCategory
               urlRoot={'/toolbox'}
               items={ALL_SLUGS_GROUPS} 
               key={'uxtools_item_'} 
               slug={'/toolbox'}/>

              </div>
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
    },
  };
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsForToolsPage(null, PAGE_SIZE, 0)) || [];
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
