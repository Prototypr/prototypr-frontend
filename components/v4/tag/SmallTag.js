import Link from 'next/link'
const SmallTag = ({link, children, index}) =>{
    return(
        <Link href={`${link?link:'/'}`}>
            <div className={`${index==1?'hidden xl:inline-block':''} inline-block text-2xs px-2 py-0.5 bg-[#eef1f8] bg-opacity-60 border border-gray-200 rounded-full mr-2`}>
                {children}
            </div>
        </Link>
    )
}
export default SmallTag