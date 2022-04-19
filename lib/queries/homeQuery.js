export default `
query Posts {
    posts(sort:["featured:desc","tier:asc",  "date:desc"], pagination:{limit:11}, filters:{status:{eq:"publish"},  type:{eq:"article"}}) {
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
          featuredImage{
            data{
              attributes{
                url
                formats
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
              }
            }
          }
        }
      }
    }
  }
`;
