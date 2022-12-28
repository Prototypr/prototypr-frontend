export default `
query Tools ($pageSize: Int, $page: Int, $type: String){
    posts(sort: "date:desc", pagination:{pageSize:$pageSize,page:$page}, filters:{type:{eq:$type}}) {
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
        title
        date
        slug
        excerpt
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
