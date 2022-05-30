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
            seo{
                metaDesc
                canonical
                opengraphModifiedTime
                opengraphPublishedTime
                opengraphTitle
                opengraphDescription
                opengraphImage
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
            localizations {
              data{
                attributes {
                  locale
                  title
                  excerpt
                }
              }
            }
            legacyMedia {
              gallery {
                medium
                thumb
              }
            }
            gallery{
              data{
                attributes{
                  url
                  caption
                  alternativeText
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
            author: user {
              data {
                attributes {
                  name: username
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
            relatedTools{
              localizations{
                data{
                  attributes{
                    title
                    locale
                  }
                }
              }
              title
              slug
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
              user{
                data{
                  attributes{
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
