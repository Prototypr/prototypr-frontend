export const transformOfContentAndTitle = (post) => {
    let content={}
    let title={}
    title['en-US']= post?.attributes?.title ? post?.attributes?.title: ""
    content['en-US']= post?.attributes?.excerpt ? post?.attributes?.excerpt: ""
  
    const localizations = post?.attributes?.localizations?.data
    if (localizations && localizations.length) {
      for(var x = 0;x<localizations.length;x++){
        title[localizations[x].attributes.locale]=localizations[x].attributes.title
        content[localizations[x].attributes.locale]=localizations[x].attributes.excerpt
      }
    }
    return {
        content,
        title
    }
};

export const transformOfAttribute = (post) => {
  let content={}
  let title={}
  title['en-US']= post?.title ? post?.title: ""
  content['en-US']= post?.excerpt ? postMessage?.excerpt: ""

  const localizations = post?.localizations?.data
  if (localizations && localizations.length) {
    for(var x = 0;x<localizations.length;x++){
      title[localizations[x].locale]=localizations[x].title
      content[localizations[x].locale]=localizations[x].excerpt
    }
  }
  return {
      content,
      title
  }
};

export const transformPost =(post, locale) =>{
  let content={}
  let title={}
  //set the default locale (en-us)
  title['en-US']= post?.attributes?.title ? post?.attributes?.title: ""
  content['en-US']= post?.attributes?.content ? post?.attributes?.content: ""

  //get each localization and add the translation for title and content
  const localizations = post?.attributes?.localizations?.data
  if (localizations && localizations.length) {
    for(var x = 0;x<localizations.length;x++){
      title[localizations[x].attributes.locale]=localizations[x].attributes.title
      content[localizations[x].attributes.locale]=localizations[x].attributes.content
    }
  }

  post.attributes.title = title[locale]?title[locale]:title['en-US']
  post.attributes.content = content[locale]?content[locale]:content['en-US']
  post.currentLocaleAvailable = currentLocaleAvailable(title[locale]) 

  return post
}

/**
 * transform:
 * title and excerpt
 * (no need to trasnform the content, only excerpt shows in list view)
 * @param {*} postList 
 * @returns 
 */
export const transformPostListOld = (postList, locale) =>{

  for (var i =0;i<postList.length;i++){
    var post = postList[i]
    
    let title={}
    let excerpt={}
    //set the default locale (en-us)
    title['en-US']= post?.attributes?.title ? post?.attributes?.title: ""
    excerpt['en-US']= post?.attributes?.excerpt ? post?.attributes?.excerpt: ""

    // console.log('hi',post)
    //get each localization and add the translation for title and content
    const localizations = post?.attributes?.localizations?.data
    if (localizations && localizations.length) {
      for(var x = 0;x<localizations.length;x++){
        title[localizations[x].attributes.locale]=localizations[x].attributes.title
        excerpt[localizations[x].attributes.locale]=localizations[x].attributes.excerpt
      }
    }
    post.attributes.title = title[locale]?title[locale]:title['en-US']
    post.attributes.excerpt = excerpt[locale]?excerpt[locale]:excerpt['en-US']
    post.currentLocaleAvailable = currentLocaleAvailable(title[locale]) 
  }
  return postList

}

export const transformPostList = (postList, locale) =>{

  for (var i =0;i<postList.length;i++){
    var post = postList[i]
    let title={}
    let excerpt={}
    //set the default locale (en-us)
    title['en-US']= post?.title ? post?.title: ""
    excerpt['en-US']= post?.excerpt ? post?.excerpt: ""

    // console.log('hi',post)
    //get each localization and add the translation for title and content
    const localizations = post?.localizations?.data
    if (localizations && localizations.length) {
      for(var x = 0;x<localizations.length;x++){
        title[localizations[x].attributes.locale]=localizations[x].attributes.title
        excerpt[localizations[x].attributes.locale]=localizations[x].attributes.excerpt
      }
    }
    post.title = title[locale]?title[locale]:title['en-US']
    post.excerpt = excerpt[locale]?excerpt[locale]:excerpt['en-US']
    post.currentLocaleAvailable = currentLocaleAvailable(title[locale]) 
  }
  return postList

}


const currentLocaleAvailable=(title)=>{

  if(title){
    return true
  }else{
    return false
  }

}