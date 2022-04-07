import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Container from "@/components/container";
import PostListItem from "@/components/people/PostListItem";
import KoFiButton from "@/components/people/KoFiButton";
import NewPagination from "@/components/pagination";
import USER_MOCK_ITEM from "@/components/people/UserMockData";
import POST_MOCK_ITEM from "@/components/people/PostMockData";
import { getPostsByPageAndAuthor } from '@/lib/api'

const PAGE_SIZE = 12;
const PAGE_COUNT = 20;
const ALL_SLUGS = ['hoangnguyen','clos','ebruaksoy','giovanitier','atharvapatil','alexanderigwe','kelechiu','tamarasredojevic','leandrofernandez','alexandragrochowski','chamansharma']
export default function PeoplePage({ allPosts = [], preview, pagination, slug = '', pageNo = 1, author }) {
  // console.log('author info2 *********' + JSON.stringify(author))
  const hash = require("string-hash");
  const color = require("tinycolor2");

  const user = USER_MOCK_ITEM;
  // const posts = new Array(5).fill(POST_MOCK_ITEM);
  const withAuthUser = {}
  const router = useRouter()

  const onPageNumChange = (pageNum) => {
      router.push(`/people/${slug}/page/${pageNum}`)
  }

  const LightenDarkenColor = (colorCode, amount) => {
    var usePound = false;

    if (colorCode[0] == "#") {
      colorCode = colorCode.slice(1);
      usePound = true;
    }

    var num = parseInt(colorCode, 16);

    var r = (num >> 16) + amount;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    var b = ((num >> 8) & 0x00ff) + amount;

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }

    var g = (num & 0x0000ff) + amount;

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

  const gradient = (uid, type = "horizontal") => {
    if (uid) {
      const n = hash(uid);
      const c1 = color({ h: n % 285, s: 0.44, l: 0.55 });
      var c1_ = c1.toHexString();
      const c2 = LightenDarkenColor(c1_, 55);

      c1_ = LightenDarkenColor(c1_, 40);

      switch (type) {
        case "diagonal":
          return `linear-gradient(to top right, ${c1_}, ${c2})`;

        case "radial":
          return `radial-gradient(circle, ${c1_}, ${c2})`;

        case "horizontal":
          return `linear-gradient(${c1_}, ${c2})`;

        case "vertical":
          return `linear-gradient(to right, ${c1_}, ${c2})`;

        default:
          return `linear-gradient(to top right, ${c1_}, ${c2})`;
      }
    }
    throw new TypeError("uid is required");
  };

  const titleCase = (str) => {
    var splitStr = str.split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    var st = splitStr.join(" ");
    return st.trim();
  };

  const getTags = (tags) => {
    if (tags.indexOf(",") > -1) {
      var nameArr = tags.split(",");
    } else {
      //trin string
      var tag = tags.substring(0, 22);
      var nameArr = [];
      nameArr.push(tag);
    }

    var jsx = [];

    for (var x = 0; x < nameArr.length; x++) {
      var jsxpart = (
        <div 
        key={`author_tags_${x}`}
        className="bg-gray-200 mr-2 mb-2 text-gray-600 text-xs px-2 py-1 rounded inline-block">
          {"# " + titleCase(nameArr[x])}
        </div>
      );

      jsx.push(jsxpart);
    }

    return jsx;
  };

  const getTwitterHandle = (string) => {
    //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
    //remove protocols
    var result = string.replace(/(^\w+:|^)\/\//, "");
    result = result.replace(/\//g, "");
    result = result.replace("twitter.com", "");
    result = result.replace("www.", "");
    result = result.replace("@", "");

    return result;
  };

  const getDribbbleHandle = (string) => {
    //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
    //remove protocols
    var result = string.replace(/(^\w+:|^)\/\//, "");
    result = result.replace(/\//g, "");
    result = result.replace("dribbble.com", "");
    result = result.replace("www.", "");
    result = result.replace("@", "");

    return result;
  };

  const getGithubHandle = (string) => {
    //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
    //remove protocols
    var result = string.replace(/(^\w+:|^)\/\//, "");
    result = result.replace(/\//g, "");
    result = result.replace("github.com", "");
    result = result.replace("www.", "");
    result = result.replace("@", "");

    return result;
  };

  const getPostList = () => {
    let jsx = [];
    if (allPosts.length) {
      const totalCount = allPosts.length;
      allPosts.forEach((item, index) => {
        jsx.push(
          <PostListItem key={`author_post_${index}`} postItem={item.attributes} index={index} totalCount={totalCount} />
        );
      });
    } else {
      jsx = "papa";
    }
    return jsx;
  };

  const getKofiName = (string) => {
    var result = string.replace(/(^\w+:|^)\/\//, '');
    result = result.replace(/\//g, '')
    result = result.replace('ko-fi.com', '')
    result = result.replace('kofi.com', '')
    result = result.replace('www.', '')
    result = result.replace('@', '')

    return result
  }

  return (
    <Layout activeNav={"toolbox"} preview={preview}>
      <Container>
        <>
          <section
            className="relative -mt-20  block"
            style={{ height: "260px" }}
          >
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                background: gradient(
                  author.name
                    ? author.name
                    : author.displayName
                    ? author.displayName
                    : "",
                  "horizontal"
                ),
              }}
            ></div>
          </section>
        </>
        <div className="mt-6 flex px-20">
          <div className="w-1/4 hidden lg:block">
            <div className="relative">
              <img
                alt="..."
                src={
                  author?.avatar
                }
                className="bg-white shadow-sm rounded-full object-cover h-auto align-middle border-4 border-white absolute"
                style={{ width: "122px", height: "122px", marginTop: "-62px" }}
              />
            </div>
            <div className="">
              <div className="mb-3">
                <h1 className="text-2xl pt-16 font-semibold leading-normal text-gray-800 mb-3">
                  {author?.name}
                </h1>
                {author && author.location && (
                  <div className="text-sm flex leading-normal mt-0 text-gray-600 font-normal uppercase">
                    <img
                      style={{ height: "0.94rem" }}
                      className="my-auto mr-1"
                      src="/static/images/icons/map-pin.svg"
                    />
                    <span>{author.location}</span>
                  </div>
                )}
                {author && author.url && (
                  <div className="text-sm flex leading-normal mt-1 text-gray-600 font-normal">
                    <img
                      style={{ height: "0.94rem" }}
                      className="h-4 my-auto mr-1"
                      src="/static/images/icons/link.svg"
                    />
                    <span>
                      <a
                        className="underline"
                        target="_blank"
                        rel="nofollow"
                        href={author.url}
                      >
                        {author.url
                          .replace(/(^\w+:|^)\/\//, "")
                          .replace(/\/+$/, "")}
                      </a>
                    </span>
                  </div>
                )}
              </div>
              {author.availability == "1" && (
                <a
                  className="hidden md:block cursor-pointer mb-1 inline-block"
                  rel="nofollow"
                  target="_blank"
                  href={`${author.url ? author.url : "#"}`}
                >
                  <div className=" bg-blue-900 mr-2 mb-2 uppercase text-gray-100 text-xs px-3 py-2 rounded inline-block">
                    <span className="hidden sm:block">
                      🔥 Available for hire
                    </span>
                    <span className="sm:hidden">🔥 Hire me</span>
                  </div>
                </a>
              )}

              {author.kofi && (
                <KoFiButton
                  color="#53b1e6"
                  label={"Buy me a coffee"}
                  kofiId={getKofiName(author.kofi)}
                />
              )}

              {user.meta && user.meta.role && (
                <h3 className="text-lg font-normal leading-normal mb-2 mt-4 text-gray-800">
                  {user.meta.role}
                </h3>
              )}

              {author.skills && getTags(author.skills)}

              <div className="w-full border-b border-gray-400 my-6" />

              {user.description && (
                <div className="text-base text-gray-700 mt-2 pr-3">
                  <div dangerouslySetInnerHTML={{ __html: user.description }} />
                </div>
              )}
            </div>

            <div className="mt-3 md:mt-6 absolute top-0 right-0 md:relative">
              {author.availability == "1" && (
                <a
                  className="cursor-pointer"
                  target="_blank"
                  href={`${author.url ? author.url : "#"}`}
                >
                  <div className=" bg-blue-900 mr-2 mb-2 uppercase text-gray-100 text-xs px-3 py-2 rounded inline-block">
                    <span className="hidden sm:block">
                      🔥 Available for hire
                    </span>
                    <span className="sm:hidden">🔥 Hire me</span>
                  </div>
                </a>
              )}

              <div className="flex justify-end md:justify-start mt-1 md:mt-3 z-20">
                {author.twitter && (
                  <a
                    className="link block mr-2"
                    href={`https://twitter.com/${getTwitterHandle(
                      author.twitter
                    )}`}
                    target="_blank"
                  >
                    <img
                      style={{ width: "28px" }}
                      className=" bg-white rounded-full shadow-sm hover:shadow-md"
                      src="/static/images/icons/twitter.svg"
                    />
                  </a>
                )}
                {author.dribbble && (
                  <a
                    className="link block mr-2"
                    href={`https://dribbble.com/${getDribbbleHandle(
                      author.dribbble
                    )}`}
                    target="_blank"
                  >
                    <img
                      style={{ width: "28px" }}
                      className=" bg-white rounded-full shadow-sm hover:shadow-md"
                      src="/static/images/icons/dribbble.svg"
                    />
                  </a>
                )}
                {author.github && (
                  <a
                    className="link block mr-2"
                    href={`https://github.com/${getGithubHandle(
                      author.github
                    )}`}
                    target="_blank"
                  >
                    <img
                      style={{ width: "28px" }}
                      className=" bg-white rounded-full shadow-sm hover:shadow-md"
                      src="/static/images/icons/github.svg"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 ml-20">
            <div className=" mx-auto bg-white rounded-lg border border-gray-300 mb-20 max-w-4xl">
              {!allPosts.length ? (
                <div className="pt-20 pb-20 px-6">
                  <img
                    width="150"
                    className=" mx-auto"
                    src="https://prototypr.io/wp-content/uploads/2018/07/6dd2bd90-2c61-4163-bd5d-720567a692e6.png"
                    style={{ opacity: "0.92" }}
                  />
                  {withAuthUser && withAuthUser.ID == user.id ? (
                    <>
                      <h1 className="text-lg text-gray-500 w-full text-center mt-3">
                        Share something you've learned.
                      </h1>
                      <h1 className="text-lg text-gray-500 pt-0 text-center">
                        Add your first article.
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="text-lg text-gray-500 w-full text-center mt-3">
                        {author.name
                          ? author.name
                          : author.displayName
                          ? author.displayName
                          : ""}{" "}
                        has not posted anything yet.
                      </h1>
                      <h1 className="text-lg text-gray-500 pt-0 text-center">
                        Check back soon!
                      </h1>
                    </>
                  )}

                  {withAuthUser && withAuthUser.ID == user.id ? (
                    <div class="flex justify-center w-full my-3">
                      <a
                        class="inline-block bg-blue-600 hover:bg-blue-500 mx-auto text-white font-bold  py-2 px-6 rounded-full shadow hover:shadow-lg"
                        href="/new-story"
                      >
                        Write Post
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className=" md:py-2 md:pb-6">
                  {getPostList()}
                  <NewPagination
                    total={pagination?.total}
                    pageSize={PAGE_SIZE}
                    currentPage={pagination?.page}
                    onPageNumChange={(pageNum, slug) => {
                      onPageNumChange(pageNum, slug);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const { pageNo, slug } = params

  let allPosts = (await getPostsByPageAndAuthor(preview, pageSize, pageNo, [slug])) || []
  const pagination = allPosts.meta.pagination
  const author = allPosts.data.length && allPosts.data[0] ? allPosts.data[0].attributes.author: {}
  return {
    props: {
      author: author.data.attributes,
      slug,
      pageNo,
      preview,
      pagination,
      allPosts: allPosts.data
    },
  };
}

export async function getStaticPaths() {
  let pageCountArr = [];
  
  for (let index = 0; index < ALL_SLUGS.length; index++) {
    const allPosts = (await getPostsByPageAndAuthor(null, PAGE_SIZE, 0, [ALL_SLUGS[index]])) || []
    const pagination = allPosts.meta.pagination
    const pageCount = pagination.pageCount
    let arr = new Array(pageCount).fill('');
    let newArr = arr.map((i,index) => {
      return `/people/${ALL_SLUGS[index]}/page/${index+1}`
    })
    pageCountArr = pageCountArr.concat(newArr)
  }
  return {
    paths: pageCountArr || [],
    fallback: true,
  };
}
