export default `
    query PostBySlug($status: String, $slug: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}, type:{eq:"tool"}}) {
        data {
          attributes {
            title
            slug
            content
            date
            ogImage: seo {
              opengraphImage
            }
            legacyFeaturedImage:legacyMedia{
                mediaItemUrl:featuredImage
                imgUrl
                logoNew
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
    
      morePosts: posts(sort: "date:desc", pagination:{limit: 2}, filters: {slug:{not:{eq:$slug}},status:{eq:$status}, type:{eq:"tool"}}) {
        data {
          attributes {
            title
            slug
            excerpt
            date
            legacyFeaturedImage:legacyMedia{
                mediaItemUrl:featuredImage
                imgUrl
                logoNew
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