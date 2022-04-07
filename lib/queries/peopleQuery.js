export default `
query PostsPage ($pageSize: Int, $page: Int, $slugs: [String]){
  posts(pagination:{pageSize: $pageSize,page: $page}, filters:{author:{slug:{in: $slugs}}}) {
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
      author {
        data {
          attributes {
            displayName
            firstName
            name 
            avatar
            bio
            twitter
            dribbble
            github
            kofi
            skills
            url
            link
            availability
            mentor
            kofi
            customAvatar
          }
        }
      }
      type
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
    }
  }
}
}
`