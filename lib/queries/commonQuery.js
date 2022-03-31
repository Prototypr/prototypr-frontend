export default `
query commonQuery ($limit: Int, $start: Int, $tags:[String], $type: String) {
  posts( sort: "date:desc", pagination:{limit:$limit, start:$start}, filters:{tags:{slug:{in: $tags}},type:{eq:$type}}) {
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