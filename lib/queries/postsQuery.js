export default `
query Posts ($limit: Int, $start: Int, $slugs: [String],$sort:[String]){
  posts(sort: $sort, pagination:{limit:$limit, start:$start}, filters:{status:{eq:"publish"}, type:{eq:"article"},tags:{slug:{in: $slugs}}}) {
  meta {
      pagination {
        total
        pageSize
        page
        pageCount
      }
  }
  data {
    attributes {
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
}

`;
