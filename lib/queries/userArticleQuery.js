export default `
query UserArticle($slug:String!) {
  userPost(slug: $slug) {
    id
    slug
    title
    date
    status
    content
    localizations
  }
}
`