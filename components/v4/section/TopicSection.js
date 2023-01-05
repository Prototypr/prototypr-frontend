import Container from "@/components/container";
import LargePostGrid from "@/components/v4/layout/LargePostGrid";
// import HeroGrid from "@/components/v4/hero/hero";
import SidebarTopic from "@/components/v4/layout/SidebarTopic";
import { useIntl } from "react-intl";
// import SectionDivider from "@/components/v4/section/SectionDivider";
import ToolIconCardRowSmall from "@/components/v4/layout/ToolIconCardRowSmall";
import Divider from "../layout/Divider";
import { Tag } from "phosphor-react/dist";
import SmallPostsGroup from "../layout/SmallPostsSection";

const TopicSection = ({
  HeroPostRandomSection,
  OtherPostsRandomSection,
  extendedPosts,
  showTitle,
  showTopicCloud,
  // heroJob,
  // sponsors,
  toolsList,
  authorsList,
  title,
  icon,
  paginationComponent
}) => {
  const intl = useIntl();

  const heading = intl.formatMessage({ id: title });

  return (
    <>
    <Container maxWidth="max-w-[1320px]">
      {/* <Intro /> */}
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className="w-full max-w-full flex flex-col gap-2 col-span-12 lg:col-span-9">
          {/* <HomePageNewNavBar /> */}
          {/* <TabSwitcher selectedTab={currentTab} onTabChange={onTabChange} /> */}
          {showTitle!==false?<div className="flex">
            <Tag className="my-auto mr-2" size={32}/>
            <h2 className="text-2xl capitalize md:text-5xl mt-8 mb-8 font-bold text-gray-900">
              {heading}
            </h2>
            {/* <div className="opacity-50 ml-1">
              {icon}
            </div> */}
          </div>:''}
          <LargePostGrid
            largePost={HeroPostRandomSection}
            smallPosts={OtherPostsRandomSection}
          />
        {toolsList.length>3 ?
        <>
        <Divider/>
        <ToolIconCardRowSmall topic={heading} tools={toolsList} />
        </>:''
      }
        {extendedPosts?
        <div className={`${toolsList.length<4?'-mt-4':''}`}>
         {toolsList.length>2 ?
          <h3 className="font-semibold text-lg mb-6 px-1">
          More {heading} articles
        </h3>:''}
            <SmallPostsGroup smallPosts={extendedPosts}/>
          </div>
      :''}

        {paginationComponent}
        </div>

        <SidebarTopic
          showTopicCloud={showTopicCloud}
          topic={heading}
          paddingTop={`hidden ml-4 pl-6 md:block ${showTopicCloud?'pt-0':'pt-12'}`}
          content={toolsList}
          authorsList={authorsList}
        />
      </div>
    </Container>
    </>
  );
};

export default TopicSection;
