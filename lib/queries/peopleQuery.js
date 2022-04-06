export default `
query PeopleQuery ($pageSize: Int, $page: Int, $slugs: [String]){
  posts(pagination:{pageSize:$pageSize,page:$page}, filters:{author:{slug:{in: $slugs}}}) {
  meta{
      pagination {
          total
          pageSize
          page
          pageCount
      }
  }
  data {
    attributes {
      type
      tags {
        data {
          attributes {
            slug
          }
        }
      }
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