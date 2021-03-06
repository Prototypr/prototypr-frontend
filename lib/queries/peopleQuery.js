export default `
query PostsPage ($pageSize: Int, $page: Int, $slugs: [String], $sort:[String]){
  posts(pagination:{pageSize: $pageSize,page: $page},sort: $sort, filters:{user:{slug:{in: $slugs}}}) {
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
      author : user {
        data {
          attributes {
            role:jobrole
            displayName:username
            firstName
            name:username
            legacyAvatar
            avatar{
              data{
                attributes{
                  url
                }
              }
            }
            bio
            twitter
            dribbble
            github
            kofi
            skills
            url
            link
            availability
            mentor
            kofi
          }
        }
      }
      type
      title
      slug
      localizations {
        data{
          attributes {
            locale
            title
            excerpt
          }
        }
      }
      featuredImage{
        data{
          attributes{
            url
          }
        }
      }
      legacyMedia{
            featuredImage
            imgUrl
            logoNew
        }
        legacyFeaturedImage{
            mediaItemUrl
        }
    }
  }
}
}
`;
