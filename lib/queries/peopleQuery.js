export default `
query PostsPage ($pageSize: Int, $page: Int, $slugs: [String]){
  posts(pagination:{pageSize: $pageSize,page: $page},sort: "date:desc", filters:{user:{slug:{in: $slugs}}}) {
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
      author : user {
        data {
          attributes {
            role:jobrole
            displayName:username
            firstName
            name:username
            avatar:legacyAvatar
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
      legacyMedia{
          mediaItemUrl:featuredImage
          imgUrl
          logoNew
      }
      legacyFeaturedImage{
        id
        mediaItemUrl
        thumb
      }
    }
  }
}
}
`;
