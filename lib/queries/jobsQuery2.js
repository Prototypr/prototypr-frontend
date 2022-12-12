export default `
query AllJobs($pageSize: Int, $offset: Int) {
    allJobs(pageSize:$pageSize, offset:$offset){
    posts{
      id
      slug
      type
      title
      companyName
      companyLogo
      locations{
        name
        slug
      }
      salarymin
      salarymax
      salaryText
      date
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