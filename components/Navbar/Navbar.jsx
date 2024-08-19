// import dynamic from "next/dynamic";
import useUser from "@/lib/iron-session/useUser";
import UserMenu from "@/components/Navbar/UserMenu";
import Link from "next/link";
// import MenuItems from "@/components/Navbar/parts/MenuItems";
import LocationMenu from "@/components/Navbar/parts/LocationMenu";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/Primitives/Navigation";
import { useEffect, useRef, useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import MobileActiveLink from "@/components/Navbar/parts/MobileActiveLink";
// import ActiveLinkNewMenu from "./parts/ActiveLinkNewMenu";
import NavSponsor from "../v4/badge/NavSponsor";
import SearchModal from "../SearchModal";
// import { Waypoint } from "react-waypoint";
import MenuItems from "@/components/Navbar/parts/MenuItems";
import NewPostDialog from "./parts/NewPostDialog";
import { getScrollPercent } from "../StickyFooterCTA";
// const WMButton = dynamic(() => import("./parts/WMButton"),
// {
//   ssr: false,
// });

// const WMCounter = dynamic(
//   () => import("@/components/WebMonetization/Counter"),
//   {
//     ssr: false,
//   }
// );

const Navbar = ({
  collapsed,
  hideLocaleSwitcher,
  editor,
  sponsor,
  showWriteButton,
  maxWidth,
  navType,
  navBackground,
}) => {
  const { user, isLoading, isLoggedIn } = useUser({
    redirectIfFound: false,
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const [isVisible, setVisible] = useState(false);
  const [blinkyOn, setBlinkyOn] = useState(false);
  const [hideOffTop, setHideOffTop] = useState(false);
  const prevScrollPos = useRef(
    typeof window !== "undefined" && window?.pageYOffset
  );

  useEffect(() => {
    setBlinkyOn(true);
    setTimeout(() => {
      setBlinkyOn(false);
    }, 1000);
  }, [isVisible]);

  // Define the scrollListener inside useEffect or use useCallback
  useEffect(() => {
    const scrollListener = () => {
      const p = getScrollPercent(); // Assuming getScrollPercent is defined elsewhere

      if (p > 1 && isVisible !== true) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      //check if page is an article page (has url with /post/)
      if (window.location.pathname.includes("/post/")) {
        const currentScrollPos = window?.pageYOffset;

        if (currentScrollPos > 750 && !hideOffTop) {
          setHideOffTop(true);
        } else {
          setHideOffTop(false);
        }

        //check if user is scrolling upward direction
        if (prevScrollPos.current > currentScrollPos) {
          setHideOffTop(false);
        }
        prevScrollPos.current = currentScrollPos;
      }
    };

    window.addEventListener("scroll", scrollListener);

    // Clean up function
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <>
      <nav
        id="main-nav"
        className={` fixed ${hideOffTop ? "-mt-20" : ""} top-0 ${navType == "full" ? "" : "md:top-2"}  w-full transition transition-all duration-1000`}
        style={{ zIndex: 99 }}
      >
        <div
          className={`w-full ${navType == "full" ? "bg-white border-b border-gray-200 " : `${isVisible ? "bg-white bg-opacity-[88%] shadow-sm md:w-[50rem] lg:w-[62rem]" : "md:w-[97%] "}  md:rounded-2xl p-1`} transition transition-all duration-700 search-wide ${
            navType == "full"
              ? "max-w-full"
              : maxWidth
                ? maxWidth
                : "max-w-[1020px]"
          }  backdrop-blur-lg mx-auto p-1 px-1 pl-4`}
        >
          <div
            className={`${maxWidth ? maxWidth : "max-w-[1020px]"} mx-auto relative flex h-9 items-center justify-between`}
          >
            <div className="flex flex-shrink-0 items-center">
              {/* movil menu button */}
              <div className=" inset-y-0 mr-2 flex items-center xl:hidden">
                <button
                  type="button"
                  onClick={toggleMobileNav}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  {mobileNavOpen ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
              <Link href="/" as="/">
                <>
                  <img
                    // className={`${isVisible?'':'xl:block w-[0px] absolute opacity-0'} transition transition-all duration-1000 h-8 w-auto`}
                    className={`xl:hidden transition transition-all duration-1000 h-8 w-auto`}
                    src="/static/images/logo-small.svg"
                    // className="block h-10 w-auto mb-2"
                    // src="/static/images/logo-small-xmas.svg"
                    alt="Prototypr Logo"
                  />
                  <img
                    className={`xl:block ${isVisible ? "w-[25px] object-left-top object-cover drop-shadow-md" : "object-cover object-left-top w-[109px]"} transition transition-all duration-1000 hidden h-7 w-auto `}
                    src={`/static/images/prototypr_logo.svg`}
                    alt="Prototypr Logo"
                  />
                </>
              </Link>
              {/* lil cursor blinker */}
              <div
                className={`${blinkyOn ? "animate-pulse" : "opacity-0"} h-[28px] bg-gray-500/70 w-[2px]`}
              ></div>
              {/* <NavSponsor /> */}
              {/* <div
                  className={`hidden md:block my-auto duration-300 ease-in-out`}
                >
                  <WMCounter />
                </div> */}

              <div className="">
                <SearchModal />
              </div>
            </div>
            {/* <div className="flex flex-1 items-center justify-center items-stretch justify-between"> */}
            <div className="flex items-center h-9">
              <div className="hidden sm:ml-6 lg:block">
                <MenuItems />
              </div>
              {/* <div className="justify-end hidden xl:flex mr-6">
                {[
                  { label: "Home", url: "/" },
                  { label: "Toolbox", url: "/toolbox" },
                  { label: "Topics", url: "/topics" },
                  { label: "Jobs", url: "/jobs" },
                  // { label: "Sponsor", url: "/sponsor" },
                ].map((tab) => {
                  return (
                    <div className="mx-1 flex flex-col justify-center">
                      <ActiveLinkNewMenu href={tab.url}>
                        {tab.label}
                      </ActiveLinkNewMenu>
                    </div>
                  );
                })}
              </div> */}
            </div>
            <div
              className={`items-center sm:static sm:inset-auto flex ${
                (user?.isLoggedIn || isLoggedIn) ? "mr-[52px] sm:mr-16" : "lg:mr-0"
              }`}
            >
              {/* <div className={`hidden mr-2 md:block my-auto`}>
                <WMButton />
              </div> */}
              {/* <div className={`hidden mr-2 md:block my-auto`}>
                  <WMButton />
                </div> */}

              <NavigationMenu>
                <NavigationMenuList>
                  <LocationMenu
                    user={user}
                    hideLocaleSwitcher={hideLocaleSwitcher}
                    collapsed={collapsed}
                    showWriteButton={showWriteButton}
                  />
                </NavigationMenuList>
              </NavigationMenu>
              <div className="relative">
                <UserMenu userLoading={false} user={user} />
              </div>
              {sponsor ? <NavSponsor sponsor={sponsor} /> : null}
              <div>&nbsp;</div>
            </div>
          </div>
        </div>

        {/* movil menu */}
        <div
          className={`xl:hidden ${
            !mobileNavOpen
              ? "h-0 overflow-hidden"
              : "mx-3 border border-gray-100 mt-1 bg-white shadow-lg"
          } rounded-xl`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3">
            <MobileActiveLink href={"/"}>Home</MobileActiveLink>
            {/* <MobileActiveLink href={"/topics"}>Topics</MobileActiveLink> */}
            <MobileActiveLink href={"/toolbox"}>Toolbox</MobileActiveLink>
            {/* <MobileActiveLink href={"/jobs"}>Jobs</MobileActiveLink> */}
            <MobileActiveLink href={"/topics"}>Topics</MobileActiveLink>
            <MobileActiveLink href={"/people"}>People</MobileActiveLink>
            {/* <MobileActiveLink href={"/web-monetization"}>
              Earn Micropayments
            </MobileActiveLink> */}
            {!(user?.isLoggedIn || isLoggedIn) ? (
              <MobileActiveLink href={"/onboard"}>Sign in</MobileActiveLink>
            ) : (
              ""
            )}
            {(user?.isLoggedIn || isLoggedIn) ? (
              <div className="px-2.5 pt-2" onClick={toggleMobileNav}>
                <NewPostDialog />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
