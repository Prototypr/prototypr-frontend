import Image from "next/image";
import Link from "next/link";

export default function PostListItem({
  index = 0,
  postItem = {},
  totalCount = 0,
  item = {},
}) {
  let img = postItem.featuredImage?.data?.attributes?.url ? postItem.featuredImage?.data?.attributes?.url
  : postItem.legacyFeaturedImage && postItem.legacyFeaturedImage.mediaItemUrl
      ? postItem.legacyFeaturedImage.mediaItemUrl
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  if (!img) {
    img = postItem?.legacyMedia?.logoNew;
    if (!img) {
      img = postItem.legacyMedia?.mediaItemUrl;
    }
    if (!img) {
      img = postItem.legacyMedia?.ogImage;
    }
  }

  const url = postItem.link;
  let domain = "";
  if (url) {
    const matches = url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    domain = matches && matches[1];
    if (domain) {
      domain = domain.replace("www.", "");
    }
  }

  return (
    <div
      className={
        "pt-3 md:pt-0 " +
        (totalCount > 1 &&
          index !== totalCount - 1 &&
          "border-b border-gray-200")
      }
    >
      <Link
        href={
          postItem.type == "tool"
            ? "/toolbox/" + postItem.slug
            : postItem.type == "design-tool"
            ? "/design-tool/" + postItem.slug
            : postItem.type == "article"
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
              {img ? (
                <div className="rounded-lg relative flex h-16 w-16 md:h-16 flex-none">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt={postItem.title}
                    src={img}
                    className="cardImage flex-shrink-0 shine h-16 w-16 md:h-16 rounded-md border border-gray-100"
                  />
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-100 relative flex h-16 w-16 md:h-16 flex-none"></div>
              )}
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
                {postItem.type &&
                  postItem.type.charAt(0).toUpperCase() +
                    postItem.type.slice(1)}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
