import dynamic from "next/dynamic";
import Link from "next/link";
import useUser from "@/lib/iron-session/useUser";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import MobileActiveLink from "@/components/Navbar/parts/MobileActiveLink";
// import LocationMenu from "@/components/Navbar/parts/LocationMenu";
import MenuItems from "@/components/Navbar/parts/MenuItems";
import UserMenu from "@/components/Navbar/UserMenu";
import Button from "@/components/Primitives/Button";
const WMButton = dynamic(() => import("@/components/Navbar/parts/WMButton"), 
{
  ssr: false,
});
// import {
//   NavigationMenu,
//   NavigationMenuList,
// } from "@/components/Primitives/Navigation";

// const WMCounter = dynamic(() => import("@/components/WebMonetization/Counter"), {
//   ssr: false,
// });

const Header = ({collapsed, hideLocaleSwitcher, editor, showWriteButton}) => {

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <div id="main-nav" className="w-full h-auto fixed top-0 pointer-events-none z-[100] px-4">
      <div className="w-full max-w-6xl mx-auto h-auto mt-10 pointer-events-auto">
        <div className="w-full h-full px-6 py-2 bg-white rounded-[12px] border border-black border-opacity-5 ">
          <div className="">
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
                        src={`/static/images/prototypr_logo.svg`}
                        alt="Prototypr Logo"
                      />
                    </>
                  </Link>
                  {/* <div
                    className={`hidden md:block my-auto transition transition-all duration-300 ease-in-out`}
                  >
                    <WMCounter />
                  </div> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <MenuItems />
                </div>
              </div>
              <div className="flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <NavigationMenu>
                  <NavigationMenuList>
                    <LocationMenu
                      user={user}
                      hideLocaleSwitcher={hideLocaleSwitcher}
                      collapsed={collapsed}
                    />
                  </NavigationMenuList>
                </NavigationMenu> */}
                 {/* <div className={`hidden mr-2 md:block my-auto`}>
                <WMButton />
              </div> */}
                {/* <div className="relative ml-3">
                  <UserMenu userLoading={isLoading} user={user} />
                </div> */}
                 <Link href="/apply/form">
                  <Button className="text-sm bg-blue-600 hover:bg-blue-500" variant={"confirmRounded"}>
                  Apply to join
                </Button>
                </Link>
              </div>
            </div>
            {/* movil menu */}
            <div
              className={`sm:hidden ${
                !mobileNavOpen ? "h-0 overflow-hidden" : ""
              }`}
              id="mobile-menu"
            >
              <div className="space-y-1 px-2 pt-2 pb-3">
                <MobileActiveLink href={"/"}>Home</MobileActiveLink>
                <MobileActiveLink href={"/topics"}>Topics</MobileActiveLink>
                <MobileActiveLink href={"/toolbox"}>Toolbox</MobileActiveLink>
                <MobileActiveLink href={"/people"}>People</MobileActiveLink>
                {/* <MobileActiveLink href={"/jobs"}>Jobs</MobileActiveLink> */}
                {/* <MobileActiveLink href={"/web-monetization"}>
                  Earn Micropayments
                </MobileActiveLink> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
