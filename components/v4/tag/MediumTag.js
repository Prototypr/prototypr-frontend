import Link from 'next/link'
const SmallTag = ({link, children, index}) =>{
    return(
        <Link href={`${link?link:'/'}`}>
            <div className={`${index==1?'hidden xl:inline-block':''} capitalize inline-block text-xs px-3 py-1 bg-[#eef1f8] bg-opacity-60 border border-gray-200 rounded-full mr-2`}>
                {children}
            </div>
        </Link>
    )
}
export default SmallTag