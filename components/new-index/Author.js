import Image from "next/image";
import Link from "next/link";

import gumletLoader from "@/components/new-index/gumletLoader";

export default function Author({
  avatar = "",
  author = "",
  authorName = "",
  textColor = "",
}) {
  let authorImage = "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
  if(author?.data?.attributes?.legacyAvatar || author?.data?.attributes?.avatar){
    authorImage = author?.data?.attributes?.avatar?.data?.attributes?.avatar?.data?.attributes?author.data.attributes.avatar.data.attributes.url:
    author?.data?.attributes?.legacyAvatar && author.data.attributes.legacyAvatar
  }


  const name = 
  authorName
                ? authorName
                : author?.data?.attributes?.name
                ? author?.data?.attributes?.name
                : ""

  return (
    <>
      <div className="flex items-center">
        <div className="w-9 h-9 cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-sm rounded-full relative">
          {authorImage && (
              <Link href={`people/${author?.data?.attributes?.slug}`}>
                <Image
                  loader={gumletLoader}
                  src={authorImage}
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
              {name}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
