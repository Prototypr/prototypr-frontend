import { RssSimple } from "phosphor-react"
const RSSTitle = () =>{
    return(
        <div className="flex px-1">
            <h2 className="text-xl md:text-3xl mb-4 font-semibold text-gray-900">
              Fresh articles <span className="hidden md:block text-gray-400">for creators</span>
            </h2>
            <div className="flex ml-2 -mt-1 mb-4 flex-col justify-center">
              <a target="_blank" className="inline-flex" href="/feed.xml">
              <RssSimple size={28} />
              </a>
            </div>
          </div>
    )
}
export default RSSTitle