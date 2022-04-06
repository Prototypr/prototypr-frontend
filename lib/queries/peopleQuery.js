export default `
query PostsPage {
    posts(pagination:{pageSize:12,page:1}, filters:{status:{eq:"publish"}, type:{eq:"article"},author:{firstName: {eq: "Graeme"}}}) {
    meta{
        pagination {
            total
            pageSize
            page
            pageCount
        }
    }
    data {
      attributes {
        tags {
          data {
            attributes {
              slug
            }
          }
        }
        title
        status
        slug
        excerpt
        date
        legacyFeaturedImage{
          id
          mediaItemUrl
          srcSet
          thumb
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