export default `
query AdminArticles($status:[String]!, $pageSize: Int, $offset: Int, $user:Int) {
    adminPosts(status: $status, pageSize:$pageSize, offset:$offset, user:$user){
    posts{
      id
      slug
      title
      date
      status
      user{
        username
        firstName
        secondName
        slug
      }
    }
    count
  }
}
`