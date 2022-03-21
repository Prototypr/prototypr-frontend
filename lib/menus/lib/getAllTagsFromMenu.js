
export default function get_all_tags (ALL_SLUGS_GROUPS){

    //create the ALL_SLUGS from ALL_SLUGS_GROUPS
    var all_groups = []
    for(var x= 0;x<ALL_SLUGS_GROUPS.length;x++){
        all_groups.push(ALL_SLUGS_GROUPS[x].subItems)
    }
    let all_slugs = []
    for(var y = 0;y<all_groups.length;y++){
        all_slugs = all_slugs.concat(all_groups[y])
    }
 
    let all_tags = []
    for(var z = 0;z<all_slugs.length;z++){
     all_tags =all_tags.concat(all_slugs[z].tags)
    }
 
 
    return all_tags
 }
 

 export function find_page_slug_from_menu(ALL_SLUGS_GROUPS, slug){
    var foundSlug = null
    for(var x=0;x<ALL_SLUGS_GROUPS.length;x++){
        foundSlug = ALL_SLUGS_GROUPS[x].subItems.find((SLUG,index)=>{
            return SLUG.key===slug
        })
        if(foundSlug){
            break
        }
    }
    return foundSlug
 }

 export function get_slugs_from_menu(ALL_SLUGS_GROUPS){
    var all_groups = []
    for(var x= 0;x<ALL_SLUGS_GROUPS.length;x++){
        all_groups.push(ALL_SLUGS_GROUPS[x].subItems)
    }
    let all_slugs = []
    for(var y = 0;y<all_groups.length;y++){
        all_slugs = all_slugs.concat(all_groups[y])
    }
    return all_slugs
 }