export default `
query UserNotifications($pageSize: Int, $offset: Int) {
    userNotifications(pageSize:$pageSize, offset:$offset){
    notifications{
      id
      read
      post
      notifiers
      actor
      entity_type
      action_type
      createdAt
    }
    count
  }
}
`