"use client";
import { useEffect, useState } from "react";
import { getUserNotifications } from "@/lib/api";

const PAGE_SIZE = 9;

const useFetchNotifications = user => {
  const [total, setTotal] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch(1);
  }, []);

  const refetch = async offset => {
    setLoading(true);

    let pageOffset = (offset - 1) * PAGE_SIZE;
    if (!pageOffset) {
      pageOffset = 0;
    }

    if (!user) {
      return false;
    }

    const data = await getUserNotifications({
      user,
      pageSize: PAGE_SIZE,
      offset: pageOffset,
    });


    const notificationsForUser = data.userNotifications?.notifications;
    setNotifications(notificationsForUser);
    setTotal(data.userNotifications?.count);

    setLoading(false);
  };

  return { loading, notifications, total, pageSize: PAGE_SIZE, refetch };
};

export default useFetchNotifications;
