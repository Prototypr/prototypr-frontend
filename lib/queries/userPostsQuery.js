export default `
query UserPosts($status:[String]!, $pageSize: Int, $offset: Int, $type:String) {
    userPostsAll(status: $status, pageSize:$pageSize, offset:$offset, type:$type){
    posts{
      id
      slug
      title
      date
      status
    }
    count
  }
}
`