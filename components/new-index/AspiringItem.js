import React , { useState } from "react";


export default function AspiringItem({}) {

    return (
        <div className="grid-cols-1 cursor-pointer">
            <div className="rounded-lg w-full h-65" style={{border:"1px solid red"}}></div>
            <h5 className="font-bold text-lg leading-none text-gray-1 mt-4">Miracle Sheenh</h5>
            <p className="mt-1 font-medium text-base tracking-wide uppercase text-gray-1">byeciaociao Founder</p>
            <p className="text-gray-3 text-base leading-normal font-medium overflow-hidden text-ellipsis clamp-3 mt-2">I grew up in Rapid City, South Dakota in my grandfather’s house. But my grandfather is originally...</p>
        </div>
    )
}