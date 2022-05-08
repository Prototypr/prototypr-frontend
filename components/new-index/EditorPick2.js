import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useIntl } from "react-intl";

const gumletLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

export default function EditorPick({ post = {}, header = false , lazy=true}) {
  const intl = useIntl();
  const locale = intl.locale ? intl.locale : "en-US";
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

  const ftImage = featuredImage?.data?.attributes?.url ? 
  featuredImage.data.attributes.url:
  legacyFeaturedImage?.mediaItemUrl ? 
  legacyFeaturedImage.mediaItemUrl:
  'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'


  let authorImage = "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
  if(author?.data?.attributes?.legacyAvatar || author?.data?.attributes?.avatar){
    authorImage = author?.data?.attributes?.avatar?.data?.attributes?.avatar?.data?.attributes?author.data.attributes.avatar.data.attributes.url:
    author?.data?.attributes?.legacyAvatar && author.data.attributes.legacyAvatar
  }


  return (
    <div className="pb-10 px-3 xl:px-0">
      {header && (
        <h3 className="text-3xl text-title-1 text-gray-900 font-bold leading-6 mb-9">
          {header}
        </h3>
      )}
      <section className="flex group flex-col justify-center antialiased bg-white text-gray-900 py-6 lg:py-16 rounded-lg">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 h-full">
          {/* Blog post */}
          <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
            <Link href={`/post/${slug}`}>
            <a className="relative block" >
              <div
                className="absolute rounded-sm inset-0 bg-blue-100 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <figure className="relative rounded-sm h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                <div className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out">
                  <Image
                    className="rounded-sm"
                    data-gmlazy={lazy} 
                    fetchpriority={lazy?"false":"true"}
                    data-priority={lazy?`false`:`true`}
                    priority={lazy?`false`:`true`}
                    loader={gumletLoader}
                    layout="fill"
                    objectFit="cover"
                    src={ftImage}
                    alt="Blog post"
                  />
                </div>
              </figure>
            </a>
            </Link>
            <div>
              <header>
                <div className="mb-3">
                  <ul className="flex flex-wrap text-xs font-medium -m-1">
                    <li className="m-1">
                      <Link href={`/post/${slug}`}>
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
      </section>
    </div>
  );
}
