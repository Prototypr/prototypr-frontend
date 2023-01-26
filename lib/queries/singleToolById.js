export default `
    query PostBySlug($status: String, $id: ID) {
      posts(filters: {status:{eq:$status}, id:{eq:$id}, type:{eq:"tool"}}) {
        data {
          id
          attributes {
            title
            slug
            content
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
