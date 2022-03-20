
import React , { useState } from "react";
import Link from 'next/link'


export default function FilterCategory ({slug = "", items = [], key}) {
    return (
        <div className="display-none mb-8 lg:block text-gray-800">
                  {items.map((item, index) => {
                    return (
                      <div
                        key={`${key}${index}`}
                        className="mb-8 text-gray-800"
                      >
                        <div className="">
                          <h1 className="font-semibold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">
                            {item.title}
                          </h1>
                        </div>
                        {item.subItems.map((sItem, sIndex) => {
                          return (
                            <div
                              className="cursor-pointer text-sm"
                              key={`toolbox_cat_${sIndex}`}
                            >
                              <Link href={`/toolbox/${sItem.key}/page/1`}>
                              <div className={`hover:text-blue-500 py-2 rounded ${sItem.key==slug ?'text-blue-600 font-semibold':'text-gray-700'}`}>
                                  {sItem.name}
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                        {item.moreLink && item.moreLink}
                      </div>
                    );
                  })}
                </div>
    )
}

