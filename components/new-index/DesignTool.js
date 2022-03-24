import React , { useState, useRef,useEffect } from "react";
import BScroll from 'better-scroll'
const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));
const ITEM_WIDTH = 300
export default function DesignTool({}) {
    const [list, setList] = useState(getItems);
    const [scroll, setScroll] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0)
    const [initialized, setInitialized] = useState(false)
    const [scrollX, setScrollX] = useState(-1)

    const wrapper = useRef()
    const cont = useRef()


    const navHis = (type) => {
        const nextIndex = currentIndex + type
        if (nextIndex < 0 || nextIndex > list.length - 1) {
            return
        }
        const newDelta = - (nextIndex * ITEM_WIDTH)
        scroll.scrollTo(newDelta)
        setCurrentIndex(nextIndex)
    }

    const testClick = (item) => {
        alert(item.id)
    }

    useEffect(() => {
        initScroll()
    }, [])

    /**
     * for accessibility 
     */
    //next button focused
    const keyboardNext = (event)=>{
        if(event.key=='Enter'){
            navHis(1)
        }else if (event.keyCode=='37'){
            const prevBtn = document.getElementById('prev')
            prevBtn.focus()
        }
    }
    //prev button focused
    const keyboardPrev = (event)=>{
        if(event.key=='Enter'){
            navHis(-1)
        }else if (event.keyCode=='39'){
            const nextBtn = document.getElementById('next')
            nextBtn.focus()
        }
    }

    const initScroll = () => {
        const width = list.length * ITEM_WIDTH + (list.length - 1) * 40
        cont.current.style.width = width + 'px'
        if (!scroll) {
            const scroll = new BScroll(wrapper.current, {
                probeType: 2,
                startX: 0,
                click: true,
                scrollX: true,
                scrollY: false
            })
            scroll.on('scroll', (pos) => {
                setScrollX(pos.x)
                //that._watchScrollY(pos.y)
            })
            setScroll(scroll)
        } else {
            scroll.refresh()
        }

    }
    return (
        <>
        <div className="bg-gray-4 w-full relative h-74">
            {/**button block is within container */}
            <div className="xl:container relative mx-auto flex items-center justify-between h-full">
                {/** 64 * 64 */}
                <div tabIndex={0} id="prev" className="w-16 h-16 rounded-full z-50 bg-black opacity-70 flex items-center justify-center cursor-pointer hover:opacity-50" onKeyDown={keyboardPrev} onClick={() => navHis(-1)}>
                    <img src="/static/images/icons/prev.svg" />
                </div>
                <div tabIndex={0} id="next" className="w-16 h-16 rounded-full z-50 bg-black opacity-70 flex items-center justify-center cursor-pointer hover:opacity-50" onKeyDown={keyboardNext} onClick={() => navHis(1)}>
                    <img src="/static/images/icons/next.svg" />
                </div>
            </div>
            <div ref={wrapper} className="absolute left-0 h-74 w-full top-0 overflow-hidden">
                <div ref={cont} className="relative flex h-full">
                    {
                        list.length ? list.map((item, index) => {
                            return (
                                <div key={`h_item_${index}`} 
                                    style={{width: `${ITEM_WIDTH}px`}} 
                                    onClick={() => testClick(item)}
                                    className="h-full mx-5 rounded-lg bg-white px-4 pt-4 flex flex-col">
                                        <div className="w-full rounded-lg h-46 bg-contain" style={{backgroundImage: "url(/static/images/design-tool.png)"}} ></div>
                                        <div className="mt-8 flex justify-between">
                                            <div>
                                                <div className="text-gray-1 text-lg font-bold leading-6">Handwrytten</div>
                                                <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3"># Prototyping</div>
                                            </div>
                                            <div className="flex items-center">
                                                <img 
                                                    width={"20px"}
                                                    height={"16px"}
                                                    src="/static/images/icons/star.svg"
                                                />
                                                <div className="font-normal text-base ml-1">1</div>
                                            </div>
                                        </div>
                                </div>
                            )
                        }):null
                    }
                </div>
            </div>
        </div>
        <div className="bg-gray-4 w-full relative flex items-center justify-center pt-14 pb-32">
            <button className="bg-blue-1 rounded-lg text-white text-base leading-6 flex items-center justify-center py-4 px-8 hover:opacity-70 font-semibold">Browse more tools</button>
        </div>
      </>
    )
}
