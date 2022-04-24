import React, { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
// const BScroll = dynamic(() => import("better-scroll"), { ssr: false });
import BScroll from "better-scroll";

import Link from "next/link";
import Image from "next/image";
import { useIntl } from "react-intl";

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
    <>
      <div
        className="z-10 bg-gray-4 w-full relative h-74 fade-out-edges mx-auto"
        style={{ maxWidth: "1600px" }}
      >
        {/**button block is within container */}
        <div className="container relative mx-auto flex items-center justify-between h-full">
          {/** 64 * 64 */}
          <div
            tabIndex={0}
            id="prev"
            className="w-16 h-16 rounded-full z-50 bg-black opacity-70 flex items-center justify-center cursor-pointer hover:opacity-50"
            onKeyDown={keyboardPrev}
            onClick={() => navHis(-1)}
          >
            <img src="/static/images/icons/prev.svg" />
          </div>
          <div
            tabIndex={0}
            id="next"
            className="w-16 h-16 rounded-full z-50 bg-black opacity-70 flex items-center justify-center cursor-pointer hover:opacity-50"
            onKeyDown={keyboardNext}
            onClick={() => navHis(1)}
          >
            <img src="/static/images/icons/next.svg" />
          </div>
        </div>
        <div
          ref={wrapper}
          className="absolute left-0 h-full w-full top-0  pb-1 overflow-hidden"
        >
          <div ref={cont} className="relative flex h-full">
            {allTools.length
              ? allTools.map((item, index) => {
                  const showItem = item?.attributes;
                  return (
                    <div
                      key={`h_item_${index}`}
                      style={{ width: `${ITEM_WIDTH}px` }}
                      className="h-full mx-5 group hover:shadow-md transition duration-500 rounded-lg bg-white px-4 pt-4 flex flex-col cursor-pointer"
                    >
                      <div className="w-full rounded-lg h-46 relative bg-no-repeat bg-100">
                        {showItem.legacyFeaturedImage.mediaItemUrl ? (
                          <figure className="relative w-full h-full overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
                            <div className="absolute  w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
                              <Link href={`/toolbox/${showItem.slug}`}>
                                <Image
                                  className="rounded-lg contrast-115"
                                  objectFit="cover"
                                  layout="fill"
                                  src={
                                    showItem.legacyFeaturedImage.mediaItemUrl
                                  }
                                />
                              </Link>
                            </div>
                          </figure>
                        ) : (
                          showItem.featuredImage?.data?.attributes?.url && (
                            <figure className="relative w-full h-full overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
                              <div className="absolute  w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
                                <Link href={`/toolbox/${showItem.slug}`}>
                                  <Image
                                    className="rounded-lg contrast-115"
                                    objectFit="cover"
                                    layout="fill"
                                    src={
                                      showItem.featuredImage?.data?.attributes
                                        ?.url
                                    }
                                  />
                                </Link>
                              </div>
                            </figure>
                          )
                        )}
                        <div
                          className="absolute border-2 border-solid border-white bg-white w-10 h-10 rounded-full -bottom-3 bg-100 bg-no-repeat bg-center"
                          style={{
                            // border: "3px",
                            left: "12px",
                            right: "76.47%",
                            bottom: "-18px",
                          }}
                        >
                          {showItem.legacyFeaturedImage.logoNew && (
                            <Link href={`/toolbox/${showItem.slug}`}>
                              <Image
                                className="rounded-full"
                                objectFit="cover"
                                layout="fill"
                                src={showItem.legacyFeaturedImage.logoNew}
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="mt-7 flex justify-between">
                        <Link href={`/toolbox/${showItem.slug}`}>
                          <div className="px-3 w-full">
                            <div className="text-gray-1 hover:underline truncate text-lg font-bold leading-6">
                              {showItem.title}
                            </div>
                            {showItem.tags?.data[0] && (
                              <div className="font-normal text-xs leading-6 tracking-wide uppercase text-gray-3">
                                # {showItem.tags?.data[0].attributes?.name}
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div className="bg-gray-4 w-full relative flex items-center justify-center pt-14 pb-32">
        <Link href="/toolbox/page/1">
          <button className="bg-blue-1 rounded-lg text-white text-base leading-6 flex items-center justify-center py-4 px-8 hover:opacity-70 font-semibold">
            {intl.formatMessage({ id: "designtool.button.browsemore" })}
          </button>
        </Link>
      </div>
    </>
  );
}
