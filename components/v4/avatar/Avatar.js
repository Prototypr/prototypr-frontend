import Image from "next/image";
import Moment from "react-moment";
import Link from "next/link";

const Avatar = ({ size, author, src, date }) => {
  let avatarSize = "h-[44px] w-[44px]";
  let titleClass = "text-md";
  let dateClass = "text-xs";
  if (size == "lg") {
    avatarSize = "h-[44px] w-[44px]";
  }
  if (size == "sm") {
    avatarSize = "h-[32px] w-[32px]";
    titleClass = "text-xs";
    dateClass = "text-[10px]";
  }
  return (
    <Link href={`/people/${author?.slug}`}>
      <div className="flex font-inter w-full max-w-[300px]">
        <div
          className={`relative ${avatarSize} rounded-full overflow-hidden border border-gray-100`}
        >
          <Image
            className="object-cover"
            fill={true}
            src={src ? src : `/static/images/storybook/avatar.png`}
          />
        </div>
        <div className="pl-2 my-auto">
          {author?.firstName ? (
            <h2 className={`text-base font-medium ${titleClass}`}>
              {author?.firstName} {author?.lastName ? author?.lastName : ""}
            </h2>
          ) : author?.displayName ? (
            <h2 className={`text-base font-medium ${titleClass}`}>
              {author?.displayName}
            </h2>
          ) : (
            <h2 className={`text-base font-medium ${titleClass}`}>Unknown</h2>
          )}
          <p className={`text-gray-500 uppercase ${dateClass}`}>
            <Moment
              className="text-xs text-gray-500 my-auto"
              date={date}
              format="MMM DD"
            />
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Avatar;
