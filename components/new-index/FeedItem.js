



export default function FeedItem({height}) {

    return (
        <div className="w-full">
            <div className="w-full" style={{height:` ${height}px`,border:"1px solid red"}}></div>
                <div className="mt-3 flex">
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#Product design  </div>
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#START up</div>
                </div>
                <p className="text-gray-1 font-bold text-lg leading-normal mt-1">An Inside Look at How We Refreshed Yelp’s Logo & App Icons</p>
        </div>
    )
}