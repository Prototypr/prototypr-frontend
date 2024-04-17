export default `
query ActiveSponsor($pageSize:Int, $offset:Int) {
    activeSponsors(pageSize:$pageSize, offset:$offset) {
      posts{
        id
        weeks
        featuredImage
        banner
        title
        link
        description
        #productId
        postType
        fallback
      }
      
    }
  }
`