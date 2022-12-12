import React from "react";
import dynamic from "next/dynamic";
import Button from "../../Primitives/Button";

import Link from "next/link";

import { NavigationMenuItem, NavigationMenuLink } from "@/components/Primitives/Navigation";

const LocaleSwitcher = dynamic(() => import("../../Locale/LocaleSwitcher"), {
  ssr: true,
});

import { useIntl } from "react-intl";


export const LocationMenu = ({
  collapsed,
  user,
  hideLocaleSwitcher,
  editor,
  showWriteButton
}) => {
  const intl = useIntl();
  const title3 = intl.formatMessage({ id: "navbar.menu.title3" });

  return (
   <>
       {!hideLocaleSwitcher && <LocaleSwitcher showWriteButton={showWriteButton} collapsed={collapsed} />}

        {(!user || !user?.isLoggedIn)?<NavigationMenuItem
          className={`hidden md:block md:flex md:flex-col md:justify-center`}
        >
         {!hideLocaleSwitcher &&  <NavigationMenuLink href="/post/write-for-us">
            {title3}
          </NavigationMenuLink>}
        </NavigationMenuItem>
        
        :((user && !editor) && showWriteButton!==false)&&
        <NavigationMenuItem
        className={`hidden ml-4 md:block md:flex md:flex-col md:justify-center`}
      >
        <Link href="/write">
         <Button className="flex"type="" variant="confirmRounded">
         <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z" fill="currentColor"/></svg>
          Write
         </Button>
        </Link>
         </NavigationMenuItem>
        }
   </>
  );
};

export default LocationMenu;