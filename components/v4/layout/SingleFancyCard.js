const post = {
    image:'/static/images/jobs1.png',
    slug:'/network',
    class:'bg-blue-800',
    title:'Share your story',
    description:'Join the Prototypr Discord community and write with us.'
    }
const SingleFancyCard = ({title, description}) =>{

    return(
        <div className="flex flex-col grid gap-8 grid-cols-12">

             <a target="_blank" className="col-span-12"
             href={`${post.slug}`}>
             <div className={`flex h-[220px] ${post.class} relative rounded-2xl w-full flex-col justify-center overflow-hidden p-5 py-0 md:py-8 md:p-8 text-white`}>
               <img src={post.image} className="w-1/2 h-auto absolute right-0 -mr-20" style={{transform:'scaleX(-1)'}}/>
               {/* <img className="w-full h-[220px] object-cover rounded-xl" src={coverImage}/> */}
               {/* <h4 className="text-xs text-gray-500 uppercase font-medium mt-3">{section.tagline}</h4> */}
               <div className="max-w-[200px] sm:max-w-[280px]">
                 <h3 className="text-2xl font-medium mt-1">{post.title}</h3>
                 <p className="text-base text-gray-100 mt-1">{post.description}</p>
               </div>
             </div>
             </a>
   </div>
    )
}
export default SingleFancyCard