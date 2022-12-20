import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import PostTitle from '@/components/post-title'

const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));



const ToolboxIndexPage = ({title, description,pagination,urlRoot, breadcrumbs, allPosts, pageSize, filterCategories, currentSlug}) =>{

    const router = useRouter();

    const onPageNumChange = (pageNo) => {
      router.push(`/${urlRoot}/page/${pageNo}`);
    };

    return(
      <>
       <div className="">
          
          {/* <div className="my-4 inline-block text-sm text-gray-800 ">
                     
                    </div> */}
            <div className="glassmorphism pt-32 -mt-2 relative -mx-8 px-6 pb-7 overflow-hidden relative">
                 <div className="max-w-[1440px] relative flex mx-auto px-6 text-xs">
                  <div className="absolute pl-8 mt-1 left-0">
                    <Breadcrumbs 
                          urlRoot={urlRoot}
                          title={title}
                          currentSlug={currentSlug}
                          links={breadcrumbs.links}
                          pageNo={pagination?.page}
                          />
                  </div>
                  <h1 className="text-xl mx-auto text-center font-bold tracking-tighter leading-tight capitalize">
                    {title}
                  </h1>
                  {/* <div className="absolute pr-12 mt-1 right-0">
                    Follow Topic
                  </div> */}
                 </div>
                <div className="-z-10 opacity-20 from-blue-600 to-blue-200 bg-gradient-to-br opacity-80 absolute w-full h-full top-0 left-0"/>
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
                <Sidebar urlRoot={urlRoot} filterCategories={filterCategories} slug={currentSlug}/>
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

const Sidebar = ({filterCategories, urlRoot, slug}) =>{
    return(
      <div className="hidden md:block relative col-span-2 max-w-[410px] border-r border-opacity-20">
                <div className="w-full min-h-screen pt-8 flex flex-col">
                  <FilterCategory
                  urlRoot={urlRoot}
                  items={filterCategories} 
                  key={'uxtools_item_'} 
                  slug={slug}/>
                </div>
              </div>
    )
  }