export default `query PopularTags( $pageSize:Int, $offset:Int, $postType:String) {
  popularTags(pageSize:$pageSize, offset:$offset, postType:$postType) {
    tags{
      tag_id
      slug
      count
      icon
      name
    }
}
}
`