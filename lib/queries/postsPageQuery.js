export default  `
query PostsPage ($pageSize: Int, $page: Int, $slugs: [String]){
    posts(sort:["tier:asc", "featured:asc", "date:desc"], pagination:{pageSize:$pageSize,page:$page}, filters:{status:{eq:"publish"}, type:{eq:"article"}, tags:{slug:{in: $slugs}}}) {
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