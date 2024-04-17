export default `
query SponsoredPostByPaymentId($paymentId: String) {
  sponsoredPostByPaymentId(paymentId: $paymentId){
    description
    title
    #email - private field
    productId
    weeks
    paid
    paymentIds
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
`