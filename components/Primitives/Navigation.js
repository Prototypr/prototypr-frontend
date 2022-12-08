
import { indigo, gray } from "@radix-ui/colors";

import { styled } from '../../stitches.config';
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import Link from "next/link";

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
          <span style={props.css} {...props}>
            {children}
          </span>
        </StyledLink>
      </Link>
    );
  };
  
  // Exports
  export const NavigationMenu = StyledMenu;
  export const NavigationMenuList = StyledList;
  export const NavigationMenuItem = NavigationMenuPrimitive.Item;
  export const NavigationMenuLink = NextLink;