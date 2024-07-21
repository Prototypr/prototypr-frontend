export default `
    query PostBySlug($status: String, $slug: String, $type: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}, type:{eq:$type},tools:{id:{in:"13824"}}   }) {
        data {
          id
        }
      }
    }
  `;
