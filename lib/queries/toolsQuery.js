export default  `
query Tools {
    posts(sort: "date:desc", pagination:{limit:11}, filters:{type:{eq:"tool"}}) {
        data {
      attributes {
        title
        status
        slug
        excerpt
        date
        legacyFeaturedImage:legacyMedia{
            mediaItemUrl:featuredImage
            imgUrl
            logoNew
        }
        author {
          data {
            attributes {
              displayName
              firstName
              lastName
              avatar
            }
          }
        }
      }
    }
  }
}
`