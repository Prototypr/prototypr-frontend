export const permissionCheck = (user, post) => {
  let hasPermission = false;

  if (user && post?.owner == user?.id && post?.type === "article") {
    hasPermission = true;
  }
  if (user && post?.owner == user?.id && post?.type === "tool") {
    hasPermission = true;
  }
  if (user && post?.owner == user?.id && post?.type === "note") {
    hasPermission = true;
  }



  if (user?.isAdmin && post?.id) {
    hasPermission = true;
  }

  if (!post?.id) {
    hasPermission = false;
  }

  return hasPermission;
};
