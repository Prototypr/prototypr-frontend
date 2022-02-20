export default `
    query PostBySlug($status: String, $slug: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}}) {
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
    
      morePosts: posts(sort: "date:desc", pagination:{limit: 2}, filters: {slug:{not:{eq:$slug}},status:{eq:$status}}) {
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