const unfeatured = ['graeme', 'prototypr', 'graylien']
export const makeAuthorList = (postsObject) =>{
    if(postsObject.data){
        postsObject = postsObject.data
    }

     //extract authors from the postss while we don't have an endpoint for it
     const authors = []
     for(var x =0;x<postsObject?.length;x++){
       const author = postsObject[x].attributes?.author?.data?.attributes
       //don't feature me
       if(unfeatured.indexOf(author?.slug)==-1){
           if(!authorExists(authors,author?.slug)){
             authors.push(postsObject[x].attributes?.author?.data?.attributes)
           }
       }
     }

     return authors
}

function authorExists(authors, slug) {
    if(authors.some(author => author.slug === slug)){
     return true
    }
  
    return false
  }

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffleArray = (array)=> {
    for (var i = array?.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }