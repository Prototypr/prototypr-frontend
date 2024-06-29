import AuthorCard from "@/components/toolbox/AuthorCard";
import ToolBackgroundCard from "@/components/v4/card/ToolBackgroundCard";
import ToolIconCard from "@/components/v4/card/ToolIconCard";
import SocialShare from "@/components/SocialShare";
import Link from "next/link";

const AuthorSidebar = ({post,date,navSponsor, relatedPosts, tags, authorAvatar}) =>{

    return(
        <div className="p-1 pt-0.5 rounded-2xl h-fit border-gray-300/60">
                {post.attributes?.creators?.data?.length > 0 ? (
                  <div className="order-1 p-4 mb-4 rounded-2xl bg-[#f4f4f4]/60">
                    <h3 className="text-sm tracking-tight text-gray-500 ">
                      {post.attributes?.creators?.data?.length > 1
                        ? `Creators`
                        : "Creator"}
                    </h3>
                    {post.attributes?.creators?.data?.map((creator, index) => {
                      return (
                        <AuthorCard
                          creator={true}
                          key={index}
                          title={post?.attributes?.creator ? "Curator" : null}
                          author={creator}
                          avatar={creator}
                          authorAvatar={
                            creator?.attributes?.avatar?.data?.attributes?.url
                              ? creator?.attributes.avatar.data.attributes.url
                              : creator?.attributes?.legacyAvatar
                                ? creator?.attributes.legacyAvatar
                                : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                          }
                        />
                      );
                    })}
                  </div>
                ) : null}

                {post?.attributes?.author &&
                  !post?.attributes?.creators?.data?.length && (
                    <div className="p-4 rounded-2xl bg-[#f4f4f4]/60">
                      <AuthorCard
                        authorAvatar={authorAvatar}
                        title={post?.attributes?.creator ? "Curator" : null}
                        author={post.attributes.author}
                        avatar={post.attributes?.author}
                      />
                    </div>
                  )}
                {/* <div className="h-[1px] pb-2 -mt-3 px-3">
                  <div className="bg-gray-100 h-[1px]"></div>
                </div> */}
                <div className="flex flex-col gap-4 mt-4 p-4 rounded-2xl bg-[#f4f4f4]/60">
                  <div className="text-gray-500">
                    <h3 className="text-sm tracking-tight  ">Published</h3>
                    <div className="text-base tracking-tight font-medium text-gray-500">
                      {date}
                    </div>
                  </div>
                  {post?.attributes?.author &&
                  post?.attributes?.creators?.data?.length &&
                  post?.attributes?.author?.id !=
                    post?.attributes?.creators?.data[0]?.id ? (
                    <AuthorCard
                      size={"small"}
                      authorAvatar={authorAvatar}
                      title={post?.attributes?.creator ? "Curator" : null}
                      author={post.attributes.author}
                      avatar={post.attributes?.author}
                    />
                  ) : null}

                  <div className="text-gray-500 mt-1">
                    <h3 className="text-sm tracking-tight ">Tags</h3>
                    {tags?.map((tag, index) => {
                      return (
                        <Link href={`/toolbox/${tag.attributes.slug}/page/1/`}>
                          <div
                            key={index}
                            className="text-gray-800 tracking-tight font-medium"
                          >
                            {tag.attributes.name}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-2">
                    <SocialShare
                      size={28}
                      title={post.attributes.title}
                      slug={post.attributes.slug}
                    />
                  </div>
                </div>

                {/* <div className="mt-4">
                  <ToolBackgroundCard
                    showAdTag={true}
                    height={"h-[220px] md:h-[310px] xl:h-[190px]"}
                    withBackground={true}
                    post={navSponsor}
                  />
                </div> */}

                {/* <div className="flex flex-col gap-4 mt-4 rounded-2xl bg-[#f4f4f4]/60">
                  <div className="relative rounded-2xl pb-3">
                    <h1
                      tabIndex={0}
                      className="text-sm mb-3 text-gray-500 tracking-tight px-3 pt-3"
                    >
                      Related tools
                    </h1>

                    <div className="flex flex-col pt-1 grid grid-cols-6 gap-6">
                      {relatedPosts?.map((tool, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col px-3 col-span-6 sm:col-span-3 lg:col-span-6 xl:col-span-6"
                          >
                            <div className="">
                              <ToolIconCard
                                withBackground={false}
                                tool={tool}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div> */}
              </div>
    )
}

export default AuthorSidebar;