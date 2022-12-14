export default `
query ActiveSponsor($type:String!, $pageSize:Int, $offset:Int) {
    activeSponsors(type: $type, pageSize:$pageSize, offset:$offset) {
      posts{
        id
        #weeks
        featuredImage
        title
        link
        description
      }
      
    }
  }
`