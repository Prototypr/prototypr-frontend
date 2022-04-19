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
