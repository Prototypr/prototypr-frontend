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
      <section className="flex group flex-col justify-center antialiased bg-white text-gray-900 rounded-lg">
        <Link href={`/post/${slug}`}>
          <div className="cursor-pointer max-w-6xl mx-auto p-6 sm:p-8 h-full rounded-lg">
            {/* Blog post */}
            <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
              <a className="relative block">
                <figure className="rounded-lg relative rounded-lg h-56 sm:h-64 overflow-hidden transform transition duration-700 ease-out">
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
              </a>
              <div>
                <header>
                  <div className="mb-3">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <Link href={`/posts/${tagSlug}`}>
                          <a className="font-base hover:cursor-pointer hover:underline text-sm leading-6 tracking-wide uppercase text-gray-600 mr-2">
                            # {tagName ? tagName : "design"}
                          </a>
                        </Link>
                      </li>
                      {tagArr && tagArr.length > 1 && (
                        <li className="m-1">
                          <Link href={`/post/${slug}`}>
                            <a className="font-base text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
                              #{" "}
                              {tagArr && tagArr.length
                                ? tagArr[1].attributes.slug
                                : "design"}
                            </a>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                    <Link href={`/post/${slug}`}>
                      <a className="font-noto-serif hover:text-gray-900 transition duration-150 ease-in-out">
                        {title}
                      </a>
                    </Link>
                  </h3>
                </header>
                <div className="text-lg text-gray-400 flex-grow">
                  <div
                    className="text-base font-medium text-gray-600 leading-normal mt-4 clamp-2 overflow-hidden text-ellipsis"
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                  ></div>
                </div>
                <footer className="flex items-center mt-4">
                  <div className="cursor-pointer transform transition duration-500 hover:scale-125  rounded-full relative">
                    <Link href={`/people/${author?.data?.attributes?.slug}`}>
                      <div className="mr-4 relative flex-shrink-0 hover:cursor-pointer">
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
                  </div>
                  <div>
                    <Link href={`/people/${author?.data?.attributes?.slug}`}>
                      <a className="font-medium text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">
                        {author?.data?.attributes?.name}
                      </a>
                    </Link>
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </Link>
      </section>
    </div>
  );
}
