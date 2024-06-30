export function groupNotifications(notifications) {
    // Separate likes from other notifications
    const likes = notifications.filter(n => n.entity_type === 'like' && n.action_type === 'create');
    const otherNotifications = notifications.filter(n => n.entity_type !== 'like' || n.action_type !== 'create');
  
    // Group likes by post ID
    const likeGroups = likes.reduce((acc, notification) => {
      const key = `${notification.post?.id}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(notification);
      return acc;
    }, {});
  
    // Process each like group
    const groupedLikes = Object.entries(likeGroups).map(([postId, group]) => {
      const firstNotification = group[0];
      return {
        ...firstNotification,
        groupInfo: {
          count: group.length,
          notifications: group
        }
      };
    });
  
    // Combine grouped likes with other notifications
    const allNotifications = [...groupedLikes, ...otherNotifications];
  
    // Sort all notifications by the most recent notification (or the most recent in each group for likes)
    return allNotifications.sort((a, b) => {
      const dateA = a.groupInfo ? new Date(a.groupInfo.notifications[0].createdAt) : new Date(a.createdAt);
      const dateB = b.groupInfo ? new Date(b.groupInfo.notifications[0].createdAt) : new Date(b.createdAt);
      return dateB - dateA;
    });
  }