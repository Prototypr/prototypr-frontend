import React from "react";
import dynamic from "next/dynamic";
import { keyframes } from "@stitches/react";
import { styled } from "../stitches.config";
import Button from "./Primitives/Button";

import { violet } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useIntl } from "react-intl";
const SignupHorizontal = dynamic(() =>
  import("@/components/newsletter/SignupHorizontal")
);

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});
const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: 4,
  padding: 32,
  width: 500,
  //   height:200,
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "forwards",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
  "&:focus": {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px ${violet.violet7}`,
  },
});

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: "white",
});

const StyledClose = styled(PopoverPrimitive.Close, {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 5,
  right: 5,

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

// Exports
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = StyledContent;
export const PopoverArrow = StyledArrow;
export const PopoverClose = StyledClose;

// Your app...
const Flex = styled("div", { display: "flex" });

const PopoverDemo = () => {
  const intl = useIntl();
  const buttonText = intl.formatMessage({ id: "navbar.menu.title4" });
  const title = intl.formatMessage({ id: "navbar.contentitem.title2" });
  const desc = intl.formatMessage({ id: "sourcepanel.desc2" });
  const tagline = intl.formatMessage({ id: "intro.description" });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="" variant="confirm">
          {buttonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={5}>
        <Flex css={{ flexDirection: "column", gap: 10 }}>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p>{desc}</p>
          <SignupHorizontal className="sm:flex w-full mt-2" />
          <p className="text-gray-600 text-xs">{tagline} 💙</p>
        </Flex>
        <PopoverArrow />
        <PopoverClose aria-label="Close">
          <Cross2Icon />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverDemo;
