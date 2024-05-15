export default `
    query PostBySlug($status: String, $slug: String, $type: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}, type:{eq:$type}}) {
        data {
          id
          attributes {
            title
            slug
            template
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
                  blurhash
                }
              }
            }
            outgoingLinks{
              url
              imageUrl
              title
              description
              text
              rootDomain
              siteName
            }
            relatedArticles{
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
                    blurhash
                  }
                }
              }
            }
            author: user {
              data {
                attributes {
                  paymentPointer
                  name: username
                  twitter
                  jobrole
                  github
                  dribbble
                  kofi
                  bio
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
