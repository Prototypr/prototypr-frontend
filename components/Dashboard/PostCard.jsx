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
import format from "date-fns/format";
import Link from "next/link";
import toast from "react-hot-toast";
import DeletePostButton from "@/components/modal/deletePostModal";
import { ArrowSquareOut, ChartBar, NotePencil } from "phosphor-react";
const qs = require("qs");

var axios = require("axios");
var slugify = require("slugify");


const PostCard = ({ post, refetch, user }) => {

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
      <div className="flex flex-row justify-between p-6 h-full rounded-lg border shadow-sm border-black/5 hover:border-opacity-10 cursor-default bg-white hover:transition duration-300 ease-in-out col-span-12">
        <div className="flex flex-col grid gap-2">
          {(post.status!=='publish' && post.status!=='draft') &&
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
          </div>}
          <div className="">
            <Link href={post.type=='article'?`/p/${post.id}`:`/toolbox/post/${post.id}`}>
              <h3 className="text-xl mb-2 font-semibold max-w-2xl font-inter">
                {post.title}
              </h3>
            </Link>
            <div className="flex">
              {post.type?<p className="text-sm capitalize text-gray-500">
              {post.type}
              </p>:''}
              <div className="mx-2 my-auto text-sm text-gray-500">{` · `}</div>
              <p className="text-sm text-gray-500">
                {format(new Date(post.date), "LLLL d, yyyy")}
              </p>
            </div>
          </div>
        </div>
  
        {/* {(post.status === "draft" || post.status === "pending") && ( */}
        <div className="flex flex-row gap-1 my-auto">
          <div>
            <Link href={post.type=='article'?`/p/${post.id}`:`/toolbox/post/${post.id}`}>
              <button className="text-sm bg-white underline text-black p-3 rounded-full hover:bg-gray-100">
                <NotePencil size={18}/>
              </button>
            </Link>
          </div>
  
          {post.status === "publish" && (
            <div>
              <a target={"_blank"} href={post.type=='article'?`/post/${post.slug}`:`/toolbox/${post.slug}`}>
                <button className="text-lg bg-white underline text-black  p-3  rounded-full hover:bg-gray-100 ">
                  <ArrowSquareOut size={18}/>
                </button>
              </a>
            </div>
          )}
  
          {post.status === "publish" && (
            <div>
              <Link href={`/dashboard/stats/${post.slug}`}>
                <button className="text-lg bg-white underline text-black  p-3  rounded-full hover:bg-gray-100 ">
                  <ChartBar size={18}/>
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

  export default PostCard