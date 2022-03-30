import clsx from "classnames";
import { forwardRef, isValidElement, cloneElement } from "react";

const getSize = (size) => {
  switch (size) {
    case "sm":
      return "btn-sm";
    case "md":
      return "btn-md";
    case "lg":
      return "btn-lg";
    default:
      return undefined;
  }
};

const getVariant = (variant) => {
  switch (variant) {
    case "outline":
      return "btn-outline";
    case "ghost":
      return "btn-ghost";
    default:
      return undefined;
  }
};

const getColor = (color) => {
  switch (color) {
    case "default":
      return "btn-default";
    case "primary":
      return "btn-primary";
    case "danger":
      return "btn-danger";
    case "twitter":
      return "btn-twitter";
    case "github":
      return "btn-github";
    case "google":
      return "btn-google";
    default:
      return undefined;
  }
};

const Button = forwardRef((props, ref) => {
  const {
    size = "md",
    variant = "solid",
    color = "default",
    className,
    type = "button",
    isLoading,
    loadingText,
    isDisabled,
    leftIcon,
    rightIcon,
    isFullWidth,
    isRound,
    children,
    as,
    ...rest
  } = props;

  const Element = as || "button";

  const merged = clsx(
    "btn",
    getSize(size),
    getVariant(variant),
    getColor(color),
    isLoading && (loadingText ? "btn-loading" : "btn-loading-no-text"),
    isFullWidth && "btn-full",
    isRound && "btn-round",
    className
  );

  return (
    <Element
      ref={ref}
      disabled={isDisabled || isLoading}
      data-testid="button"
      data-loading={isLoading}
      {...rest}
      className={merged}
      type={type}
    >
      {leftIcon && !isLoading && (
        <ButtonIcon className="button-icon-left">{leftIcon}</ButtonIcon>
      )}
      {isLoading
        ? loadingText || <span className="opacity-0 invisible">{children}</span>
        : children}
      {rightIcon && !isLoading && (
        <ButtonIcon className="button-icon-right">{rightIcon}</ButtonIcon>
      )}
    </Element>
  );
});

const ButtonIcon = (props) => {
  const { children, className, ...rest } = props;

  const _children = isValidElement(children)
    ? cloneElement(children, {
        "aria-hidden": true,
        focusable: false,
        "data-testid": "buttonIcon",
      })
    : children;

  return (
    <span {...rest} className={className}>
      {_children}
    </span>
  );
};

Button.displayName = "Button";
export default Button;
