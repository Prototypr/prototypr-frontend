import { useState } from "react";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
// import SidePanelJobs from "@/components/v4/layout/SidePanelJobs";
import SidePanelAuthors from "@/components/v4/layout/SidePanelAuthors";
import Divider from "@/components/v4/layout/Divider";

const SidebarDiscover = ({ authorsList = [], paddingTop, topic }) => {
  let slicedList = [...authorsList.slice(0, 5)];

  const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-3");

  return (
    <div className={`${paddingTop} relative col-span-3`}>
      <div
        className={`${stickyPaddingTop} transition-all sticky duration-500 top-0 hidden lg:block`}
      >
        <aside className=" top-0 py-0">
          <div className="flex flex-col grid gap-4 max-w-[320px] mx-auto">
            <div className="w-full flex flex-col grid gap-2">
              <SidePanelAuthors list={slicedList} topic={topic} />
            </div>
          </div>
          <Divider/>
          <SponsorSidebarCard
            sponsorLocation="homepage_bottom_sidebar"
            page={"/"}
          />
        </aside>
      </div>
    </div>
  );
};

export default SidebarDiscover;
