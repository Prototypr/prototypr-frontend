import Avatar from "../components/avatar";
import Date from "../components/date";
import Link from "next/link";
import PostTitle from "../components/post-title";
import Image from "next/image"
import gumletLoader from "@/components/new-index/gumletLoader";

export default function PostHeader({ title, coverImage, date, author, type, template }) {
  const avatar = author?.avatar?.data?.attributes?.url
    ? author?.avatar?.data?.attributes?.url
    : author.legacyAvatar
    ? author.legacyAvatar
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  return (
    <>
     {template==2 &&
      <div className="w-full relative h-56 md:h-80 ronuded-lg mt-2 mb-4 md:mb-0 md:mt-6">
        <Image
        loader={gumletLoader}
        objectFit="cover"
        className="rounded-lg"
        layout="fill"
        src={coverImage}
      />
      {/* <div className="absolute top-1/2 -mt-8 text-center w-full left-0">
        <h1 className="text-6xl font-noto-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center ">
          {title}
        </h1>
      </div> */}
        </div>
      }
    <div className="max-w-2xl mx-auto pt-4 md:pt-12">
     
      <PostTitle>{title}</PostTitle>
      {(author && template!==2) && (
        <Link href={`/people/${author.slug}`}>
          <div className="hidden cursor-pointer hover:underline md:block md:mb-12">
            <Avatar
              name={
                author.name
                  ? author.name
                  : author.displayName
                  ? author.displayName
                  : author.firstName
                  ? author.firstName
                  : ""
              }
              picture={avatar}
            />
          </div>
        </Link>
      )}
      <div className="max-w-2xl mx-auto">
        {(author && template!==2) && (
          <Link href={`/people/${author.slug}`}>
            <div className="cursor-pointer hover:underline block md:hidden mb-6">
              <Avatar
                name={
                  author.name
                    ? author.name
                    : author.displayName
                    ? author.displayName
                    : author.firstName
                    ? author.firstName
                    : ""
                }
                picture={avatar}
              />
            </div>
          </Link>
        )}
        {template!==2 ?<div className="mb-6 text-lg">{date && <Date dateString={date} />}</div>:<div className="py-2"/>}
      </div>
    </div>
    </>
  );
}
