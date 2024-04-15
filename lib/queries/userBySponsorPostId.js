export default `
query UserSponsor($id:ID!) {
  userSponsor(id: $id) {
    id
    title
    active
    owner
    description
    products{
      id
      title
      price
      type
    }
    link
    banner
    featuredImage
    company
    #productId
    productIds
    paid
    email
    #members
    isMember
  }
}
`;
