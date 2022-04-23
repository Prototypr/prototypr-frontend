export default `
query Tools ($limit: Int, $start: Int, $tags:[String], $slug:String){
    posts(sort: "date:desc", pagination:{limit:$limit, start:$start}, filters:{slug:{not:{eq:$slug}},tags:{slug:{in: $tags}},type:{eq:"bite"}}) {
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
        status
        slug
        excerpt
        date
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
              avatar:legacyAvatar
              slug
            }
          }
        }
      }
    }
  }
}
`;
