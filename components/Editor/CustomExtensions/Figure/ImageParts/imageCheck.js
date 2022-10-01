const probe = require("probe-image-size");

export const checkImage = async(imageUrl) =>{
    try{
        let imageInfo = await probe(
          "https://req.prototypr.io/" + imageUrl
        );
        
        if(imageInfo){
          let bytelength = imageInfo.length
          let mb = bytelength/1000000

          if(mb>4){
            alert('Image too large. Please use something less than 4mb.')

            throw Error('Image size too big')
          }
        }
        return imageInfo
        
      }catch(e){
        console.log(e)
        return false
      }
}