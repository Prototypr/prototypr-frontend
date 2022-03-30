export default `
    query latestTools($status: String, $limit: Int, $start: Int) {
      posts(pagination:{limit: $limit, start:$start} ,filters: {status:{eq:$status},type:{eq:"tool"}}) {
        data {
          attributes {
            title
            slug
            content
            link
            date
            ogImage: seo {
              opengraphImage
            }
            tags{
              data{
                attributes{
                  slug
                }
              }
            }
            legacyMedia {
              gallery {
                srcSet
                medium
                thumb
              }
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
    }
  `