import Link from "next/link"
import { CaretRight } from "phosphor-react"
const HeadingSeeAllRow = ({link="/",title='Featured tools', extraTextHighlight='', subheader=''}) =>{
    return(
        <div className="flex justify-between">
        <div className="mt-6 mb-6 px-1">
            <h3 className="font-bold mb-1 text-2xl">
            {title} {extraTextHighlight?<span className="text-gray-400">{extraTextHighlight}</span>:''}
            </h3>
            {subheader?<p className="text-gray-600 text-lg">{subheader}</p>:''}
        </div>
          <Link href={link}>
            <div className="flex mt-6">
              <div className="text-sm my-auto  text-black opacity-60">See all</div>
              <CaretRight className="opacity-60 my-auto" size={16} />
            </div>
          </Link>

      </div>
    )
}
export default HeadingSeeAllRow