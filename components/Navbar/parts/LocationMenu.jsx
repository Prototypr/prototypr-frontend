import React from "react";
import dynamic from "next/dynamic";

import {
  NavigationMenuItem,
} from "@/components/Primitives/Navigation";

const LocaleSwitcher = dynamic(() => import("../../Locale/LocaleSwitcher"), {
  ssr: true,
});

import { useIntl } from "react-intl";
import NewPostDialog from "./NewPostDialog";
import NotificationButton from "./NotificationButton";

export const LocationMenu = ({
  collapsed,
  user,
  hideLocaleSwitcher,
  editor,
  showWriteButton,
  sessionUser,
}) => {
  const intl = useIntl();
  const title3 = intl.formatMessage({ id: "navbar.menu.title3" });

  return (
    <>
      {/* {!hideLocaleSwitcher && <LocaleSwitcher showWriteButton={showWriteButton} collapsed={collapsed} />} */}

      {(!user || !user?.isLoggedIn) && !sessionUser ? (
        <NavigationMenuItem
          className={`hidden md:block md:flex md:flex-col md:justify-center`}
        >
          {/* {!hideLocaleSwitcher &&  <NavigationMenuLink href="/post/write-for-us">
            {title3}
          </NavigationMenuLink>} */}
        </NavigationMenuItem>
      ) : (
        (user || sessionUser) &&
        !editor &&
        showWriteButton !== false && (
          <NavigationMenuItem
            className={`hiddenlg:block lg:flex lg:flex-col lg:justify-center mr-2`}
          >
            <NewPostDialog />
            {/* <Link href="/write">
              <div className="flex text-gray-700 text-sm mr-3">
                  <NotePencil size={22} className="mr-1.5" />
                 <div className="my-auto font-medium">New post</div>
              </div>
            </Link> */}
          </NavigationMenuItem>
        )
      )}
     <NotificationButton user={user}/>
    </>
  );
};

export default LocationMenu;
