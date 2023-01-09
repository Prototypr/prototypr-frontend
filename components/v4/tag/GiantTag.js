import Link from 'next/link'
const GiantTag = ({link, children, index, active}) =>{
    return(
        <Link href={`${link?link:'/'}`}>
            <div className={`inline-block text-base px-5 py-2 cursor-pointer ${active?'bg-blue-600 text-white':'bg-[#eef1f8] bg-opacity-60'} border border-gray-200 rounded-full mr-3 mb-3`}>
                {children}
            </div>
        </Link>
    )
}
export default GiantTag