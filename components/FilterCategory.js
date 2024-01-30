import React, { useState } from "react";
import Link from "next/link";

export default function FilterCategory({
  slug = "",
  items = [],
  key,
  urlRoot,
  paginationRoot,
}) {
  return (
    <div className="display-none lg:block text-gray-800">
      <h1 className="font-semibold pb-2 mb-6 text-xl capitalize text-gray-900">
        Categories
      </h1>
      {items?.map((item, index) => {
        return (
          <>
          {item?.subItems? <div key={`${key}${index}`} className="text-gray-800 mb-10">
              <div className="">
                <h1 className="font-medium border-b border-gray-200 pb-2 mb-2 pr-3 text-lg capitalize text-gray-900">
                  {item.title}
                </h1>
              </div>
              {item?.subItems?.map((sItem, sIndex) => {
                return (
                  <div
                    className="cursor-pointer text-md"
                    key={`toolbox_cat_${sIndex}`}
                  >
                    <Link href={`${urlRoot}/${sItem.key}/page/1`}>
                      <div
                        className={`text-sm hover:text-blue-500 py-1.5 rounded ${
                          sItem.key == slug
                            ? "text-blue-600 font-semibold"
                            : "text-gray-700 font-base"
                        }`}
                      >
                        {sItem.name}
                      </div>
                    </Link>
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
  );
}
