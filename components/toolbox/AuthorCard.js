import Image from "next/image";
import Link from "next/link";
export default function AuthorCard({
  author = {},
  title,
  avatar = "",
  authorAvatar,
}) {
  let attributes = {};
  if (author.data && author.data.attributes) {
    //displayName firstName lastName avatar
    attributes = author.data.attributes;
  }

  if (!authorAvatar) {
    authorAvatar = attributes?.avatar?.data?.attributes?.url
      ? attributes.avatar.data.attributes.url
      : attributes?.legacyAvatar
        ? attributes.legacyAvatar
        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  }

  var username = attributes.username;
  if (!username) {
    username =
      (attributes.firstName ? attributes.firstName : "") +
      (attributes.lastName ? " " + attributes.lastName : "");
  }

  return (
    <>
      <div className="md:mb-0 block md:block rounded-lg">
        <Link href={`/people/${attributes?.slug}`}>
          {/* <h1 tabIndex={0} className="text-sm font-medium mb-3">{title?title:attributes.title ? attributes.title : "Posted by"}</h1> */}
          <div className="py-2 w-full relative flex flex-row-reverse">
            <div className="relative ml-6">
              <div className="w-16 h-16 rounded-full border border-1 border-gray-300/50 overflow-hidden relative">
                {authorAvatar && (
                  <Image
                    tabIndex={0}
                    layout="fill"
                    // priority={true}
                    // placeholder="blur"
                    objectFit="cover"
                    src={authorAvatar}
                    className="rounded-full "
                    alt="Author profile picture"
                  />
                )}
              </div>
            </div>

            <div className="my-auto">
              <p
                tabIndex={0}
                className="text-base cursor-pointer leading-5 font-semibold text-gray-800"
              >
                {username}
              </p>
              <p tabIndex={0} className="text-base text-gray-500">
                Editor
              </p>
              {title ? (
                <h1 tabIndex={0} className="text-base mt-2">
                  {title}
                </h1>
              ) : null}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
