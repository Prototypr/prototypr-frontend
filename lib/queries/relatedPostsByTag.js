export default `
      query RelatedPostsAndMore($status: String, $slugs: [String], $type: String, $slug:String) {
      relatedPosts:posts(sort: "date:desc",pagination:{limit: 6},filters: {status:{eq:$status}, slug:{not:{eq:$slug}}, type:{eq:$type}, tags:{slug:{in:$slugs}}}) {
        data {
          attributes {
            title
            slug
            excerpt
            date
            tags {
            data {
                attributes {
                name
                slug
                }
            }
            }
            legacyFeaturedImage {
              id
              mediaItemUrl
              srcSet
              thumb
            }
            featuredImage{
              data{
                attributes{
                  url
                  formats
                }
              }
            }
            author {
              data {
                attributes {
                  name
                  displayName
                  firstName
                  lastName
                  avatar
                  slug
                }
              }
            }
          }
        }
      }
    morePosts: posts(sort: "date:desc", pagination:{limit: 4}, filters: {slug:{not:{eq:$slug}},status:{eq:$status}, type:{eq:$type}, tags:{slug:{notIn:$slugs}}}) {
        data {
          attributes {
            title
            slug
            excerpt
            date
            tags {
            data {
                attributes {
                name
                slug
                }
            }
            }
            legacyFeaturedImage {
              id
              mediaItemUrl
              srcSet
              thumb
            }
            featuredImage{
              data{
                attributes{
                  url
                  formats
                }
              }
            }
            author {
              data {
                attributes {
                  name
                  displayName
                  firstName
                  lastName
                  avatar
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;
