export default `
query PartnerPosts($companyId: ID!, $pageSize: Int, $offset: Int) {
    partnerPosts(companyId:$companyId, pageSize:$pageSize, offset:$offset){
    posts{
      id
      title
      paid
    }
    count
  }
}
`