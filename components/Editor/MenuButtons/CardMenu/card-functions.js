import HandlebarsCreator from "../../../../utilities/handlebarsFilter/handlebarsCreator"
import commentParser from "../../../libs/commentParser";
import {uuid} from "uuidv4";

export function duplicateCard(attrs,html, uid){

    var currentNode = document.createElement('letter-card')
    
    currentNode.innerHTML = html
    /******************************
     * WHEN DUPLICATING A LETTER IMPORTABLE SECTION
     *******************************/
     var articleIDsDuplicating =[]
     var htmlString = html
     ////////////////////////////////////////////////////////////////
     var letterElements = ['image', 'title', 'description', 'author', 'url']
     //element has smart tags
     var letterAttributes = []
     for (var x = 0;x<letterElements.length;x++){
       var dataAttributeStart = 'data-letter-'+letterElements[x]
       
       if(htmlString.indexOf(dataAttributeStart)>-1){
         //need to loop through every count for which the attribute exists
         var count = htmlString.split(dataAttributeStart).length-1 
         for(var z = 0;z<count;z++){
           var dataImage = htmlString.split(dataAttributeStart).pop().split('=')[0];
           var letterAttribute = dataAttributeStart+dataImage
           //remove the attribute so it doesn't get found again
           htmlString = htmlString.replace(letterAttribute,'');
     
           //get unique article ID (if there's 2 articles in a row, there should be 2 in total)
           if(letterAttribute && dataAttributeStart=='data-letter-url'){
             var articleUID = letterAttribute.split('url-').pop().split('_')[0];
             //this is for getting the total unique ids in the block, so we know how many new slots to add
             if(articleIDsDuplicating.indexOf(articleUID)==-1){
               articleIDsDuplicating.push(articleUID)
             }
           }else{
             if(letterAttribute){
               var articleUID = letterAttribute.split(dataAttributeStart+'-').pop().split('=')[0];
               //this is for getting the total unique ids in the block, so we know how many new slots to add
               if(articleIDsDuplicating.indexOf(articleUID)==-1){
                 articleIDsDuplicating.push(articleUID)
               }
             }
           }
           
           letterAttributes.push({attribute:letterAttribute, type:dataAttributeStart, id:articleUID})
         }
         
       }
     }
     
     // return false
     
     //if the block count is greater than 0, insert them as new data
     if(articleIDsDuplicating && articleIDsDuplicating.length>0){
     
       //create new ID
       var handlebarsCreator = new HandlebarsCreator(uid)
       
       var newArticleData = []

       //get current article data
    //    var handlebarsEditor = new HandlebarsEditor(_this.props.uid, $(`#item${_this.props.uid} table`)[0].outerHTML)
       var articleData = handlebarsCreator.getArticleSlots(htmlString)
      
         ////////////////////////////////////////////////////////////////
       ////////////////////////////////////////////////////////////////
       for(var x= 0;x<articleIDsDuplicating.length;x++){
           var newArticleSlot = handlebarsCreator.generateArticleSingleData(articleData.length)
           articleData.push(newArticleSlot)
           //add old id so we can replace it in the html below
           newArticleSlot.id_duplicated_from = articleIDsDuplicating[x]
           newArticleData.push(newArticleSlot)       
       }
     
    }
       ////////////////////////////////////////
    
       var clonedNode = currentNode.cloneNode(true)


    //create new image id
   var images = clonedNode.querySelectorAll('img[data-uid]')
    for(var i = 0;i<images.length;i++){
      images[i].setAttribute('data-uid',uuid())
    }

    //remove all the letter attributes from the cloned node
    for(var x = 0;x<letterAttributes.length;x++){
    //first find all of them
    // clonedNode.querySelector(`[${letterAttributes[x]}]`).setAttribute('data-papa', 'mama')
    var elementsWithAttribute = clonedNode.querySelectorAll(`[${letterAttributes[x].attribute}]`)
    //loop through and remove
    for(var y =0;y<elementsWithAttribute.length;y++){

        //find id of the new slot that's replacing the old one
        // https://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition
        var index = newArticleData.findIndex(n => n.id_duplicated_from === letterAttributes[x].id);
        //if it's found, replace the attribute in the html

        if(index>-1){
            var replacementID = newArticleData[index]._id

            var attrValue = elementsWithAttribute[y].getAttribute(`${letterAttributes[x].attribute}`)
            //swap the old attribute id with a new one
            var newAttribute = letterAttributes[x].attribute.replace(letterAttributes[x].id,replacementID)
            //now remove that initial attribute that was part of the initial duplicate
            elementsWithAttribute[y].removeAttribute(`${letterAttributes[x].attribute}`)
            //set the attribute, along with the value
            elementsWithAttribute[y].setAttribute(newAttribute, attrValue)
            elementsWithAttribute[y].removeAttribute(`data-letter-figure`)

        }
    }
    }
    /************************
     * WHEN DUPLICATING A LETTER IMPORTABLE SECTION
     *************************/

    if(clonedNode){

        var htmls = commentParser(clonedNode.innerHTML)

        return `<letter-card>${htmls.outerHTML}</letter-card>`
    }else{
        return htmlString  
    }  
}
