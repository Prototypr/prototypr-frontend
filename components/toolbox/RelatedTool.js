import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RelatedTool({ relatedPosts }) {
  return (
    <div className="hidden md:block bg-white rounded-lg mt-6 p-6 lg:mb-16">
      <h1 className="text-sm font-semibold mb-3">Related Tools</h1>
      {relatedPosts.map((post, index) => (
      <Link href={`/toolbox/${post.attributes.slug}`}>
        <div
          className="flex h-full relative mb-3 md:mb-0 border-b border-gray-50 cursor-pointer"
          key={`relatedPost_${index}`}
        >
          {(post.attributes && post.attributes.legacyFeaturedImage && post.attributes.legacyFeaturedImage.logoNew) ?
           <div className="rounded-lg relative flex md:my-4 h-16 w-16 md:h-16 flex-none">
            <Image
              layout="fill"
              objectFit="cover"
              alt={post.attributes.title}
              src={post.attributes.legacyFeaturedImage.logoNew}
              className="cardImage flex-shrink-0 shine h-16 w-16 md:h-16 rounded-md border border-gray-100"
            />
          </div>:
          <div className="rounded-lg border border-gray-200 bg-gray-100 relative flex md:my-4 h-16 w-16 md:h-16 flex-none"></div>
          }

          <div className=" sm:w-auto pl-3 py-4 md:pl-3">
              
                <div
                    className="cursor-pointer text-sm text-gray-800 leading-tight"
                    style={{ overflow: "hidden" }}
                >
                        {post.attributes.title}
                </div>
              
              {/* <div className="flex flex-col md:flex-row md:items-center">
                <div
                className="text-xs text-gray-700 mt-1"
                style={{ wordBreak: "break-word" }}
                >
                {post.attributes.slug}
                </div>
              </div> */}
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
}
