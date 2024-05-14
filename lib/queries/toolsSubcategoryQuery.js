export default `
query Tools ($slugs: [String]){
    posts(sort: "date:desc", pagination:{limit:12, start:0}, filters:{type:{eq:"tool"}, tags:{slug:{in:$slugs}}}) {
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
        slug
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
