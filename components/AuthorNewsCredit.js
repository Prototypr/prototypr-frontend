import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// const TimeAgo = dynamic(() => import("react-timeago"), { ssr: false });
import Timeago from "react-timeago";
export default function AuthorNewsCredit({
  author = {},
  domain = "",
  link = "#",
  postDate,
}) {
  // console.log('my author is*******' + JSON.stringify(author))
  let attributes = {};
  if (author.data && author.data.attributes) {
    //displayName firstName lastName avatar
    attributes = author.data.attributes;
  }
  return (
    <>
      <div className="mb-6 py-2 flex md:mb-0 bg-white border-gray-300 block md:block rounded-lg">
        <a className="flex" href={link} target="_blank">
          <div>
            <div className="w-5 h-5 mr-2 rounded-full border border-1 overflow-hidden relative border-gray-100 shadow-sm">
              {attributes.avatar && (
                <Image
                  tabIndex={0}
                  layout="fill"
                  objectFit="cover"
                  src={attributes?.avatar}
                  className="rounded-full "
                  alt="Author profile picture"
                />
              )}
            </div>
          </div>
          <div className="my-auto">
            <p
              tabIndex={0}
              className="text-sm mr-2 cursor-pointer leading-5 font-normal text-gray-800 my-auto"
            >
              {attributes.firstName ? attributes.firstName : "Username"}
            </p>
          </div>
          <div className="md:block my-auto text-gray-500 text-xs ">•</div>

          <p className="text-sm ml-2 mr-2">
            <a className="text-blue-600" href={link}>
              {domain}
            </a>
          </p>
          {postDate && (
            <>
              <div className="md:block my-auto text-gray-500 text-xs ">•</div>
              <Timeago
                className="text-sm my-auot ml-2"
                date={JSON.parse(postDate)}
              />
            </>
          )}
        </a>
      </div>
    </>
  );
}
