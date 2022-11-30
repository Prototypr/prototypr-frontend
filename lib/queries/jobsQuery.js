export default `
query Jobs ($limit: Int, $start: Int, $sort:[String]){
    jobs(sort: $sort, pagination:{limit:$limit, start:$start}) {
    meta {
        pagination {
          total
          pageSize
          page
          pageCount
        }
    }
      data{
        id
        attributes{
          title
          skills{
            data{
              attributes{
                name
              }
            }
          }
        }
      }
    }
  }

`;
