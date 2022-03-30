export default
`    query homeCombinedQuery {
        posts(sort:["featured:desc","tier:asc","date:asc"],pagination: {limit: 5, start: 0},filters:{status:{eq:"publish"},type:{eq:"article"}}) {
            data {
              attributes {
                featured
                tier
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