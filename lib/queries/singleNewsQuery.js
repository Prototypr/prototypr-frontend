export default `
    query PostBySlug($status: String, $slug: String, $type: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}, type:{eq:$type}}) {
        data {
          attributes {
            title
            slug
            content
            link
            date
            legacyAttributes{
              link
              imgUrl
              ogImage
            }
            ogImage: seo {
              opengraphImage
            }
            tags{
              data{
                attributes{
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
                }
              }
            }
          }
        }
      }
    
      morePosts: posts(sort: "date:desc", pagination:{limit: 4}, filters: {slug:{not:{eq:$slug}},status:{eq:$status}, type:{eq:$type}}) {
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
            featuredImage{
              data{
                attributes{
                  url
                  formats
                }
              }
            }
            legacyAttributes{
              link
              imgUrl
              ogImage
            }
            ogImage: seo {
              opengraphImage
            }
            author {
              data {
                attributes {
                  name
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
  `;
