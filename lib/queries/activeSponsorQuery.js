export default `
query ActiveSponsor($pageSize:Int, $offset:Int, $active:Boolean) {
    activeSponsors(pageSize:$pageSize, offset:$offset, active:$active) {
      posts{
        id
        weeks
        featuredImage
        banner
        title
        link
        description
        cardImage
        logoWide
        #productId
        postType
        fallback
        active
        #products
      }
      
    }
  }
`