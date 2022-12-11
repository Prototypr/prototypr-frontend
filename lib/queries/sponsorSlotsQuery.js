export default `
query SponsorSlots($pageSize: Int, $offset: Int) {
    bookedSponsors(pageSize:$pageSize, offset:$offset){
 	count
      posts{
        id
        weeks
      }
  }
}
`