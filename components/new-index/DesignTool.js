import React, { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
// const BScroll = dynamic(() => import("better-scroll"), { ssr: false });
import BScroll from "better-scroll";

import Link from "next/link";
import Image from "next/image";
import { useIntl } from "react-intl";
import gumletLoader from "@/components/new-index/gumletLoader";
import Button from "../Primitives/Button";

const ITEM_WIDTH = 300;

const colors = ["#345FF8", "#FA8F12", "#FE9BE8", "#F6B700"];

function repeatFor(arr, size) {
  var newArr = new Array(size);

  for (var i = 0; i < size; i++) {
    newArr[i] = arr[i % arr.length];
  }

  return newArr;
}

export default function DesignTool({ allTools = [] }) {
  const intl = useIntl();
  const locale = intl.locale ? intl.locale : "en-US";

  const [scroll, setScroll] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(3);
  const [scrollX, setScrollX] = useState(-1);

  const wrapper = useRef();
  const cont = useRef();

  const navHis = (type) => {
    const nextIndex = currentIndex + type;
    if (nextIndex < 0 || nextIndex > allTools.length - 1) {
      return;
    }
    const newDelta = -(nextIndex * ITEM_WIDTH);
    scroll.scrollTo(newDelta);
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    if (allTools.length) {
      initScroll();
    }
  }, [allTools]);
  /**
   * for accessibility
   */
  //next button focused
  const keyboardNext = (event) => {
    if (event.key == "Enter") {
      navHis(1);
    } else if (event.keyCode == "37") {
      const prevBtn = document.getElementById("prev");
      prevBtn.focus();
    }
  };
  //prev button focused
  const keyboardPrev = (event) => {
    if (event.key == "Enter") {
      navHis(-1);
    } else if (event.keyCode == "39") {
      const nextBtn = document.getElementById("next");
      nextBtn.focus();
    }
  };

  const initScroll = () => {
    const width = allTools.length * ITEM_WIDTH + (allTools.length - 1) * 40;
    cont.current.style.width = width + "px";
    if (!scroll) {
      const scroll = new BScroll(wrapper.current, {
        probeType: 2,
        startX: 0,
        click: true,
        scrollX: true,
        scrollY: false,
      });
      scroll.on("scroll", (pos) => {
        setScrollX(pos.x);
        //that._watchScrollY(pos.y)
      });
      setScroll(scroll);
      //initialize position in the middle
      const newDelta = -(3 * ITEM_WIDTH);
      scroll.scrollTo(newDelta);
      setScrollX(newDelta);
    } else {
      scroll.refresh();
    }
  };

  let arrayColor = repeatFor(colors, allTools.length);

  return (
    <div className="bg-white py-16 h-auto  rounded-[50px]  px-10">
      <div className="flex flex-row flex-wrap w-full justify-between  items-end max-w-7xl mx-auto mb-10">
        <div className=" mb-6 flex flex-col gap-7 my-10">
          <div>
            <h2 className="text-[40px] leading-[50px] md:text-[60px] max-w-lg md:leading-[68px] text-black font-bold font-inter">
              Best Tools for your Design Workflow.
            </h2>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <Link href="/toolbox">
              <button className="px-8 mr-3 py-5 font-medium bg-[#345FF8] rounded-2xl text-sm text-white font-inter">
                Submit Tool
              </button>
            </Link>
            <Link href="/toolbox">
              <button className="px-8 py-5 bg-[#67CBFC] font-medium rounded-2xl text-sm text-white font-inter">
                Open Toolbox
              </button>
            </Link>
          </div>
        </div>
        <img
          src={
            "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/7432cc558c73394df5d2c21a3ee18cd5.png?updated_at=2022-12-14T17:59:46.805Z"
          }
        />
      </div>

      <div>
        <div className="max-w-7xl mx-auto my-4">
          <p className="text-[20px] max-w-lg text-medium font-semibold font-inter">
            Recent Tools {"->"}
          </p>
        </div>
      </div>

      <div className="block z-10 w-full relative h-[350px] max-w-7xl mx-auto">
        <div className="container relative mx-auto flex items-center justify-between h-full">
          <div
            tabIndex={0}
            id="prev"
            className="w-12 h-12 rounded-full z-50 bg-black flex items-center justify-center cursor-pointer "
            onKeyDown={keyboardPrev}
            onClick={() => navHis(-1)}
          >
            <img src="/static/images/icons/prev.svg" data-gumlet="false" />
          </div>
          <div
            tabIndex={0}
            id="next"
            className="w-12 h-12 rounded-full z-50 bg-black flex items-center justify-center cursor-pointer"
            onKeyDown={keyboardNext}
            onClick={() => navHis(1)}
          >
            <img src="/static/images/icons/next.svg" data-gumlet="false" />
          </div>
        </div>
        <div
          ref={wrapper}
          className="absolute left-0 h-full w-full top-0  pb-1 overflow-hidden no-scrollbar"
        >
          <div ref={cont} className="relative flex flex-row gap-5 h-full">
            {allTools.length
              ? allTools.map((item, index) => {
                  const showItem = item?.attributes;

                  return (
                    <Link href={`/toolbox/${showItem.slug}`}>
                      <div
                        key={`h_item_${index}`}
                        style={{
                          width: `${ITEM_WIDTH}px`,
                          backgroundColor: arrayColor[index],
                        }}
                        className="h-[310px] rounded-[18px]  p-6 pt-10"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <p className="text-white text-xs font-semibold">
                              #{index + 1}
                            </p>

                            <div className="h-auto my-3">
                              <div className="overflow-x-scroll overflow-y-hidden no-scrollbar flex w-full ">
                                <div className="flex flex-row gap-2">
                                  {showItem.tags?.data.map((tab) => {
                                    return (
                                      <span
                                        className={`px-5 py-[6px] block text-[12px] backdrop-blur-md border border-white border-opacity-10 bg-white bg-opacity-20 capitalize text-white font-inter tracking-tight font-normal cursor-pointer min-w-max cursor w-full  rounded-full`}
                                      >
                                        {tab.attributes.name}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-inter text-[20px] font-bold text-white line-clamp-1 flex flex-row gap-3">
                              {" "}
                              {showItem.title}
                            </h3>
                            <p className="line-clamp-3 font-normal text-white text-opacity-70 text-[14px] leading-[22px] font-inter">
                              {" "}
                              {showItem.excerpt}
                            </p>
                          </div>
                          <button className="w-full bg-white text-sm text-black rounded-2xl font-inter py-3 px-5">
                            Show Tool
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
