export default `
query commonQuery ($limit: Int, $start: Int, $tags:[String], $type: String) {
  posts( sort:["featured:desc","tier:asc",  "date:desc"], pagination:{limit:$limit, start:$start}, filters:{tags:{slug:{in: $tags}},type:{eq:$type}}) {
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
