import dynamic from "next/dynamic";
import jsCookie from "js-cookie";
import { useState, useEffect } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
const ProfileBadge = dynamic(() => import("../ProfileBadge"));
const NewsletterNav = dynamic(() => import("../NewsletterNav"), {
  ssr: true,
});
// Exports
const NavigationMenuItem = NavigationMenuPrimitive.Item;

const UserMenu = ({ user, userLoading }) => {
  const [clientMounted, setClientMounted] = useState(false);
  useEffect(() => {
    setClientMounted(true);
  }, []);

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

  return (
    <>
      {clientMounted ? (
        <NavigationMenuItem className="flex flex-col justify-center">
          {user && user?.isLoggedIn ? (
            <div className="ml-2 w-8">
              {user && (
                <ProfileBadge
                  user={user}
                  icon={
                    <img
                      className="hover:shadow border border-1 rounded-full my-auto w-8 h-8 cursor-pointer object-cover"
                      src={
                        user?.avatar?.url
                          ? user.avatar.url
                          : "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/4f9713374ad556ff3b8ca33e241f6c43.png?updated_at=2022-12-14T10:55:38.818Z"
                      }
                    />
                  }
                />
              )}
            </div>
          ) : userLoading && userLoggedInCookie ? (
            <div className="bg-gray-200 hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"></div>
          ) : (
            <a href="/write">
              <button className="py-2 px-4 sm:px-6 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-inter">
                Write
              </button>
            </a>
            // <NewsletterNav collapsed={false} />
          )}
        </NavigationMenuItem>
      ) : userLoggedInCookie ? (
        <NavigationMenuItem className="flex flex-col justify-center">
          <div className="bg-gray-200 hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"></div>
        </NavigationMenuItem>
      ) : (
        <a href="/write">
        <button className="py-2 px-4 sm:px-6 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-inter">
          Write
        </button>
      </a>
      )}
    </>
  );
};

export default UserMenu;
