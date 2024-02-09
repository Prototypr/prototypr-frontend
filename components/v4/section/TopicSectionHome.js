import Container from "@/components/container";
// import LargePostGrid from "@/components/v4/layout/LargePostGrid";
// import LargePostGridC from "@/components/v4/layout/LargePostGridC";
// import HeroGrid from "@/components/v4/hero/hero";
// import SidebarTopic from "@/components/v4/layout/SidebarTopic";
import { useIntl } from "react-intl";
// import SectionDivider from "@/components/v4/section/SectionDivider";
import SmallPostsGroup from "../layout/SmallPostsSection";
// import TabSwitcher from "@/components/homepage/TabSwitcher";
import TopicsGridHome from "../layout/TopicsGridHome";

const TopicSectionHome = ({
  HeroPostRandomSection,
  OtherPostsRandomSection,
  extendedPosts,
  showTitle,
  showTopicCloud,
  showSidebar,
  slug,
  tagline,
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
        <div className={`w-full max-w-full flex flex-col gap-2 z-20 col-span-12 ${showSidebar==false?'':'lg:col-span-9'}`}>
       
          <TopicsGridHome
            slug={slug}
            heading={heading}
            showHeading={true}
            largePost={HeroPostRandomSection}
            smallPosts={OtherPostsRandomSection}
            tools={toolsList}
          />
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

        {/* {showSidebar!==false?<SidebarTopic
          showTopicCloud={showTopicCloud}
          topic={heading}
          paddingTop={`hidden ml-4 pl-6 md:block ${showTopicCloud?'pt-0':'pt-6'}`}
          content={toolsList}
          authorsList={authorsList}
        />:''} */}
      </div>
    </Container>
    </>
  );
};

export default TopicSectionHome;
