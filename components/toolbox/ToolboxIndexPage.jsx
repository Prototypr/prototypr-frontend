import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import PostTitle from "@/components/post-title";

// import Image from "next/image";
// import Link from "next/link";
// import gumletLoader from "@/components/new-index/gumletLoader";
// import ToolsLayout from "@/components/v4/layout/toolbox/ToolsLayout";
// import stc from "string-to-color";
// import { Tag } from "phosphor-react";
// import TwoColumnCards from "../v4/layout/TwoColumnCards";
// import ToolsTagsNavRow from "../v4/section/ToolsTagsNavRow";
// import ToolCard from "../v4/card/ToolCard";
import NewsletterSection from "../v4/section/NewsletterSection";
import useUser from "@/lib/iron-session/useUser";
import ToolImageCard from "../v4/card/ToolImageCard";
// import ToolBoxHero from "./toolboxHero";
import ToolBoxHeroWithSignup from "./ToolboxHeroWithEmailSignup";
const StickyFooterCTA = dynamic(() => import("@/components/StickyFooterCTA"), {
  ssr: false,
});

// const MoreStories = dynamic(() => import("@/components/more-stories"));
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
  const { user } = useUser({
    redirectIfFound: false,
  });

  const onPageNumChange = (pageNo) => {
    router.push(`/${paginationRoot}/page/${pageNo}`);
  };

  return (
    <>
      {/* <div className="mt-2">
      <ToolsTagsNavRow active={'All'}/>
    </div> */}
    
     {(pagination?.page == 1 && title=='All tools') ?<ToolBoxHeroWithSignup user={user} />:
     <Container maxWidth="relative mb-6 px-0" padding={false}>
        <div
          style={{
            // backgroundColor: stc(`${title}`),
            // backgroundImage: `url(${"/static/images/espi1400.png"})`,
          }}
          className="relative bg-white shadow-sm rounded-b-[3.4rem] -mt-[96px] pt-[86px] md:pt-[96px] pb-20 overflow-hidden px-1 xs:px-3 sm:px-6"
        >
          <div className="relative max-w-[1320px] mx-auto w-full h-full px-3 z-10">
            <Breadcrumbs
              urlRoot={urlRoot}
              title={title}
              currentSlug={currentSlug}
              links={breadcrumbs.links}
              pageNo={pagination?.page}
            />
            <div className="inline-flex my-8">
              <h2 className="max-w-[50rem] text-black/90 text-4xl md:text-5xl font-semibold tracking-tight lg:leading-tight md:leading-tight capitalize drop-shadow-sm ">
                {title}
              </h2>
            </div>
          </div>
          {/* <div className="bg-black/10 opacity-50 w-full h-full backdrop-opacity-20 left-0 top-0 absolute"/> */}

        </div>
          {/* <img src='/static/images/espi1400.png' className="absolute w-full h-full object-cover top-0 left-0"/> */}
        {/* <img src='/static/images/toolbox-grid.svg' className="absolute w-full h-full object-cover top-0 left-0"/> */}
        {/* <img src='/static/images/toolbox/white-grid.svg' className="absolute w-full h-full object-cover top-0 left-0"/> */}
        {/* <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-blue-300/10 to-blue-100/10 "/> */}
        <img src='/static/images/toolbox/squares.svg' className="rounded-b-[3.4rem] opacity absolute w-full h-full object-cover top-0 left-0"/>
      </Container>
     }
{/* {title} */}


      <Container padding={false} maxWidth="max-w-[1320px] px-6 mx-auto xl:px-3 grid grid-cols-12">

      <Sidebar
          title={title}
          paginationRoot={paginationRoot}
          urlRoot={urlRoot}
          filterCategories={filterCategories}
          slug={currentSlug}
        />
        <div className={`w-full px-0 ${(title=='All tools' && pagination?.page==1)?'':'-mt-28 lg:-mt-20'} pl-0 md:pl-8 mx-auto pb-20 gap-2 col-span-12 md:col-span-10 pb-10`}>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              {allPosts.length > 0 && (
                <>
                
                <ToolImageCard
                  posts={allPosts}
                  columns={"lg:grid-cols-4"}
                  type="toolbox"
                />

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
              <NewsletterSection
                title={"Get a weekly list of the best tools"}
                padding={false}
              />
            </>
          )}
        </div>
      </Container>
      {/* <div className="grid-cols-12 grid">
        <div className="hidden md:block col-span-2 max-w-[410px]"></div>
          <div className="col-span-12 md:col-span-10">
            {!user?.isLoggedIn && <StickyFooterCTA title="Get the latest tools, weekly"
          description="Collect tools, get published, and earn rewards."
          />}
          </div>
      </div> */}
        {!user?.isLoggedIn && <StickyFooterCTA title="Get the latest tools, weekly"
      description="Join today to make posts and grow with us."
      />}
    </>
  );
};

export default ToolboxIndexPage;

const Sidebar = ({ filterCategories, paginationRoot, urlRoot, slug, title }) => {
  return (
    // <div className="hidden md:block h-[fit-content] relative col-span-2 bg-white shadow-md rounded-3xl p-6">
    <div className={`${title!=='All tools'?'mt-6':'' } hidden md:block h-[fit-content] relative col-span-2 rounded-3xl`}>
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
