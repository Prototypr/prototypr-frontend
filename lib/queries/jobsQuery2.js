export default `
query AllJobs($pageSize: Int, $offset: Int) {
    allJobs(pageSize:$pageSize, offset:$offset){
    posts{
      id
      slug
      title
      companyName
      companyLogo
      #date
      #status
      skills{
        name
        slug
        id
      }
    }
    count
    total
  }
}
`