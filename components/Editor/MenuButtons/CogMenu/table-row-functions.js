import HandlebarsCreator from "../../../../utilities/handlebarsFilter/handlebarsCreator"


export function duplicateSection(attrs,html, cardArticleData){

  var currentNode = document.createElement('tr')
  //add attributes to tabler row node
    for (const [key, value] of Object.entries(attrs)) {
      if(key=='dataLetterSection'){
        currentNode.setAttribute('data-letter-section', value)
      }else{
        currentNode.setAttribute(key,value)
      }
    }
  currentNode.innerHTML = html

  
  var elementsWithAttribute = currentNode.querySelectorAll(`[data-letter-article-id]`)
  //if no smart import attributes, just return html
  if(!elementsWithAttribute.length){
    return {html:currentNode.outerHTML, newArticleData:{}}
  }

  //loop through elementswithattribute and count the number of articles
  var articleSlotsToDuplicate = []


  
  for (var i = 0; i < elementsWithAttribute.length; i++) {
    const articleSlotId = elementsWithAttribute[i].getAttribute('data-letter-article-id')
    if(articleSlotsToDuplicate.indexOf(articleSlotId.toLowerCase())<0){      
      articleSlotsToDuplicate.push(articleSlotId.toLowerCase())
    }
  }
    
  // if no articles found, return normal
  if(!articleSlotsToDuplicate.length){
    return {html:currentNode.outerHTML, newArticleData:cardArticleData}
  }
  
  var articlePairs = []
  var handlebarsCreator = new HandlebarsCreator()
  var originalCount = cardArticleData.length
  
  //generate new article slot ids for the duplicates
  var newArticlesToInsert = []
  for (var i = 0;i<articleSlotsToDuplicate.length;i++){
    
      //generate new article slot id
      //if id exists, add it to the existing one
      var uniqueArticleID = handlebarsCreator.createUniqueArticleId(originalCount+(i + 1))
      //make sure the second character is always a letter
      var uuid = (originalCount+i) +handlebarsCreator.convertNumberToLetter(originalCount+i)+ (Math.random().toString(36).substring(2)) + Date.now().toString(36) + handlebarsCreator.convertNumberToLetter(originalCount+i + 1);
      //make ids lower case
      uuid = uuid.toLowerCase();
      uniqueArticleID = uniqueArticleID.toLowerCase();

      articlePairs.push({original:articleSlotsToDuplicate[i], new:uuid})
      newArticlesToInsert.push({_id:uuid, url:'', title:'', description:'', author:''})
  }

  //put articles into articleData at right position
  var numberToDuplicate = articleSlotsToDuplicate.length
  //find index of duplicated nodes, so we can insert them underneath
  const index = cardArticleData.findIndex(object => {
    return object._id === articleSlotsToDuplicate[numberToDuplicate-1];
  });

  cardArticleData.splice(index+1, 0, ...newArticlesToInsert);


  for (var i = 0; i < elementsWithAttribute.length; i++) {
    //get uid
    let originalId = elementsWithAttribute[i].getAttribute('data-letter-article-id')

    //replace with new one from pairs
    //find index in pair array
    let obj = articlePairs.find(o => o.original === originalId);


    elementsWithAttribute[i].setAttribute('data-letter-article-id',obj.new)

  }


  return {html:currentNode.outerHTML, newArticleData:cardArticleData}

}

// export function duplicateSection(attrs,html, uid){

//     var currentNode = document.createElement('tr')
    
//     //add attributes to node
//     for (const [key, value] of Object.entries(attrs)) {
//       if(key=='dataLetterSection'){
//         currentNode.setAttribute('data-letter-section', value)
//       }else{
//         currentNode.setAttribute(key,value)
//       }
//     }
//     currentNode.innerHTML = html
//     /******************************
//      * WHEN DUPLICATING A LETTER IMPORTABLE SECTION
//      *******************************/
//      var articleIDsDuplicating =[]
//      var htmlString = html
//      ////////////////////////////////////////////////////////////////
//      var letterElements = ['image', 'title', 'description', 'author', 'url']
//      //element has smart tags
//      var letterAttributes = []
//      for (var x = 0;x<letterElements.length;x++){
//        var dataAttributeStart = 'data-letter-'+letterElements[x]
       
//        if(htmlString.indexOf(dataAttributeStart)>-1){
//          //need to loop through every count for which the attribute exists
//          var count = htmlString.split(dataAttributeStart).length-1 
//          for(var z = 0;z<count;z++){
//            var dataImage = htmlString.split(dataAttributeStart).pop().split('=')[0];
//            var letterAttribute = dataAttributeStart+dataImage
//            //remove the attribute so it doesn't get found again
//            htmlString = htmlString.replace(letterAttribute,'');
     
//            //get unique article ID (if there's 2 articles in a row, there should be 2 in total)
//            if(letterAttribute && dataAttributeStart=='data-letter-url'){
//              var articleUID = letterAttribute.split('url-').pop().split('_')[0];
//              //this is for getting the total unique ids in the block, so we know how many new slots to add
//              if(articleIDsDuplicating.indexOf(articleUID)==-1){
//                articleIDsDuplicating.push(articleUID)
//              }
//            }else{
//              if(letterAttribute){
//                var articleUID = letterAttribute.split(dataAttributeStart+'-').pop().split('=')[0];
//                //this is for getting the total unique ids in the block, so we know how many new slots to add
//                if(articleIDsDuplicating.indexOf(articleUID)==-1){
//                  articleIDsDuplicating.push(articleUID)
//                }
//              }
//            }
           
//            letterAttributes.push({attribute:letterAttribute, type:dataAttributeStart, id:articleUID})
//          }
         
//        }
//      }
     
//      // return false
     
//      //if the block count is greater than 0, insert them as new data
//      if(articleIDsDuplicating && articleIDsDuplicating.length>0){
     
//        //create new ID
//        var handlebarsCreator = new HandlebarsCreator(uid)
       
//        var newArticleData = []

//        //get current article data
//     //    var handlebarsEditor = new HandlebarsEditor(_this.props.uid, $(`#item${_this.props.uid} table`)[0].outerHTML)
//        var articleData = handlebarsCreator.getArticleSlots(htmlString)
      
//          ////////////////////////////////////////////////////////////////
//        ////////////////////////////////////////////////////////////////
//        for(var x= 0;x<articleIDsDuplicating.length;x++){
//            var newArticleSlot = handlebarsCreator.generateArticleSingleData(articleData.length)
//            articleData.push(newArticleSlot)
//            //add old id so we can replace it in the html below
//            newArticleSlot.id_duplicated_from = articleIDsDuplicating[x]
//            newArticleData.push(newArticleSlot)       
//        }
     
//     }
//        ////////////////////////////////////////
    
//        var clonedNode = currentNode.cloneNode(true)
//     //remove all the letter attributes from the cloned node
//     for(var x = 0;x<letterAttributes.length;x++){
//     //first find all of them
//     // clonedNode.querySelector(`[${letterAttributes[x]}]`).setAttribute('data-papa', 'mama')
//     var elementsWithAttribute = clonedNode.querySelectorAll(`[${letterAttributes[x].attribute}]`)
//     //loop through and remove
//     for(var y =0;y<elementsWithAttribute.length;y++){

//         //find id of the new slot that's replacing the old one
//         // https://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition
//         var index = newArticleData.findIndex(n => n.id_duplicated_from === letterAttributes[x].id);
//         //if it's found, replace the attribute in the html

//         if(index>-1){
//             var replacementID = newArticleData[index]._id

//             var attrValue = elementsWithAttribute[y].getAttribute(`${letterAttributes[x].attribute}`)
//             //swap the old attribute id with a new one
//             var newAttribute = letterAttributes[x].attribute.replace(letterAttributes[x].id,replacementID)
//             //now remove that initial attribute that was part of the initial duplicate
//             elementsWithAttribute[y].removeAttribute(`${letterAttributes[x].attribute}`)
//             //set the attribute, along with the value
//             elementsWithAttribute[y].setAttribute(newAttribute, attrValue)
//             elementsWithAttribute[y].removeAttribute(`data-letter-figure`)

//         }
//     }
//     }
//     /************************
//      * WHEN DUPLICATING A LETTER IMPORTABLE SECTION
//      *************************/

//     if(clonedNode){
//         return clonedNode.outerHTML
//     }else{
//         return htmlString  
//     }  
// }
