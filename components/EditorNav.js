import Link from "next/link";
import dynamic from "next/dynamic";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import useUser from "@/lib/iron-session/useUser";
import { useState, useEffect } from "react";
import jsCookie from "js-cookie";

const NavigationMenuDemo = dynamic(() => import("./navbar-menu"), {
  ssr: true,
});
const NavigationMenuMobile = dynamic(() => import("./navbar-menu-mobile"), {
  ssr: false,
});

export default function EditorNav({ activeNav, postStatus, tool, post }) {
  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  /**
   * use the logged in true/false cookie
   * so there is minimal flicker between subscribe and log in button
   */
  const [userLoggedInCookie] = useState(() => {
    let loggedInCookie = jsCookie.get("prototypr-loggedIn");
    if (loggedInCookie == "true") {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (user?.email) {
      jsCookie.set("prototypr-loggedIn", true);
    } else {
      jsCookie.set("prototypr-loggedIn", false);
    }
  }, [user?.email]);

  const [statusComponent, setStatusComponent] = useState(null);
  useEffect(() => {
    if (postStatus == "draft") {
      setStatusComponent(
        <div className="p-2 py-0.5 text-xs bg-gray-300 bg-opacity-20 text-gray-500 rounded-full border border-gray-300">
          Draft
        </div>
      );
    }
    if (postStatus == "pending") {
      setStatusComponent(
        <div className="p-2 py-0.5 text-xs bg-yellow-300 bg-opacity-20 text-yellow-600 rounded-full border border-yellow-300">
          Pending Review
        </div>
      );
    }
    if (postStatus == "publish") {
      setStatusComponent(
        <div className="p-2 py-0.5 text-xs bg-green-400 bg-opacity-20 text-green-700 rounded-full border border-green-500">
          Published
        </div>
      );
    }
  }, [postStatus]);

  return (
    <div id="main-nav" as="nav" className={`z-40 fixed w-full bg-white/90 backdrop-blur-xs py-3 top-0`}>
      <>
        <div className="mx-auto max-w-[1000px] text-sm px-2 rounded-xl">
          <div
            className={` transition transition-all duration-700 ease-in-out relative flex items-center justify-between h-10`}
          >
            <div className="sm:hidden absolute inset-y-0 left-0 flex items-center">
              {/* <!-- Mobile menu button--> */}
              <button
                onClick={toggleMobileNav}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>

                {mobileNavOpen ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <Link href="/" as="/">
                <div
                  className={`flex-shrink-0  flex items-center cursor-pointer transition transition-all duration-300 ease-in-out`}
                >
                  <img
                    className="lg:block h-8 w-auto"
                    data-gumlet="false"
                    src={`/static/images/logo-small.svg`}
                    alt="Prototypr Logo"
                  />
                </div>
              </Link>
              {tool ? (
                <div className="my-auto ml-3">
                  <div className="p-2 py-0.5 text-xs bg-pink-100 text-pink-900 rounded-full border border-pink-200">
                    Interview
                  </div>
                </div>
              ) : null}
              <div className="my-auto ml-3">{statusComponent}</div>
              {/* Undo/redo */}
              <div id="undoredo-container"></div>
            </div>
            <div
              className={`hidden sm:block sm:ml-6 transition transition-all duration-500 ease-in-out`}
            >
              <div className="flex ">
                {/* {editorButtons} */}
                <div
                  className="my-auto flex mr-3"
                  id="editor-nav-buttons"
                ></div>

                <NavigationMenuDemo
                  showWriteButton={false}
                  showSponsorButton={false}
                  showJobsButton={false}
                  hideLocaleSwitcher={true}
                  user={user}
                  userLoading={false}
                  userLoggedInCookie={userLoggedInCookie}
                  activeNav={activeNav}
                  editor={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div
          className={`sm:hidden relative ${
            !mobileNavOpen ? "h-0 overflow-hidden" : ""
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavigationMenuMobile
              user={user}
              userLoggedInCookie={userLoggedInCookie}
              userLoading={false}
              activeNav={activeNav}
            />
          </div>
        </div>
      </>
   
    </div>
  );
}
