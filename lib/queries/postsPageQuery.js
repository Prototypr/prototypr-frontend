export default `
query PostsPage ($pageSize: Int, $page: Int, $slugs: [String], $sort: [String]){
    posts(sort: $sort, pagination:{pageSize:$pageSize,page:$page}, filters:{status:{eq:"publish"}, type:{eq:"article"}, tags:{slug:{in: $slugs}}}) {
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
        tags {
          data {
            attributes {
              name
              slug
            }
          }
        }
        title
        date
        slug
        excerpt
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
  tags(filters:{slug:{in:$slugs}}){
    data{
      attributes{
        name
      }
    }
  }
}
`;
