import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import Link from "next/link";
import Layout from "@/components/layout";

const qs = require("qs");

var axios = require("axios");
var slugify = require("slugify");

/**
 *
 * View all posts from a user [x]
 * View draft posts
 * view published posts
 * edit draft post
 * edit published post
 */

const PostCard = ({ post }) => {
  return (
    <div className="cursor-pointe p-6 h-full rounded-lg shadow-md hover:shadow-lg bg-white hover:transition duration-300 ease-in-out">
      <div className="flex flex-col gap-2">
        <div>
          <span
            className={`text-[10px] uppercase w-auto px-4 py-1 ${
              post.status === "draft" ? "bg-yellow-500" : "bg-green-500"
            }  text-white rounded-[4px] my-2`}
          >
            {post.status}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-4 max-w-md font-noto-serif">
          <h2>{post.title}</h2>
        </h3>
      </div>

      {post.status === "draft" && (
        <div>
          <Link href={`/my-posts/draft/${post.slug}`}>
            <button className="text-sm underline text-blue-400 hover:text-blue-500">
              Edit Draft
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const MyPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentTab, setCurrentTab] = useState("drafts");
  const { user } = useUser({
    redirectIfFound: false,
  });
  const getAllPostsFromUser = async () => {
    console.log(user.id);
    const query = qs.stringify(
      {
        filters: {
          id: {
            $eq: user.id,
          },
        },
        populate: "*",
        fields: ["email", "firstName"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    let currentUserData = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/users?${query}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
    };
    const currentUser = await axios(currentUserData);
    const postsFromUser = currentUser.data[0]?.posts;
    setAllPosts(postsFromUser);
  };

  useEffect(async () => {
    await getAllPostsFromUser();
  }, []);

  return (
    <div className="pb-20">
      <div className="flex flex-row justify-between items-baseline mt-10">
        <h1 className="my-3 text-2xl font-bold">My Posts</h1>
        <Link href="/write">
          <button className="px-3 py-2 bg-blue-700 rounded text-sm text-white ">
            Write a Post
          </button>
        </Link>
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
          <div className="grid grid-cols-3 gap-5">
            {allPosts.map((post) => {
              if (post.status === "draft") {
                return <PostCard post={post} />;
              } else {
                return <></>;
              }
            })}
          </div>
        )}

        {currentTab === "publish" && (
          <div className="grid grid-cols-3 gap-5">
            {allPosts.map((post) => {
              if (post.status === "publish") {
                return <PostCard post={post} />;
              } else {
                return <></>;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
