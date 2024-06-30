import { HandHeart } from "../../icons";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";

const dummyAvatar =
  "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/4f9713374ad556ff3b8ca33e241f6c43.png";

const GroupedLikeNotification = ({ notification }) => {
  const { count, notifications } = notification.groupInfo;
  const postTitle = notification.post?.title;
  const firstUser = notifications[0].actor;
  const otherUsers = notifications.slice(1, 3); // Show up to 3 additional avatars
  const remainingCount = count - otherUsers.length - 1;

  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow">
      <div className="flex-shrink-0 text-4xl text-gray-800">
        <HandHeart />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex mb-2 -space-x-3 overflow-hidden">
          <Image
            src={firstUser.avatar?.url || dummyAvatar}
            alt={firstUser.username}
            width={32}
            height={32}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          />
          {otherUsers.map((user, index) => (
            <Image
              key={user.id}
              src={user.actor.avatar?.url || dummyAvatar}
              alt={user.actor.username}
              width={32}
              height={32}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            />
          ))}
          {remainingCount > 0 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white">
              <span className="text-xs font-medium text-gray-500">
                +{remainingCount}
              </span>
            </div>
          )}
        </div>
        <h3 className="text-base text-gray-900 mt-1">
          {firstUser?.slug ? (
            <Link href={`/people/${firstUser.slug}?clearNotification=${notification.groupInfo.notifications.map(n => n.id).join(",")}`}>
              <span className="font-semibold hover:underline">
                {firstUser.username}
              </span>
            </Link>
          ) : (
            <span className="">{firstUser.username}</span>
          )}
          {count > 1 && (
            <span>
              {" "}
              and {count - 1} {count === 2 ? "other" : "others"}
            </span>
          )}{" "}
          reacted to your post,{" "}
          <Link
            href={`/${notification.post.type=='article'?'post':notification.post.type=='tool'?'toolbox':'news'}/${notification?.post.slug}?clearNotification=${notification.groupInfo.notifications.map(n => n.id).join(",")}`}
            className="hover:underline font-semibold"
          >
            {postTitle}
          </Link>
        </h3>
        {notification.post.excerpt && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            <span
              dangerouslySetInnerHTML={{ __html: notification.post.excerpt }}
            />
          </p>
        )}
        <p className="text-sm text-blue-400 mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      {(notification.read === false || notification.read === "false") && (
        <div className="flex-shrink-0 my-auto">
          <div className="rounded-full flex-none bg-blue-500 h-[9px] w-[9px] my-auto mr-2"></div>
        </div>
      )}
    </div>
  );
};

export default GroupedLikeNotification;
