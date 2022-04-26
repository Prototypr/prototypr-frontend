export default `
query newPeopleQuery ($pageSize: Int, $page: Int){
    usersPermissionsUsers(pagination:{pageSize:$pageSize,page: $page}){
    meta {
        pagination {
            total
            pageSize
            page
            pageCount
        }
    }
    data{
        attributes{
        username
        firstName
        secondName
        slug
        avatar{
            data{
            attributes{
                url
            }
            }
        }
        legacyAvatar
        }
    }
    }
    }
`;
