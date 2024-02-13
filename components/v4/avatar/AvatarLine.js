import Image from "next/image";
import Moment from "react-moment";
import Link from "next/link";

const AvatarLine = ({ size, author, src, date }) => {
  let avatarSize = "h-[44px] w-[44px]";
  let titleClass = "text-sm";
  let dateClass = "text-sm";
  if (size == "lg") {
    avatarSize = "h-[28px] w-[28px] rounded-full";
  }
  if (size == "sm") {
    avatarSize = "h-[24px] w-[24px] rounded-full";
    titleClass = "text-sm";
    dateClass = "text-sm";
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
            <h2 className={`line-clamp-1 my-auto font-regular ${titleClass}`}>
              {author?.firstName} {author?.lastName ? author?.lastName : ""}
            </h2>
          ) : author?.displayName ? (
            <h2 className={`line-clamp-1 my-auto font-regular ${titleClass}`}>
              {author?.displayName}
            </h2>
          ) : (
            <h2 className={`line-clamp-1 my-auto font-regular ${titleClass}`}>
              Unknown
            </h2>
          )}

          {/* dot */}
          <div className="px-1 text-sm my-auto text-gray-500 font-bold hidden md:inline-block">·</div>
          {/* date */}
          <p className={`md:line-clamp-1 my-auto text-gray-500 ${dateClass} hidden md:inline-block`}>
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
