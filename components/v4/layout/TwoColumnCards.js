import Link from "next/link";

const TwoColumnCards = ({posts}) =>{

    return(
        <div className="flex flex-col grid gap-8 grid-cols-12">
             {posts.map((post, i) =>{ 
              console.log(post)
                   const title = post?.attributes?.title;
                   let slug = post.attributes?.slug;
                   let tags = post?.attributes?.tags?.data.slice(0, 2);
                  let coverImage = post?.attributes?.featuredImage?.data
            ? post?.attributes?.featuredImage?.data
            : post?.attributes?.legacyFeaturedImage?.mediaItemUrl?post?.attributes?.legacyFeaturedImage?.mediaItemUrl
            :post?.attributes?.legacyMedia?.mediaItemUrl

            return (
                  <Link className="col-span-12 md:col-span-6"
                  href={`/toolbox/${slug}`}>
                  <div className="flex w-full flex-col ">
                    <img className="w-full h-[220px] object-cover rounded-xl" src={coverImage}/>
                    {/* <h4 className="text-xs text-gray-500 uppercase font-medium mt-3">{section.tagline}</h4> */}
                    {/* <h3 className="text-xl font-medium mt-1">{section.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{section.description}</p> */}
                  </div>
                  </Link>
                )})}
        </div>
    )
}

export default TwoColumnCards