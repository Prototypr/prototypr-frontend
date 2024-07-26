export default `
    query PostBySlug($status: String, $id: ID) {
      posts(filters: {status:{eq:$status}, id:{eq:$id}, type:{eq:"tool"}}) {
        data {
          id
          attributes {
            title
            slug
            content
            narrative
            claimedBy{
              data{
                id
              }
            }
            logo{
              data{
                attributes{
                  url
                }
              }
            }
            link
            date
            legacyFeaturedImage:legacyMedia{
                mediaItemUrl:featuredImage
                imgUrl
                logoNew
            }
          }
      }
    }
}
  `;
