export default `
query UserJob($id:ID!) {
  userJob(id: $id) {
    id
    title
  }
}
`;
