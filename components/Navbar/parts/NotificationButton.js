import { BellIcon } from "@/components/icons";
import ActiveIconButtonLink from "./ActiveIconButtonLink";
import { useEffect, useState } from "react";

import { getUserNotificationCount } from "@/lib/api";
// import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const NotificationButton = ({ user }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      const nc = await getUserNotificationCount({
        user,
        pageSize: 10,
        offset: 0,
      });

      if (nc?.userNotifications?.count || nc?.userNotifications?.count === 0) {
        setNotificationCount(nc?.userNotifications?.count);
      }
    };

    const clearNotifications = async id => {
      var data = JSON.stringify({
        id: id ? id : "*",
      });
      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/notificationsClear`,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      // const loadingToastId = toast.loading("Sending verification email");

      axios(config)
        .then(function (response) {
          setTimeout(() => {
            fetchNotificationCount()
          }, 10);
        })
        .catch(function (error) {
          console.log(error);
        });

      // location.reload()
    };

    if (user?.isLoggedIn) {
      fetchNotificationCount();
    }
    if (user?.isLoggedIn && searchParams) {
      // Check if there is a clearNotification query parameter in the router path
      const clearNotification = searchParams?.get("clearNotification");
      if (clearNotification) {
        clearNotifications(clearNotification);
      }
    }

  }, [user?.isLoggedIn, searchParams]);

  return (
    <div className="mr-3">
      <ActiveIconButtonLink href="/notifications">
        <BellIcon className={"mx-auto"} size={22} />
        {notificationCount > 0 && (
          <div className="absolute -top-0 mt-[3px] right-1 flex flex-col justify-center bg-blue-600 text-center mr-[10px] text-white text-[10px] rounded-full h-[14px] w-[14px] leading-none">
            <div className="leading-none my-auto text-center">
              {notificationCount > 10 ? "10+" : notificationCount}
            </div>
          </div>
        )}
      </ActiveIconButtonLink>
    </div>
  );
};
export default NotificationButton;
