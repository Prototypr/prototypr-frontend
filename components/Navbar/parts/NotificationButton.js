import { BellIcon } from "@/components/icons";
import ActiveIconButtonLink from "./ActiveIconButtonLink";
import { useEffect, useState } from "react";

import { getUserNotificationCount } from "@/lib/api";

const NotificationButton = ({ user }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      const nc = await getUserNotificationCount({
        user,
        pageSize: 10,
        offset: 0,
      });

      if (nc?.userNotifications?.count || nc?.userNotifications?.count===0) {
        setNotificationCount(nc?.userNotifications?.count);
      }
    };

    if (user?.isLoggedIn) {
      fetchNotificationCount();
    }
  }, [user?.isLoggedIn]);

  return (
    <div className="mr-3">
      <ActiveIconButtonLink href="/notifications">
        <BellIcon className={"mx-auto"} size={22} />
        {notificationCount > 0 && (
          <div className="absolute -top-0 mt-[3px] right-1 flex flex-col justify-center bg-blue-600 text-center mr-[10px] text-white text-[10px] rounded-full h-[14px] w-[14px] leading-none">
            <div className="leading-none my-auto text-center">{notificationCount>10?'10+':notificationCount}</div>
          </div>
        )}
      </ActiveIconButtonLink>
    </div>
  );
};
export default NotificationButton;
