
import React , { useState } from "react";


export default function FilterCategory ({title = "", items = [], selectedItem = "" , onSelectedItemChange = () => {}}) {
    return (
        <div className='w-full min-h-screen  flex flex-col'>
            <h1 className="font-semibold text-xl my-4">{title}</h1>
            <div className="display-none mb-8 lg:block text-gray-800">
                <div className="">
                    <h1 className="font-semibold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">ANALYSIS</h1>
                </div>
                {
                    items && items.map((item, index) => {
                        return (
                            <div className="cursor-pointer text-sm" key={`item_${index}`}>
                                <div className={`text-gray-700 hover:text-blue-500 py-2 rounded ${item === selectedItem ? ' text-blue-600 font-semibold' : ''}`}
                                onClick={() => onSelectedItemChange(item)}
                                >{'# ' + item}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

