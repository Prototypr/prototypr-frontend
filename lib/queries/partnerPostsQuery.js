export default `
query PartnerPosts($pageSize: Int, $offset: Int) {
    partnerPosts(pageSize:$pageSize, offset:$offset){
    posts{
      id
      title
    }
    count
  }
}
`