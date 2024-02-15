import Image from "next/image";
import Link from "next/link";
import gumletLoader from "../new-index/gumletLoader";
import { DribbbleLogo, TwitterLogo, GithubLogo, MapPin } from "phosphor-react";
import { accountLocations } from "@/lib/constants";
import { useState } from "react";
export default function ProfileCard({
  title,
  slug,
  legacyAvatar = "",
  skills = "",
  bio = "",
  location = "",
  avatar = "",
  twitter, dribbble, kofi, github
}) {
  let skillArr = [];
  if (skills && skills !== "") {
    skillArr = skills.split(",");
  }
  const img = avatar ? avatar : legacyAvatar;

  const [locationNiceName, setLocationNiceName] = useState(()=>{
    if(location){
      for(var x =0;x<accountLocations?.length;x++){
          if(accountLocations[x]?.Code==location){
            return(accountLocations[x]?.Name)
          }
      }
  }
  })


  return (
    <div
  className="cursor-pointer relative w-full rounded-2xl"
  // style={{ height: 300 }}
>
  <div className="flex relative flex-col flex-grow h-full rounded-t-2xl shadow-sm hover:shadow-lg pb-8 bg-white relative rounded-2xl fade-undefined">
    <Link
      className="absolute block w-full h-full z-10"
      href={`/people/${slug}`}
    />
    <div
      className="rounded-t-2xl flex w-full bg-gray-200/90"
      style={{
        // background: "linear-gradient(#82e788, #91f697)",
        display: "flex",
        height: 95,
        opacity: 1
      }}
    />
    <div>
      <div
        className="rounded-full bg-white absolute -mt-[30px] left-[12px]"
        // style={{ position: "absolute", marginTop: "-12px", left: 12 }}
      >
        {img? <Image
            loader={gumletLoader}
            width="68"
            height="68"
            alt={`Avatar for ${title}`}
            className="w-[68px] h-[68px] object-cover rounded-full flex-shrink-0 shine border-2 border-white bg-white shadow-md gm-loaded gm-observing gm-observing-cb"
            src={img}
          />:<div className="w-[68px] h-[68px] rounded-full bg-gray-100"/>}
      </div>
    </div>
    <div className="relative px-5 pt-10 flex justify-between">
      <div className="overflow-hidden mt-1">
        <div>
          <h1
            className="text-lg mb-2 font-medium overflow-hidden heading mt-0 h-6 mt-0 text-black/90"
          >
            {title}
          </h1>
        </div>
       {locationNiceName? <div className="text-sm flex leading-normal my-2 text-black/80 font-normal capitalize">
                        <MapPin className="mr-1 my-auto" color="rgba(0,0,0,0.8)" width={16} height={16}/>
                    <div className="inline-block my-auto">{locationNiceName}</div>
                  </div>:null}
        <div className="text-sm text-gray-700 h-10 mt-2">
          <div>
            {bio}
          </div>
        </div>
      </div>
     <div className="flex absolute top-0 right-0 mr-2.5 mt-3 z-20">
     {twitter?<a
          className="link block mx-1"
          href="https://web.archive.org/web/20210127134122/https://twitter.com/ebruspace"
          target="_blank"
        >
         <TwitterLogo color="rgba(0,0,0,0.8)" width={20} height={20}/>
        </a>:null}
     {dribbble?<a
          className="link block mx-1"
          href="https://web.archive.org/web/20210127134122/https://twitter.com/ebruspace"
          target="_blank"
        >
         <DribbbleLogo color="rgba(0,0,0,0.8)" width={20} height={20}/>
        </a>:null}
     {github?<a
          className="link block mx-1"
          href="https://web.archive.org/web/20210127134122/https://twitter.com/ebruspace"
          target="_blank"
        >
         <GithubLogo color="rgba(0,0,0,0.8)" width={20} height={20}/>
        </a>:null}
      </div>
    </div>
    {/* <div
      className="text-base text-gray-600 mt-2 mx-5 absolute bottom-0 mb-5 overflow-hidden"
      style={{ height: 27 }}
    >
      {skillArr?.map((skill)=>{
        return (<div className="bg-gray-200 mr-2 text-gray-600 text-xs px-2 py-1 rounded inline-block">
        {skill}
      </div>)
      })}
    </div> */}
  </div>
</div>


  );
}

    
//  <Link href={`/people/${slug}`}>
//     <div className="flex shadow-sm group flex-col flex-grow h-full border-black/5 border-1 hover:shadow-lg transition-shadow duration-500 bg-white relative rounded-2xl">
//       <div className="p-3 flex flex-col">
//             {img && (
//       <div className="basis-[68px] mr-5 w-full flex justify-center">
//               <div
//                 className="rounded-full flex basis-[68px] my-auto transform group-hover:scale-110 transition duration-700 ease-out"
//                 style={{ height: "68px", width: "68px" }}
//               >
                
//                   <Image
//                     loader={gumletLoader}
//                     width="68"
//                     height="68"
//                     alt={`Avatar for ${title}`}
//                     className="border-black border-opacity-[0.05] mx-auto border border-1 h-[68px] w-[68px] object-cover cursor-pointer flex-shrink-0 shine rounded-full bg-white"
//                     src={img}
//                   />
//               </div>
//           </div>
//             )}
//         <div className="flex flex-col my-auto">
//             <div className="relative flex justify-between">
//             <div className="overflow-hidden">
//                 <div>
//                 <Link href={`/people/${slug}`}>
//                     <h1 style={{wordWrap:'break-word', wordBreak: 'break-word'}} className="text-lg font-bold cursor-pointer overflow-hidden mt-0 h-6 mt-0 text-gray-900">
//                     {title}
//                     </h1>
//                 </Link>
//                 </div>
//                 {/* <div className="text-xs uppercase text-gray-700 mt-1">
//                 {location}
//                 </div> */}
//                 <div className="text-base text-gray-700 mt-2 clamp-2">
//                 <div dangerouslySetInnerHTML={{ __html: bio }} style={{wordWrap:'break-word', wordBreak: 'break-word'}} />
//                 </div>
//             </div>
//             </div>
        
//         </div>
//       </div>
//     </div>
//     </Link> 
