import { RssSimple } from "phosphor-react"
import { FormattedMessage, useIntl } from "react-intl";

const RSSTitle = ({title}) =>{
  const intl = useIntl();
    return(
        <div className="flex px-1">
            <h2 className="text-2xl mb-2 text-[#0F1F40] font-medium font-inter max-w-md">
             {title?intl.formatMessage({ id: title }):
             <>
            New & Noteworthy
            {/* <span className="hidden md:inline text-gray-400">articles</span> */}
             </>
             } 
            </h2>
            {!title ?<div className="flex ml-2 mb-4 flex-col justify-center">
              <a target="_blank" className="inline-flex" href="/feed.xml">
              <RssSimple color="orange" size={22} />
              </a>
            </div>:''}
          </div>
    )
}
export default RSSTitle