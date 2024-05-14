export const formatAllTools = ({tools, tagNumber}) => {


    for (let i = 0; i < tools?.length; i++) {
      tools[i] = formatToolContent({post:tools[i], tagNumber});
    }
    return tools;

}
export const formatToolContent = ({post, tagNumber}) => {

    let title =null, slug=null, coverImage=null, tags=null, logo=null, description=null, sponsorLink=null;

    let postAttributes = post?.attributes
    if(! postAttributes && !post.attributes){
      postAttributes = post
    }

    title = postAttributes?.title?postAttributes?.title:post?.title;
    description = postAttributes?.excerpt?postAttributes?.excerpt:post?.excerpt?post.excerptt:postAttributes?.description?postAttributes?.description:post?.excerpt;
    slug = postAttributes?.slug?postAttributes?.slug:post?.slug;
    if(postAttributes?.postType=='ad'){
      sponsorLink = postAttributes?.link?postAttributes?.link:post?.link;
    }

    if(tagNumber==1){
      tags = postAttributes?.tags?.data.slice(0, 1);
      if(!tags && post?.tags?.data){
        tags = post?.tags?.data.slice(0, 1);
      }
    }else{
      tags = postAttributes?.tags?.data.slice(0, 2);
      if(!tags && post?.tags?.data){
        tags = post?.tags?.data.slice(0, 2);
      }
    }
    // let tool = postAttributes

    // let coverImage =   
    // tool.featuredImage?.data?.attributes?.url
    //   ? tool.featuredImage.data.attributes.url
    //   : tool.legacyFeaturedImage
    //   ? tool.legacyFeaturedImage
    //   : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
      
    //   coverImage = (tool?.legacyMedia?.logoNew || coverImage?.logoNew || tool.legacyMedia?.mediaItemUrl)
      

    if(postAttributes){
      coverImage = postAttributes?.featuredImage?.data?.attributes?.url
        ? postAttributes.featuredImage.data.attributes.url
        : postAttributes?.legacyFeaturedImage?.mediaItemUrl
        ? postAttributes?.legacyFeaturedImage?.mediaItemUrl
        : postAttributes?.legacyFeaturedImage2?.mediaItemUrl?
        postAttributes?.legacyFeaturedImage2?.mediaItemUrl
        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  
        logo = (postAttributes?.legacyFeaturedImage?.logoNew || coverImage?.logoNew || postAttributes?.legacyMedia?.mediaItemUrl ||postAttributes?.legacyFeaturedImage?.mediaItemUrl)
      }else {
      coverImage = post.featuredImage?.data?.attributes?.url
        ? post.featuredImage.data.attributes.url
        : post.legacyFeaturedImage?.mediaItemUrl
        ? post.legacyFeaturedImage?.mediaItemUrl
        : post.legacyFeaturedImage2?.mediaItemUrl?
        post.legacyFeaturedImage2?.mediaItemUrl
        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  
        logo = (post?.legacyFeaturedImage?.logoNew || coverImage?.logoNew || post.legacyMedia?.mediaItemUrl ||post.legacyFeaturedImage?.mediaItemUrl)
    }

    if(!logo){
      logo =   
  // post.legacyMedia?.logoNew?post.legacyMedia?.logoNew:
  // post.legacyMedia?.mediaItemUrl?post.legacyMedia?.mediaItemUrl:
  // post.legacyMedia?.imgUrl?post.legacyMedia?.imgUrl:
  postAttributes?.featuredImage?.data?.attributes?.url
    ? postAttributes?.featuredImage.data.attributes.url
    : postAttributes?.legacyFeaturedImage
    ? postAttributes?.legacyFeaturedImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
    
    logo = (postAttributes?.legacyMedia?.logoNew || logo?.attributes?.logoNew || postAttributes?.legacyMedia?.mediaItemUrl)
    }

    if(post?.postType=='ad'){
      logo = post?.featuredImage
      coverImage = post?.banner
    }

    if(!description){
        description='Dummy description for this tool.'
    }

    return {...post,title:title || null, description:description|| null, slug:slug||null, coverImage:coverImage||null, tags:tags||null, logo:logo||null, sponsorLink:sponsorLink||null};
}
