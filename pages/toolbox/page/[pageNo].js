import Layout from "@/components/layoutForToolboxIndex";

import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from "@/lib/api";
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";
import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";

const PAGE_SIZE = 20;

const BREADCRUMBS = {
  pageTitle: "Toolbox",
  links: [
    {
      name: "Home",
      slug: "/",
      svg: (
        <svg
          className="w-4 h-4 inline my-auto"
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
  ],
};

export default function ToolboxPage({
  allPosts = [],
  preview,
  pagination = {},
}) {
  //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}

  return (
    <Layout
      maxWidth={"max-w-[1400px] search-wide"}
      seo={{
        title: `Prototypr Toolbox - new design, UX and coding tools | Page ${pagination?.page}`,
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        canonical: `https://prototypr.io/toolbox/${pagination?.page}`,
        url: `https://prototypr.io/toolbox/${pagination?.page}`,
      }}
      activeNav={"toolbox"}
    >
      <ToolboxIndexPage
        filterCategories={ALL_SLUGS_GROUPS}
        urlRoot={`/toolbox`}
        paginationRoot={`/toolbox`}
        title="Weekly Curated Design Tools"
        description="All your design tools in one place, updated weekly"
        pagination={pagination}
        pageSize={PAGE_SIZE}
        currentSlug={"toolbox"}
        allPosts={allPosts}
        breadcrumbs={BREADCRUMBS}
      />
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params, locale }) {
  let sort = ["date:desc"];
  if (locale === "es-ES") {
    sort = ["esES:asc", "date:desc"];
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
    revalidate: 20,
  };
}

export async function getStaticPaths() {
  const allPosts =
    (await getAllPostsForToolsPage(null, PAGE_SIZE, 0, "tool")) || [];

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
