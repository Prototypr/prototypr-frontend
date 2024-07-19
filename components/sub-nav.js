import React from "react";
import { keyframes } from "@stitches/react";
import { styled } from "../stitches.config";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { indigo, mauve, green, teal } from "@radix-ui/colors";
import Link from "next/link";
import { useRouter } from "next/router";

import { FormattedMessage, useIntl } from "react-intl";
const enterFromRight = keyframes({
  from: { transform: "translateX(200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: "translateX(-200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(200px)", opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(-200px)", opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

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
  // fontSize: 15,
  //   color: indigo.indigo11,
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  "&:hover": { backgroundColor: indigo.indigo3, color: indigo.indigo11 },
};

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: "unset",
  ...itemStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
});

const CustomTrigger = ({ children, to, ...props }) => {
  const isActive = props.active;

  return (
    <div
      className="rounded-md"
      style={{
        background: isActive ? indigo.indigo3 : "",
        color: isActive ? indigo.indigo9 : "",
      }}
    >
      <StyledTrigger active={isActive.toString()}>{children}</StyledTrigger>
    </div>
  );
};

const StyledCaret = styled(CaretDownIcon, {
  position: "relative",
  color: indigo.indigo10,
  top: 1,
  "[data-state=open] &": { transform: "rotate(-180deg)" },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "transform 250ms ease",
  },
});

const StyledTriggerWithCaret = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <CustomTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledCaret aria-hidden />
    </CustomTrigger>
  )
);

const StyledLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  display: "block",
  textDecoration: "none",
  // fontSize: 15,
  lineHeight: 1,
});

const StyledContent = styled(NavigationMenuPrimitive.Content, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  "@media only screen and (min-width: 600px)": { width: "auto" },
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "250ms",
    animationTimingFunction: "ease",
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
  },
});

const StyledIndicator = styled(NavigationMenuPrimitive.Indicator, {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: 10,
  top: "100%",
  overflow: "hidden",
  zIndex: 1,

  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, transform 250ms ease",
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  },
});

const StyledArrow = styled("div", {
  position: "relative",
  top: "70%",
  backgroundColor: "white",
  width: 10,
  height: 10,
  transform: "rotate(45deg)",
  borderTopLeftRadius: 2,
});

const StyledIndicatorWithArrow = React.forwardRef((props, forwardedRef) => (
  <StyledIndicator {...props} ref={forwardedRef}>
    <StyledArrow />
  </StyledIndicator>
));

const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
  position: "absolute",
  transformOrigin: "top center",
  marginTop: 10,
  width: "100vw",
  backgroundColor: "white",
  borderRadius: 6,
  overflow: "hidden",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  height: "var(--radix-navigation-menu-viewport-height)",

  "@media only screen and (min-width: 600px)": {
    width: "var(--radix-navigation-menu-viewport-width)",
  },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, height, 300ms ease",
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  },
});

const NextLink = ({ children, ...props }) => {
  const router = useRouter();
  // const isActive = Boolean(router.asPath.indexOf(props.href) > -1);
  // dunno why , but this makes all subnavs blue (menu popdown things), seems to work without
  const isActive = false
  return (
    <Link href={props.href} passHref>
      <StyledLink asChild>
        <span
          style={props.css}
          className={
            isActive
              ? "bg-blue-50 border border-blue-100 border-1 text-blue-default"
              : ""
          }
          {...props}
        >
          {children}
        </span>
      </StyledLink>
    </Link>
  );
};

// Exports
const NavigationMenu = StyledMenu;
const NavigationMenuList = StyledList;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = StyledTriggerWithCaret;
const NavigationMenuLink = NextLink;
const NavigationMenuContent = StyledContent;
const NavigationMenuViewport = StyledViewport;
const NavigationMenuIndicator = StyledIndicatorWithArrow;

// Your app...
const ContentList = styled("ul", {
  display: "grid",
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: "none",

  variants: {
    layout: {
      one: {
        "@media only screen and (min-width: 600px)": {
          width: 500,
          gridTemplateColumns: ".75fr 1fr",
        },
      },
      two: {
        "@media only screen and (min-width: 600px)": {
          width: 600,
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(3, 1fr)",
        },
      },
      three: {
        "@media only screen and (min-width: 600px)": {
          width: 650,
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(3, 1fr)",
        },
      },
    },
  },
});

const ListItem = styled("li", {});

const LinkTitle = styled("div", {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: indigo.indigo12,
});

const LinkText = styled("p", {
  all: "unset",
  color: mauve.mauve11,
  lineHeight: 1.4,
  fontWeight: "initial",
});

const ContentListItem = React.forwardRef(
  ({ children, title, ...props }, forwardedRef) => (
    <ListItem>
      <NavigationMenuLink
        {...props}
        ref={forwardedRef}
        css={{
          padding: 12,
          borderRadius: 6,
          "&:hover": { backgroundColor: mauve.mauve3 },
        }}
      >
        <LinkTitle>{title}</LinkTitle>
        <LinkText>{children}</LinkText>
      </NavigationMenuLink>
    </ListItem>
  )
);

const ContentListItemCallout = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <ListItem css={{ gridRow: "span 3" }}>
      <NavigationMenuLink
        {...props}
        href="/web-monetization"
        ref={forwardedRef}
        css={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${teal.teal4} 0%, ${green.green4} 100%)`,
          borderRadius: 6,
          padding: 25,
        }}
      >
        <LinkTitle
          css={{
            fontSize: 18,
            color: "#222",
            marginTop: 16,
            marginBottom: 7,
          }}
        >
          <img
            className="w-14 mb-4 -ml-0.5"
            data-gumlet="false"
            src="/static/images/icons/wm-icon-animated.svg"
          />
          <FormattedMessage id="navbar.webmonetization.title" />
        </LinkTitle>
        <LinkText
          css={{
            // fontSize: 14,
            color: "#444",
            lineHeight: 1.3,
          }}
        >
          <FormattedMessage id="navbar.webmonetization.desc" />
        </LinkText>
      </NavigationMenuLink>
    </ListItem>
  )
);

const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  top: "100%",
  left: 0,
  // left: '-10%',

  perspective: "2000px",
});

export const NavigationMenuDemo = ({ activeNav, collapse }) => {
  const intl = useIntl();
  const title1 = intl.formatMessage({ id: "navbar.menu.title1" });
  const title2 = intl.formatMessage({ id: "navbar.menu.title2" });
  const title3 = intl.formatMessage({ id: "navbar.menu.title3" });

  const submenuTitle1 = intl.formatMessage({ id: "navbar.submenu1.title1" });
  const submenuDesc1 = intl.formatMessage({ id: "navbar.submenu1.desc1" });

  const submenuTitle2 = intl.formatMessage({ id: "navbar.submenu1.title2" });
  const submenuDesc2 = intl.formatMessage({ id: "navbar.submenu1.desc2" });

  const submenuTitle3 = intl.formatMessage({ id: "navbar.submenu1.title3" });
  const submenuDesc3 = intl.formatMessage({ id: "navbar.submenu1.desc3" });

  const submenuTitle4 = intl.formatMessage({ id: "navbar.submenu1.title4" });
  const submenuDesc4 = intl.formatMessage({ id: "navbar.submenu1.desc4" });

  const submenuTitle5 = intl.formatMessage({ id: "navbar.submenu1.title5" });
  const submenuDesc5 = intl.formatMessage({ id: "navbar.submenu1.desc5" });

  const submenuTitle6 = intl.formatMessage({ id: "navbar.submenu1.title6" });
  const submenuDesc6 = intl.formatMessage({ id: "navbar.submenu1.desc6" });

  const submenu2Title1 = intl.formatMessage({ id: "navbar.submenu2.title1" });
  const submenu2Desc1 = intl.formatMessage({ id: "navbar.submenu2.desc1" });

  const submenu2Title2 = intl.formatMessage({ id: "navbar.submenu2.title2" });
  const submenu2Desc2 = intl.formatMessage({ id: "navbar.submenu2.desc2" });

  const submenu2Title3 = intl.formatMessage({ id: "navbar.submenu2.title3" });
  const submenu2Desc3 = intl.formatMessage({ id: "navbar.submenu2.desc3" });

  const submenu2Title4 = intl.formatMessage({ id: "navbar.submenu2.title4" });
  const submenu2Desc4 = intl.formatMessage({ id: "navbar.submenu2.desc4" });

  const submenu2Title5 = intl.formatMessage({ id: "navbar.submenu2.title5" });
  const submenu2Desc5 = intl.formatMessage({ id: "navbar.submenu2.desc5" });

  const submenu2Title6 = intl.formatMessage({ id: "navbar.submenu2.title6" });
  const submenu2Desc6 = intl.formatMessage({ id: "navbar.submenu2.desc6" });

  return (
    <div
      className={`hidden md:flex justify-between space-x-4 w-full transition transition-all duration-700 ease-in-out relative py-2 uppercase text-sm`}
    >
      <NavigationMenu>
        <Link href="/">
          <img
            className={`cursor-pointer my-auto h-8 ${
              collapse ? "w-0 opacity-0" : "w-8 opacity-1"
            } transition transition-all duration-300 ease-in-out`}
            src="/static/images/logo-small.svg"
            data-gumlet="false"
            alt="Prototypr Logo"
          />
        </Link>
        <Link href="/">
          <p
            className={`cursor-pointer  hidden xl:block leading-4 text-base my-auto h-8 font-semibold normal-case ${
              collapse ? "w-0 opacity-0" : "w-auto opacity-1 ml-3"
            } transition transition-all duration-150 ease-in-out`}
          >
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-default to-blue-dark">
              <FormattedMessage id="navbar.tagline.small.piece1" />
            </span>
            <br />
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-default to-blue-dark">
              <FormattedMessage id="navbar.tagline.small.piece2" />
            </span>
          </p>
        </Link>
        <div
          className={`${
            collapse ? "" : "ml-10"
          } transition transition-all duration-300 ease-in-out`}
        >
          <NavigationMenuList>
            <NavigationMenuItem className="hidden -ml-4 text-sm md:text-base xl:mr-2.5 md:block md:flex md:flex-col md:justify-center">
              <NavigationMenuLink href="/topic/accessibility">
                {submenuTitle4}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden text-sm md:text-base xl:mr-2.5 md:block md:flex md:flex-col md:justify-center">
              <NavigationMenuLink href="/topic/interview">
                {submenuTitle3}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden text-sm md:text-base xl:mr-2.5 md:block md:flex md:flex-col md:justify-center">
              <NavigationMenuLink href="/topic/ux">
                {submenuTitle2}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden text-sm md:text-base xl:mr-2.5 md:block md:flex md:flex-col md:justify-center">
              <NavigationMenuLink href="/topic/ui">
                {submenuTitle5}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex text-sm md:text-base xl:mr-2.5 flex-col justify-center">
              {/* <NavigationMenuTrigger active={activeNav === "posts"}> */}
              <NavigationMenuTrigger active={""}>
                {title1}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="normal-case">
                <ContentList layout="three">
                  <ContentListItemCallout />
                  <ContentListItem href="/topics" title={submenuTitle1}>
                    {submenuDesc1}
                  </ContentListItem>
                  <ContentListItem
                    href="/topic/ux/page/1"
                    title={submenuTitle2}
                  >
                    {submenuDesc2}
                  </ContentListItem>
                  <ContentListItem
                    href="/topic/interview/page/1"
                    title={submenuTitle3}
                  >
                    {submenuDesc3}
                  </ContentListItem>
                  <ContentListItem
                    href="/topic/accessibility/page/1"
                    title={submenuTitle4}
                  >
                    {submenuDesc4}
                  </ContentListItem>
                  <ContentListItem
                    href="/topic/ui/page/1"
                    title={submenuTitle5}
                  >
                    {submenuDesc5}
                  </ContentListItem>
                  <ContentListItem
                    href="/topic/code/page/1"
                    title={submenuTitle6}
                  >
                    {submenuDesc6}
                  </ContentListItem>
                </ContentList>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="flex flex-col text-sm md:text-base xl:mr-2.5 justify-center">
              <NavigationMenuTrigger active={activeNav === "toolbox"}>
                {title2}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="normal-case">
                <ContentList layout="two">
                  <ContentListItem
                    title={submenu2Title1}
                    href="/toolbox"
                  >
                    {submenu2Desc1}
                  </ContentListItem>
                  <ContentListItem
                    title={submenu2Title2}
                    href="/toolbox/ux-tools/page/1"
                  >
                    {submenu2Desc2}
                  </ContentListItem>
                  <ContentListItem
                    title={submenu2Title3}
                    href="/toolbox/augmented-reality-tools/page/1"
                  >
                    {submenu2Desc3}
                  </ContentListItem>
                  <ContentListItem
                    title={submenu2Title4}
                    href="/prototyping/page/1"
                  >
                    {submenu2Desc4}
                  </ContentListItem>
                  <ContentListItem
                    title={submenu2Title5}
                    href="/toolbox/accessibility/page/1"
                  >
                    {submenu2Desc5}
                  </ContentListItem>
                  <ContentListItem
                    title={submenu2Title6}
                    href="/toolbox/conversational-design-tools/page/1"
                  >
                    {submenu2Desc6}
                  </ContentListItem>
                </ContentList>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
        <NavigationMenuIndicator />
        <ViewportPosition className="ml-0 ml-36">
          <NavigationMenuViewport />
        </ViewportPosition>
      </NavigationMenu>

      {/* tagline */}
      <p
        className={`my-auto  hidden xl:block normal-case font-medium ${
          !collapse
            ? "opacity-0 -z-10 absolute right-0 pt-3.5 text-gray-50 -mr-12 text-xs"
            : "text-base"
        } transition transition-all duration-200 ease-in-out `}
      >
        <FormattedMessage id="navbar.tagline.piece1" />{" "}
        <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-default to-blue-dark">
          <FormattedMessage id="navbar.tagline.piece2" />
        </span>{" "}
        <FormattedMessage id="navbar.tagline.piece3" />
      </p>
    </div>
  );
};

export default NavigationMenuDemo;
