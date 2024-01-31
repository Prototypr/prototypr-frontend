import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./Primitives/Button";
import Link from "next/link";
import Container from "./container";

function getScrollPercent() {
    var h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
  }
  

const StickyFooterCTA = ({title, description, buttonText}) => {
    const [isVisible, setVisible] = useState(false);
  
    useEffect(() => {
      window.addEventListener("scroll", (event) => {
        const p = getScrollPercent();
  
        if (p > 18 && p < 85) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    }, []);
  
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
            hidden: { opacity: 0, y: 100,
              // originX:0.5,
              // x:'50%', 
              transition: { duration: 0.2 } },
          }}
          // className="fixed bottom-0 rounded-none md:bottom-4 max-w-3xl w-full px-5 py-4 h-auto md:rounded-2xl border border-black border-opacity-10 bg-[#2f62c7] z-[100]"
          className="fixed bottom-0 rounded-none w-full md:bottom-4 md:w-[80%] md:max-w-[1120px] md:rounded-2xl px-1 py-3 h-auto border border-black border-opacity-10 bg-[#2f62c7] z-[100]"
        >
          <Container  maxWidth="max-w-[1320px] z-30 relative">
            <div className="w-full flex flex-col gap-4 md:gap-3 md:flex-row justify-between">
              <div className="hidden md:flex flex-row justify-center items-center gap-4 md:gap-8">
                <div>
                  <svg
                    width="35"
                    height="41"
                    viewBox="0 0 35 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.409489 41.0005C0.182943 41.0005 0 40.8138 0 40.5827V14.9456C0 6.70841 6.54424 0.0302734 14.6184 0.0302734C14.844 0.0302734 15.0279 0.216933 15.0279 0.448081V26.0852C15.0269 34.3223 8.48268 41.0005 0.409489 41.0005Z"
                      fill="white"
                    />
                    <path
                      d="M20.6181 30.4709C20.3129 30.4709 20.0664 30.2185 20.0664 29.908V0.562879C20.0664 0.252426 20.3138 0 20.6181 0C28.5605 0 34.9995 6.56981 34.9995 14.6735V15.7974C34.9995 23.9011 28.5605 30.4709 20.6181 30.4709Z"
                      fill="#61BEEC"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base font-medium text-white">
                    {title?title:`Become a member`}
                  </h1>
                  <p className="text-sm max-w-md text-white text-opacity-80">
                  {description?description:`Get published, collect tools, and earn rewards.`}
                  </p>
                </div>
              </div>
              <div className="my-auto w-full md:w-[fit-content] md:block flex justify-center md:justify-end">
                    <Link className="w-[fit-content]" href="/onboard">
                        <Button className="mr-3 md:w-auto p-0 py-[0.05rem] px-[1rem]" variant={"confirmRoundedGhost"}>
                            {buttonText?buttonText:`Log in`}
                        </Button>
                    </Link>
                  <Link className="w-[fit-content]" href="/onboard">
                      <Button className="py-1 md:w-auto p-0 py-[0.05rem] px-[1rem]" variant={"confirmRoundedWhite"}>
                          {buttonText?buttonText:`Sign up`}
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
  export default StickyFooterCTA