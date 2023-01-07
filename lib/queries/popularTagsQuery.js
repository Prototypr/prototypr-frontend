export default `query PopularTags( $pageSize:Int, $offset:Int, $postType:String) {
  popularTags(pageSize:$pageSize, offset:$offset, postType:$postType) {
    tags{
      slug
      count
      icon
      name
    }
}
}
`