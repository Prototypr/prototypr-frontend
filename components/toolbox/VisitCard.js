import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function VisitCard({
  title = "",
  link = "",
  useNextImage = true,
  logoNew,
  tags = [],
}) {
  return (
    <div className="flex bg-white rounded-lg mb-0 flex-col p-5 xl:p-6 ">
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4 lg:mb-6">
        <div className="mx-auto text-center lg:text-left lg:w-4/6 pr-3 order-last lg:order-first">
          <h1
            dangerouslySetInnerHTML={{ __html: title }}
            className="text-2xl tracking-tight lg:text-lg mb-2 lg:mb-1 leading-tight font-bold text-gray-900 my-auto"
          ></h1>
          {tags.data &&
            tags.data.length &&
            tags.data.slice(0, 2).map((tag, index) => {
              return (
                <a
                key ={index}
                  rel="noreferrer"
                  className="cursor-default inline-block mr-1 text-xs bg-gray-200 p-1 px-2 rounded-lg mt-1 uppercase"
                  // href={`${tag.attributes.slug}`}
                  // target="_blank"
                >
                  # {tag.attributes.name}
                </a>
              );
            })}
        </div>

        <div className="lg:w-2.5/6 my-3 mb-5 lg:my-0 lg:mb-0 lg:mr-0">
          {useNextImage && logoNew && (
            <div className="mx-auto h-24 w-24 lg:h-16 lg:w-16 xl:h-20 xl:w-20 relative rounded-full border border-gray-200">
              <Image
                objectFit="cover"
                layout="fill"
                src={logoNew}
                alt="Product Logo"
                className="rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      <a
        className="inline-block w-40 lg:w-full mx-auto"
        rel="noreferrer"
        href={link}
        target="_blank"
      >
        <button className="w-full lg:block bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 border-blue-700 hover:border-blue-500 rounded-lg">
          Visit Site
        </button>
      </a>
    </div>
  );
}
