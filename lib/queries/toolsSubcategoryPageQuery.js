export default  `
query ToolsPage ($pageSize: Int, $page: Int, $slugs: [String]){
    posts(sort: "date:desc", pagination:{pageSize:$pageSize,page:$page}, filters:{type:{eq:"tool"}, tags:{slug:{in: $slugs}} }) {
      meta{
          pagination{
          total
          pageSize
          page
          pageCount
          }
      }
      data {
        attributes {
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
          legacyFeaturedImage:legacyMedia{
              mediaItemUrl:featuredImage
              imgUrl
              logoNew
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