import { useRouter } from 'next/router'

const MobileActiveLink =({ children, href }) =>{

    const router = useRouter()
  
    const handleClick = (e) => {
      e.preventDefault()
      router.push(href)
    }
  
    return (
        <a onClick={handleClick} 
        href={href} 
        className={`${router.asPath === href?'bg-blue-50 text-blue-700':'text-gray-700 hover:bg-blue-50 hover:text-blue-500'} block px-3 py-2 rounded-md text-base font-medium`} aria-current="page">
            {children}
        </a>
    )
}
export default MobileActiveLink