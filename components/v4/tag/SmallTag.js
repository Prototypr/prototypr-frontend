import Link from 'next/link'
const SmallTag = ({link, children}) =>{
    return(
        <Link href={`${link?link:'/'}`}>
            <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full mr-2">
                {children}
            </span>
        </Link>
    )
}
export default SmallTag