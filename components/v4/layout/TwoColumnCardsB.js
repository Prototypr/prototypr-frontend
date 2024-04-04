import Link from "next/link";

const dummyData = [
  {
image:'/static/images/jobs.svg',
slug:'/apply',
class:'bg-gray-50',
title:'Become a writer',
description:'Share your story with us and get featured in the newsletter.'
},
{image:'/static/images/botty.svg',
slug:'/apply',
class:'bg-gray-50',
title:'Post a product',
description:'List your tool in the Prototypr Toolbox and claim your page.'}
]

const TwoColumnCards = ({posts}) =>{

  let data = posts?posts:dummyData

    return(
        <div className="flex flex-col grid gap-4 md:gap-6 grid-cols-12">
             {/* {data.map((post, i) =>{  */}

            {/* return ( */}
                  <Link className="col-span-12 lg:col-span-6"
                  href={`${data[0].slug}`}>
                  <div className={`flex h-[220px] ${data[0].class} relative rounded-2xl shadow-sm border border-gray-300/60 w-full flex-col justify-center overflow-hidden p-6 py-0 md:py-6 md:p-6 text-white`}>
                    <img src={data[0].image} className="w-1/2 h-auto absolute right-0 -mr-20" style={{transform:'scaleX(-1)'}}/>
                    {/* <img className="w-full h-[220px] object-cover rounded-xl" src={coverImage}/> */}
                    {/* <h4 className="text-xs text-gray-500 uppercase font-medium mt-3">{section.tagline}</h4> */}
                    <div className="max-w-[200px] sm:max-w-[280px]">
                      <h3 className="text-2xl text-black/90 font-medium drop-shadow-sm">{data[0].title}</h3>
                      <p className="text-base text-black/70 mt-1">{data[0].description}</p>
                    </div>
                  </div>
                  </Link>
                  <Link className="col-span-12 lg:col-span-6"
                  href={`${data[1].slug}`}>
                  <div className={`flex h-[220px] ${data[1].class} relative rounded-2xl shadow-sm border border-gray-300/60 w-full flex-col justify-center overflow-hidden p-6 py-0 md:py-6 md:p-6 text-white`}>
                    <img src={data[1].image} className="w-[400px] h-auto absolute right-0 mt-[40px] -mr-[124px]"/>
                    {/* <img className="w-full h-[220px] object-cover rounded-xl" src={coverImage}/> */}
                    {/* <h4 className="text-xs text-gray-500 uppercase font-medium mt-3">{section.tagline}</h4> */}
                    <div className="max-w-[200px] sm:max-w-[280px]">
                      <h3 className="text-2xl text-black/90 font-medium drop-shadow-sm">{data[1].title}</h3>
                      <p className="text-base text-black/70 mt-1">{data[1].description}</p>
                    </div>
                  </div>
                  </Link>
                {/* )})} */}
        </div>
    )
}

export default TwoColumnCards