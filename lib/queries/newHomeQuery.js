export default
`
    query homeCombinedQuery {
        posts(sort:["title:asc","date:desc"],filters:{status:{eq:"publish"},type:{eq:"article"}}) {
            data {
              attributes {
                title
                status
                slug
                excerpt
                date
                legacyFeaturedImage{
                  id
                  mediaItemUrl
                  srcSet
                  thumb
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

        bbb() {

        }

        ccc() {

        }

        ddd() {

        }

    }
`