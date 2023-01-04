import Container from "@/components/container";
import LargePostGrid from "@/components/v4/layout/LargePostGrid";
// import HeroGrid from "@/components/v4/hero/hero";
import SidebarTopic from "@/components/v4/layout/SidebarTopic";
import { useIntl } from "react-intl";
// import SectionDivider from "@/components/v4/section/SectionDivider";
import ToolIconCardRowSmall from "@/components/v4/layout/ToolIconCardRowSmall";
import Divider from "../layout/Divider";

const TopicSection = ({
  HeroPostRandomSection,
  OtherPostsRandomSection,
  // heroJob,
  // sponsors,
  toolsList,
  authorsList,
  title,
  icon
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
          <div className="flex">
            <h2 className="text-2xl mb-4 font-bold mt-4 text-gray-900">
              {heading}
            </h2>
            {/* <div className="opacity-50 ml-1">
              {icon}
            </div> */}
          </div>
          <LargePostGrid
            largePost={HeroPostRandomSection}
            smallPosts={OtherPostsRandomSection}
          />
        <Divider/>
        <ToolIconCardRowSmall topic={heading} tools={toolsList} />
        </div>

        <SidebarTopic
          topic={heading}
          paddingTop="hidden ml-4 pl-6 md:block pt-2"
          content={toolsList}
          authorsList={authorsList}
        />
      </div>
    </Container>
    </>
  );
};

export default TopicSection;
