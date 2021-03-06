import React, { useState } from "react";
import Link from "next/link";

export default function FilterCategory({
  slug = "",
  items = [],
  key,
  urlRoot,
}) {
  return (
    <div className="display-none mb-8 lg:block text-gray-800">
      {items.map((item, index) => {
        return (
          <div key={`${key}${index}`} className="mb-8 text-gray-800">
            <div className="">
              <h1 className="font-bold pb-2 mb-2 border-b border-gray-200 pr-3 text-md uppercase text-gray-900">
                {item.title}
              </h1>
            </div>
            {item.subItems.map((sItem, sIndex) => {
              return (
                <div
                  className="cursor-pointer text-md"
                  key={`toolbox_cat_${sIndex}`}
                >
                  <Link href={`${urlRoot}/${sItem.key}/page/1`}>
                    <div
                      className={`hover:text-blue-500 py-1.5 rounded ${
                        sItem.key == slug
                          ? "text-blue-600 font-semibold"
                          : "text-gray-800 font-light"
                      }`}
                    >
                      # {sItem.name}
                    </div>
                  </Link>
                </div>
              );
            })}
            {item.moreLink && (
              <Link href={item.moreLink.url}>
                <a className="inline-block text-gray-500 underline mt-3 mb-6 text-md">
                  {item.moreLink.text}
                </a>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
