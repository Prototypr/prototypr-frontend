export default `
query Posts ($limit: Int, $start: Int, $slugs: [String]){
  posts(sort: ["tier:asc", "featured:asc", "date:desc"], pagination:{limit:$limit, start:$start}, filters:{status:{eq:"publish"}, type:{eq:"article"},tags:{slug:{in: $slugs}}}) {
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
      legacyFeaturedImage{
        id
        mediaItemUrl
        srcSet
        thumb
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
