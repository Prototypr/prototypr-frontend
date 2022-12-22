import { Waypoint } from "react-waypoint";
import { useState } from "react";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import Image from "next/image";
import gumletLoader from "@/components/new-index/gumletLoader";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
import Link from "next/link";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";
const Sidebar = ({ title, content = [], type, paddingTop }) => {
    const sponsorData = {
      src: "/static/images/placeholder/sponsor-cat.png",
      heading: "A playful todolist to help you get your stuff done.",
      url: "https://catadoo.com/",
    };
  
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
      <div
        className={`${paddingTop} relative col-span-4`}
      >
        <div
          className={`hidden lg:block mb-8`}
        >
          {type === "jobs" ? (
            <div>
              <PrototyprNetworkCTA data={sponsorData} />
            </div>
          ) : (
            <div className="mt-[0]">
              <PrototyprNetworkCTA data={sponsorData} />
            </div>
          )}
        </div>
        <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
        <div
          className={`${stickyPaddingTop} transition-all sticky duration-500 top-0 min-h-screen hidden lg:block`}
        >
      <div className={`${adClass} overflow-hidden`}>
        <SponsorSidebarCard />
      </div>
          <aside className="  h-screen top-0 py-0">
            <div className="flex flex-col grid gap-4 max-w-[320px] mx-auto">
  
  
              <div className="w-full flex flex-col grid gap-2">
                {type === "tools" && (
                  <>
                    <div className="flex flex-row justify-between items-baseline">
                      <h3 className="font-inter my-0.5 font-bold text-gray-500 text-sm">
                        {title}
                      </h3>
                      <Link
                        href={type === "jobs" ? "/jobs" : "/toolbox/page/1"}
                        className="font-inter text-xs font-semibold text-gray-800 cursor-pointer"
                      >
                        See all
                      </Link>
                    </div>
                    <div className="flex flex-col grid my-2">
                      {slicedList.map((item, i) => {
                        const { title, legacyFeaturedImage, tags, slug } =
                          item.attributes;
                        return (
                          <div
                            key={i}
                            className="w-full h-auto cursor-pointer flex flex-col"
                            >
                            <Link href={`/toolbox/${slug}`}>
                            <div className="flex flex-row my-2.5 rounded-lg">
                                <div className="w-12 h-12 mr-2 relative border border-opacity-10 border-black rounded-lg overflow-hidden">
                                  <img
                                    className="relative"
                                    src={legacyFeaturedImage?.logoNew}
                                  />
                                </div>
                                <div className="flex flex-col grid gap-2">
                                  <p className="text-sm font-inter">{title}</p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
  
                {type === "jobs" && (
                  <div className="flex rounded-lg flex-col gap-0 px-2">
                    <div className="flex flex-row justify-between items-baseline">
                      <h3 className="font-inter my-0.5 font-bold text-gray-500 text-sm">
                        {title}
                      </h3>
                      <Link
                        href={type === "jobs" ? "/jobs" : "/toolbox/page/1"}
                        className="font-inter text-xs font-semibold text-gray-800 cursor-pointer"
                      >
                        See All
                      </Link>
                    </div>
                    <div className="flex flex-col grid my-2">
                      {slicedList.map((item, i) => {
                        const {
                          title,
                          companyName,
                          salaryText,
                          id,
                          companyLogo,
                          locations,
                        } = item;
                        return (
                          <>
                            <Link href={`/jobs/${id}`}>
                              <div
                                key={i}
                                className="w-full h-auto cursor-pointer flex flex-col"
                              >
                                <div className="flex flex-row my-2.5 rounded-lg">
                                  <div
                                    style={{ flex: "0 0 3em" }}
                                    className="w-12 h-12 mr-2 relative border border-opacity-10 border-black rounded-lg overflow-hidden"
                                  >
                                    {companyLogo ? (
                                      <Image
                                        tabIndex={0}
                                        loader={gumletLoader}
                                        layout="fill"
                                        objectFit="cover"
                                        src={companyLogo}
                                        className="object-cover"
                                        alt="Author profile picture"
                                      />
                                    ) : (
                                      ""
                                    )}
                                    {/* <img className="relative" src={companyLogo} /> */}
                                  </div>
                                  <div className="flex flex-col grid gap-1 justify-center">
                                    <p className=" h-[18px] overflow-hidden line-clamp-1 inline font-inter text-sm">
                                      {title}
                                    </p>
                                    <div className="flex flex-row gap-1 text-sm text-gray-500">
                                      <p className=" h-[18px] max-w-[100px] overflow-hidden line-clamp-1 inline font-inter">
                                        {companyName},
                                      </p>
                                      <p className=" h-[18px] max-w-[150px] overflow-hidden line-clamp-1 inline font-inter">
                                        {locations[0]?.name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </>
                        );
                      })}
                    </div>
                    {/* <Link
                      href={"/jobs/post"}
                      className="w-full flex flex-row justify-start font-inter text-gray-500 hover:underline cursor-pointer my-2"
                    >
                      <div className="text-xs inline-flex">
                        <div className="mr-1">Hiring? Post a Job</div>
                        <div>{"->"}</div>
                      </div>
                    </Link> */}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  };

  export default Sidebar