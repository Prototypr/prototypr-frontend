export default `
    query UserBySlug($slug: String) {
    usersPermissionsUsers(filters: {approved:{eq:true}, slug:{eq:$slug}}) {
        data {
            attributes {
              role:jobrole
              creatorBadge
              displayName:username
              firstName
              lastName:secondName
              name:username
              legacyAvatar
              avatar{
                data{
                  attributes{
                    url
                  }
                }
              }
              bio
              twitter
              dribbble
              github
              kofi
              skills
              url
              link
              availability
              mentor
              kofi
            }
        }
      }
    }
  `;
