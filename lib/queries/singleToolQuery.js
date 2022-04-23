export default `
    query PostBySlug($status: String, $slug: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}, type:{eq:"tool"}}) {
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
                  name
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
            featuredImage{
              data{
                attributes{
                  url
                  formats
                }
              }
            }
            author: user {
              data {
                attributes {
                  name: username
                  displayName:username
                  firstName
                  lastName:secondName
                  avatar:legacyAvatar
                  slug
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
            featuredImage{
              data{
                attributes{
                  url
                  formats
                }
              }
            }
            author: user {
              data {
                attributes {
                  name: username
                  displayName:username
                  firstName
                  lastName:secondName
                  avatar:legacyAvatar
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;
