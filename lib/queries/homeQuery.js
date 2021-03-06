export default `
query Posts {
    posts(sort:["featured:desc","tier:asc",  "date:desc"], pagination:{limit:11}, filters:{status:{eq:"publish"},  type:{eq:"article"}}) {
      data {
        attributes {
          title
          slug
          excerpt
          legacyFeaturedImage{
            id
            mediaItemUrl
            thumb
          }
          featuredImage{
            data{
              attributes{
                url
                formats
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
              }
            }
          }
        }
      }
    }
  }
`;
