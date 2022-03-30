



export default function FeedItem({height = 20, post = {}}) {
    const { title = "", excerpt, slug, date, legacyFeaturedImage = null, author = null } = post
    return (
        <div className="cursor-pointer py-6 px-1 inline-block">
            {/* <div className="w-full rounded-lg" style={{height:`${height}px`,border:"1px solid red"}}></div> */}
            <img 
                className="w-full rounded-lg"
                src={legacyFeaturedImage?.thumb}
                srcSet={legacyFeaturedImage?.srcSet}
                sizes="(min-height: 200px) 33vw,254px"
                />
                {/**
                    height > 350 && (
                        <div className="grid grid-cols-4 grid-cols-1 gap-4 mt-4">
                            <div className="grid-cols-1 rounded-lg" style={{height:"81px",border:"1px solid red"}}>
                            </div>
                            <div className="grid-cols-1 rounded-lg" style={{height:"81px",border:"1px solid red"}}>
                            </div>
                            <div className="grid-cols-1 rounded-lg" style={{height:"81px",border:"1px solid red"}}>
                            </div>
                            <div className="grid-cols-1 rounded-lg" style={{height:"81px",border:"1px solid red"}}>
                            </div>
                        </div>
                    )
                     */
                }
                <div className="mt-3 flex">
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2"># {slug} </div>
                    {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#START up</div> */}
                </div>
                <p className="text-gray-1 font-bold text-lg leading-normal mt-1">{title}</p>
        </div>
    )
}