export default `
query PartnerJobs($pageSize: Int, $offset: Int) {
    partnerJobs(pageSize:$pageSize, offset:$offset){
    posts{
      id
      title
    }
    count
  }
}
`