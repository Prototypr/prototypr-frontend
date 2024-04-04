import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./Primitives/Button";
import Link from "next/link";
import Container from "./container";
import { Cross2Icon } from "@radix-ui/react-icons";
import { set, get } from "js-cookie";

function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

const StickyFooterCTA = ({ title, description, buttonText }) => {
  const [isVisible, setVisible] = useState(false);
  const [userClosed, setUserClosed] = useState(false);

  // Define the scrollListener inside useEffect or use useCallback
  useEffect(() => {
    const scrollListener = () => {
      const p = getScrollPercent(); // Assuming getScrollPercent is defined elsewhere

      if (p > 18 && p < 85) {
        if (!userClosed) {
          setVisible(true);
        }
      } else {
        setVisible(false);
      }
    };

    // Check if the user has already closed the sticky footer
    const closed = get("closed-signup") === "true";
    console.log(closed);

    if (!closed) {
      window.addEventListener("scroll", scrollListener);
    } else {
      setUserClosed(true);
    }

    // Clean up function
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [userClosed]); // Re-attach the event listener if userClosed changes

  const closeStickyFooter = () => {
    setVisible(false);
    set("closed-signup", "true", { expires: 365 }); // Set a cookie to remember the user's choice, assuming a 1-year expiration
    setUserClosed(true);
  };

  return (
    <div className="w-full flex justify-center relative ">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            // x:'50%',
            // originX:0.5,
            transition: { type: "spring", stiffness: 200, damping: 32 },
          },
          hidden: {
            opacity: 0,
            y: 100,
            // originX:0.5,
            // x:'50%',
            transition: { duration: 0.2 },
          },
        }}
        // className="fixed bottom-0 rounded-none md:bottom-4 max-w-3xl w-full px-5 py-4 h-auto md:rounded-2xl border border-black border-opacity-10 bg-[#2f62c7] z-[100]"
        className="fixed bottom-0 w-full md:bottom-3 bg-gradient-to-t shadow-md overflow- from-blue-50 border border-indigo-900/10 to-white md:w-[80%] md:max-w-[1120px] md:rounded-2xl h-auto z-[100]"
      >
        <img
          src={`/static/images/robo2.png`}
          className="w-[76px] md:w-[104px] drop-shadow-xl z-40 ml-4 md:ml-0 left-0 absolute bottom-0 -mb-[15px] md:-mb-[25px] -scale-x-100"
        />
        <Container maxWidth="max-w-[1320px] z-30 relative overflow-">
          <div
            onClick={closeStickyFooter}
            className="rounded-full cursor-pointer z-50 w-[22px] flex flex-col justify-center h-[22px] shadow-sm border border-gray-300 absolute top-0 bg-white right-0 -mt-[6px] -mr-[6px]"
          >
            <div className="mx-auto">
              <Cross2Icon width={14} />
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full md:rounded-2xl overflow-hidden">
            <div className="relative w-full h-full overflow-hidden md:rounded-2xl">
            <div
              className=" absolute top-0 left-0 w-[110%] h-[110%] -mt-1 -ml-0.5 md:rounded-2xl"
              style={{
                backgroundColor: "#ffffff",
                opacity: "0.1",
                backgroundImage:
                  "linear-gradient(#203490 1.5px, transparent 1.5px), linear-gradient(to right, #203490 1.5px, #ffffff 1.5px)",
                backgroundSize: "30px 30px",
              }}
            />
            </div>
          </div>

          <div className="w-full z-10 relative px-1 py-3  flex flex-col gap-4 md:gap-3 md:flex-row justify-between">
            <div className="hidden md:flex flex-row justify-center items-center gap-4 md:gap-4">
              <div></div>
              <div className="flex flex-col md:ml-[80px]">
                <h1 className="text-xl font-semibold text-black/00">
                  {title ? title : `Become a member`}
                </h1>
                <p className="text-lg max-w-md text-black/80">
                  {description
                    ? description
                    : `Get published, collect tools, and earn rewards.`}
                </p>
              </div>
            </div>
            <div className="my-auto w-full md:w-[fit-content] md:block flex justify-center md:justify-end">
              <Link className="w-[fit-content]" href="/onboard">
                <Button
                  className="mr-3 md:w-auto p-0 py-[0.05rem] px-[1rem] border-blue-800 text-blue-800"
                  variant={"confirmRoundedGhost"}
                >
                  {buttonText ? buttonText : `Log in`}
                </Button>
              </Link>
              <Link className="w-[fit-content]" href="/onboard">
                <Button
                  className="py-1 md:w-auto p-0 py-[0.1rem] bg-blue-600 px-[1rem]"
                  variant={"confirmRounded"}
                >
                  {buttonText ? buttonText : `Sign up`}
                </Button>
              </Link>
            </div>
            {/* <button className="px-7 h-10 md:h-auto text-sm text-black shadow-sm py-0 rounded-full bg-white">
                Sign up
              </button> */}
          </div>
        </Container>
      </motion.div>
    </div>
  );
};
export default StickyFooterCTA;
