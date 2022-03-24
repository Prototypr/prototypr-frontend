import React , { useState } from "react";

const TAB_ITEMS = [{
    slug: '',
    name: 'AR/VR'
},{
    slug: '',
    name: 'Product design'
},{
    slug: '',
    name: 'User interview'
},{
    slug: '',
    name: 'User research'
},{
    slug: '',
    name: 'Coding'
},{
    slug: '',
    name: 'More'
}]
export default function TopicSpolights({}) {

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    return (
        <section className="mt-36 pt-3 pb-10">
            <h4 className="text-4xl font-bold  text-title-1">Topic Spolights</h4>
            {/**tabs */}
            <div className="flex border-b-gray-5 w-full mt-10 tab relative">
                {/**tab item */}
                {
                    TAB_ITEMS.map((item, index) => {
                        return (
                            <div
                             className={`text-gray-1 text-2xl pb-3 leading-8  relative mr-6 cursor-pointer tab-item
                             ${index === currentTabIndex ? ' tab-item-active font-semibold': ' font-medium'}`}
                             onClick={() => {
                                 setCurrentTabIndex(index)
                             }}
                             >{item.name}</div>
                        )
                    })
                }
            </div>
        </section>
    )
}