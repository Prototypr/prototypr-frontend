export default  `
query Tools ($limit: Int, $start: Int, $tags:[String], $slug:String){
    posts(sort: "date:desc", pagination:{limit:$limit, start:$start}, filters:{slug:{not:{eq:$slug}},tags:{slug:{in: $tags}},type:{eq:"tool"}}) {
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