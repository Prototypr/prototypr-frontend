
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
  content['en-US']= post?.excerpt ? post?.excerpt: ""

  const localizations = post?.localizations?.data
  if (localizations && localizations.length) {
    for(var x = 0;x< localizations.length;x++){
      title[localizations[x].locale]= localizations[x].title
      content[localizations[x].locale]= localizations[x].excerpt
    }
  }
  return {
      content,
      title
  }
}