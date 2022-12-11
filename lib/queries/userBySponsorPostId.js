export default `
query UserSponsor($id:ID!) {
  userSponsor(id: $id) {
    id
    title
    active
    owner
    description
    link
    type
  }
}
`;
