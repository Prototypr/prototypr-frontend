import Link from 'next/link'
const BigTag = ({link, children, index}) =>{
    return(
        <Link href={`${link?link:'/'}`}>
            <div className={`inline-block text-sm px-3 py-1.5 cursor-pointer bg-[#eef1f8] bg-opacity-60 border border-gray-200 rounded-full mr-3 mb-3`}>
                {children}
            </div>
        </Link>
    )
}
export default BigTag