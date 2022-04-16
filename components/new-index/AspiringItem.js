import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AspiringItem({ post = {} }) {
  const {
    title = "",
    excerpt,
    slug,
    date,
    tags,
    legacyFeaturedImage = null,
    author = null,
  } = post;

  return (
    <div className="grid-cols-1 cursor-pointer group">
      <figure className="relative w-full h-64 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
        <div className="absolute  w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
          <Link href={`/posts/${slug}`}>
            <Image
              objectFit="cover"
              className="rounded-lg contrast-115"
              layout="fill"
              src={legacyFeaturedImage?.mediaItemUrl}
            />
          </Link>
        </div>
      </figure>

      <div className="font-base text-sm hover:underline leading-6 tracking-wide uppercase text-gray-3 mt-2">
        By {" "}
      <Link className="hover:underline" href={`/people/${author?.data?.attributes?.slug}/page/1`}>
        <a>{author?.data?.attributes?.name}</a>
      </Link>
      </div>
      <h4 className="text-black-1 font-semibold text-lg leading-normal mt-1">
        <Link href={`/posts/${slug}`}>
          <a className="group-hover:underline">{title}</a>
        </Link>
      </h4>

      <p
        className="text-gray-3 text-base leading-normal font-normal overflow-hidden text-ellipsis clamp-3 mt-2"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      ></p>
    </div>
  );
}
