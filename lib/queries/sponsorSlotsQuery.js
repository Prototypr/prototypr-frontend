export default `
query SponsorSlots($productId: String, $pageSize: Int, $offset: Int) {
    bookedSponsors(productId: $productId, pageSize:$pageSize, offset:$offset){
 	count
      posts{
        id
        weeks
        paid
      }
  }
}
`