export default `
    query latestTools($status: String, $limit: Int, $start: Int,$sort:[String]) {
      posts(sort:$sort,pagination:{limit: $limit, start:$start} ,filters: {status:{eq:$status},type:{eq:"tool"}}) {
        data {
          attributes {
            title
            slug
            excerpt
            link
            localizations {
              data{
                attributes {
                  locale
                  title
                  excerpt
                }
              }
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
            legacyFeaturedImage:legacyMedia{
                mediaItemUrl:featuredImage
                imgUrl
                logoNew
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
    }
  `;
