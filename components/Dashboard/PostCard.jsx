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
import Button from "@/components/Primitives/Button";
import toast from "react-hot-toast";
import DeletePostButton from "@/components/modal/deletePostModal";
import { ArrowSquareOut, ChartBar, Gift, NotePencil } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuArrow,
  RightSlot,
  IconButton,
} from "@/components/Locale/LocaleSwitcher";
import { DotsThree } from "@/components/icons";

var axios = require("axios");

const PostCard = ({ post, refetch, user }) => {
  const deletePost = async id => {
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
    <div className="flex flex-row justify-between p-4 h-full rounded-lg border shadow-sm border-black/5 hover:border-opacity-10 cursor-default bg-white hover:transition duration-300 ease-in-out col-span-12">
      <div className="flex flex-col grid gap-2 w-full flex-shrink">
        <div className="">
          <Link
            href={
              post.type == "article"
                ? `/p/${post.id}`
                : `/toolbox/post/${post.id}`
            }
          >
            <h3 className="text-xl font-semibold max-w-2xl ">{post.title}</h3>
            <p className="text-base text-gray-600 mb-3 max-w-[38rem] line-clamp-2 overflow-ellipses">
              {post.excerpt}
            </p>
            <div className="flex gap-1.5">
              <p className="text-sm my-auto text-gray-500">
                {format(new Date(post.date), "LLLL d, yyyy")}
              </p>
              <div className="my-auto text-sm text-gray-500">{` · `}</div>
              {post.type ? (
                <div className="text-[11px] font-semibold my-auto bg-gray-100 px-3 py-1 uppercase  rounded-full text-gray-600">
                  {post.type}
                </div>
              ) : (
                ""
              )}

              {post.status !== "publish" && post.status !== "draft" && (
                <>
                  <div className="my-auto text-sm text-gray-500">{` · `}</div>
                  <div
                    className={`text-[11px] uppercase font-semibold my-auto w-auto px-3 py-1 ${
                      post.status === "draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : post.status === "pending"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                    }   rounded-full`}
                  >
                    {post.status}
                  </div>
                </>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* {(post.status === "draft" || post.status === "pending") && ( */}
      <div className="flex flex-row gap-1 my-auto">
        {/* <div>
            <Link href={post.type=='article'?`/p/${post.id}`:`/toolbox/post/${post.id}`}>
              <button className="text-sm bg-white underline text-black p-3 rounded-full hover:bg-gray-100">
                <NotePencil size={18}/>
              </button>
            </Link>
          </div> */}

        {/* {post.status === "publish" && (
          <div>
            <a
              target={"_blank"}
              href={
                post.type == "article"
                  ? `/post/${post.slug}`
                  : `/toolbox/${post.slug}`
              }
            >
              <button className="text-lg bg-white underline text-black  p-3  rounded-full hover:bg-gray-100 ">
                <ArrowSquareOut size={18} />
              </button>
            </a>
          </div>
        )} */}

        {post.status === "publish" && post.type == "article" && (
          <div>
            <Link href={`/dashboard/stats/${post.slug}`}>
              <button className="text-lg bg-white underline text-black  p-3  rounded-full hover:bg-gray-100 ">
                <ChartBar size={18} />
              </button>
            </Link>
          </div>
        )}
        {post.type == "tool" ? (
          <div className="hidden md:block">
            <Link href={`/toolbox/post/${post.id}?step=3`}>
              <button className="text-lg bg-white underline text-black  p-3  rounded-full hover:bg-gray-100 ">
                <Gift size={18} />
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                className="!text-gray-700"
                aria-label="Customise options"
              >
                <DotsThree />
              </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={5}>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
              className="group"
                onSelect={(e) => {
                 e.preventDefault()
                }}
              >
                <DeletePostButton
                  onClick={() => {
                    deletePost(post.id);
                  }}
                />
              </DropdownMenuItem>

              <DropdownMenuArrow offset={12} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
