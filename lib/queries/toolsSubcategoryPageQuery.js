export default `
query ToolsPage ($pageSize: Int, $page: Int, $slugs: [String], $sort: [String]){
    posts(sort: $sort, pagination:{pageSize:$pageSize,page:$page}, filters:{type:{eq:"tool"}, tags:{slug:{in: $slugs}} }) {
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
          slug
          localizations {
            data{
              attributes {
                locale
                title
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
