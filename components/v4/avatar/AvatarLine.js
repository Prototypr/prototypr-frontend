import Image from "next/image";
import Moment from "react-moment";
import Link from "next/link";

const AvatarLine = ({ size, author, src, date }) => {
  let avatarSize = "h-[44px] w-[44px]";
  let titleClass = "text-xs";
  let dateClass = "text-xs";
  if (size == "lg") {
    avatarSize = "h-[28px] w-[28px] rounded-full";
  }
  if (size == "sm") {
    avatarSize = "h-[22px] w-[22px] rounded-full";
    titleClass = "text-xs";
    dateClass = "text-[10px]";
  }
  return (
    <Link href={`/people/${author?.slug}`}>
      <div className="flex font-inter w-full max-w-[300px]">
        <div className={`relative ${avatarSize} overflow-hidden`}>
          <Image
            className="object-cover"
            layout="fill"
            src={src ? src : `/static/images/storybook/avatar.png`}
          />
        </div>
        <div className="pl-1.5 flex my-auto flex-wrap">
          {author?.firstName ? (
            <h2 className={`line-clamp-1 font-regular ${titleClass}`}>
              {author?.firstName} {author?.lastName ? author?.lastName : ""}
            </h2>
          ) : author?.displayName ? (
            <h2 className={`line-clamp-1 font-regular ${titleClass}`}>
              {author?.displayName}
            </h2>
          ) : (
            <h2 className={`line-clamp-1 font-regular ${titleClass}`}>
              Unknown
            </h2>
          )}

          {/* dot */}
          <div className="px-1 text-xs text-gray-500 font-bold">·</div>
          {/* date */}
          <p className={`line-clamp-1 text-gray-500 ${dateClass}`}>
            <Moment
              className={`text-xs text-gray-500 my-auto`}
              date={date}
              format="MMM DD"
            />
          </p>
        </div>
      </div>
    </Link>
  );
};
export default AvatarLine;
