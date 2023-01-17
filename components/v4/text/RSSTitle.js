import { RssSimple } from "phosphor-react"
const RSSTitle = ({title}) =>{
    return(
        <div className="flex px-1">
            <h2 className="text-[24px] mb-4 text-[#0F1F40] font-semibold font-inter max-w-md leading-[32px]">
             {title?title:
             <>
             Fresh articles <span className="hidden md:inline text-gray-400">for creators</span>
             </>
             } 
            </h2>
            {!title ?<div className="flex ml-2 mb-4 flex-col justify-center">
              <a target="_blank" className="inline-flex" href="/feed.xml">
              <RssSimple size={22} />
              </a>
            </div>:''}
          </div>
    )
}
export default RSSTitle