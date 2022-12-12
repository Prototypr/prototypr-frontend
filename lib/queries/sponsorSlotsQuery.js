export default `
query SponsorSlots($type: String, $pageSize: Int, $offset: Int) {
    bookedSponsors(type: $type, pageSize:$pageSize, offset:$offset){
 	count
      posts{
        id
        weeks
        type
      }
  }
}
`