import dynamic from "next/dynamic";
import useUser from "@/lib/iron-session/useUser";
import UserMenu from "./UserMenu";
import Link from "next/link";
import MenuItems from "./parts/MenuItems";
import LocationMenu from "./parts/LocationMenu";
const WMCounter = dynamic(() => import("../WebMonetization/Counter"), {
  ssr: false,
});

const Navbar = ({
  collapsed,
  hideLocaleSwitcher,
  editor,
  showWriteButton
}) =>{
  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

    return(
<nav className="bg-white fixed w-full top-0 z-50 border-b border-1 border-gray-100 backdrop-blur">
  <div className="mx-auto max-w-[1200px] px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>

          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
        <Link href="/" as="/">
            <>
            <img className="block h-8 w-auto lg:hidden" 
            src="/static/images/logo-small.svg"
            alt="Prototypr Logo"
            />
            <img className="hidden h-8 w-auto lg:block" 
            src={`/static/images/logo.svg`}
            alt="Prototypr Logo"
            />
            </>
          </Link>
          <div className={`hidden md:block my-auto transition transition-all duration-300 ease-in-out`}>
            <WMCounter/>
          </div>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <MenuItems/>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <LocationMenu user={user} hideLocaleSwitcher={hideLocaleSwitcher} collapsed={collapsed}/>
        <div className="relative ml-3">
        <UserMenu userLoading={isLoading} user={user}/>
        </div>
      </div>
    </div>
  </div>

  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pt-2 pb-3">
      <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>
    )
}

export default Navbar