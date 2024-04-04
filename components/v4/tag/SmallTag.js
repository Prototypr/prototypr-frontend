import Link from 'next/link'
const SmallTag = ({link, children, index}) =>{
    return(
        <Link href={`${link?link:'/'}`}>
            <div className={`${index==1?'hidden xl:inline-block':''} capitalize inline-block text-xs px-2 py-0.5 font-medium bg-[#d8e9ff] text-black/80 rounded-full mr-2`}>
                {children}
            </div>
        </Link>
    )
}
export default SmallTag