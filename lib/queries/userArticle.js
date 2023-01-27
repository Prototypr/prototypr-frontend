export default `
query UserArticle($id:ID!) {
  userPostId(id: $id) {
    id
    slug
    title
    date
    status
    content
    link
    excerpt
    localizations
    owner
    featuredImage
    tier
    published_at
    seo
    type
    logo
    legacyLogo
    gallery
  }
}
`;
