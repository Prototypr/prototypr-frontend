export default `
query UserNotificationCount($pageSize: Int, $offset: Int) {
    userNotifications(pageSize:$pageSize, offset:$offset, read:false){
    count
  }
}
`