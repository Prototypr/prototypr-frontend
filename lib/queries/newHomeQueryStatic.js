export default `    
 query homeCombinedQueryStatic ($limit: Int, $start: Int,$sort:[String]){
        posts(sort:$sort,pagination: {limit: $limit, start: $start},filters:{status:{eq:"publish"},type:{eq:"article"}}) {
            data {
              attributes {
                slug
              }
            }
          }
    }
`;
