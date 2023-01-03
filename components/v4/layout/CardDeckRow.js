import CardDeckCard from "@/components/v4/card/CardDeckCard";
import {useState, useEffect} from 'react'
import { cloneDeep } from "lodash"


const CardDeckRow = ({ tools, sponsor }) => {
  
  const [toolList, setToolList] = useState(false)
  
  useEffect(()=>{
    
    if(!toolList){
      let toolCopy = cloneDeep(tools)
      toolCopy.splice(3, 0, 
        {
          attributes:{
            sponsored:true,
            title: sponsor?.title ? sponsor?.title : "Letter: Beautiful, Faster Emails",
            slug:sponsor?.link ? sponsor.link : `https://letter.so`,
            coverImage:sponsor?.featuredImage
                    ? sponsor.featuredImage
                    : "/static/images/placeholder/letter-ad.png",
            logo:"/static/images/placeholder/letter-logo.png"
          }
        });
      setToolList(toolCopy)
    }
    
  },[tools])
 

  return (
    <div className="flex pointer-events-none flex-row group/cardDeck pr-0">
      {toolList?.length && toolList.map((item, index) => {
        const { title, legacyFeaturedImage, sponsored, slug } = item.attributes;
        
        const bgColor = sponsored?'bg-yellow-500':index==0?'bg-teal-600':index==1?'bg-blue-700':index==2?'bg-indigo-700':index==3?'bg-violet-700':index==4?'bg-fuchsia-700':'bg-pink-600'
        
        const zIndex = 1+index;
        const even = (index + 1) % 2 == 0 ? true : false;
        // const coverImage = legacyFeaturedImage?.mediaItemUrl?legacyFeaturedImage?.mediaItemUrl:'/static/images/placeholder/letter-ad.png'
        const coverImage = sponsored?item.attributes?.coverImage:legacyFeaturedImage?.mediaItemUrl
          ? legacyFeaturedImage?.mediaItemUrl
          : "/static/images/placeholder/letter-ad.png";
        const logo = sponsored?item?.attributes?.logo:legacyFeaturedImage?.logoNew
          ? legacyFeaturedImage?.logoNew
          : "/static/images/placeholder/letter-ad.png";
        // return  <LargeCardWithImage type={type} data={post} />
        return (
          <CardDeckCard
            even={even}
            zIndex={zIndex}
            key={index}
            index={index}
            slug={slug}
            title={title}
            coverImage={coverImage}
            logo={logo}
            bgColor={bgColor}
            sponsored={sponsored}
          />
        );
      })}
    </div>
  );
};
export default CardDeckRow;
