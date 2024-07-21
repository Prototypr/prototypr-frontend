export default `
query UserArticle($id:ID!) {
  userPostId(id: $id) {
    id
    slug
    title
    date
    status
    content
    draft_content
    draft_title
    excerpt
    link
    interviews
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
    creators
  }
}
`;
