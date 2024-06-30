"use client";
import Button from "@/components/Primitives/Button";
import useUser from "@/lib/iron-session/useUser";
import useFetchNotifications from "./useFetchNotifications";
import NewPagination from "../pagination";
import { useEffect, useState } from "react";
import PostNotification from "./NotificationCard/PostNotification";
import CreatorBadgeNotification from "./NotificationCard/CreatorBadgeNotification";
import InterviewInviteBadge from "./NotificationCard/InterviewInviteBadge";
import ClaimNotification from "./NotificationCard/ClaimNotification";
import LikeNotification from "./NotificationCard/LikeNotification";
import ProfileApprove from "./NotificationCard/ProfileApprove";
import NotificationEmptyState from "./EmptyState";
import axios from "axios";
import { useRouter } from "next/navigation";
import GroupedLikeNotification from "./NotificationCard/GroupedLikeNotification";

const NotificationsList = () => {
  const { user } = useUser({
    redirectIfFound: false,
    redirectTo: "/",
  });

  const router = useRouter();

  const { notifications, loading, refetch, total, pageSize } =
    useFetchNotifications(user);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    refetch(1);
  }, [user]);

  const changePage = offset => {
    setCurrentPage(offset);
    refetch(offset);
  };

  const [showMarkAllAsRead, setShowMarkAllAsRead] = useState(false);
  useEffect(() => {
    for(let i = 0; i < notifications?.length; i++) {
      if (notifications[i].read == 'false') {
        setShowMarkAllAsRead(true);
        break;
      }
    }
  
  }, [notifications]);


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
          // setIsLoading(false);
          // showSuccessToast(loadingToastId);
        }, 800);
      })
      .catch(function (error) {
        console.log(error);
      });
    
      location.reload() 
  };


  return (
    <div className="flex flex-col">
      {/* <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </header> */}
      <main className="flex-1 my-6">
        <div className="grid gap-4">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} />)
          ) : notifications?.length ? (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <NotificationEmptyState />
          )}
        </div>
      </main>
      {showMarkAllAsRead ? (
        <footer className="py-4 flex justify-end">
          <Button onClick={() => clearNotifications("*")}>
            Mark All as Read
          </Button>
        </footer>
      ) : null}

      <NewPagination
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageNumChange={changePage}
      />
    </div>
  );
};

export default NotificationsList;

const Skeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium w-[140px] mb-3 bg-gray-100 h-4"></h3>
          <p className="text-gray-500 mt-1 w-[400px] bg-gray-100 h-4"></p>
        </div>
        <span className="text-gray-400 text-sm w-[60px] bg-gray-100 h-4"></span>
      </div>
    </div>
  );
};

const NotificationItem = ({ notification }) => {
  const isGrouped = notification.groupInfo && notification.groupInfo.count > 1;

  if (isGrouped && notification.entity_type === "like") {
    return <GroupedLikeNotification notification={notification} />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {notification?.entity_type == "post" ? (
        <PostNotification notification={notification} />
      ) : notification?.entity_type == "badge" ? (
        <CreatorBadgeNotification notification={notification} />
      ) : notification?.entity_type == "interview" ? (
        <InterviewInviteBadge notification={notification} />
      ) : notification?.entity_type == "claim" ? (
        <ClaimNotification notification={notification} />
      ) : notification?.entity_type == "like" ? (
        <LikeNotification notification={notification} />
      ) : notification?.entity_type == "profile" ? (
        <ProfileApprove notification={notification} />
      ) : (
        <div>
          <h3 className="text-lg font-medium">{notification.title}</h3>
          <p className="text-gray-500">{notification.body}</p>
        </div>
      )}
    </div>
  );
};
