export default  `
query PostsPage ($pageSize: Int, $page: Int){
    posts(sort: "date:desc", pagination:{pageSize:$pageSize,page:$page}, filters:{status:{eq:"publish"}, type:{eq:"article"}}) {
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