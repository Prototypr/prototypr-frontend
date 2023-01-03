import { Waypoint } from "react-waypoint";
import { useState } from "react";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
import TopicsCloudCard from "@/components/v4/card/TopicsCloudCard";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";
import SidePanelJobs from "../v4/layout/SidePanelJobs";
import SidePanelTools from "../v4/layout/SidePanelTools";
const Sidebar = ({ title, content = [], type, paddingTop }) => {
  let slicedList = [...content.slice(0, 4)];

  const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-0");
  const [adClass, setAdClass] = useState("opacity-0 h-0 mb-0");

  const _handleWaypointEnter = () => {
    setStickyPaddingTop("pt-0");
    setAdClass("opacity-0 h-0 mb-0");
  };
  const _handleWaypointLeave = () => {
    setStickyPaddingTop(SIDEBAR_STICKY_OFFSET);
    setAdClass("opacity-100 h-auto mb-6");
  };

  return (
    <div className={`${paddingTop} relative col-span-3`}>
      <TopicsCloudCard />

      {/* <div className={`hidden lg:block mb-8`}>
        {type === "jobs" ? (
          <div>
            <PrototyprNetworkCTA data={sponsorData} />
          </div>
        ) : (
          <div className="mt-[0]">
            <PrototyprNetworkCTA data={sponsorData} />
          </div>
        )}
      </div> */}
      <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
      <div
        className={`${stickyPaddingTop} transition-all sticky duration-500 top-0 min-h-screen hidden lg:block`}
      >
        <div className={`${adClass} overflow-hidden`}>
          <SponsorSidebarCard
            sponsorLocation="homepage_bottom_sidebar"
            page={"/"}
          />
        </div>
        <aside className=" top-0 py-0">
          <div className="flex flex-col grid gap-4 max-w-[320px] mx-auto">
            <div className="w-full flex flex-col grid gap-2">
              {type === "tools" && (
                <>
                  <SidePanelTools list={slicedList} />
                </>
              )}

              {type === "jobs" && <SidePanelJobs list={slicedList} />}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
