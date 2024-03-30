export default `
query PartnerJobs($companyId: ID!, $pageSize: Int, $offset: Int) {
    partnerJobs(companyId:$companyId, pageSize:$pageSize, offset:$offset){
    posts{
      id
      title
    }
    count
  }
}
`