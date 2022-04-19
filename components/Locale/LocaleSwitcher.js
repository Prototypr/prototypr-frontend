import React, { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import { violet, mauve, blackA } from "@radix-ui/colors";
// import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useRouter } from "next/router";
import LOCALE_MAP from "./localeMap";

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
const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: 'white',
});

const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: 4,
  padding: 10,
  width: 126,
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


const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = StyledContent;
const PopoverArrow = StyledArrow;
//  const PopoverClose = StyledClose;

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const [open, setOpen] = useState(false)

  const switchLanguage = (itemLocale) => {
      // setLocale(itemLocale)
      const routerQuery = router.query;
      router.push(router.asPath, router.asPath , { locale:itemLocale });
  }

  return (
    <Popover open={open}>
      <PopoverTrigger asChild onClick={() => setOpen(!open)}>
        <div className="flex flex-row items-center space-x-1.5 cursor-pointer ml-1 md:ml-5 md:mx-4">
          <img style={{opacity:0.9}} src="/static/images/icons/global.svg" />
          <div className="text-sm">{shortLocale.toUpperCase()}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset={5}>
        <>
          {
              LOCALE_MAP.LANGUAGE_ITEMS.map((item, index) => {
                  return (
                    <div
                    key={`locale_${index}`}
                    className="language-item text-center cursor-pointer py-2 px-4 rounded-md text-base text-gray-700" onClick={() => {
                        setOpen(false);
                        switchLanguage(item.locale);
                    }}>
                        {item.name}
                    </div>
                  )
              })
          }
          <PopoverArrow />
        </>
      </PopoverContent>
    </Popover>
  );
}
