import Link from "next/link";

const dummyData = [{
image:'/static/images/jobs1.png',
slug:'/network',
class:'bg-blue-800',
title:'Share your story',
description:'Join the Prototypr Discord community and write with us.'
},
{image:'/static/images/robo2.svg',
slug:'/toolbox',
class:'bg-teal-600',
title:'Explore new tools',
description:'Cutting edge design tools and technology, curated every week.'}]

const TwoColumnCards = ({posts}) =>{

    return(
        <div className="flex flex-col grid gap-8 grid-cols-12">
             {dummyData.map((post, i) =>{ 

            return (
                  <a target="_blank" className="col-span-12 md:col-span-6"
                  href={`${post.slug}`}>
                  <div className={`flex h-[220px] ${post.class} relative rounded-2xl w-full flex-col justify-center overflow-hidden p-8 text-white`}>
                    <img src={post.image} className="w-1/2 h-auto absolute right-0 -mr-20" style={{transform: i==0?'scaleX(-1)':''}}/>
                    {/* <img className="w-full h-[220px] object-cover rounded-xl" src={coverImage}/> */}
                    {/* <h4 className="text-xs text-gray-500 uppercase font-medium mt-3">{section.tagline}</h4> */}
                    <div className="max-w-[280px]">
                      <h3 className="text-2xl font-medium mt-1">{post.title}</h3>
                      <p className="text-base text-gray-100 mt-1">{post.description}</p>
                    </div>
                  </div>
                  </a>
                )})}
        </div>
    )
}

export default TwoColumnCards