import React from "react";
import Image from "next/image";
import Link from "next/link";
// import Moment from "react-moment";

export default function EditorPick({ post = {}, header = false }) {
  const postItem = post?.attributes;
  const {
    title = "",
    excerpt,
    slug,
    date,
    tags,
    legacyFeaturedImage = null,
    author = null,
  } = postItem;
  const tagArr = tags.data;
  return (
    <div className="pb-10 px-3 xl:px-0">
      {header && (
        <h3 className="text-3xl text-title-1 text-gray-900 font-bold leading-6 tracking-wide mb-9">
          {header}
        </h3>
      )}
      <section className="flex group flex-col justify-center antialiased bg-white text-gray-900 py-6 lg:py-16 rounded-lg">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 h-full">
          {/* Blog post */}
          <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
            <a className="relative block" href={`/posts/${slug}`}>
              <div
                className="absolute inset-0 bg-blue-100 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                <div className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={legacyFeaturedImage?.mediaItemUrl}
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
                      <Link href={`/posts/${slug}`}>
                        <a className="font-base text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">
                          #{" "}
                          {tagArr && tagArr.length
                            ? tagArr[0].attributes.slug
                            : "design"}
                        </a>
                      </Link>
                    </li>
                    {tagArr && tagArr.length > 1 && (
                      <li className="m-1">
                        <Link href={`/posts/${slug}`}>
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
                  <Link href={`/posts/${slug}`}>
                    <a className="hover:text-gray-900 group-hover:underline transition duration-150 ease-in-out">
                      {title}
                    </a>
                  </Link>
                </h3>
              </header>
              <div className="text-lg text-gray-400 flex-grow">
                <div
                  className="text-base font-medium text-gray-3 leading-normal mt-4 clamp-2 overflow-hidden text-ellipsis"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                ></div>
              </div>
              <footer className="flex items-center mt-4">
                <div className="cursor-pointer transform transition duration-500 hover:scale-125  rounded-full relative">
                  <Link
                    href={`/people/${author?.data?.attributes?.slug}/page/1`}
                  >
                    <div className="mr-4 relative flex-shrink-0 hover:cursor-pointer">
                      <Image
                        className="rounded-full"
                        src={author?.data?.attributes?.avatar}
                        width={40}
                        height={40}
                        objectFit="cover"
                        alt="Author 04"
                      />
                    </div>
                  </Link>
                </div>
                <div>
                  <Link
                    href={`/people/${author?.data?.attributes?.slug}/page/1`}
                  >
                    <a className="font-medium text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">
                      {author?.data?.attributes?.name}
                    </a>
                  </Link>
                  {/*<span className="text-gray-700"> - </span>
                  <span className="text-gray-500">
                    <Moment format="DD/MM/YYYY">{date}</Moment>
                  </span>*/}
                </div>
              </footer>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
