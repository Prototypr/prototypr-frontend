import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import NewPagination from "@/components/pagination";
import FilterCategory from "@/components/FilterCategory";
import Breadcrumbs from '@/components/Breadcrumbs'

import {
  getAllPostsForToolsSubcategoryPage,
  getPostsByPageForToolsSubcategoryPage,
} from "@/lib/api";

import ALL_SLUGS_GROUPS from "@/lib/menus/uxTools";

const PAGE_SIZE = 12;
const ALL_SLUGS = [
  "whiteboard",
  "onboarding",
  "testing",
  "feedback",
  "moodboards",
  "mindmapping",
  "persona",
  "user-flow",
  "journey-map",
  "onboarding",
  "storymapping",
  "recruiting",
  "transcription",
  "survey",
  "analytics",
  "annotate",
];

const BREADCRUMBS = {
  pageTitle:'UX Tools',
  links:[
      {name:'Home', slug:'/'},
      {name:'Toolbox', slug:'/toolbox/page/1'},
      // {name:'UX Tools', slug:'/toolbox/ux-tools/page/1'}
  ]
}


export default function ToolboxPage({ allPosts = [], preview, pagination }) {
  //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
  const [selectedFilter, setSelectedFilter] = useState("");
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push(`/toolbox/ux-tools/page/${pageNo}`);
  };

  return (
    <Layout activeNav={"toolbox"} preview={preview}>
      <Container>
        {allPosts.length > 0 && (
          <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
            <div className="grid-cols-1 hidden lg:block">
              <div className="w-full min-h-screen  flex flex-col">
              <Breadcrumbs 
                urlRoot={'/toolbox/ux-tools'}
                title={BREADCRUMBS.pageTitle}
                links={BREADCRUMBS.links}
                />
              <FilterCategory
                urlRoot={'/toolbox/ux-tools'}
                items={ALL_SLUGS_GROUPS} 
                key={'uxtools_item_'} 
                // slug={slug}
                />
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
          onPageNumChange={(pageNum) => {
            onPageNumChange(pageNum);
          }}
        />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const page = params.pageNo;
  const allPosts =
    (await getPostsByPageForToolsSubcategoryPage(
      preview,
      pageSize,
      page,
      ALL_SLUGS
    )) || [];

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
  const allPosts =
    (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, ALL_SLUGS)) ||
    [];
  const pagination = allPosts.meta.pagination;
  const pageCount = pagination.pageCount;
  const pageCountArr = new Array(pageCount).fill(" ");
  return {
    paths:
      (pageCountArr &&
        pageCountArr.map((pageNo) => {
          return `/toolbox/ux-tools/page/${pageNo}`;
        })) ||
      [],
    fallback: true,
  };
}
