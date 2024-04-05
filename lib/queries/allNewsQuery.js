export default `
    query latestTools($status: String, $limit: Int, $start: Int,$sort:[String]) {
      posts(sort:$sort,pagination:{limit: $limit, start:$start} ,filters: {status:{eq:$status},type:{eq:"bite"}}) {
        data {
          attributes {
            slug
            title
            content
            date
            tags{
              data{
                attributes{
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;
