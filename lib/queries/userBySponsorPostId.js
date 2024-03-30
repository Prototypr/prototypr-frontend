export default `
query UserSponsor($id:ID!) {
  userSponsor(id: $id) {
    id
    title
    active
    owner
    description
    link
    banner
    featuredImage
    company
    productId
    paid
    email
    #members
    isMember
  }
}
`;
