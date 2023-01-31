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
        <div className="">
        <div className="mt-5 opacity-60">
            <h1 className="font-semibold pb-2 mb-2 text-base text-gray-900">
                  Filters
            </h1>
            <div className="p-4 text-sm bg-purple-500/20 text-purple-900 rounded-2xl">
                Coming Soon: Filter by topic, location, availability, and more.
            </div>
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
                    className="cursor-pointer text-md"
                    key={`toolbox_cat_${sIndex}`}
                  >
                    {/* <Link href={`${urlRoot}/${sItem.key}/page/1`}> */}
                      <div
                        className={`hover:text-blue-500 py-1.5 rounded ${
                          sItem.key == slug
                            ? "text-blue-600 font-semibold"
                            : "text-[#A1A1A1] font-base"
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
                  <span className="inline-block text-[#A1A1A1] hover:text-blue-600 font-medium underline mt-4 mb-6 text-sm">
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
