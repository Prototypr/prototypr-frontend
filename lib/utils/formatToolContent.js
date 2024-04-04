export const formatAllTools = ({tools, tagNumber}) => {


    for (let i = 0; i < tools?.length; i++) {
      tools[i] = formatToolContent({post:tools[i], tagNumber});
    }
    return tools;

}
export const formatToolContent = ({post, tagNumber}) => {

    let title =null, slug=null, coverImage=null, tags=null, logo=null, description=null;

    title = post?.attributes?.title?post?.attributes?.title:post?.title;
    description = post?.attributes?.excerpt?post?.attributes?.excerpt:post?.excerpt;
    slug = post?.attributes?.slug?post.attributes?.slug:post?.slug;

    if(tagNumber==1){
      tags = post?.attributes?.tags?.data.slice(0, 1);
      if(!tags && post?.tags?.data){
        tags = post?.tags?.data.slice(0, 1);
      }
    }else{
      tags = post?.attributes?.tags?.data.slice(0, 2);
      if(!tags && post?.tags?.data){
        tags = post?.tags?.data.slice(0, 2);
      }
    }
    // let tool = post.attributes

    // let coverImage =   
    // tool.featuredImage?.data?.attributes?.url
    //   ? tool.featuredImage.data.attributes.url
    //   : tool.legacyFeaturedImage
    //   ? tool.legacyFeaturedImage
    //   : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
      
    //   coverImage = (tool?.legacyMedia?.logoNew || coverImage?.logoNew || tool.legacyMedia?.mediaItemUrl)
      

    if(post?.attributes){
      coverImage = post.attributes?.featuredImage?.data?.attributes?.url
        ? post.attributes.featuredImage.data.attributes.url
        : post.attributes?.legacyFeaturedImage?.mediaItemUrl
        ? post.attributes?.legacyFeaturedImage?.mediaItemUrl
        : post.attributes?.legacyFeaturedImage2?.mediaItemUrl?
        post.attributes?.legacyFeaturedImage2?.mediaItemUrl
        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  
        logo = (post?.attributes?.legacyFeaturedImage?.logoNew || coverImage?.logoNew || post.attributes?.legacyMedia?.mediaItemUrl ||post.attributes?.legacyFeaturedImage?.mediaItemUrl)
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
  post.attributes?.featuredImage?.data?.attributes?.url
    ? post.attributes?.featuredImage.data.attributes.url
    : post.attributes?.legacyFeaturedImage
    ? post.attributes?.legacyFeaturedImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
    
    logo = (post?.attributes?.legacyMedia?.logoNew || logo?.attributes?.logoNew || post.attributes?.legacyMedia?.mediaItemUrl)
    }

    if(post?.postType=='ad'){
      logo = post?.featuredImage
      coverImage = post?.banner
    }

    if(!description){
        description='Dummy description for this tool.'
    }

    return {...post,title:title || null, description:description|| null, slug:slug||null, coverImage:coverImage||null, tags:tags||null, logo:logo||null};
}
