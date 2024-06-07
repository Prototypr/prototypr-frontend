export default `
query UserArticle($slug:ID!) {
  userPostId(id: $slug) {
    id
    slug
    interviews{
      slug
    }
    tools{
      slug
    }
  }
}
`;
