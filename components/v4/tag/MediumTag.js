import Link from 'next/link'
const SmallTag = ({link, children, index}) =>{
    return(
        <Link href={`${link?link:'/'}`}>
            <div className={`${index==1?'hidden xl:inline-block':''} capitalize inline-block text-xs px-3 py-1 bg-[#d8e5f8]/70 rounded-full mr-2`}>
                {children}
            </div>
        </Link>
    )
}
export default SmallTag