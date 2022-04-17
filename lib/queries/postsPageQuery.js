export default `
query PostsPage ($pageSize: Int, $page: Int, $slugs: [String]){
    posts(sort:["featured:desc","tier:asc",  "date:desc"], pagination:{pageSize:$pageSize,page:$page}, filters:{status:{eq:"publish"}, type:{eq:"article"}, tags:{slug:{in: $slugs}}}) {
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
        tags {
          data {
            attributes {
              name
              slug
            }
          }
        }
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
  tags(filters:{slug:{in:$slugs}}){
    data{
      attributes{
        name
      }
    }
  }
}
`;
