import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import PostTitle from "@/components/post-title";

import ToolsLayout from "@/components/v4/layout/toolbox/ToolsLayout";
import Footer from "../footer";

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
    {/* <div className="mt-2">
      <ToolsTagsNavRow active={'All'}/>
    </div> */}
     <Container maxWidth="max-w-[1320px] mt-3 mb-6" >
          <div className="bg-[#EAE9F5] relative bg-opacity-50 overflow-hidden p-6 border-gray-200 rounded-2xl">
            {/* <div className="z-20 relative"> */}
            <div className="w-full backdrop-blur-sm backdrop-opacity-20 w-full h-full">
            <Breadcrumbs
                    urlRoot={urlRoot}
                    title={title}
                    currentSlug={currentSlug}
                    links={breadcrumbs.links}
                    pageNo={pagination?.page}
                  />
                <div className="inline-flex my-4">
                  {/* <div className="p w-8 h-8 my-auto mr-3 rounded-full border-gray-300 bg-white"> */}
                    {/* <Tag className="my-auto mx-auto mr-2.5 my-auto" size={24}/> */}
                  {/* </div> */}
                  <h2 className="text-5xl my-auto font-bold text-gray-900 capitalize">{title}</h2>
                </div>
              </div>
          </div>
        </Container>
      
      <Container maxWidth="max-w-[1320px] flex grid grid-cols-12">
      <Sidebar
                  paginationRoot={paginationRoot}
                  urlRoot={urlRoot}
                  filterCategories={filterCategories}
                  slug={currentSlug}
                />
        <div className="w-full px-3 md:pr-0 md:pl-12 -mt-6 mx-auto pb-20 gap-2 col-span-12 md:col-span-10 pb-10">
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              {allPosts.length > 0 && (
                <>
                {pagination?.page==1?
                <>
                  {/* <TwoColumnCards posts={allPosts.slice(0,2)}/> */}
                  {/* <ToolsLayout posts={allPosts} columns={'lg:grid-cols-2'} type="toolbox" /> */}
                  <ToolsLayout posts={allPosts} columns={'lg:grid-cols-2'} type="toolbox" />
                </>
                  :
                  <ToolsLayout posts={allPosts} columns={'lg:grid-cols-2'} type="toolbox" />
                }

                <NewPagination
                        total={pagination?.total}
                        pageSize={pageSize}
                        currentPage={pagination?.page}
                        onPageNumChange={(pageNum) => {
                          onPageNumChange(pageNum);
                        }}
                      />

                </>
              )}
            </>
          )}
        </div>
      </Container>
      <Footer/>
    </>
  );
};

export default ToolboxIndexPage;

const Sidebar = ({ filterCategories, paginationRoot, urlRoot, slug }) => {
  return (
    <div className="hidden md:block relative col-span-2 max-w-[410px] border-r border-opacity-20">
      <div className="w-full min-h-screen flex flex-col">
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
