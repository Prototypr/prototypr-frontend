



export default function FeedItem({height}) {

    return (
        <div className="w-full cursor-pointer">
            <div className="w-full rounded-lg" style={{height:` ${height}px`,border:"1px solid red"}}></div>
                {
                    height > 350 && (
                        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-4">
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
                }
                <div className="mt-3 flex">
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#Product design  </div>
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#START up</div>
                </div>
                <p className="text-gray-1 font-bold text-lg leading-normal mt-1">An Inside Look at How We Refreshed Yelp’s Logo & App Icons</p>
        </div>
    )
}