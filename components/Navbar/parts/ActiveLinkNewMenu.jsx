import { useRouter } from 'next/router'

const ActiveLinkNewMenu =({ children, href }) =>{

    const router = useRouter()
  
    const handleClick = (e) => {
      e.preventDefault()
      router.push(href)
    }
  
    return (
        <a href={href} onClick={handleClick}
        className={`${((router.asPath?.indexOf(href)>-1 && href!=='/') || router.asPath==href)?'bg-blue-50 text-blue-800 font-medium bg-opacity-50 border':'text-gray-900 hover:bg-blue-50 font-medium hover:text-blue-600 bg-transparent'} px-4 text-sm hover:bg-gray-200 py-2 text-center inline-block font-inter tracking-tight cursor-pointer min-w-max cursor w-full rounded-full text-gray-500  `}
        // className={`${((router.asPath?.indexOf(href)>-1 && href!=='/') || router.asPath==href)?'bg-blue-50 text-blue-800 font-medium bg-opacity-50 border':'text-gray-800 hover:bg-blue-50 font-normal hover:text-blue-600 bg-transparent'} px-6 hover:bg-gray-200 py-2 text-center block font-inter tracking-tight cursor-pointer min-w-max cursor w-full text-base rounded-full text-gray-500  `}
        style={{borderColor:'#ebeff6'}}>
        
        {children}
      </a>
    )
}
export default ActiveLinkNewMenu