import Link from "next/link"
import { CaretRight } from "phosphor-react"
const HeadingSeeAllRow = ({link="/",title='Featured tools', extraTextHighlight='', subheader=''}) =>{
    return(
        <div className="flex justify-between">
        <div className="mt-6 mb-6 px-1">
            <h3 className="font-bold mb-1 text-xl md:text-2xl">
            {title} {extraTextHighlight?<span className="hidden md:block text-gray-400">{extraTextHighlight}</span>:''}
            </h3>
            {subheader?<p className="text-gray-600 text-sm max-w-[230px] sm:max-w-full md:text-lg">{subheader}</p>:''}
        </div>
          <Link href={link}>
            <div className="flex mt-6">
              <div className="text-base my-auto  text-blue-600">See all</div>
              <CaretRight color="rgb(37,99,235)" className=" my-auto" size={16} />
            </div>
          </Link>

      </div>
    )
}
export default HeadingSeeAllRow