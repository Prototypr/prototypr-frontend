import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import PostTitle from '@/components/post-title'

const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));



const ToolboxIndexPage = ({title, description,pagination,urlRoot, breadcrumbs, allPosts, pageSize, filterCategories, currentSlug, paginationRoot}) =>{

    const router = useRouter();

    const onPageNumChange = (pageNo) => {
      router.push(`/${urlRoot}/page/${pageNo}`);
    };

    return(
      <>
       <div className="">
          
          {/* <div className="my-4 inline-block text-sm text-gray-800 ">
                     
                    </div> */}
            <div className="glassmorphism border-b border-gray-900 border-opacity-10 pt-32 relative -mx-8 px-6 pb-9 overflow-hidden relative">
                 <div className="max-w-[1440px] relative flex flex-col mx-auto md:px-6 text-sm">
                  <div className="relative md:absolute pl-8 mb-6 md:mb-0 md:mt-0.5 left-0">
                    <Breadcrumbs 
                          urlRoot={urlRoot}
                          title={title}
                          currentSlug={currentSlug}
                          links={breadcrumbs.links}
                          pageNo={pagination?.page}
                          />
                  </div>
                  <h1 className="text-xl px-8 md:px-0 pb-3 mt-1 md:pb-0 md:mx-auto text-left md:text-center font-bold tracking-tighter leading-tight capitalize">
                    {title}
                  </h1>
                  {/* <div className="absolute pr-12 mt-1 right-0">
                    Follow Topic
                  </div> */}
                 </div>
                <div className="-z-10 opacity-10 from-gray-50 to-blue-400 bg-gradient-to-bl absolute w-full h-full top-0 left-0"/>
                  {/* <p className="text-base my-auto text-left">{description}</p> */}
                {/* <img src="/static/images/smudge.jpeg" alt="" className="opacity-10 -z-10 absolute -top-[6rem] ml-[9rem]  w-full w-[900px] h-[400px] "/> */}

            </div>
          </div>  
          <Container>
          {router.isFallback ? (
              <PostTitle>Loading…</PostTitle>
            ) :
            <>      
            {allPosts.length > 0 && (
              
              <div className="w-full h-full grid grid-cols-12 gap-1">
                <Sidebar paginationRoot={paginationRoot} urlRoot={urlRoot} filterCategories={filterCategories} slug={currentSlug}/>
                <div className="w-full px-3 md:px-8 lg:px-0 pt-8 mx-auto pb-20 gap-2 col-span-12 md:col-span-10 pb-10">
                  <div className="col-span-3">
                    <MoreStories posts={allPosts} type="toolbox" />
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
            </>}
    
          </Container>
      </>
    )

}

export default ToolboxIndexPage

const Sidebar = ({filterCategories, paginationRoot, urlRoot, slug}) =>{
    return(
      <div className="hidden md:block relative col-span-2 max-w-[410px] border-r border-opacity-20">
                <div className="w-full min-h-screen pt-8 flex flex-col">
                  <FilterCategory
                  urlRoot={urlRoot}
                  paginationRoot={paginationRoot}
                  items={filterCategories} 
                  key={'uxtools_item_'} 
                  slug={slug}/>
                </div>
              </div>
    )
  }