export default `
query SponsoredPostById($id: ID!) {
  sponsoredPost(id: $id){
    data{
      id
      attributes{
        description
        title
        #email - private field
        productId
        featuredImage{
          data{
            attributes{
              url
            }
          }
        }
        banner{
          data{
            attributes{
              url
            }
          }
        }
        company{
          data{
            id
          }
        }
      }
    }
  }
}
`