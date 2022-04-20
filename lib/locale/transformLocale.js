
export const transformOfContentAndTitle = (post) => {
    let content={}
    let title={}
    title['en-US']= post?.attributes?.title ? post?.attributes?.title: ""
    content['en-US']= post?.attributes?.excerpt ? post?.attributes?.excerpt: ""
  
    const localizations = post?.attributes?.localizations?.data
    if (localizations && localizations.length) {
      for(var x = 0;x<localizations.length;x++){
        title[localizations[x].attributes.locale]=localizations[x].attributes.title
        content[localizations[x].attributes.locale]=localizations[x].attributes.content
      }
    }
    return {
        content,
        title
    }
};