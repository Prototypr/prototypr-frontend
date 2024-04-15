export default `
    query allProducts($limit: Int, $start: Int,$sort:[String]) {
        products(sort:$sort,pagination:{limit: $limit, start:$start}) {
        data {
          id
          attributes {
            description
            price
            title
            type 
            duration
          }
        }
      }
    }
  `;
