export default `
query CreatorArticles($status:[String]!, $pageSize: Int, $offset: Int) {
    creatorPosts(status: $status, pageSize:$pageSize, offset:$offset){
    posts{
      id
      slug
      type
      title
      date
      status
      excerpt
    }
    count
  }
}
`