export default `
query UserJob($id:ID!) {
  userJob(id: $id) {
    id
    title
    active
    owner
    description
    url
    type
    salarymin
    salarymax
    locations{
      name
      value:id
    }
    skills{
      name
      value:id
      #slug
    }
  }
}
`;
