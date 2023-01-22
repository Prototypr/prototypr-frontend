export default `
query UserArticles($status:[String]!, $pageSize: Int, $offset: Int) {
    userPosts(status: $status, pageSize:$pageSize, offset:$offset){
    posts{
      id
      slug
      type
      title
      date
      status
    }
    count
  }
}
`