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
  return (
    <div className="bg-white py-10 border-t border-b border-opacity-10 px-10">
      <div className="max-w-7xl mx-auto mb-6 flex flex-col grid gap-2">
        <div>
          <h2 className="text-lg text-black font-medium font-inter">
            Prototypr Toolbox
          </h2>
          <p className="text-base text-[#808080] font-inter">
            Find tools, make your thing.
          </p>
        </div>
        <div className="flex flex-row">
          <button className="px-5 mr-3 py-2 bg-blue-400 rounded-md text-sm text-white font-inter">
            Submit Tool
          </button>
          <button className="px-5 py-2 bg-blue-900 rounded-md text-sm text-white font-inter">
            Open Toolbox
          </button>
        </div>
      </div>
      <div
        className="hidden md:block z-10 w-full relative h-40 max-w-7xl mx-auto"
        // style={{ maxWidth: "1600px" }}
      >
        {/**button block is within container */}
        <div className="container relative mx-auto flex items-center justify-between h-full">
          {/** 64 * 64 */}
          <div
            tabIndex={0}
            id="prev"
            className="w-12 h-12 rounded-full z-50 bg-blue-600 flex items-center justify-center cursor-pointer "
            onKeyDown={keyboardPrev}
            onClick={() => navHis(-1)}
          >
            <img src="/static/images/icons/prev.svg" data-gumlet="false" />
          </div>
          <div
            tabIndex={0}
            id="next"
            className="w-12 h-12 rounded-full z-50 bg-blue-600 flex items-center justify-center cursor-pointer"
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
          <div ref={cont} className="relative flex h-full">
            {allTools.length
              ? allTools.map((item, index) => {
                  const showItem = item?.attributes;
                  return (
                    <div
                      key={`h_item_${index}`}
                      style={{ width: `${ITEM_WIDTH}px` }}
                      className="h-auto mr-5 border border-opacity-5 border-black transition duration-200 rounded-xl bg-white px-4 pt-4 flex flex-col cursor-pointer"
                    >
                      <div className=" flex flex-col grid gap-2 justify-between">
                        <div className="w-12 h-12 border relative border-opacity-5 rounded-xl border-black overflow-hidden">
                          {showItem.legacyFeaturedImage.logoNew && (
                            <Image
                              loader={gumletLoader}
                              className=""
                              objectFit="cover"
                              layout="fill"
                              src={showItem.legacyFeaturedImage.logoNew}
                            />
                          )}
                        </div>
                        <div className="w-full flex flex-col grid gap-1">
                          <div className="text-gray-1 font-inter hover:underline truncate text-base font-medium">
                            <Link href={`/toolbox/${showItem.slug}`}>
                              {showItem.title}
                            </Link>
                          </div>
                          {showItem.tags?.data[0] && (
                            <div>
                              <span className="font-normal text-xs bg-gray-100 px-5 py-1 border border-opacity-5 border-black rounded-full w-auto text-gray-500">
                                {showItem.tags?.data[0].attributes?.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      {/* <div className="hidden bg-gray-4 w-full relative md:flex items-center justify-center pt-14 pb-24 md:pb-32">
        <Link href="/toolbox/page/1">
          <Button variant="ghostBlue" className="h-14 w-52 rounded-lg">
            {intl.formatMessage({ id: "designtool.button.browsemore" })}
          </Button>
        </Link>
      </div> */}
    </div>
  );
}
