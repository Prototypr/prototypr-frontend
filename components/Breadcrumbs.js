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
    // <div className="w-auto shadow-sm outline outline-gray-200/70 outline-1 bg-white p-2.5 rounded-xl" style={{width:'fit-content'}}>
    <div className="w-auto" style={{width:'fit-content'}}>
      {links.map((item, index) => {
        return (
          <div className="inline" key={index}>
            {" "}
            <div className="inline  border border-1 border-blue-300/20 rounded-full p-1.5 px-3 bg-blue-200/30 text-gray-50/90 font-normal">
              <Link href={`${item.slug}`} key={`breadcrumb_${title}_${index}`}>
                {!item.svg ? (
                  <span className="hover:text-white">{item.name}</span>
                ) : (
                  <>{item.svg}</>
                )}
              </Link>
            </div>
            <div className="inline mx-1">
              <ChevronRightIcon className="inline text-gray-50/90" />
            </div>
          </div>
        );
      })}
      {currentSlug == "toolbox" ? (
        <>
        <div className="inline  border border-1 border-blue-300/20 rounded-full p-1.5 px-3 bg-blue-200/30 text-gray-50/90 font-normal">
          <Link
            href={`${urlRoot}`}
            // className={`capitalize ${pageNo?'':'text-bold'}`}>
            className={`capitalize`}
          >
            Toolbox
          </Link>
        </div>
        <div className="inline mx-1">
              <ChevronRightIcon className="inline text-gray-50/90" />
            </div>
        <div className="inline  border border-1 border-blue-300/20 rounded-full p-1.5 px-3 bg-blue-400/60">
          <Link
            href={`${urlRoot}/page/1`}
            // className={`capitalize ${pageNo?'':'text-bold'}`}>
            className={`capitalize font-semibold text-white`}
          >All</Link>
        </div>
        </>
      ) : currentSlug ? (
        <div className="inline  border border-1 border-blue-300/20 rounded-full p-1.5 px-3 bg-blue-400/60 font-normal">
          <Link
            href={`${urlRoot}/${currentSlug}/page/1`}
            // className={`capitalize ${pageNo?'':'text-bold'}`}>
            className={`capitalize font-semibold text-white`}
          >{currentSlug}</Link>
        </div>
      ) : (
        <div className="inline  border border-1 border-blue-300/20 rounded-full p-1.5 px-3 bg-blue-400/60 font-normal">
          <Link href={`${urlRoot}/page/1`}>
            <span className="capitalize font-semibold text-white text-bold">
              {title}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
