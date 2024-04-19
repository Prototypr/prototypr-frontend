export default `
query UserArticle($id:ID!) {
  userPostId(id: $id) {
    id
    slug
    title
    date
    status
    content
    excerpt
    link
    excerpt
    localizations
    owner
    featuredImage
    legacyFeaturedImage
    tier
    published_at
    seo
    type
    logo
    legacyLogo
    gallery
    deal
  }
}
`;
