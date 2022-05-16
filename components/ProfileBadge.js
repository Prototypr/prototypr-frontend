import React from 'react';
import { styled, keyframes } from '@stitches/react';
import { blue, mauve, blackA, gray} from '@radix-ui/colors';
// import {
//   HamburgerMenuIcon,
//   DotFilledIcon,
//   CheckIcon,
//   ChevronRightIcon,
// } from '@radix-ui/react-icons';
import { signOut } from "next-auth/react"
import useUser from '@/lib/iron-session/useUser'
import fetchJson from "@/lib/iron-session/fetchJson";

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { useRouter } from "next/router";

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const itemStyles = {
  all: 'unset',
  fontSize: 15,
  lineHeight: 1,
  color: blackA,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 36,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: blue.blue11,
    color: blue.blue1,
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, { ...itemStyles });
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, { ...itemStyles });
const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: blue.blue4,
    color: blue.blue11,
  },
  ...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
  borderRadius:'4px'
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: gray.gray4,
  margin: 5,
});

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: 'white',
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;

// Your app...
const Box = styled('div', {});

// const RightSlot = styled('div', {
//   marginLeft: 'auto',
//   paddingLeft: 20,
//   color: mauve.mauve11,
//   ':focus > &': { color: 'white' },
//   '[data-disabled] &': { color: mauve.mauve8 },
// });

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 35,
  width: 35,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: blue.blue11,
  backgroundColor: 'white',
  border:`1px solid ${gray.gray3}`,
//   boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: blue.blue3 },
  '&:focus': { boxShadow: `0 0 0 2px ${blue.blue7}` },
});

// const signOutAPI = (mutateUser) =>{
//     signOut()
// }

export const DropdownMenuDemo = ({icon, user}) => {
    const router = useRouter();
    const {mutateUser} = useUser({
        redirectTo: '/',
        redirectIfFound: false,
      })
  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="Customise options">
           {icon}
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuItem onSelect={()=>{
            router.push(`/people/${user.slug}`);}}>
              {/* <Link href="/account"> */}
                Profile 
              {/* </Link> */}
            {/* <RightSlot>⌘+T</RightSlot> */}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={()=>{
            router.push('/account');}}>
              {/* <Link href="/account"> */}
                Set up profile 
              {/* </Link> */}
            {/* <RightSlot>⌘+T</RightSlot> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={()=>{
            router.push(`/sign-in`);}}>
              {/* <Link href="/account"> */}
                Welcome Guide 
              {/* </Link> */}
            {/* <RightSlot>⌘+T</RightSlot> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={async ()=>{
              await signOut({redirect: false})
              mutateUser(
                await fetchJson("/api/auth/logout", { method: "POST" }),
                false,
              );
          }}>
            Sign Out
          </DropdownMenuItem>
            
          <DropdownMenuArrow offset={12} />
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default DropdownMenuDemo;

