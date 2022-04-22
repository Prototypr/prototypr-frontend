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
        srcSet
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
