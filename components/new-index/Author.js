import Image from "next/image";
import Link from "next/link";
export default function Author({
  avatar = "",
  author = "",
  authorName = "",
  textColor = "",
}) {
  return (
    <>
      <div className="flex items-center">
        <div className="w-9 h-9 cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-sm rounded-full relative">
          {(avatar || author?.data?.attributes?.avatar) &&
            author?.data?.attributes?.slug && (
              <Link href={`people/${author?.data?.attributes?.slug}`}>
                <Image
                  src={avatar ? avatar : author?.data?.attributes?.avatar}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </Link>
            )}
        </div>
        <div
          className={`font-normal text-base ml-3 ${
            textColor ? textColor : "text-gray-600"
          } hover:underline`}
        >
          {author?.data?.attributes?.slug && (
            <Link href={`people/${author?.data?.attributes?.slug}`}>
              {authorName
                ? authorName
                : author?.data?.attributes?.name
                ? author?.data?.attributes?.name
                : ""}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
