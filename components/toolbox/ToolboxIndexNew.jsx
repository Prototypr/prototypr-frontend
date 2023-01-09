import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import PostTitle from "@/components/post-title";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";
import ToolsLayout from "@/components/v4/layout/toolbox/ToolsLayout";
import stc from "string-to-color";
import { Tag } from "phosphor-react";
import TwoColumnCards from "../v4/layout/TwoColumnCards";
import ToolsTagsNavRow from "../v4/section/ToolsTagsNavRow";
import Footer from "../footer";

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
     <Container maxWidth="max-w-[1320px]" >
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
      <ToolsTagsNavRow active={'All'}/>
      <Container maxWidth="max-w-[1320px]">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            {allPosts.length > 0 && (
              <>
              {pagination?.page==1?
              <>
                <TwoColumnCards posts={allPosts.slice(0,2)}/>
                <ToolsLayout posts={allPosts} type="toolbox" />
              </>
                :
                 <ToolsLayout posts={allPosts} type="toolbox" />
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
      </Container>
      <Footer/>
    </>
  );
};

export default ToolboxIndexPage;