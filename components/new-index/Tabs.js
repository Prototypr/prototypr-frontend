import React , { useState } from "react";


export default function Tabs({items = [], onTabChanged = () => {}}) {

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    return (
        <div className="flex border-b-gray-5 w-full mt-10 tab relative">
            {/**tab item */}
            {
                items.map((item, index) => {
                    return (
                        <div
                            key={`tab_${index}`}
                            className={`text-gray-1 text-2xl pb-3 leading-8  relative mr-6 cursor-pointer tab-item
                            ${index === currentTabIndex ? ' tab-item-active font-semibold': ' font-medium'}`}
                            onClick={() => {
                                setCurrentTabIndex(index)
                                onTabChanged(item.slug)
                            }}
                            >{item.name}</div>
                    )
                })
            }
        </div>
    )
}