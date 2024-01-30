import Link from "next/link";

const dummyData = [{
image:'/static/images/jobs1.png',
slug:'/network',
class:'bg-blue-800',
title:'Post an article',
description:'Share your story with us and get featured in the newsletter.'
},
{image:'/static/images/robo2.svg',
slug:'/toolbox',
class:'bg-teal-600',
title:'Submit a product',
description:'List your tool in the Prototypr Toolbox and claim your page.'}]

const TwoColumnCards = ({posts}) =>{

  let data = posts?posts:dummyData

    return(
        <div className="flex flex-col grid gap-4 md:gap-8 xl:gap-12 grid-cols-12">
             {data.map((post, i) =>{ 

            return (
                  <Link className="col-span-12 lg:col-span-6"
                  href={`${post.slug}`}>
                  <div className={`flex h-[220px] ${post.class} relative shadow-md rounded-3xl w-full flex-col justify-center overflow-hidden p-6 py-0 md:py-6 md:p-6 text-white`}>
                    <img src={post.image} className="w-1/2 h-auto absolute right-0 -mr-20" style={{transform: i==0?'scaleX(-1)':''}}/>
                    {/* <img className="w-full h-[220px] object-cover rounded-xl" src={coverImage}/> */}
                    {/* <h4 className="text-xs text-gray-500 uppercase font-medium mt-3">{section.tagline}</h4> */}
                    <div className="max-w-[200px] sm:max-w-[280px]">
                      <h3 className="text-2xl text-white font-normal">{post.title}</h3>
                      <p className="text-base text-white/80 mt-1">{post.description}</p>
                    </div>
                  </div>
                  </Link>
                )})}
        </div>
    )
}

export default TwoColumnCards