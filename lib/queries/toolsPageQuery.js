export default `
query ToolsPage ($pageSize: Int, $page: Int,$sort: [String]){
    posts(sort: $sort, pagination:{pageSize:$pageSize,page:$page}, filters:{type:{eq:"tool"}}) {
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
                name
                slug
              }
            }
          }
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
          legacyFeaturedImage:legacyMedia{
              mediaItemUrl:featuredImage
              imgUrl
              logoNew
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
