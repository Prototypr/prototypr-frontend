import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import Link from "next/link";
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

const MyPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
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
    <div>
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="my-3 text-2xl font-bold">My Posts</h1>
        <Link href="/write">
          <button className="px-3 py-2 bg-blue-700 rounded text-sm text-white ">
            Write a Post
          </button>
        </Link>
      </div>
      <div>
        <h2 className="my-3 text-base">My Drafts</h2>
        <div className="grid grid-cols-3 gap-5">
          {allPosts.map((post) => {
            if (post.status === "draft") {
              return (
                <div className="w-auto h-auto p-4 bg-slate-200 rounded flex flex-col gap-2">
                  <h2>{post.title}</h2>
                  <span className="text-xs w-auto px-4 py-1 bg-green-500 text-white rounded-full my-2">
                    {post.status}
                  </span>
                  <p className="text-xs">Published At : {post.publishedAt}</p>
                  <p className="text-xs">Created At: {post.createdAt}</p>
                  {post.status === "draft" && (
                    <div>
                      <Link href={`/my-posts/draft/${post.slug}`}>
                        <button>Edit Draft</button>
                      </Link>
                    </div>
                  )}
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>

        <div>
          <h2 className="my-3 text-base">Published</h2>
          <div className="grid grid-cols-3 gap-5">
            {allPosts.map((post) => {
              if (post.status === "publish") {
                return (
                  <div className="w-auto h-auto p-4 bg-slate-200 rounded flex flex-col gap-2">
                    <h2>{post.title}</h2>
                    <span className="text-xs w-auto px-4 py-1 bg-green-500 text-white rounded-full my-2">
                      {post.status}
                    </span>
                    <p className="text-xs">Published At : {post.publishedAt}</p>
                    <p className="text-xs">Created At: {post.createdAt}</p>
                    {post.status === "draft" && (
                      <div>
                        <Link href={`/my-posts/draft/${post.slug}`}>
                          <button>Edit Draft</button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
