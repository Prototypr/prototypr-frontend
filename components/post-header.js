import Avatar from "../components/avatar";
import Date from "../components/date";
import Link from "next/link";
import PostTitle from "../components/post-title";

export default function PostHeader({ title, coverImage, date, author, type }) {
  const avatar = author?.avatar?.data?.attributes?.url
    ? author?.avatar?.data?.attributes?.url
    : author.legacyAvatar
    ? author.legacyAvatar
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  return (
    <div className="max-w-2xl mx-auto pt-4 md:pt-12">
      <PostTitle>{title}</PostTitle>
      {author && (
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
        {author && (
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
        <div className="mb-6 text-lg">{date && <Date dateString={date} />}</div>
      </div>
    </div>
  );
}
