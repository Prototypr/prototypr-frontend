export default `
    query NewsletterBySlug($status: String, $slug: String, $type: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}, type:{eq:$type}}) {
        data {
          attributes {
            title
            slug
            content
            seo{
                metaDesc
                canonical
                opengraphModifiedTime
                opengraphPublishedTime
                opengraphTitle
                opengraphDescription
                opengraphImage
            }
            localizations{
              data{
                attributes{
                  locale
                  content
                  title
                }
              }
            }
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
            legacyFeaturedImage {
              id
              mediaItemUrl
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
            relatedNewsletters{
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
              legacyFeaturedImage{
                mediaItemUrl
              }
              featuredImage{
                data{
                  attributes{
                    url
                    formats
                  }
                }
              }
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
          }
        }
      }
    }
  `;
