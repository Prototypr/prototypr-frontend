import { forwardRef } from "react";
import clsx from "classnames";

const FormControl = forwardRef((props, ref) => {
  const { className, inValid, isFullWidth = true, children, ...rest } = props;
  const merged = clsx(
    className,
    "form-control",
    inValid && "form-error",
    isFullWidth && "w-full"
  );

  return (
    <div ref={ref} {...rest} className={merged}>
      {children}
    </div>
  );
});

FormControl.displayName = "FormControl";
export default FormControl;
