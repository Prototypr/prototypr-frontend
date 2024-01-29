import React, { useState } from "react";
import Link from "next/link";

export default function PeopleFilters({
  slug = "",
  items = [],
  key,
  urlRoot,
  paginationRoot,
}) {
    return(
        <div className="opacity-80 px-1">
          <div className="flex flex-col p-2 rounded-xl border border-purple-500/40">
            <div style={{width:'fit-content'}} className="uppercase text-[11px] mb-1 bg-purple-200 text-purple-800 px-2 py-0.5 rounded-lg">Coming Soon</div>
            <div className="px-1 text-sm max-w-[90%] text-purple-900 rounded-2xl">
                Filter by topic, location, availability, and more.
              </div>
          </div>
        <div className="opacity-60">
            {/* <h1 className="font-semibold pb-2 mb-2 text-base text-gray-900">
                  Filters
            </h1> */}
           
            <div className="display-none cursor-not-allowed mb-8 mt-6 lg:block text-gray-800">
      {items?.map((item, index) => {
        return (
          <>
          {item?.subItems? <div key={`${key}${index}`} className="pointer-none text-gray-800">
              <div className="">
                <h1 className="font-bold pb-2 mb-2 border-b border-gray-200 text-sm uppercase text-gray-900">
                  {item.title}
                </h1>
              </div>
              {item?.subItems?.map((sItem, sIndex) => {
                return (
                  <div
                    className="cursor-not-allowed text-md"
                    key={`toolbox_cat_${sIndex}`}
                  >
                    {/* <Link href={`${urlRoot}/${sItem.key}/page/1`}> */}
                      <div
                        className={`text-sm hover:text-blue-500 py-1.5 rounded ${
                          sItem.key == slug
                            ? "text-blue-600 font-semibold"
                            : "text-gray-700 font-base"
                        }`}
                      >
                        {sItem.name}
                      </div>
                    {/* </Link> */}
                  </div>
                );
              })}
              {item.moreLink?.text ? (
                <Link href={item.moreLink.url}>
                  <span className="inline-block text-gray-700 hover:text-blue-600 font-medium underline mt-4 mb-6 text-sm">
                    {item.moreLink.text}
                  </span>
                </Link>
              ):<div className="mb-6"/>}
            </div>:''}
          </>
        );
      })}
    </div>
        </div>
       
        </div>
    )
}
