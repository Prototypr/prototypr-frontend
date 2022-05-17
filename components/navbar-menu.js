import React from "react";
import dynamic from "next/dynamic";
import { styled } from "@stitches/react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { indigo, gray } from "@radix-ui/colors";
import Link from "next/link";
const ProfileBadge = dynamic(() => import("./ProfileBadge"));

const LocaleSwitcher = dynamic(() => import("./Locale/LocaleSwitcher"), {
  ssr: true,
});

import { FormattedMessage, useIntl } from "react-intl";

const StyledMenu = styled(NavigationMenuPrimitive.Root, {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  width: "auto",
  zIndex: 1,
});

const StyledList = styled(NavigationMenuPrimitive.List, {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  // backgroundColor: 'white',
  padding: 4,
  borderRadius: 6,
  listStyle: "none",
});

const itemStyles = {
  padding: "8px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  //   color: indigo.indigo11,
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  "&:hover": { backgroundColor: indigo.indigo3, color: indigo.indigo11 },
};
const itemButtonStyles = {
  padding: "8px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  marginLeft: "6px",
  color: gray.gray1,
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  "&:hover": { backgroundColor: indigo.indigo9, color: gray.gray1 },
};

const StyledLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  display: "block",
  textDecoration: "none",
  fontSize: 15,
  lineHeight: 1,
});

const StyledButton = styled(NavigationMenuPrimitive.Link, {
  ...itemButtonStyles,
  display: "block",
  background: indigo.indigo10,
  textDecoration: "none",
  fontSize: 15,
  lineHeight: 1,
});

const NextLink = ({ children, ...props }) => {
  return (
    <Link href={props.href} passHref>
      <StyledLink asChild>
        <a style={props.css} {...props}>
          {children}
        </a>
      </StyledLink>
    </Link>
  );
};
const NextButton = ({ children, ...props }) => {
  return (
    <Link href={props.href} passHref>
      <StyledButton asChild>
        <a style={props.css} {...props}>
          {children}
        </a>
      </StyledButton>
    </Link>
  );
};

// Exports
const NavigationMenu = StyledMenu;
const NavigationMenuList = StyledList;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuLink = NextLink;
const NavigationMenuButton = NextButton;

export const NavigationMenuDemo = ({
  collapsed,
  user,
  userLoading,
  userLoggedInCookie,
}) => {
  const intl = useIntl();
  const title3 = intl.formatMessage({ id: "navbar.menu.title3" });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <LocaleSwitcher collapsed={collapsed} />

        <NavigationMenuItem
          className={`hidden mr-3 md:block ${
            !collapsed ? "md:opacity-0 md:flex md:invisible" : "md:flex"
          } transition transition-all duration-500 ease-in-out md:flex-col md:justify-center`}
        >
          <NavigationMenuLink href="/post/write-for-us">
            {title3}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex flex-col justify-center">
          {user && user.isLoggedIn ? (
            <div className="ml-2">
              <Link href="/account">
                {user && 
                  <ProfileBadge
                  user={user}
                    icon={
                      <img
                        className="hover:shadow border border-1 rounded-full my-auto w-8 h-8 cursor-pointer object-cover"
                        src={user?.avatar?.url?user.avatar.url:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}
                      />
                    }
                  />}
              </Link>
            </div>
          ) : userLoading && userLoggedInCookie ? (
            <div className="bg-gray-200 hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"></div>
          ) : (
            <NavigationMenuButton href="/newsletter">
              {intl.formatMessage({ id: "navbar.menu.title4" })}
            </NavigationMenuButton>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>

    </NavigationMenu>
  );
};

export default NavigationMenuDemo;