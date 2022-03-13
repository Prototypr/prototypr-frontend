export default `
    query PostBySlug($status: String, $slug: String, $type: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}, type:{eq:$type}}) {
        data {
          attributes {
            title
            slug
            content
            date
            ogImage: seo {
              opengraphImage
            }
            legacyFeaturedImage {
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
    
      morePosts: posts(sort: "date:desc", pagination:{limit: 2}, filters: {slug:{not:{eq:$slug}},status:{eq:$status}, type:{eq:$type}}) {
        data {
          attributes {
            title
            slug
            excerpt
            date
            legacyFeaturedImage {
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