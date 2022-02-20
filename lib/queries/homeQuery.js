export default `
query Posts {
    posts(sort: "date:desc", pagination:{limit:11}, filters:{status:{eq:"publish"},  type:{eq:"article"}}) {
      data {
        attributes {
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