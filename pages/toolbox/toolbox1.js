import Layout from "@/components/layoutForToolboxIndex";

import {
  getAllPostsForToolsSubcategoryPage,
  getPostsByPageForToolsSubcategoryPage,
} from "@/lib/api";
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";

import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";
import {
  find_page_slug_from_menu,
  get_slugs_from_menu,
} from "@/lib/menus/lib/getAllTagsFromMenu";
import { useEffect } from "react";

const ToolboxHomepage = ({
  title,
  allPosts = [],
  preview,
  pagination,
  tag,
}) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[600px]  bg-red-500">
        <div className="max-w-7xl mx-auto grid place-items-center bg-red-800 h-full">
          <h1 className="text-[52px] font-bold">
            Discover Tools, <br /> make life easier.
          </h1>
        </div>
      </div>
      <div className="w-full max-w-full py-5 h-auto flex flex-col gap-2 bg-green-500">
        <div className="grid grid-cols-5 gap-4">
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
          <div className="w-full h-[100px] bg-gray-400"></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ToolboxHomepage;

const PAGE_SIZE = 12;

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const { pageNo, slug } = params;
  //   const { pageNo, slug } = { pageNo: 1, slug: "toolbox" };

  // const foundSlug = ALL_SLUGS.find((SLUG, index) => {
  //     return slug === SLUG.key
  // })
  //assign slug to tag
  let tag = slug;

  const foundSlug = find_page_slug_from_menu(ALL_SLUGS_GROUPS, tag);

  const allPosts =
    (await getPostsByPageForToolsSubcategoryPage(
      preview,
      pageSize,
      pageNo,
      foundSlug.tags
    )) || [];
  // const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, ["whiteboard"] )) || []
  const pagination = allPosts.meta.pagination;
  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
      tag,
      title: foundSlug?.title ? foundSlug.title : "Design Tools",
    },
    revalidate: 20,
  };
}

export async function getStaticPaths() {
  let pageCountRes = 0;
  let pageCountArr = [];

  //create the ALL_SLUGS from ALL_SLUGS_GROUPS
  const all_slugs = get_slugs_from_menu(ALL_SLUGS_GROUPS);
  //now just same as the .map
  for (var z = 0; z < all_slugs.length; z++) {
    var itemTags = all_slugs[z].tags;
    const allPosts =
      (await getAllPostsForToolsSubcategoryPage(
        null,
        PAGE_SIZE,
        0,
        itemTags
      )) || [];
    const pagination = allPosts.meta.pagination;
    const pageCount = pagination.pageCount;
    let arr = new Array(pageCount).fill("");
    let newArr = arr.map((i, index) => {
      return `/toolbox/${all_slugs[z].key}/page/${index + 1}`;
    });
    pageCountArr = pageCountArr.concat(newArr);
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
  };
}
