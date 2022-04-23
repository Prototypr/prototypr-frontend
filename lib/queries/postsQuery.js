export default `
query Posts ($limit: Int, $start: Int, $slugs: [String]){
  posts(sort:["featured:desc","tier:asc",  "date:desc"], pagination:{limit:$limit, start:$start}, filters:{status:{eq:"publish"}, type:{eq:"article"},tags:{slug:{in: $slugs}}}) {
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
