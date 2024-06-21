import { HandHeart } from "../../icons";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const LikeNotification = ({ notification }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col h-full justify-center">
          {notification.action_type == "create" && (
            <div className="text-4xl my-auto text-gray-800">
              <HandHeart />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-md">
            {notification.action_type == "create" ? (
              <>
                <span className="font-bold">
                  {notification?.notifiers?.map(notifier => {
                    return (
                      <Link
                        href={`/people/${notifier.slug}?clearNotification=${notification.id}`}
                        className="hover:underline"
                      >
                        {notifier.firstName?notifier.firstName:notifier.username}
                      </Link>
                    );
                  })}
                </span>{" "}
                reacted to your post, {""}
                <Link
                  href={`/${notification.post.type == "article" ? "post" : "toolbox"}/${notification?.post.slug}?clearNotification=${notification.id}`}
                  className="font-bold hover:underline"
                >
                  {notification.post.title}
                </Link>
                !
              </>
            ) : (
              "Notification received"
            )}
          </h3>
          <p className="text-sm text-gray-500 max-w-[42rem] line-clamp-2 mr-4">
            <Link
              className="hover:underline"
              href={`/${notification.post.type == "article" ? "post" : "toolbox"}/${notification?.post.slug}?clearNotification=${notification.id}`}
            >
              <span className="font-medium text-gray-700">
                {notification.post.title}:
              </span>{" "}
              {notification.post.excerpt}
            </Link>
          </p>
          <div className="text-blue-400 text-sm">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
      {notification.read == false || notification.read == "false" ? (
        <Link
          className="my-auto"
          href={`/${notification.post.type == "article" ? "post" : "toolbox"}/${notification?.post.slug}?clearNotification=${notification.id}`}
        >
          <div className="rounded-full flex-none bg-blue-500 h-[9px] w-[9px] my-auto mr-2"></div>
        </Link>
      ) : null}
    </div>
  );
};

export default LikeNotification;
