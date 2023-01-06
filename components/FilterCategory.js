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
    <div className="display-none mb-8 lg:block text-gray-800">
      {items.map((item, index) => {
        return (
          <div key={`${key}${index}`} className="mb-8 text-gray-800">
            <div className="">
              <h1 className="font-bold pb-2 mb-2 border-b border-gray-200 pr-3 text-sm uppercase text-gray-900">
                {item.title}
              </h1>
            </div>
            {item.subItems.map((sItem, sIndex) => {
              return (
                <div
                  className="cursor-pointer text-md"
                  key={`toolbox_cat_${sIndex}`}
                >
                  <Link href={`${paginationRoot}/${sItem.key}/page/1`}>
                    <div
                      className={`hover:text-blue-500 py-1.5 rounded ${
                        sItem.key == slug
                          ? "text-blue-600 font-semibold"
                          : "text-[#A1A1A1] font-base"
                      }`}
                    >
                      {sItem.name}
                    </div>
                  </Link>
                </div>
              );
            })}
            {item.moreLink && (
              <Link href={item.moreLink.url}>
                <span className="inline-block text-[#A1A1A1] hover:text-blue-600 font-medium underline mt-4 mb-6 text-sm">
                  {item.moreLink.text}
                </span>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
