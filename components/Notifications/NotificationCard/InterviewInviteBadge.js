import { StageMic } from "../../icons";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const InterviewInviteBadge = ({ notification }) => {
  if(!notification?.post){
    return null;
  }
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col h-full justify-center">
          {notification.action_type == "invite" && (
            <div className="text-4xl my-auto text-gray-800">
              <StageMic />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-md">
            {notification.action_type == "invite" ? (
              <>
                You're invited to answer an interview article about {" "}
                <Link
              href={{ pathname:`/${notification?.post?.type == "article" ? "post" : "toolbox"}/${notification?.post?.slug}`, query: { clearNotification: notification.id } }}
              className="font-bold hover:underline"
                >
                  {notification?.post?.title}
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
              href={{ pathname:`/${notification?.post?.type == "article" ? "post" : "toolbox"}/${notification?.post?.slug}`, query: { clearNotification: notification.id } }}
              // as={`/${notification.post.type == "article" ? "post" : "toolbox"}/${notification?.post.slug}`}
            >
              Get featured in the newsletter for telling your story about
              <span className="font-medium text-gray-700">
                {" "}
                {notification?.post?.title}
              </span>
            </Link>
          </p>
          <div className="text-blue-400 text-sm">
            {formatDistanceToNow(new Date(notification?.createdAt), {
              addSuffix: true,
            })}
          </div>
          <div className="mt-4">
            <Link
              href={`${process.env.NEXT_PUBLIC_HOME_URL}/toolbox/post/${notification?.post?.id}/interview?clearNotification=${notification.id}`}
              className="font-bold hover:underline"
            >
              <button className="bg-gray-100 border font-normal border-gray-300/70 text-gray-600 px-3 py-1 text-sm rounded-lg">
                Answer now
              </button>
            </Link>
          </div>
        </div>
      </div>
      {notification.read == false || notification.read == "false" ? (
        <Link
          className="my-auto"
          href={`${process.env.NEXT_PUBLIC_HOME_URL}/toolbox/post/${notification?.post?.id}/interview?clearNotification=${notification.id}`}
          >
          <div className="rounded-full flex-none bg-blue-500 h-[9px] w-[9px] my-auto mr-2"></div>
        </Link>
      ) : null}
    </div>
  );
};

export default InterviewInviteBadge;
