export default `
    query LikeCount($id: ID!) {
      post(id:$id) {
        data {
          id
          attributes{
            likeCount{
              total
              like
              fire
              unicorn
            }  
            likes{
              data{
                id
                attributes{
                  like
                  love
                  fire
                  unicorn
                  total
                  user{
                    data{
                      id
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
