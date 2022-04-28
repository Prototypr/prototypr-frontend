export default `    query homeCombinedQuery ($limit: Int, $start: Int,$sort:[String]){
        posts(sort:$sort,pagination: {limit: $limit, start: $start},filters:{status:{eq:"publish"},type:{eq:"article"}}) {
            data {
              attributes {
                featured
                title
                slug
                excerpt
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
                    }
                  }
                }
                legacyFeaturedImage{
                  id
                  mediaItemUrl
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
                author: user {
                  data {
                    attributes {
                      name:username
                      displayName:username
                      firstName
                      lastName:secondName
                      legacyAvatar
                      avatar{
                        data{
                          attributes{
                            url
                          }
                        }
                      }
                      slug
                    }
                  }
                }
              }
            }
          }
    }
`;
