import SidebarDiscover from "@/components/v4/layout/SidebarDiscover";
import Container from "@/components/container";
import LargePostGrid from "@/components/v4/layout/LargePostGrid";
import {RssSimple} from 'phosphor-react'
const DiscoverSection = ({user, heroCardPost, viewablePosts, jobsSidebar }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className={`w-full max-w-full flex flex-col gap-2 col-span-12 lg:col-span-9 py-3 ${!user?.isLoggedIn?'pt-8':''}`}>
          <div className="flex px-1">
            <h2 className="text-3xl md:text-3xl my-4 font-semibold text-gray-900">
              Discover <span className="text-gray-400">the latest</span>
            </h2>
            <div className="flex ml-2 -mt-1 flex-col justify-center">
              <a target="_blank" className="inline-flex" href="/feed.xml">
              <RssSimple size={28} />
              </a>
            </div>
          </div>
          <LargePostGrid largePost={heroCardPost} smallPosts={viewablePosts} />
        </div>
        <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        />
      </div>
    </Container>
  );
};

export default DiscoverSection;
