import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const FeedItem = dynamic(() => import("./FeedItem"), { ssr: false });

export default function Feeds({ posts = [] }) {
  console.log(posts);

  return (
    <section className="mt-16 md:mt-36 pt-3 pb-10 px-3 xl:px-0">
      <h4 className="text-3xl text-gray-900 font-bold  text-title-1 mb-10">
        More top picks
      </h4>
      {/* https://tailwindcss.com/docs/columns */}
      <div className="w-full lg:columns-3 sm:columns-2 gap-12">
        {posts.length
          ? posts.map((item, index) => {
              return (
                <FeedItem
                  textColor={"text-gray-500"}
                  post={item?.attributes}
                  index={index}
                  author={item?.attributes?.author?.data?.attributes}
                  key={`col1_${index}`}
                />
              );
            })
          : null}
      </div>

      {/* <div className="grid-cols-1 grid gap-y-10">
                    {
                        list2.length && list2.map((item, index) => {
                            return (
                                <FeedItem 
                                    height={item.height}
                                    key={`col2_${index}`}
                                />
                            )
                        })
                    }
                </div>

                <div className="grid-cols-1 grid gap-y-10">
                    {
                        list3.length && list3.map((item, index) => {
                            return (
                                <FeedItem 
                                    height={item.height}
                                    key={`col3_${index}`}
                                />
                            )
                        })
                    }
                </div> */}
      <div className="mt-10 flex items-center justify-center">
        <button className="font-semibold text-base leading-6 blue-1 h-12 w-52 border-2 border-solid border-blue-1 text-blue-1 rounded-lg hover:opacity-50">
          Show more feeds
        </button>
      </div>
    </section>
  );
}
