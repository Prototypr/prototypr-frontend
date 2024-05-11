import Layout from "@/components/new-index/layoutForIndex";

import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from "@/lib/api";
import ToolboxIndexPage from "@/components/toolbox/ToolboxIndexPage";
import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";
import Footer from "@/components/footer";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";

const PAGE_SIZE = 16;

const BREADCRUMBS = {
  pageTitle: "Toolbox",
  links: [
    {
      name: "Home",
      slug: "/",
      svg: (
        <svg
          className="w-4 h-4 inline my-auto -mt-1"
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
    <>
      <Layout
        padding={false}
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
          title="All tools"
          description="All your design tools in one place, updated weekly"
          pagination={pagination}
          pageSize={PAGE_SIZE}
          currentSlug={"toolbox"}
          allPosts={allPosts}
          breadcrumbs={BREADCRUMBS}
          color={"#3574F0"}
        />
      </Layout>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null, params, locale }) {
  let sort = ["date:desc"];
  if (locale === "es-ES") {
    sort = ["esES:asc", "date:desc"];
  }
  const pageSize = PAGE_SIZE;
  const page = params.pageNo;
  let allPosts =
    (await getPostsByPageForToolsPage(preview, pageSize, page, sort)) || [];

  // add blurhash to allPosts images
  for (let post of allPosts.data) {
    post.attributes.base64 = createB64WithFallback(
      post.attributes?.featuredImage?.data?.attributes?.blurhash
    );
    post.attributes.logoBase64 = createB64WithFallback(
      post.attributes?.logo?.data?.attributes?.blurhash
    );
  }

  const pagination = allPosts.meta.pagination;
  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  let allPosts =
    (await getAllPostsForToolsPage(null, PAGE_SIZE, 0, "tool")) || [];

  // add blurhash to allPosts images
  for (let post of allPosts.data) {
    post.attributes.base64 = createB64WithFallback(
      post.attributes?.featuredImage?.data?.attributes?.blurhash
    );
    post.attributes.logoBase64 = createB64WithFallback(
      post.attributes?.logo?.data?.attributes?.blurhash
    );
  }

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
