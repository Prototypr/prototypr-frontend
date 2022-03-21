import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import NewPagination from "@/components/pagination";
import FilterCategory from "@/components/FilterCategory";
import Breadcrumbs from '@/components/Breadcrumbs'
// import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from '@/lib/api'
import {
  getAllPostsForToolsSubcategoryPage,
  getPostsByPageForToolsSubcategoryPage,
} from "@/lib/api";

import { find_page_slug_from_menu, get_slugs_from_menu } from '@/lib/menus/lib/getAllTagsFromMenu'


const PAGE_SIZE = 12;
import ALL_SLUGS_CATEGORY from "@/lib/menus/prototyping";

const BREADCRUMBS = {
    pageTitle:'Prototyping',
    links:[
        {name:'Home', slug:'/'},
        {name:'Prototyping', slug:'/prototyping/page/1'}
    ]
}

export default function ToolboxPage({
  allPosts = [],
  preview,
  pagination,
  slug,
}) {
  //pagination is like {"total":48,"pageSize":13,"page":1,"pageCount":4}
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("");
  const onPageNumChange = pageNo => {
    router.push({
      pathname: `/prototyping/[slug]/page/${pageNo}`,
      query: {
        slug,
      },
    });
  };

  return (
    <Layout activeNav={"toolbox"} preview={preview}>
      <Container>
        {allPosts.length > 0 && (
          <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
            <div className="grid-cols-1 hidden lg:block">
              <div className="w-full min-h-screen  flex flex-col">
                <Breadcrumbs 
                    urlRoot={'/prototyping'}
                    title={BREADCRUMBS.pageTitle}
                    links={BREADCRUMBS.links}
                    currentSlug={slug}
                    />
                <FilterCategory 
                    urlRoot={'/prototyping'}
                    items={ALL_SLUGS_CATEGORY} 
                    key={'prototyping_item_'} 
                    slug={slug}/>
              </div>
            </div>
            <div className="col-span-3">
              <MoreStories posts={allPosts} type="toolbox" />
            </div>
          </div>
        )}

        <NewPagination
          total={pagination?.total}
          pageSize={PAGE_SIZE}
          currentPage={pagination?.page}
          onPageNumChange={pageNum => {
            onPageNumChange(pageNum);
          }}
        />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const { pageNo, slug } = params;

  const foundSlug = find_page_slug_from_menu(ALL_SLUGS_CATEGORY, slug)

  const allPosts =
    (await getPostsByPageForToolsSubcategoryPage(
      preview,
      pageSize,
      pageNo,
      foundSlug.tags
    )) || [];
  // const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, ["whiteboard"] )) || []
  // console.log('page info**********' + JSON.stringify(allPosts.meta.pagination))
  const pagination = allPosts.meta.pagination;
  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
      slug,
    },
  };
}

export async function getStaticPaths() {
  let pageCountRes = 0;
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
  // ALL_SLUGS_CATEGORY.map(async (item, index) => {
  //   const allPosts =
  //     (await getAllPostsForToolsSubcategoryPage(
  //       null,
  //       PAGE_SIZE,
  //       0,
  //       item.tags
  //     )) || [];
  //   // const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0,["whiteboard"])) || []
  //   const pagination = allPosts.meta.pagination;
  //   const pageCount = pagination.pageCount;
  //   let arr = new Array(pageCount).fill("");
  //   let newArr = arr.map((i, index) => {
  //     return `prototyping/${item.key}/page/${index + 1}`;
  //   });
  //   pageCountArr = pageCountArr.concat(newArr);
  // });
  return {
    paths: pageCountArr || [],
    fallback: true,
  };
}
