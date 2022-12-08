import { useRouter } from 'next/router'

const ActiveLink =({ children, href }) =>{

    const router = useRouter()
  
    const handleClick = (e) => {
      e.preventDefault()
      router.push(href)
    }
  
    return (
        <a href={href} onClick={handleClick}
        className={`${router.asPath === href?'bg-blue-50 text-blue-700':'text-gray-800 hover:bg-blue-50 hover:text-blue-600'} px-3 py-2 rounded-md text-sm font-medium`}>
 
        {children}
      </a>
    )
}
export default ActiveLink