export default
`    query homeCombinedQuery ($limit: Int, $start: Int){
        posts(sort:["tier:asc", "featured:asc", "date:desc"],pagination: {limit: $limit, start: $start},filters:{status:{eq:"publish"},type:{eq:"article"}}) {
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
                tags{
                  data{
                    attributes{
                      slug
                    }
                  }
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