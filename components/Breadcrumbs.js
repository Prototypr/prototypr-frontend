import React, { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function Breadcrumbs({
  title = "",
  links = [],
  currentSlug = "",
  urlRoot = "",
  pageNo = null,
}) {
  return (
    <div className="w-auto bg-white p-2.5 rounded-xl" style={{width:'fit-content'}}>
      {links.map((item, index) => {
        return (
          <div className="inline" key={index}>
            {" "}
            <div className="inline  border-gray-900 border-opacity-10 rounded-full p-1.5 px-3 bg-white bg-opacity-50">
              <Link href={`${item.slug}`} key={`breadcrumb_${title}_${index}`}>
                {!item.svg ? (
                  <span className="hover:underline">{item.name}</span>
                ) : (
                  <>{item.svg}</>
                )}
              </Link>
            </div>
            <div className="inline mx-1">
              <ChevronRightIcon className="inline" />
            </div>
          </div>
        );
      })}
      {currentSlug == "toolbox" ? (
        <>
        <div className="inline  border-gray-900 border-opacity-10 rounded-full p-1.5 px-3 bg-white bg-opacity-50">
          <Link
            href={`${urlRoot}`}
            // className={`capitalize ${pageNo?'':'text-bold'}`}>
            className={`capitalize`}
          >
            Toolbox
          </Link>
        </div>
        <div className="inline mx-1">
              <ChevronRightIcon className="inline" />
            </div>
        <div className="inline  border-gray-900 border-opacity-10 rounded-full p-1.5 px-3 bg-white bg-opacity-50">
          <Link
            href={`${urlRoot}/page/1`}
            // className={`capitalize ${pageNo?'':'text-bold'}`}>
            className={`capitalize font-semibold text-blue-600`}
          >
            All
          </Link>
        </div>
        </>
      ) : currentSlug ? (
        <div className="inline  border-gray-900 border-opacity-10 rounded-full p-1.5 px-3 bg-white bg-opacity-50">
          <Link
            href={`${urlRoot}/${currentSlug}/page/1`}
            // className={`capitalize ${pageNo?'':'text-bold'}`}>
            className={`capitalize font-semibold text-blue-600`}
          >
            {currentSlug}
          </Link>
        </div>
      ) : (
        <div className="inline p-1.5 px-3 border border-gray-900 border-opacity-10 rounded-full bg-white bg-opacity-50">
          <Link href={`${urlRoot}/page/1`}>
            <span className="capitalize font-semibold text-blue-600 text-bold">
              {title}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
