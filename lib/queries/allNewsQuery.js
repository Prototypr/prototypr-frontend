export default `
    query latestTools($status: String, $limit: Int, $start: Int,$sort:[String]) {
      posts(sort:$sort,pagination:{limit: $limit, start:$start} ,filters: {status:{eq:$status},type:{eq:"bite"}}) {
        data {
          attributes {
            slug
            title
            #content
            date
            excerpt
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
              thumb
            }
            legacyAttributes{
              link
              imgUrl
              ogImage
            }

            ogImage: seo {
              opengraphImage
            }
          }
        }
      }
    }
  `;
