import Container from "@/components/container";
import LargePostGrid from "@/components/v4/layout/LargePostGrid";
import HeroGrid from "@/components/v4/hero/hero";
import SidebarTopic from "@/components/v4/layout/SidebarTopic";
import { useIntl } from "react-intl";

const TopicSection = ({
  HeroPostRandomSection,
  OtherPostsRandomSection,
  heroJob,
  sponsors,
  toolsList,
  title,
}) => {
  const intl = useIntl();

  const heading = intl.formatMessage({ id: title });

  return (
    <Container maxWidth="max-w-[1320px]">
      {/* <Intro /> */}
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className="w-full max-w-full flex flex-col gap-2 col-span-12 lg:col-span-9">
          {/* <HomePageNewNavBar /> */}
          {/* <TabSwitcher selectedTab={currentTab} onTabChange={onTabChange} /> */}
          <div className="flex">
            <h2 className="text-2xl mb-4 font-medium text-gray-900">
              {heading}
              {/* Discover <span className="text-gray-400">the latest</span> */}
            </h2>
          </div>
          <LargePostGrid
            largePost={HeroPostRandomSection}
            smallPosts={OtherPostsRandomSection}
          />
        </div>

        <SidebarTopic
          paddingTop="hidden ml-4 pl-6 md:block pt-12"
          content={toolsList}
        />
      </div>
    </Container>
  );
};

export default TopicSection;
