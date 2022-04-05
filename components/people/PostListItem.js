import Image from "next/image";
import Link from "next/link";

export default function PostListItem({
  index = 0,
  postItem = {},
  totalCount = 0,
}) {

  const logo = postItem.logo
    ? postItem.logo
    : postItem.featured_img_src
    ? postItem.featured_img_src
    : postItem.img_url
    ? postItem.img_url
    : postItem.og_image
    ? postItem.og_image
    : ""
  return (
    <div
      key={`peopleItem_${index}`}
      className={
        "pt-3 md:pt-0 " +
        (totalCount > 1 && x !== totalCount - 1 && "border-b border-gray-200")
      }
    >
      <Link
        href={
          postItem.type == "toolbox"
            ? "/toolbox/[slug]"
            : postItem.type == "design-tool"
            ? "/design-tool/[slug]"
            : postItem.type == "post"
            ? "/post/[slug]"
            : postItem.type == "blog"
            ? "/blog/[slug]"
            : postItem.type == "news"
            ? "/news/[slug]"
            : postItem.type == "inspiratin"
            ? "/inspiration/[slug]"
            : "#"
        }
        as={
          postItem.type == "toolbox"
            ? "/toolbox/" + postItem.slug
            : postItem.type == "design-tool"
            ? "/design-tool/" + postItem.slug
            : postItem.type == "post"
            ? "/post/" + postItem.slug
            : postItem.type == "blog"
            ? "/blog/" + postItem.slug
            : postItem.type == "news"
            ? "/news/" + postItem.slug
            : postItem.type == "inspiratin"
            ? "/inspiration/" + postItem.slug
            : "#"
        }
      >
        <a>
          <div className={"px-4 md:px-4 flex h-full relative mb-3 md:mb-0"}>
            <div className="cursor-pointer rounded-lg relative flex md:my-4 h-16 w-16 md:h-16 flex-none">
              <img
                alt={postItem.title}
                src={logo}
                data-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                className="cardImage h-16 w-16 md:h-16 rounded-lg border flex-shrink-0 shine border-gray-100"
                style={{
                  objectFit: "cover",
                  objectPosition: " 50% 50%",
                }}
              />
            </div>

            <div className=" sm:w-auto pl-3 md:p-4">
              <div
                // onClick={() => this.setState({ showModal: true })}
                className="cursor-pointer text-md text-gray-800 leading-tight"
                style={{ overflow: "hidden" }}
              >
                {postItem.title}
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                {postItem && postItem.link && (
                  <div className="w-48 sm:w-64 rounded-full flex-wrap flex text-sm text-blue-700 mt-1 mb-1">
                    {domain}
                  </div>
                )}
              </div>
              <div className="hidden md:block text-xs text-gray-500">
                {postItem.type.charAt(0).toUpperCase() + postItem.type.slice(1)}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
