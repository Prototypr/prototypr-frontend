export default `
query UserArticles($status:[String]!, $pageSize: Int, $offset: Int) {
    userPosts(status: $status, pageSize:$pageSize, offset:$offset){
    posts{
      id
      slug
      type
      title
      draft_title
      date
      status
      excerpt
      tools
    }
    count
  }
}
`