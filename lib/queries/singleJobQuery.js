export default `
query JobByID($id: ID) {
    jobs(filters: {id:{eq:$id}}) {
        data{
            id
            attributes{
                slug
                title
                description
                url
              company{
                data{
                  attributes{
                    logo{
                      data{
                        attributes{
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
  }
}
  `;
