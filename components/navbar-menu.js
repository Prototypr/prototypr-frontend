import React from "react";
import dynamic from "next/dynamic";
import { styled, keyframes } from "@stitches/react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import {
  indigo,
  mauve,
  red,
  pink,
  gray,
} from "@radix-ui/colors";
import Link from "next/link";

const Gravatar = dynamic(() => import("react-gravatar"), { ssr: false });
const LocaleSwitcher = dynamic(() => import("./Locale/LocaleSwitcher"), { ssr: true });

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
  fontSize: 15,
  //   color: indigo.indigo11,
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${indigo.indigo7}` },
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
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${indigo.indigo7}` },
  "&:hover": { backgroundColor: indigo.indigo9, color: gray.gray1 },
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
  // const resolved = useResolvedPath(href);
  // const match = useMatch({ path: resolved.pathname, end: true });
  // const isActive = Boolean(match);
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

// Exports
const NavigationMenu = StyledMenu;
const NavigationMenuList = StyledList;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = StyledTriggerWithCaret;
const NavigationMenuLink = NextLink;
const NavigationMenuButton = StyledButton;
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
        href="/post/the-freemium-web-youve-read-all-your-free-articles-this-month"
        ref={forwardedRef}
        css={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${pink.pink9} 0%, ${red.red9} 100%)`,
          borderRadius: 6,
          padding: 25,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          viewBox="0 0 491 526"
          fill="none"
        >
          <path
            d="M183.8 298.94C189.972 309.815 203.98 313.674 214.773 307.331L478.683 152.261C489.476 145.917 493.199 131.64 487.027 120.765L425.297 11.9446C419.125 1.0656 405.117 -2.7894 394.324 3.5501L130.414 158.63C119.621 164.974 115.898 179.247 122.07 190.126L183.8 298.94ZM198.894 290.069L137.16 181.249C135.586 178.468 136.426 175.386 139.051 173.843L402.961 18.7727C405.586 17.2297 408.629 18.0305 410.203 20.8079L471.933 129.628C473.511 132.405 472.667 135.487 470.042 137.03L206.132 292.11C203.511 293.649 200.464 292.852 198.89 290.071L198.894 290.069Z"
            fill="white"
          />
          <path
            d="M135.26 186.2C133.576 186.165 131.916 186.61 130.483 187.493L103.807 203.188C93.0097 209.532 89.3027 223.641 95.4747 234.516L132.612 299.946C138.784 310.825 152.952 314.751 163.749 308.411L190.487 292.712C194.662 290.27 196.065 284.907 193.619 280.732C191.178 276.56 185.811 275.158 181.639 277.599L154.897 293.294C152.272 294.837 149.433 294.071 147.858 291.294L110.717 225.86C109.139 223.083 110.03 219.844 112.655 218.305L139.331 202.606C142.796 200.692 144.542 196.688 143.589 192.845C142.636 189.001 139.221 186.278 135.261 186.2L135.26 186.2Z"
            fill="white"
          />
          <path
            d="M132.88 273.73C131.778 273.699 130.685 273.875 129.65 274.246L50.3955 301.57C48.1064 302.245 46.1924 303.827 45.0986 305.949C44.0048 308.07 43.8252 310.546 44.5986 312.804C45.3759 315.062 47.04 316.906 49.208 317.906C51.376 318.906 53.8564 318.976 56.0791 318.105L135.395 290.781C139.43 289.441 141.915 285.402 141.294 281.199C140.672 276.996 137.125 273.847 132.879 273.73L132.88 273.73Z"
            fill="white"
          />
          <path
            d="M109.81 234.71C107.865 234.858 106.021 235.651 104.579 236.968L41.6695 293.23C39.939 294.781 38.8922 296.953 38.7672 299.273C38.6383 301.593 39.4391 303.867 40.9899 305.597C42.5407 307.327 44.7126 308.374 47.0329 308.499C49.3532 308.628 51.6306 307.827 53.3571 306.277L116.205 250.015C119.033 247.538 119.963 243.534 118.514 240.065C117.064 236.597 113.561 234.44 109.811 234.71L109.81 234.71Z"
            fill="white"
          />
          <path
            d="M55.11 295.43L39.93 304.086L45.6136 314.16L60.8596 305.504L55.11 295.43Z"
            fill="white"
          />
          <path
            d="M152.45 261.71C151.079 261.812 149.751 262.23 148.575 262.94L128.098 275.018C125.922 276.097 124.297 278.034 123.606 280.358C122.914 282.686 123.219 285.198 124.45 287.288C125.68 289.382 127.723 290.87 130.094 291.397C132.465 291.921 134.946 291.44 136.946 290.065L157.423 278.053C160.989 276.034 162.677 271.811 161.485 267.889C160.29 263.968 156.536 261.401 152.45 261.71L152.45 261.71Z"
            fill="white"
          />
          <path
            d="M130.29 222.7C128.919 222.798 127.595 223.22 126.415 223.927L105.938 236.005C103.856 237.145 102.329 239.079 101.7 241.368C101.071 243.657 101.399 246.102 102.61 248.141C103.817 250.184 105.805 251.649 108.114 252.196C110.422 252.747 112.852 252.333 114.852 251.055L135.262 239.039C138.832 237.024 140.52 232.797 139.325 228.875C138.133 224.957 134.375 222.387 130.289 222.7L130.29 222.7Z"
            fill="white"
          />
          <path
            d="M142.24 241.69C140.869 241.792 139.545 242.21 138.365 242.921L117.955 254.933C115.951 256.108 114.494 258.026 113.904 260.276C113.318 262.522 113.646 264.909 114.822 266.917C115.994 268.921 117.916 270.378 120.162 270.964C122.412 271.55 124.799 271.222 126.803 270.046L147.28 258.034C150.865 256.01 152.557 251.764 151.342 247.835C150.131 243.901 146.342 241.343 142.24 241.69L142.24 241.69Z"
            fill="white"
          />
          <path
            d="M42.77 341.55C41.6997 341.597 40.6489 341.835 39.6684 342.261C16.1454 351.937 0.00839233 370.781 0.00839233 392.577C0.00839233 414.373 16.1454 433.28 39.6684 442.96C63.1914 452.636 91.2664 452.636 114.789 442.96C116.946 442.081 118.668 440.382 119.571 438.237C120.473 436.089 120.481 433.671 119.598 431.515C118.715 429.358 117.008 427.643 114.856 426.749C112.707 425.854 110.285 425.854 108.137 426.745C89.2889 434.499 65.1679 434.499 46.3249 426.745C27.4769 418.991 17.5159 405.64 17.5159 392.577C17.5159 379.514 27.4768 366.225 46.3249 358.472H46.321C50.3522 356.949 52.6726 352.71 51.7858 348.492C50.903 344.273 47.0749 341.327 42.7702 341.55L42.77 341.55Z"
            fill="white"
          />
          <path
            d="M154.38 400.13C135.786 396.587 115.431 398.345 97.282 405.814C95.1297 406.696 93.4187 408.396 92.5203 410.54C91.6258 412.685 91.618 415.095 92.5008 417.247C93.3797 419.396 95.0828 421.107 97.2274 422.005C99.3719 422.9 101.782 422.907 103.934 422.025C133.129 410.013 171.778 418.083 187.321 437.267C195.095 446.856 196.314 456.372 192.814 465.689C189.31 475.005 180.349 484.294 165.752 490.298H165.748C161.271 492.137 159.13 497.255 160.97 501.732C162.806 506.208 167.923 508.349 172.4 506.513C190.552 499.044 203.588 486.697 209.154 471.892C214.721 457.087 212.088 440.033 200.951 426.29C189.814 412.548 172.974 403.669 154.381 400.13L154.38 400.13Z"
            fill="white"
          />
          <path
            d="M60.21 360.67C59.1436 360.713 58.0928 360.955 57.1123 361.381C43.3393 367.045 33.2103 378.479 33.2103 392.256C33.2103 406.029 43.3353 417.467 57.1083 423.131C70.8813 428.795 86.9363 428.795 100.706 423.131L100.71 423.127C103.003 422.354 104.87 420.666 105.874 418.463C106.878 416.26 106.921 413.74 105.999 411.506C105.077 409.268 103.273 407.51 101.011 406.654C98.7454 405.799 96.2298 405.916 94.0579 406.982C84.9641 410.725 72.8589 410.725 63.7649 406.982C54.6672 403.24 50.6519 397.295 50.6519 392.255C50.6519 387.216 54.6675 381.271 63.7649 377.528V377.525C67.6946 375.935 69.9172 371.759 69.0422 367.61C68.1711 363.462 64.4484 360.536 60.2102 360.669L60.21 360.67Z"
            fill="white"
          />
          <path
            d="M142.43 423.06C131.629 421.005 119.91 422.119 109.293 426.482C107 427.259 105.133 428.947 104.129 431.15C103.125 433.349 103.082 435.869 104.004 438.107C104.926 440.345 106.73 442.099 108.996 442.958C111.258 443.814 113.773 443.697 115.945 442.63C130.066 436.822 149.472 441.291 156.316 449.736C160.324 454.685 161.242 458.755 160.707 461.427C160.176 464.099 158.336 467.114 151.277 470.017C149.129 470.899 147.414 472.599 146.519 474.743C145.621 476.888 145.613 479.302 146.496 481.45C147.379 483.603 149.078 485.314 151.223 486.208C153.367 487.107 155.781 487.114 157.93 486.231C168.547 481.864 176.032 474.166 177.891 464.849C179.746 455.536 176.078 446.337 169.879 438.689C163.098 430.317 153.231 425.115 142.43 423.06L142.43 423.06Z"
            fill="white"
          />
          <path
            d="M39.67 342.26L46.3223 358.471C55.3575 354.756 59.6273 357.717 60.3383 358.666C60.6938 359.139 60.561 358.842 60.5336 358.924C60.5024 359.006 60.1039 360.147 57.1117 361.377L63.764 377.525C70.0296 374.951 74.928 370.576 77.002 364.865C79.0801 359.158 77.7598 352.748 74.3536 348.201C67.545 339.111 53.9126 336.4 39.6696 342.26L39.67 342.26Z"
            fill="white"
          />
          <path
            d="M151.28 470.02C144.241 472.914 138.854 477.039 136.425 483.067C133.995 489.094 135.816 496.063 139.46 500.376C146.749 509.005 159.733 511.724 172.401 506.513L165.749 490.302C159.733 492.774 154.612 490.325 153.347 489.138C153.566 488.841 154.132 487.794 157.933 486.231L151.28 470.02Z"
            fill="white"
          />
          <path
            d="M98.8 489.69C87.402 494.381 82.359 505.67 90.3391 515.518C98.3196 525.366 114.562 527.901 125.964 523.213C137.362 518.522 142.402 507.233 134.421 497.381C126.441 487.534 110.198 484.998 98.8001 489.69L98.8 489.69ZM110.066 503.592C113.886 502.022 117.132 503.17 117.941 504.166C118.75 505.162 118.523 507.74 114.703 509.311C110.882 510.881 107.699 509.709 106.89 508.709C106.082 507.713 106.246 505.158 110.066 503.588V503.592Z"
            fill="white"
          />
        </svg>
        <LinkTitle
          css={{
            fontSize: 18,
            color: "white",
            marginTop: 16,
            marginBottom: 7,
          }}
        >
          <FormattedMessage id="navbar.contentitem.title" />
        </LinkTitle>
        <LinkText
          css={{
            fontSize: 14,
            color: mauve.mauve4,
            lineHeight: 1.3,
          }}
        >
          <FormattedMessage id="navbar.contentitem.desc" />
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

export const NavigationMenuDemo = ({ activeNav, user, userLoading, userLoggedInCookie }) => {
  const intl = useIntl();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger active={activeNav === "posts"}>
            {intl.formatMessage({ id: "navbar.menu.title1" })}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="three">
              <ContentListItemCallout />
              <ContentListItem
                href="/topics"
                title={intl.formatMessage({ id: "navbar.submenu1.title1" })}
              >
                {intl.formatMessage({ id: "navbar.submenu1.desc1" })}
              </ContentListItem>
              <ContentListItem
                href="/posts/ux/page/1"
                title={intl.formatMessage({ id: "navbar.submenu1.title2" })}
              >
                {intl.formatMessage({ id: "navbar.submenu1.desc2" })}
              </ContentListItem>
              <ContentListItem
                href="/posts/interview/page/1"
                title={intl.formatMessage({ id: "navbar.submenu1.title3" })}
              >
                {intl.formatMessage({ id: "navbar.submenu1.desc3" })}
              </ContentListItem>
              <ContentListItem
                href="/posts/accessibility/page/1"
                title={intl.formatMessage({ id: "navbar.submenu1.title4" })}
              >
                {intl.formatMessage({ id: "navbar.submenu1.desc4" })}
              </ContentListItem>
              <ContentListItem
                href="/posts/ui/page/1"
                title={intl.formatMessage({ id: "navbar.submenu1.title5" })}
              >
                {intl.formatMessage({ id: "navbar.submenu1.desc5" })}
              </ContentListItem>
              <ContentListItem
                href="/posts/interview/page/1"
                title={intl.formatMessage({ id: "navbar.submenu1.title6" })}
              >
                {intl.formatMessage({ id: "navbar.submenu1.desc6" })}
              </ContentListItem>
            </ContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger active={activeNav === "toolbox"}>
            {intl.formatMessage({ id: "navbar.menu.title2" })}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="two">
              <ContentListItem
                title={intl.formatMessage({ id: "navbar.submenu2.title1" })}
                href="/toolbox/page/1"
              >
                {intl.formatMessage({ id: "navbar.submenu2.desc1" })}
              </ContentListItem>
              <ContentListItem
                title={intl.formatMessage({ id: "navbar.submenu2.title2" })}
                href="/toolbox/ux-tools/page/1"
              >
                {intl.formatMessage({ id: "navbar.submenu2.desc2" })}
              </ContentListItem>
              <ContentListItem
                title={intl.formatMessage({ id: "navbar.submenu2.title3" })}
                href="/toolbox/augmented-reality-tools/page/1"
              >
                {intl.formatMessage({ id: "navbar.submenu2.desc3" })}
              </ContentListItem>
              <ContentListItem
                title={intl.formatMessage({ id: "navbar.submenu2.title4" })}
                href="/prototyping/page/1"
              >
                {intl.formatMessage({ id: "navbar.submenu2.desc4" })}
              </ContentListItem>
              <ContentListItem
                title={intl.formatMessage({ id: "navbar.submenu2.title5" })}
                href="/toolbox/accessibility/page/1"
              >
                {intl.formatMessage({ id: "navbar.submenu2.desc5" })}
              </ContentListItem>
              <ContentListItem
                title={intl.formatMessage({ id: "navbar.submenu2.title6" })}
                href="/toolbox/conversational-design-tools/page/1"
              >
                {intl.formatMessage({ id: "navbar.submenu2.desc6" })}
              </ContentListItem>
            </ContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink href="/">
            {intl.formatMessage({ id: "navbar.menu.title3" })}
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          {(user && user.isLoggedIn) ? (
            <Link href="/account">
              {user.avatar ? (
                <img
                  className="hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"
                  src={user.avatar.url}
                />
              ) : (
                <Gravatar
                  className="hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"
                  email={user.email}
                />
              )}
            </Link>
          ) : userLoading && userLoggedInCookie ? (
            <div className="bg-gray-200 hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"></div>
          ) : (
            <NavigationMenuButton href="/newsletter">
              {intl.formatMessage({ id: "navbar.menu.title4" })}
            </NavigationMenuButton>
          )}
        </NavigationMenuItem>
        <LocaleSwitcher />
        <NavigationMenuIndicator />
      </NavigationMenuList>

      <ViewportPosition className="ml-0 sm:-ml-12">
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;
