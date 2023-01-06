import Container from "@/components/container";
import LargePostGrid from "@/components/v4/layout/LargePostGrid";
// import HeroGrid from "@/components/v4/hero/hero";
import SidebarTopic from "@/components/v4/layout/SidebarTopic";
import { useIntl } from "react-intl";
// import SectionDivider from "@/components/v4/section/SectionDivider";
import ToolIconCardRowSmall from "@/components/v4/layout/ToolIconCardRowSmall";
import Divider from "../layout/Divider";
import { CaretRight, Tag } from "phosphor-react/dist";
import SmallPostsGroup from "../layout/SmallPostsSection";
import Link from "next/link";

const TopicSection = ({
  HeroPostRandomSection,
  OtherPostsRandomSection,
  extendedPosts,
  showTitle,
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
    <Container maxWidth="max-w-[1320px]">
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
          <LargePostGrid
            largePost={HeroPostRandomSection}
            smallPosts={OtherPostsRandomSection}
          />
        {toolsList?.length>3 ?
        <>
        <Divider/>
        <ToolIconCardRowSmall topic={heading} tools={toolsList} />
        </>:''
      }
        {extendedPosts?
        <div className={`${toolsList?.length<4?'-mt-4':''}`}>
         {toolsList?.length>2 ?
          <h3 className="font-semibold text-lg mb-6 px-1">
          More {heading} articles
        </h3>:''}
            <SmallPostsGroup smallPosts={extendedPosts}/>
          </div>
      :''}

        {paginationComponent}
        </div>

        {showSidebar!==false?<SidebarTopic
          showTopicCloud={showTopicCloud}
          topic={heading}
          paddingTop={`hidden ml-4 pl-6 md:block ${showTopicCloud?'pt-0':'pt-6'}`}
          content={toolsList}
          authorsList={authorsList}
        />:''}
      </div>
    </Container>
    </>
  );
};

export default TopicSection;
