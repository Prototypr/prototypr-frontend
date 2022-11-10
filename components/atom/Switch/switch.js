import React from "react";
import { styled } from "@stitches/react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: "unset",
  backgroundColor: "white",
  borderRadius: "9999px",
  position: "relative",
  //   border: '1px solid #000',
  padding: "4px",
  boxShadow: `inset 0 1px 3px rgba(0,0,0,0.1)`,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  //   '&:focus': { boxShadow: `0 0 0 2px black` },
  cursor: "pointer",
  '&[data-state="unchecked"]': { backgroundColor: "#CECECE" },
  '&[data-state="checked"]': { backgroundColor: "#3CB589" },
  variants: {
    size: {
      big: {
        width: 90,
        height: 36,
      },
      small: {
        width: 40,
        height: 20,
      },
    },
  },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: "block",
  width: 34,
  height: 34,
  backgroundColor: "white",
  borderRadius: "9999px",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  display: "grid",
  placeItems: "center",
  willChange: "transform",

  variants: {
    size: {
      big: {
        width: 34,
        height: 34,
        '&[data-state="checked"]': {
          transform: "translateX(52px)",
          backgroundColor: "white",
        },
      },
      small: {
        width: 18,
        height: 18,
        '&[data-state="checked"]': {
          transform: "translateX(19px)",
          backgroundColor: "white",
        },
      },
    },
  },
});

// Exports
export const Switch = StyledSwitch;
export const SwitchThumb = StyledThumb;

export const ToggleSwitch = ({ onToggle, checked, size = "big" }) => (
  <Switch size={size} onCheckedChange={onToggle} checked={checked} id="s1">
    <SwitchThumb size={size}>
      {size === "big" && (
        <>
          {checked ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_387_388)">
                <path
                  d="M13.455 13.455C12.1729 14.4323 10.6118 14.9737 9 15C3.75 15 0.75 9.00002 0.75 9.00002C1.68292 7.26144 2.97685 5.74247 4.545 4.54502M7.425 3.18002C7.94125 3.05918 8.4698 2.99877 9 3.00002C14.25 3.00002 17.25 9.00002 17.25 9.00002C16.7947 9.85172 16.2518 10.6536 15.63 11.3925M10.59 10.59C10.384 10.8111 10.1356 10.9884 9.85961 11.1114C9.58362 11.2343 9.28568 11.3005 8.98357 11.3058C8.68146 11.3111 8.38137 11.2555 8.10121 11.1424C7.82104 11.0292 7.56654 10.8608 7.35288 10.6471C7.13923 10.4335 6.97079 10.179 6.85763 9.89881C6.74447 9.61865 6.68889 9.31856 6.69423 9.01645C6.69956 8.71434 6.76568 8.4164 6.88866 8.1404C7.01163 7.86441 7.18894 7.61601 7.41 7.41002"
                  stroke="#3CB589"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M0.75 0.75L17.25 17.25"
                  stroke="#3CB589"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_387_388">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                stroke="#CECECE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                stroke="#CECECE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </>
      )}
    </SwitchThumb>
  </Switch>
);
