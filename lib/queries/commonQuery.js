export default `
query commonQuery ($limit: Int, $start: Int, $tags:[String], $type: String, $sort: [String]) {
  posts( sort: $sort, pagination:{limit:$limit, start:$start}, filters:{tags:{slug:{in: $tags}},type:{eq:$type}}) {
      data {
        attributes {
          featured
          title
          slug
          date
          excerpt
          localizations {
            data{
              attributes {
                locale
                title
                excerpt
              }
            }
          }
          legacyFeaturedImage{
            mediaItemUrl
            thumb
          }
          legacyMedia{
                mediaItemUrl:featuredImage
                imgUrl
                logoNew
            }
          featuredImage{
            data{
              attributes{
                url
                blurhash
              }
            }
          }
          logo{
            data{
              attributes{
                url
                blurhash
              }
            }
          }
          tags{
            data{
              attributes{
                name
                slug
              }
            }
          }
          author: user {
            data {
              attributes {
                name:username
                displayName:username
                firstName
                lastName:secondName
                legacyAvatar
                avatar{
                  data{
                    attributes{
                      url
                    }
                  }
                }
                slug
              }
            }
          }
        }
      }
    }
}
  `;
