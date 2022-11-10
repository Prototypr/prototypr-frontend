import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import Link from "next/link";
import Layout from "@/components/layout";
import toast from "react-hot-toast";
import DeletePostButton from "@/components/modal/deletePostModal";

import useFetchPosts from "../Dashboard/useFetchPosts";
import format from "date-fns/format";

const qs = require("qs");

var axios = require("axios");
var slugify = require("slugify");

/**
 *
 * View all posts from a user [x]
 * View draft posts[x]
 * view published posts[x]
 * edit draft post [x]
 * edit published post
 * 
 * next features
 * these are some next features:
 * 
 * delete post [x]
 * delete post modal [x]
 * export post [x]
 * each new post will have its own namespace in local storage
- delete profile in profile danger section, and deleting profile should delete all posts?
 */

const PostCard = ({ post, refetch }) => {
  const { user } = useUser({
    redirectIfFound: false,
  });

  const deletePost = async (id) => {
    if (id) {
      let currentPostData = {
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`,
        headers: {
          Authorization: `Bearer ${user?.jwt}`,
        },
      };

      try {
        const resp = await axios(currentPostData);
        // console.log("HELLO", resp);
        if (resp.status === 200) {
          toast.success("Your post has been deleted!", {
            duration: 5000,
          });
          refetch();
        }
      } catch (error) {
        console.log(error);
        toast.success("Oops, something went wrong!", {
          duration: 5000,
        });
      }
    } else {
      toast.success("Could not find that post!", {
        duration: 5000,
      });
    }
  };

  return (
    <div className="cursor-pointe p-6 h-full rounded-lg border border-black border-opacity-5 hover:border-opacity-10 cursor-pointer bg-white hover:transition duration-300 ease-in-out">
      <div className="flex flex-col gap-2">
        <div>
          <span
            className={`text-[10px] uppercase w-auto px-4 py-1 ${
              post.status === "draft"
                ? "bg-yellow-500"
                : post.status === "pending"
                ? "bg-orange-500"
                : "bg-green-500"
            }  text-white rounded-[20px] my-2`}
          >
            {post.status}
          </span>
        </div>
        <div className="mb-3">
          <h3 className="text-lg font-medium max-w-md font-noto-sans">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500">
            {format(new Date(post.date), "LLLL d, yyyy")}
          </p>
        </div>
      </div>

      {/* {(post.status === "draft" || post.status === "pending") && ( */}
      <div className="flex flex-row gap-2">
        <div>
          <Link href={`/p/draft/${post.id}`}>
            <button className="text-sm underline text-black p-3 rounded-full hover:bg-gray-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
        </div>

        {post.status === "publish" && (
          <div>
            <a target={"_blank"} href={`/p/preview/${post.id}`}>
              <button className="text-lg underline text-black  p-3  rounded-full hover:bg-gray-100 ">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </a>
          </div>
        )}

        {post.status === "publish" && (
          <div>
            <Link href={`/p/stats/${post.slug}`}>
              <button className="text-lg underline text-black  p-3  rounded-full hover:bg-gray-100 ">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 1C11.7761 1 12 1.22386 12 1.5V13.5C12 13.7761 11.7761 14 11.5 14C11.2239 14 11 13.7761 11 13.5V1.5C11 1.22386 11.2239 1 11.5 1ZM9.5 3C9.77614 3 10 3.22386 10 3.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5V3.5C9 3.22386 9.22386 3 9.5 3ZM13.5 3C13.7761 3 14 3.22386 14 3.5V13.5C14 13.7761 13.7761 14 13.5 14C13.2239 14 13 13.7761 13 13.5V3.5C13 3.22386 13.2239 3 13.5 3ZM5.5 4C5.77614 4 6 4.22386 6 4.5V13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5V4.5C5 4.22386 5.22386 4 5.5 4ZM1.5 5C1.77614 5 2 5.22386 2 5.5V13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5V5.5C1 5.22386 1.22386 5 1.5 5ZM7.5 5C7.77614 5 8 5.22386 8 5.5V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.5C7 5.22386 7.22386 5 7.5 5ZM3.5 7C3.77614 7 4 7.22386 4 7.5V13.5C4 13.7761 3.77614 14 3.5 14C3.22386 14 3 13.7761 3 13.5V7.5C3 7.22386 3.22386 7 3.5 7Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        )}

        <div>
          <DeletePostButton
            onClick={() => {
              deletePost(post.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const MyPosts = () => {
  const [currentTab, setCurrentTab] = useState("drafts");
  const { user } = useUser({
    redirectIfFound: false,
  });

  const {
    posts: allPosts,
    publishedPosts,
    drafts,
    loading,
    refetch,
  } = useFetchPosts(user);

  return (
    <div
      className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 "
      style={{ maxWidth: 1200 }}
    >
      <div className="flex flex-row justify-between items-baseline mt-3">
        <h1 className="my-3 text-4xl font-semibold">My Posts</h1>
        {/* <Link href="/write">
          <button className="px-3 py-2 bg-blue-700 rounded text-sm text-white ">
            Write a Post
          </button>
        </Link> */}
      </div>
      <div>
        <div className="flex flex-row gap-3">
          <button
            onClick={() => setCurrentTab("drafts")}
            className={`my-3 text-sm ${
              currentTab === "drafts" ? "text-black" : "text-gray-500"
            }`}
          >
            Drafts
          </button>
          <button
            onClick={() => setCurrentTab("publish")}
            className={`my-3 text-sm ${
              currentTab === "publish" ? "text-black" : "text-gray-500"
            }`}
          >
            Published
          </button>
        </div>

        {currentTab === "drafts" && (
          <>
            <div className="grid grid-cols-3 gap-5">
              {!loading &&
                drafts?.map((post) => (
                  <PostCard refetch={refetch} post={post} />
                ))}
            </div>
            {!loading && !drafts?.length && <EmptyState draft={true} />}
          </>
        )}

        {currentTab === "publish" && (
          <>
            <div className="grid grid-cols-3 gap-5">
              {!loading &&
                publishedPosts?.map((post) => (
                  <PostCard refetch={refetch} post={post} />
                ))}
            </div>
            {!loading && !publishedPosts?.length && (
              <EmptyState draft={false} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyPosts;

const EmptyState = ({ draft }) => {
  return (
    <div className="mt-6 mx-auto rounded-lg border border-gray-300">
      <div className="pt-20 pb-20 px-6">
        <img
          width="150"
          className=" mx-auto"
          src="https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png"
          style={{ opacity: "0.92" }}
        />
        <h1 className="text-lg text-gray-500 pt-0 mt-4 mb-8 text-center">
          {draft
            ? `You've not created any drafts.`
            : `You've not published anything.`}
        </h1>
        {draft && (
          <div class="flex justify-center w-full my-3">
            <a
              class="inline-block bg-blue-600 hover:bg-blue-500 mx-auto text-white font-semibold  py-2 px-6 rounded-full shadow hover:shadow-lg"
              href="/write"
            >
              New draft
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
