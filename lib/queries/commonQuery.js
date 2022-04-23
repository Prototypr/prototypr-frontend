export default `
query commonQuery ($limit: Int, $start: Int, $tags:[String], $type: String, $sort: [String]) {
  posts( sort: $sort, pagination:{limit:$limit, start:$start}, filters:{tags:{slug:{in: $tags}},type:{eq:$type}}) {
      data {
        attributes {
          featured
          tier
          title
          status
          slug
          excerpt
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
