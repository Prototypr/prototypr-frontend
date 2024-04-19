import dynamic from "next/dynamic";
import jsCookie from "js-cookie";
import { useState, useEffect } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Button from "../Primitives/Button";
import NewPostDialog from "./parts/NewPostDialog";
const ProfileBadge = dynamic(() => import("../ProfileBadge"));
// const NewsletterNav = dynamic(() => import("../NewsletterNav"), {
//   ssr: true,
// });
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
        <NavigationMenuItem className="flex flex-col justify-center" style={{zIndex:999}}>
          {user && user?.isLoggedIn ? (
            <div className="w-8 mt-[4px] mr-1.5">
              {user && (
                <ProfileBadge
                  user={user}
                  icon={
                    <img
                      className="hover:shadow border border-1 rounded-full my-auto w-full h-fullcursor-pointer object-cover"
                      src={
                        user?.profile?.avatar?.url
                          ? user.profile?.avatar.url
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
            <div className="hidden lg:flex">
              <Link className="my-auto" href="/onboard?signin=true">
                <div className="flex cursor-pointer text-gray-700 text-sm mr-4">
                  <div className="my-auto font-medium">Log in</div>
                </div>
              </Link>
              <Link href="/onboard">
              <Button className="text-sm bg-blue-600 hover:bg-blue-500 rounded-xl" variant={"confirmRounded"}>
              Sign up
            </Button>
            </Link>
            </div>
            // <NewsletterNav collapsed={false} />
          )}
        </NavigationMenuItem>
      ) : userLoggedInCookie ? (
        
        <NewPostDialog/>
      ) : (
        <></>
      //   <Link href="/onboard">
      //   <Button variant={"confirmRounded"}>
      //     New post
      //   </Button>
      // </Link>
      )}
    </>
  );
};

export default UserMenu;
