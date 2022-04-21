export default `    query homeCombinedQuery ($limit: Int, $start: Int,$sort:[String]){
        posts(sort:$sort,pagination: {limit: $limit, start: $start},filters:{status:{eq:"publish"},type:{eq:"article"}}) {
            data {
              attributes {
                featured
                tier
                title
                status
                slug
                excerpt
                content
                date
                localizations {
                  data{
                    attributes {
                      locale
                      title
                      excerpt
                    }
                  }
                }
                featuredImage{
                  data{
                    attributes{
                      url
                      formats
                    }
                  }
                }
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
