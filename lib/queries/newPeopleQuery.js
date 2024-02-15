export default `
query newPeopleQuery ($pageSize: Int, $page: Int){
    usersPermissionsUsers(filters: {approved:{eq:true}},pagination:{pageSize:$pageSize,page: $page}){
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
        bio
        location
        avatar{
            data{
            attributes{
                url
            }
            }
        }
        twitter
        dribbble
        github
        kofi
        skills
        legacyAvatar
        }
    }
    }
    }
`;
