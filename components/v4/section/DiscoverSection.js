import SidebarDiscover from "@/components/v4/layout/SidebarDiscover";
import Container from "@/components/container";
import LargePostGrid from "@/components/v4/layout/LargePostGrid";

const DiscoverSection = ({ heroCardPost, viewablePosts, jobsSidebar }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className="w-full max-w-full flex flex-col gap-2 col-span-12 lg:col-span-9 py-3 pt-8">
          <div className="flex px-1">
            <h2 className="text-2xl my-4 font-medium text-gray-900">
              Discover <span className="text-gray-400">the latest</span>
            </h2>
            <a target="_blank" className="inline-flex" href="/feed.xml">
              <svg
                className="my-auto ml-3 w-5 h-5 text-gray-400 hover:text-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M3 3c9.941 0 18 8.059 18 18h-3c0-8.284-6.716-15-15-15V3zm0 7c6.075 0 11 4.925 11 11h-3a8 8 0 0 0-8-8v-3zm0 7a4 4 0 0 1 4 4H3v-4z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
          <LargePostGrid largePost={heroCardPost} smallPosts={viewablePosts} />
        </div>
        <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 md:block pt-12"
          content={jobsSidebar}
        />
      </div>
    </Container>
  );
};

export default DiscoverSection;
