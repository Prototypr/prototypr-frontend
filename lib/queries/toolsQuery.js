export default `
query Tools ($limit: Int, $start: Int){
    posts(sort: "date:desc", pagination:{limit:$limit, start:$start}, filters:{type:{eq:"tool"}}) {
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
