import React from "react";
import dynamic from "next/dynamic";
import { styled } from '../stitches.config';
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { indigo, gray } from "@radix-ui/colors";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfileBadge = dynamic(() => import("./ProfileBadge"));

const LocaleSwitcher = dynamic(() => import("./Locale/LocaleSwitcher"), {
  ssr: true,
});

import { useIntl } from "react-intl";

const StyledMenu = styled(NavigationMenuPrimitive.Root, {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "auto",
  zIndex: 1,
});

const StyledList = styled(NavigationMenuPrimitive.List, {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  // backgroundColor: 'white',
  padding: 4,
  borderRadius: 6,
  listStyle: "none",
});

const itemStyles = {
  padding: "10px 14px",
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
  padding: "10px 14px",
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
  const router = useRouter();
  const isActive = Boolean(router.asPath == props.href);
  return (
    <Link href={props.href} passHref>
      <StyledLink asChild>
        <a
          style={props.css}
          className={
            isActive
              ? "bg-blue-50 border border-blue-100 border-1 text-blue-700"
              : ""
          }
          {...props}
        >
          {children}
        </a>
      </StyledLink>
    </Link>
  );
};
const NextButton = ({ children, ...props }) => {
  const router = useRouter();
  const isActive = Boolean(router.asPath == props.href);
  return (
    <Link href={props.href} passHref>
      <StyledButton asChild>
        <a
          style={props.css}
          className={
            isActive
              ? "bg-blue-50 border border-blue-100 border-1 text-blue-700"
              : ""
          }
          {...props}
        >
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
  user,
  userLoading,
  userLoggedInCookie,
}) => {
  const intl = useIntl();
  const title3 = intl.formatMessage({ id: "navbar.menu.title3" });

  return (
    <NavigationMenu className="sm:hidden">
      <NavigationMenuList>
        <NavigationMenuItem className="block flex py-2 flex-col justify-center">
          <NavigationMenuLink href="/posts/accessibility">
            Accessibility
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="block flex py-2 flex-col justify-center">
          <NavigationMenuLink href="/posts/interview">
            Interviews
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="block flex py-2 flex-col justify-center">
          <NavigationMenuLink href="/posts/ux">UX Design</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="block flex py-2 flex-col justify-center">
          <NavigationMenuLink href="/posts/ui">UI Design</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="block flex py-2 flex-col justify-center">
          <NavigationMenuLink href="/toolbox">Toolbox</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="block flex py-2 flex-col justify-center">
          <NavigationMenuLink href="/post/write-for-us">
            {title3}
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="block flex py-2 flex-col justify-center">
          <NavigationMenuLink href="/post/web-monetization-payment-pointer">
            Web Monetization
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="py-2 flex">
          {user && user.isLoggedIn ? (
            <div className="ml-2">
              <Link href="/account">
                {user && (
                  <ProfileBadge
                    user={user}
                    icon={
                      <img
                        className="hover:shadow border border-1 rounded-full my-auto w-8 h-8 cursor-pointer"
                        src={
                          user?.avatar?.url
                            ? user.avatar.url
                            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                        }
                      />
                    }
                  />
                )}
              </Link>
            </div>
          ) : userLoading && userLoggedInCookie ? (
            <div className="bg-gray-200 hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"></div>
          ) : (
            <NavigationMenuButton href="/newsletter">
              {intl.formatMessage({ id: "navbar.menu.title4" })}
            </NavigationMenuButton>
          )}
          <div className="ml-3">
            <LocaleSwitcher />
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;
