export default `    query homeCombinedQuery ($limit: Int, $start: Int){
        posts(sort:["featured:desc","tier:asc",  "date:desc"],pagination: {limit: $limit, start: $start},filters:{status:{eq:"publish"},type:{eq:"article"}}) {
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
                      name
                      slug
                    }
                  }
                }
                author {
                  data {
                    attributes {
                      name
                      displayName
                      firstName
                      lastName
                      avatar
                      slug
                    }
                  }
                }
              }
            }
          }
    }
`;
