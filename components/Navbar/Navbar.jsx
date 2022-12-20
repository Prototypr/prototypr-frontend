import dynamic from "next/dynamic";
import useUser from "@/lib/iron-session/useUser";
import UserMenu from "@/components/Navbar/UserMenu";
import Link from "next/link";
import MenuItems from "@/components/Navbar/parts/MenuItems";
import LocationMenu from "@/components/Navbar/parts/LocationMenu";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/Primitives/Navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import MobileActiveLink from "@/components/Navbar/parts/MobileActiveLink";
import WMButton from "./parts/WMButton";
import { SnowMiddle, SmallSideSnow } from "../xmas/snow";
import SearchBar from "../SearchBar";
import ActiveLinkNewMenu from "./parts/ActiveLinkNewMenu";

const WMCounter = dynamic(
  () => import("@/components/WebMonetization/Counter"),
  {
    ssr: false,
  }
);

export const HomePageNewNavBar = () => {
  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };
  return (
    <div className="relative">
      <div className="absolute z-[60] hidden sm:block -top-1 left-[5%]">
        {/* <SnowMiddle /> */}
      </div>
      <div className="absolute z-[60] hidden sm:block -top-1 left-[80%] pointer-events-none">
        <SmallSideSnow />
      </div>

      <div className="sticky top-10 z-50 ">
        <div className="w-[100%] max-w-[1400px] mx-auto h-auto bg-white bg-opacity-60 border border-black border-opacity-10 backdrop-blur-lg rounded-full z-50">
          <div className="flex flex-row gap-2 p-2 px-6 justify-between">
            <div className="flex  flex-shrink-0 items-center">
              <Link href="/" as="/">
                <>
                  {/* pantalla grande */}
                  {/* <img
                  className="block h-8 w-auto "
                  src="/static/images/logo-small-xmas.svg"
                  //   src="/static/images/logo-small.svg"
                  alt="Prototypr Logo"
                /> */}
                  <img
                    className="block h-10 w-auto mb-2 "
                    src="/static/images/logo-small-xmas.svg"
                    //   src="/static/images/logo-small.svg"
                    alt="Prototypr Logo"
                  />
                </>
              </Link>
              <div
                className={`hidden md:block my-auto duration-300 ease-in-out`}
              >
                <WMCounter />
              </div>
              <SearchBar/>
            </div>
            <div className="hidden sm:flex flex-row p-2">
              {[
                { label: "Home", url: "/" },
                { label: "Toolbox", url: "/toolbox/page/1" },
                { label: "Topics", url: "/topics" },
                { label: "Jobs", url: "/jobs" },
                { label: "Sponsor", url: "/sponsor" },
              ].map((tab) => {
                return (
                  <div className="mx-1">
                    <ActiveLinkNewMenu href={tab.url}>
                        {tab.label}
                    </ActiveLinkNewMenu>
                  </div>
                );
              })}
              <div className=" flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className={`hidden mr-2 md:block my-auto`}>
                  <WMButton />
                </div>
                {/* <NavigationMenu></NavigationMenu> */}
                <div className="relative ml-3">
                  <UserMenu userLoading={isLoading} user={user} />
                </div>
              </div>
            </div>
            <div className=" inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={toggleMobileNav}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          </div>
        </div>
        <div
          className={`sm:hidden relative mt-2 shadow-lg rounded-lg bg-white z-[100] ${
            !mobileNavOpen ? "h-0 overflow-hidden" : ""
          }`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3 text-sm font-inter">
            <MobileActiveLink href={"/"}>Home</MobileActiveLink>
            <MobileActiveLink href={"/topics"}>Topics</MobileActiveLink>

            <MobileActiveLink href={"/toolbox/page/1"}>Toolbox</MobileActiveLink>
            <MobileActiveLink href={"/jobs"}>Jobs</MobileActiveLink>
            <MobileActiveLink href={"/sponsor"}>Sponsor</MobileActiveLink>
            <MobileActiveLink href={"/web-monetization"}>
              Web Monetization
            </MobileActiveLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ collapsed, hideLocaleSwitcher, editor, showWriteButton }) => {
  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <nav className="bg-white font-inter fixed w-full top-0 z-50 border-b border-1 border-gray-100 backdrop-blur">
      <div className="mx-auto max-w-[1400px] px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* movil menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex mr-3 flex-shrink-0 items-center">
              <Link href="/" as="/">
                <>
                  {/* pantalla grande */}
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/static/images/logo-small.svg"
                    alt="Prototypr Logo"
                  />
                  {/* movil */}
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={`/static/images/logo.svg`}
                    alt="Prototypr Logo"
                  />
                </>
              </Link>
              <div
                className={`hidden md:block my-auto duration-300 ease-in-out`}
              >
                <WMCounter />
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <MenuItems />
            </div>
          </div>
          <div className=" flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className={`hidden mr-2 md:block my-auto`}>
              <WMButton />
            </div>
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
            <div className="relative ml-3">
              <UserMenu userLoading={isLoading} user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* movil menu */}
      <div
        className={`sm:hidden ${!mobileNavOpen ? "h-0 overflow-hidden" : ""}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          <MobileActiveLink href={"/"}>Home</MobileActiveLink>
          <MobileActiveLink href={"/toolbox/page/1"}>Toolbox</MobileActiveLink>
          <MobileActiveLink href={"/jobs"}>Jobs</MobileActiveLink>
          <MobileActiveLink href={"/web-monetization"}>
            Web Monetization
          </MobileActiveLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
