import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import PostTitle from "@/components/post-title";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";
import { ToolBoxDisplay } from "./ToolboxGrid";
import stc from "string-to-color";

const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));

const ToolboxIndexPage = ({
  title,
  description,
  pagination,
  urlRoot,
  breadcrumbs,
  allPosts,
  pageSize,
  filterCategories,
  currentSlug,
  paginationRoot,
  color,
}) => {
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push(`/${urlRoot}/page/${pageNo}`);
  };

  return (
    <>
      <div className="">
        <div
          style={{
            backgroundImage: `url(${"/static/images/proto-bg.svg"})`,
            backgroundColor: color ? color : stc(title),
          }}
          className={`border-b h-auto border-gray-900 border-opacity-10 -mt-6 pt-10 -mx-8 px-6 pb-9 overflow-hidden relative`}
        >
          <div className="max-w-[1440px] relative flex flex-col mx-auto md:px-6 text-sm">
            <div className="flex flex-col gap-4 w-auto py-20 px-4 md:px-0">
              {/* <div className="w-[100px] h-[100px] bg-white rounded-3xl shadow-md"></div> */}
              <h1 className="text-5xl text-white font-bold tracking-tighter leading-tight capitalize pt-10">
                {title}
              </h1>
              <div>
                <div className="relative w-auto  bg-white p-4 rounded-xl">
                  <Breadcrumbs
                    urlRoot={urlRoot}
                    title={title}
                    currentSlug={currentSlug}
                    links={breadcrumbs.links}
                    pageNo={pagination?.page}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            {allPosts.length > 0 && (
              <div className="w-full h-full grid grid-cols-12 gap-1">
                <Sidebar
                  paginationRoot={paginationRoot}
                  urlRoot={urlRoot}
                  filterCategories={filterCategories}
                  slug={currentSlug}
                />
                <div className="w-full px-3 md:px-8 lg:px-0 pt-8 mx-auto pb-20 gap-2 col-span-12 md:col-span-10 pb-10">
                  <div className="col-span-3">
                    <div className="md:p-10">
                      <ToolBoxDisplay posts={allPosts} type="toolbox" />
                    </div>
                    <NewPagination
                      total={pagination?.total}
                      pageSize={pageSize}
                      currentPage={pagination?.page}
                      onPageNumChange={(pageNum) => {
                        onPageNumChange(pageNum);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ToolboxIndexPage;

const Sidebar = ({ filterCategories, paginationRoot, urlRoot, slug }) => {
  return (
    <div className="hidden md:block relative col-span-2 max-w-[410px] border-r border-opacity-20">
      <div className="w-full min-h-screen pt-8 flex flex-col">
        <FilterCategory
          urlRoot={urlRoot}
          paginationRoot={paginationRoot}
          items={filterCategories}
          key={"uxtools_item_"}
          slug={slug}
        />
      </div>
    </div>
  );
};
