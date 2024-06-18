import { CircleWavyQuestion, UserCircleCheck } from "../../icons";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const ProfileApprove = ({ notification }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col h-full justify-center">
          {notification.action_type == "approve" && (
            <div className="text-4xl my-auto text-gray-800">
              <UserCircleCheck />
            </div>
          )}
          {notification.action_type == "request_completion" && (
            <div className="text-4xl my-auto text-gray-800">
              <CircleWavyQuestion />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-md">
            {notification.action_type == "approve" ? (
              <>
                <Link
                  href={`/people/${notification?.notifiers[0].slug}`}
                  className="font-bold hover:underline"
                >
                  Your profile
                </Link>{" "}
                has been approved by our team.
              </>
            ) : 
            notification.action_type == "request_completion" ? (
                <>
                
                <Link
                  href={`/people/${notification?.notifiers[0].slug}`}
                  className="font-bold hover:underline"
                >
                 Complete your profile
                </Link>{" "}
                to start posting and interacting with the community.
              </>
            ):
            (
              "Notification received"
            )}
          </h3>
          <p className="text-sm text-gray-500 max-w-[42rem] line-clamp-2 mr-4">
            {notification.action_type == "approve" ? (
              "You can now start posting and interacting with the community."
            ) :notification.action_type == "request_completion"?
            "Profiles are manually approved by our team. Please complete your profile for approval."
            : "Notification received"}
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
          href={`/people/${notification?.notifiers[0].slug}`}
        >
          <div className="rounded-full flex-none bg-blue-500 h-[9px] w-[9px] my-auto mr-2"></div>
        </Link>
      ) : null}
    </div>
  );
};

export default ProfileApprove;
