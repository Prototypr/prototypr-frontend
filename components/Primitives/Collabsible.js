import React from "react";
import { styled } from "@stitches/react";
import { violet, blackA } from "@radix-ui/colors";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const StyledCollapsible = styled(CollapsiblePrimitive.Root, {
  // width: 300
});

const StyledCollasibleContent = styled(CollapsiblePrimitive.Content, {
  position: "absolute",
  left: 0,
  top: 0,
  width: '100%',
  minWidth:300,
  background:blackA.blackA12,
  padding:4,
  borderRadius:10
});

// Exports
export const Collapsible = StyledCollapsible;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
export const CollapsibleContent = StyledCollasibleContent;
