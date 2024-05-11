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
                blurhash
              }
            }
          }
          logo{
            data{
              attributes{
                url
                blurhash
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
