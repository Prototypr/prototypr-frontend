import Image from "next/image";
import Moment from "react-moment";
import Link from "next/link";

const Avatar = ({ size, author, src, date }) => {
  let avatarSize = "h-[44px] w-[44px]";
  let titleClass = "text-md";
  let dateClass = "text-sm";
  if (size == "lg") {
    avatarSize = "h-[44px] w-[44px] rounded-full";
  }
  if (size == "sm") {
    avatarSize = "h-[32px] w-[32px] rounded-full";
    titleClass = "text-sm";
    dateClass = "text-sm";
  }
  return (
    <Link href={`/people/${author?.slug}`}>
      <div className="flex font-inter w-full max-w-[300px]">
        <div
          className={`relative ${avatarSize} overflow-hidden border border-gray-100`}
        >
          <Image
            className="object-cover"
            layout="fill"
            src={src ? src : `/static/images/storybook/avatar.png`}
          />
        </div>
        <div className="pl-2 my-auto">
          {author?.firstName ? (
            <h2 className={`line-clamp-1 font-medium ${titleClass}`}>
              {author?.firstName} {author?.lastName ? author?.lastName : ""}
            </h2>
          ) : author?.displayName ? (
            <h2 className={`line-clamp-1 font-medium ${titleClass}`}>
              {author?.displayName}
            </h2>
          ) : (
            <h2 className={`line-clamp-1 font-medium ${titleClass}`}>
              Unknown
            </h2>
          )}
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
export default Avatar;
