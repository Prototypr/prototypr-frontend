export default `
query random {
  randomPost {
    featured
    title
    slug
    excerpt
    localizations {
      data {
        attributes {
          locale
          title
          excerpt
        }
      }
    }
    featuredImage {
      data {
        attributes {
          url
        }
      }
    }
    legacyFeaturedImage {
      id
      mediaItemUrl
      thumb
    }
    tags {
      data {
        attributes {
          name
          slug
        }
      }
    }
    author: user {
      data {
        attributes {
          name: username
          displayName: username
          firstName
          lastName: secondName
          legacyAvatar
          avatar {
            data {
              attributes {
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

`;
