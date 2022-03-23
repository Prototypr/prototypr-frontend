import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import clsx from "classnames";

const getSize = (size) => {
  switch (size) {
    case "sm":
      return "sm";
    case "md": {
      return "md";
    }
    case "lg":
      return "lg";
    default:
      return undefined;
  }
};

const Spinner = forwardRef((props, ref) => {
  const { className, size = "md", ...rest } = props;

  const merged = clsx("spinner", getSize(size), className);

  return (
    <span ref={ref} {...rest}>
      <svg
        className={merged}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
  );
});

Spinner.displayName = "Spinner";
export default Spinner;
