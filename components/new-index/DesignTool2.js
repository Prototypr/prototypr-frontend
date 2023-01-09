import React, { useState, useRef, useEffect } from "react";
import BScroll from "better-scroll";
import Link from "next/link";
const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));
const ITEM_WIDTH = 300;
export default function DesignTool({ allTools = [] }) {
  const [list, setList] = useState(getItems);
  const [scroll, setScroll] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);
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

  const testClick = (item) => {
    alert(item);
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
    } else {
      scroll.refresh();
    }
  };
  return <>
    <section>
      <div className="p-8 pr-2 my-20 rounded-lg bg-gray-900 mx-auto sm:px-6 lg:px-8 lg:pr-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          <div className="col-span-1 flex items-center p-8 bg-gradient-to-br from-blue-default to-indigo-400 rounded">
            <div className="mx-auto text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-100">Toolbox</h2>
              <p className="mt-4 text-sm text-gray-200 max-w-[45ch]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                cupiditate mollitia saepe vitae libero nobis.
              </p>
              <Link href="/toolbox">
                <span className="inline-block px-6 py-3 mt-6 text-sm text-white bg-black rounded">
                  Browse all tools
                </span>
              </Link>
            </div>
          </div>
          <div className="col-span-3 relative h-74">
            {/**button block is within container */}
            <div className="xl:container relative mx-auto flex items-center justify-between h-full">
              {/** 64 * 64 */}
              <div
                tabIndex={0}
                id="prev"
                className="w-16 h-16 rounded-full z-50 bg-black opacity-70 flex items-center justify-center cursor-pointer hover:opacity-50"
                onKeyDown={keyboardPrev}
                onClick={() => navHis(-1)}
              >
                <img
                  src="/static/images/icons/prev.svg"
                  data-gumlet="false"
                />
              </div>
              <div
                tabIndex={0}
                id="next"
                className="w-16 h-16 rounded-full z-50 bg-black opacity-70 flex items-center justify-center cursor-pointer hover:opacity-50"
                onKeyDown={keyboardNext}
                onClick={() => navHis(1)}
              >
                <img
                  src="/static/images/icons/next.svg"
                  data-gumlet="false"
                />
              </div>
            </div>
            <div
              ref={wrapper}
              className="absolute left-0 h-74 w-full top-0 overflow-hidden"
            >
              <div ref={cont} className="relative flex h-full">
                {allTools.length
                  ? allTools.map((item, index) => {
                      const showItem = item?.attributes;
                      return (
                        <div
                          key={`h_item_${index}`}
                          style={{ width: `${ITEM_WIDTH}px` }}
                          onClick={() => testClick(item)}
                          className="h-full mx-5 rounded-lg bg-white px-4 pt-4 flex flex-col cursor-pointer"
                        >
                          <div
                            className="w-full rounded-lg h-46 relative bg-no-repeat bg-100"
                            style={{
                              backgroundImage: `url(${showItem.legacyFeaturedImage.imgUrl})`,
                            }}
                          >
                            <div
                              className="absolute border-2 border-solid border-white w-10 h-10 rounded-full -bottom-3 bg-100 bg-no-repeat bg-center"
                              style={{
                                left: "10.46%",
                                right: "76.47%",
                                backgroundImage: `url(${showItem.legacyFeaturedImage.logoNew})`,
                              }}
                            ></div>
                          </div>
                          <div className="mt-5 flex justify-between">
                            <div>
                              <div className="text-gray-1 text-lg font-bold leading-6">
                                {showItem.title}
                              </div>
                              <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3">
                                # {showItem.slug}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
}
