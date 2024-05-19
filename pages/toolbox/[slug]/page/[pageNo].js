import Layout from "@/components/new-index/layoutForIndex";

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
import Footer from "@/components/footer";
import getSponsors from "@/lib/utils/getSponsors";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";

const PAGE_SIZE = 15;

const BREADCRUMBS = {
  pageTitle: "Toolbox",
  links: [
    {
      name: "Home",
      slug: "/",
      svg: (
        <svg
          className="w-4 h-4 inline -mt-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    { name: "Toolbox", slug: "/toolbox" },
  ],
};

export default function ToolboxPage({
  title,
  allPosts = [],
  preview,
  pagination,
  tag,
  sponsors,
  navSponsor,
}) {
  useEffect(() => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
    }
  }, []);

  return (
    <>
      <Layout
        sponsor={navSponsor}
        padding={false}
        maxWidth={"search-wide max-w-[1380px]"}
        seo={{
          title: `${tag} – design tools | Prototypr Toolbox | Page ${pagination?.page}`,
          description:
            "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
          //   image: "",
          canonical: `https://prototypr.io/toolbox/${tag}/page/${pagination?.page}`,
          url: `https://prototypr.io/toolbox/${tag}/page/${pagination?.page}`,
        }}
        activeNav={"toolbox"}
        preview={preview}
      >
        <ToolboxIndexPage
         sponsors={sponsors}
         navSponsor={navSponsor}
          paginationRoot={`/toolbox/${tag}`}
          filterCategories={ALL_SLUGS_GROUPS}
          urlRoot={`/toolbox`}
          title={title}
          currentSlug={tag}
          description="All your design tools in one place, updated weekly"
          pagination={pagination}
          pageSize={PAGE_SIZE}
          allPosts={allPosts}
          breadcrumbs={BREADCRUMBS}
        />
      </Layout>

      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const { pageNo, slug } = params;
  // const foundSlug = ALL_SLUGS.find((SLUG, index) => {
  //     return slug === SLUG.key
  // })
  //assign slug to tag
  let allPosts = [];
  const foundSlug = find_page_slug_from_menu(ALL_SLUGS_GROUPS, slug);
  let tagName = "";
  if (!foundSlug) {
    allPosts =
      (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, [
        slug,
      ])) || [];
    if (allPosts?.data?.length) {
      const tags = allPosts.data[0]?.attributes?.tags?.data;
      if (tags?.length) {
        for (var x = 0; x < tags.length; x++) {
          if (tags[x]?.attributes?.slug == slug) {
            tagName = tags[x]?.attributes?.name;
          }
        }
      }
    }
  } else {
    allPosts =
      (await getPostsByPageForToolsSubcategoryPage(
        preview,
        pageSize,
        pageNo,
        foundSlug.tags
      )) || [];
  }
  allPosts?.length &&
    allPosts.data?.map(post => {
      // add blurhash to allPosts images
      post.attributes.base64 = createB64WithFallback(
        post?.attributes?.featuredImage?.data?.attributes?.blurhash
      );
      post.attributes.logoBase64 = createB64WithFallback(
        post?.attributes?.logo?.data?.attributes?.blurhash
      );

      //this is the part that fails
      return `/toolbox/${post.attributes.slug}`;
    });

  const { navSponsor, sponsors } = await getSponsors();

  // const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, ["whiteboard"] )) || []
  const pagination = allPosts.meta.pagination;
  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
      tag: slug,
      title: foundSlug?.title
        ? foundSlug.title
        : tagName
          ? tagName
          : "Design Tools",
      sponsors: sponsors?.length ? sponsors : [],
      navSponsor,
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
    var itemTags = all_slugs[z]?.tags;
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
