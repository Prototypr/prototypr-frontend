import Avatar from "../components/avatar";
import Date from "../components/date";
// import CoverImage from '../components/cover-image'
import PostTitle from "../components/post-title";

export default function PostHeader({ title, coverImage, date, author, type }) {
  return (
    <div className="max-w-2xl mx-auto pt-4 md:pt-12">
      <PostTitle>{title}</PostTitle>
      {author && (
        <div className="hidden md:block md:mb-12">
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
            picture={
              author.avatar?.data
                ? author.avatar.data.url
                : author.legacyAvatar
                ? author.legacyAvatar
                : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
            }
          />
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        {author && (
          <div className="block md:hidden mb-6">
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
              picture={
                author.avatar?.data
                  ? author.avatar.data.url
                  : author.legacyAvatar
                  ? author.legacyAvatar
                  : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
              }
            />
          </div>
        )}
        <div className="mb-6 text-lg">{date && <Date dateString={date} />}</div>
      </div>
    </div>
  );
}
