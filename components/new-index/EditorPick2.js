import React from "react";
import Image from "next/image";
import Link from "next/link";

import gumletLoader from "@/components/new-index/gumletLoader";

export default function EditorPick({ post = {}, header = false, lazy = true }) {
  const postItem = post?.attributes;
  const {
    title = "",
    excerpt,
    slug,
    tags,
    legacyFeaturedImage = null,
    featuredImage = null,
    author = {},
  } = postItem;
  const tagArr = tags.data;

  let ftImage = featuredImage?.data?.attributes?.url
    ? featuredImage.data.attributes.url
    : legacyFeaturedImage?.mediaItemUrl
    ? legacyFeaturedImage.mediaItemUrl
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  ftImage = ftImage.replace(
    "https://prototypr-media.sfo2.digitaloceanspaces.com",
    "https://prototyprio.gumlet.io"
  );

  let authorImage =
    "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  if (
    author?.data?.attributes?.legacyAvatar ||
    author?.data?.attributes?.avatar
  ) {
    authorImage = author?.data?.attributes?.avatar?.data?.attributes?.url
      ? author.data.attributes.avatar.data.attributes.url
      : author?.data?.attributes?.legacyAvatar &&
        author.data.attributes.legacyAvatar;
  }

  const tagName =
    tagArr && tagArr.length ? tagArr[0].attributes.name : "design";
  const tagSlug = tagArr && tagArr.length ? tagArr[0].attributes.slug : "";

  return (
    <div className="pb-10 px-3 xl:px-0">
      {header && (
        <h3 className="text-3xl text-title-1 text-gray-900 font-bold leading-6 mb-9">
          {header}
        </h3>
      )}
      <section className="flex group flex-col justify-center antialiased text-gray-900 rounded-lg">
        <div className="p-6 sm:p-8 md:pr-12 h-full rounded-lg shadow-md hover:shadow-lg bg-white hover:transition duration-300 ease-in-out">
          {/* Blog post */}
          <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 sm:gap-4 lg:gap-12 items-center">
            <Link href={`/post/${slug}`}>
              <figure className="cursor-pointer rounded-lg relative rounded-lg h-56 sm:h-64 md:h-80 overflow-hidden transform transition duration-700 ease-out">
                <div className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out">
                  <Image
                    className="rounded-lg"
                    data-gmlazy={lazy}
                    fetchpriority={lazy ? "false" : "true"}
                    data-priority={lazy ? `false` : `true`}
                    priority={lazy ? false : true}
                    loader={gumletLoader}
                    layout="fill"
                    objectFit="cover"
                    src={ftImage}
                    alt="Blog post"
                  />
                </div>
              </figure>
            </Link>
            <div>
              <header>
                <div className="mb-3">
                  <ul className="flex flex-wrap text-xs font-medium -m-1">
                    <li className="m-1">
                      <Link href={`/posts/${tagSlug}`}>
                        <span className="cursor-pointer font-base hover:cursor-pointer hover:text-primary-700 hover:transition-all text-xs leading-none tracking-wide uppercase text-primary-400 mr-2 font-semibold tracking-[.05em]">
                          {tagName ? tagName : "design"}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <h3 className="text-2xl lg:text-4xl font-semibold mb-4 max-w-md">
                  <Link href={`/post/${slug}`}>
                    <span className="cursor-pointer font-noto-serif hover:text-gray-900 transition duration-150 ease-in-out">
                      {title}
                    </span>
                  </Link>
                </h3>
              </header>
              <div className="text-lg max-w-sm text-neutral-700 flex-grow">
                <div
                  className="text-base font-medium text-neutral-800 leading-normal mt-4 clamp-2 overflow-hidden text-ellipsis"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                ></div>
              </div>
              <footer className="flex items-center mt-6">
                <div className="cursor-pointer transform transition duration-500 hover:scale-125  rounded-full relative">
                  {authorImage && (
                    <Link href={`/people/${author?.data?.attributes?.slug}`}>
                      <div className="mr-4 cursor-pointer relative flex-shrink-0 hover:cursor-pointer">
                        <Image
                          className="rounded-full"
                          src={authorImage}
                          width={40}
                          height={40}
                          objectFit="cover"
                          alt="Author 04"
                        />
                      </div>
                    </Link>
                  )}
                </div>
                <div>
                  <Link href={`/people/${author?.data?.attributes?.slug}`}>
                    <span className="font-medium cursor-pointer text-neutral-700 hover:text-gray-900 transition duration-150 ease-in-out">
                      {/* {author?.data?.attributes?.name} */}
                      {`${
                        author?.data?.attributes?.firstName
                          ? author?.data?.attributes?.firstName
                          : ""
                      } `}
                      {`${
                        author?.data?.attributes?.lastName
                          ? author?.data?.attributes?.lastName
                          : ""
                      }`}
                      {`${
                        !author?.data?.attributes?.firstName &&
                        !author?.data?.attributes?.lastName
                          ? author?.data?.attributes?.name
                          : ""
                      }`}
                    </span>
                  </Link>
                </div>
              </footer>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
