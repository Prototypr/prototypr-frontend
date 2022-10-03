import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import Link from "next/link";
import Layout from "@/components/layout";
import toast from "react-hot-toast";
import DeletePostButton from "@/components/modal/deletePostModal";

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

const PostCard = ({ post }) => {
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
        console.log("HELLO", resp);
        if (resp.status === 200) {
          toast.success("Your post has been deleted!", {
            duration: 5000,
          });
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
    <div className="cursor-pointe p-6 h-full rounded-lg shadow-md hover:shadow-lg bg-white hover:transition duration-300 ease-in-out">
      <div className="flex flex-col gap-2">
        <div>
          <span
            className={`text-[10px] uppercase w-auto px-4 py-1 ${
              post.status === "draft" ? "bg-yellow-500" :post.status === "pending" ? "bg-orange-500":"bg-green-500"
            }  text-white rounded-[4px] my-2`}
          >
            {post.status}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-4 max-w-md font-noto-serif">
          <h2>{post.title}</h2>
        </h3>
      </div>

      {(post.status === "draft" || post.status === "pending") && (
        <div>
          <Link href={`/my-posts/draft/${post.slug}`}>
            <button className="text-sm underline text-blue-400 hover:text-blue-500">
              Edit Draft
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
        {/* <button
          onClick={() => {
            deletePost(post.id);
          }}
          className="text-sm underline text-red-400 hover:text-red-500"
        >
          Delete Post
        </button> */}
      </div>
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


  useEffect(()=>{
    getAllPostsFromUser();
  },[])
  // useEffect(async () => {
  //   await getAllPostsFromUser();
  // }, []);

  return (
    <div className="pb-20 mx-auto px-2 sm:px-6 lg:px-8" style={{maxWidth:1200}}>
      <div className="flex flex-row justify-between items-baseline mt-3">
        <h1 className="my-3 text-2xl font-bold">My Posts</h1>
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
          <div className="grid grid-cols-3 gap-5">
            {allPosts.map((post) => {
              if ((post.status === "draft" || post.status === "pending")) {
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
