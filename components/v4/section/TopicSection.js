import Container from "@/components/container";
import LargePostGrid from "@/components/v4/layout/LargePostGrid";
// import HeroGrid from "@/components/v4/hero/hero";
// import SidebarTopic from "@/components/v4/layout/SidebarTopic";
import { useIntl } from "react-intl";
// import SectionDivider from "@/components/v4/section/SectionDivider";
import ToolIconCardRow from "@/components/v4/layout/ToolIconCardRow";
import Divider from "../layout/Divider";
import { CaretRight, Tag } from "phosphor-react/dist";
import SmallPostsGroup from "../layout/SmallPostsSection";
import Link from "next/link";
import LargePostGridD from "@/components/v4/layout/LargePostGridD";
import SectionDivider from "./SectionDivider";
import ToolIconCard from "../card/ToolIconCard";

const TopicSection = ({
  HeroPostRandomSection,
  OtherPostsRandomSection,
  extendedPosts,
  showTitle,
  currentPage,
  showTopicCloud,
  showSidebar,
  slug,
  // heroJob,
  // sponsors,
  toolsList,
  authorsList,
  title,
  icon,
  paginationComponent
}) => {
  const intl = useIntl();

  const heading = title?intl.formatMessage({ id: title }):'';

  return (
    <>
      {/* <Intro /> */}
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className={`w-full max-w-full flex flex-col gap-2 col-span-12 ${showSidebar==false?'':'lg:col-span-9'}`}>
          {/* <HomePageNewNavBar /> */}
          {/* <TabSwitcher selectedTab={currentTab} onTabChange={onTabChange} /> */}
          {showTitle!==false?<div className="flex w-full justify-between">
            <div className="flex">
              <Tag className="my-auto mr-3" size={32}/>
              <h2 className="text-2xl capitalize md:text-5xl mt-8 mb-8 font-bold text-gray-900">
                {heading}
              </h2>
            </div>
            <div className="my-auto">
            <Link href={`/posts/${slug}/page/1`}>
            <div className="font-inter mt-1 text-sm my-auto text-black opacity-60 cursor-pointer text-sm flex">
              {/* <div className="my-auto">More <span className="capitalize">{heading}</span></div> */}
              <div className="my-auto">See all</div>
            <CaretRight className="my-auto" size={14} />
            </div>
          </Link>
            </div>
          </div>:''}
          <Container maxWidth="mx-auto relative z-20 max-w-[1320px]">
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className={`w-full max-w-full flex flex-col gap-2 col-span-12 ${showTitle?'py-3':''} `}>
          <LargePostGridD
            title={false}
            showHeading={showTitle}
            largePost={HeroPostRandomSection}
            smallPosts={OtherPostsRandomSection} />
        </div>
        {/* <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        /> */}
      </div>
    </Container>
          {/* <LargePostGrid
            largePost={HeroPostRandomSection}
            smallPosts={OtherPostsRandomSection}
          /> */}
        {toolsList?.length>3 ?
        <>
        <SectionDivider transparentLine={true}/>

        {/* <Container padding={false} maxWidth="relative z-0">
        <div class="absolute bottom-0 w-full z-0">
          <img class="w-full translate-y-[4px] z-0 opacity-40" style={{marginBottom:'2px'}} src="/static/images/tilt-section2.svg"/>
          <div class="w-full h-[40px] translate-y-[2px] bg-[#CCE6FF]/40">
            </div>
          </div>
        </Container> */}

        <div style={{marginTop:'-6px'}}>
          <Container padding={false} maxWidth="mb-3 max-w-[1320px] mx-auto bg-[#CCE6FF]/40 p-10 rounded-2xl w-full relative">
            <div className="">
              <div className="flex justify-between">
                <h3 className="font-medium text-2xl mb-8">
                Related Tools
                </h3>
                <Link href='/toolbox'>
                  <div className="flex">
                    <div className={`"text-sm my-auto text-black opacity-60`}>See all</div>
                    <CaretRight className="opacity-60 my-auto" size={16} />
                  </div>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
                {toolsList.map((tool, index) => {
                  return (
                    <div key={index}>
                      <ToolIconCard withBackground={true} tool={tool?.attributes} />
                    </div>
                  );
                })}
              </div>
        </div>
        {/* <img src="/static/images/angleshape.svg" className="absolute -mb-[80px] w-full bottom-0 z-10 left-0"/> */}

          </Container>
        </div>
        <SectionDivider transparentLine={true}/>
        </>:''
      }
        {extendedPosts?
        <div className={`${toolsList?.length<4?'mt-10':' z-20 relative'} max-w-[1320px] px-3 mx-auto`}>
          
         {/* {toolsList?.length>2 ?
          <h3 className="font-medium text-2xl mt-20 mb-8 px-1">
          More {heading} articles
        </h3>:''} */}
        <LargePostGridD
            title={false}
            showHeading={false}
            largePost={HeroPostRandomSection}
            smallPosts={extendedPosts} />
            {/* <SmallPostsGroup smallPosts={extendedPosts}/> */}
          </div>
      :''}

        <div className="mt-8">
          {paginationComponent}
        </div>
        </div>

        {/* {showSidebar!==false?<SidebarTopic
          showTopicCloud={showTopicCloud}
          topic={heading}
          paddingTop={`hidden ml-4 pl-6 md:block ${showTopicCloud?'pt-0':'pt-6'}`}
          content={toolsList}
          authorsList={authorsList}
        />:''} */}
      </div>
    </>
  );
};

export default TopicSection;
