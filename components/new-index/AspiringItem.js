import React , { useState } from "react";


export default function AspiringItem({ post = {} }) {
    const { title = "", excerpt, slug, date, tags, legacyFeaturedImage = null, author = null } = post
    const tagArr = tags.data
    return (
        <div className="grid-cols-1 cursor-pointer">
            <div className="rounded-lg w-full h-65 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${legacyFeaturedImage?.thumb})` }}></div>
            <h5 className="font-bold text-lg leading-none text-gray-1 mt-4">{title}</h5>
            <p className="mt-1 font-medium text-base tracking-wide uppercase text-gray-1">{
              tagArr && tagArr.length ? tagArr[0].attributes.slug : "design"
            }</p>
            <p className="text-gray-3 text-base leading-normal font-medium overflow-hidden text-ellipsis clamp-3 mt-2">I grew up in Rapid City, South Dakota in my grandfather’s house. But my grandfather is originally...</p>
        </div>
    )
}