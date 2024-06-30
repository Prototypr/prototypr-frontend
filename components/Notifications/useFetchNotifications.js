"use client";
import { useEffect, useState } from "react";
import { getUserNotifications } from "@/lib/api";
import { groupNotifications } from "@/lib/notifications/groupNotifications";

const PAGE_SIZE = 8;

const ungroupNotifications = (groupedNotifications) => {
  return groupedNotifications.flatMap(notification => 
    notification.groupInfo ? notification.groupInfo.notifications : notification
  );
};

const useFetchNotifications = user => {
  const [total, setTotal] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreNotifications, setHasMoreNotifications] = useState(true);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setCurrentPage(1);
    setHasMoreNotifications(true);

    if (!user) {
      return false;
    }

    const data = await getUserNotifications({
      user,
      pageSize: PAGE_SIZE,
      offset: 0,
    });

    const notificationsForUser = data.userNotifications?.notifications || [];
    const groupedNotifications = groupNotifications(notificationsForUser);

    setNotifications(groupedNotifications);
    setTotal(data.userNotifications?.count);
    setHasMoreNotifications(groupedNotifications.length < data.userNotifications?.count);

    setLoading(false);
  };

  const fetchMore = async () => {
    if (loading || !hasMoreNotifications) {
      return;
    }

    setLoading(true);

    const nextPage = currentPage + 1;
    const pageOffset = (nextPage - 1) * PAGE_SIZE;

    const data = await getUserNotifications({
      user,
      pageSize: PAGE_SIZE,
      offset: pageOffset,
    });

    const newNotifications = data.userNotifications?.notifications || [];

    if (newNotifications.length === 0) {
      setHasMoreNotifications(false);
      setLoading(false);
      return;
    }

    const ungroupedExistingNotifications = ungroupNotifications(notifications);
    const combinedNotifications = [...ungroupedExistingNotifications, ...newNotifications];
    const regroupedNotifications = groupNotifications(combinedNotifications);

    setNotifications(regroupedNotifications);
    setCurrentPage(nextPage);
    setHasMoreNotifications(regroupedNotifications.length < total);

    setLoading(false);
  };

  return { 
    loading, 
    notifications, 
    total, 
    pageSize: PAGE_SIZE, 
    refetch, 
    fetchMore, 
    hasMoreNotifications 
  };
};

export default useFetchNotifications;