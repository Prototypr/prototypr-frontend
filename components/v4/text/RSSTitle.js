import { RssSimple } from "phosphor-react"
import { FormattedMessage, useIntl } from "react-intl";

const RSSTitle = ({title}) =>{
  const intl = useIntl();
    return(
        <div className="flex px-1">
            <h2 className="text-2xl drop-shadow-sm text-black/90 font-semibold font-inter max-w-md flex flex-col justify-center">
             {title?intl.formatMessage({ id: title }):
             <div className="inline-flex tracking-tight">
            Trending <span className="hidden md:inline ml-2">articles</span>
             </div>
             } 
            </h2>
            {!title ?<div className="flex ml-2 flex-col justify-center">
              <a target="_blank" className="inline-flex" href="/feed.xml">
              <RssSimple color="orange" size={22} />
              </a>
            </div>:''}
          </div>
    )
}
export default RSSTitle