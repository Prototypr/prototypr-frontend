import Spinner from "../Spinner/Spinner";
import clsx from "classnames";

/**
 * General use fallback component
 * will show Spinner component in center
 */
const Fallback = ({ className }) => {
  return (
    <div
      className={clsx(
        className,
        "h-full flex-grow flex items-center justify-center text-primary-500"
      )}
    >
      <Spinner />
    </div>
  );
};

export default Fallback;
