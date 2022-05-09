import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import NavigationMenuDemo from "./navbar-menu";
import NavigationMenuMobile from "./navbar-menu-mobile";
import { useState, useEffect } from "react";
import useUser from '@/lib/iron-session/useUser'
// import useSWR from 'swr'
import jsCookie from 'js-cookie';
import { FormattedMessage, useIntl } from "react-intl";
import SubNav from './sub-nav'
import useScrollDirection from './useScrollDirection'

export default function Navbar({ activeNav }) {
  const [clientWindowHeight, setClientWindowHeight] = useState("");
  const scrollDirection = useScrollDirection();
  // const [backgroundTransparacy, setBackgroundTransparacy] = useState(0.5);
  const [showNav, setShowNav] = useState(true);
  const intl = useIntl();

  
  // const { data: user, mutate: mutateUser } = useSWR('/api/auth/user')
  const {user, isLoading} = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  })

    /**
   * use the logged in true/false cookie
   * so there is minimal flicker between subscribe and log in button
   */
    const [userLoggedInCookie, setUserLoggedInCookie] = useState(()=>{
    let loggedInCookie = jsCookie.get('prototypr-loggedIn')
    if(loggedInCookie=='true'){
      return true
    }else{
      return false
    }
  })

  useEffect(()=>{
    if(user?.email){
      jsCookie.set('prototypr-loggedIn', true);
    }else{
      jsCookie.set('prototypr-loggedIn', false);
    }

  },[user?.email])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 3000;
    if (backgroundTransparacyVar < 1) {
      let border = backgroundTransparacyVar / 1.2;
      if(border<0.12){
        setShowNav(false);
      }
      let bg = 1 - backgroundTransparacyVar;
      if (bg > 0.9) {
        setShowNav(true);
      }else{
        if(scrollDirection=='down'){
          setShowNav(false);
        }
      }
      
    }
  }, [clientWindowHeight, scrollDirection]);

  return (
    <Disclosure
      as="nav"
      className="bg-white fixed w-full top-0 z-50 border-b border-1 border-gray-100 backdrop-blur"
      style={{
        // borderBottom: `1px solid rgba(17, 24, 39, ${borderTransparacy})`,
        background: `rgba(255, 255, 255, ${0.9})`,
      }}
    >
      {({ open }) => (
        <>
          {/* // <!-- This example requires Tailwind CSS v2.0+ --> */}
          <div
            className="mx-auto text-sm px-2 sm:px-6 lg:px-8"
            style={{ maxWidth: "1200px" }}
          >
            <div className={`${showNav?'':'md:-mt-16'} transition transition-all duration-700 ease-in-out relative flex items-center justify-between h-16`}>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* <!-- Mobile menu button--> */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/" as="/">
                  <div className={`${showNav?'opacity-1':'md:opacity-0 md:mt-16 md:-z-1'} flex-shrink-0 flex items-center cursor-pointer transition transition-all duration-300 ease-in-out`}>
                    <img
                      className="block lg:hidden h-12 w-auto"
                      src="/static/images/logo-small.svg"
                      alt="Prototypr Logo"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      // src={`/static/images/logo${intl.locale=='es-ES'?'-es':''}.svg`}
                      src={`/static/images/logo.svg`}
                      alt="Prototypr Logo"
                    />
                  </div>
                </Link>
              </div>
              <div className={`hidden sm:block sm:ml-6 ${showNav?'':'md:mt-28 pt-1'} transition transition-all duration-500 ease-in-out`}>
                <div className="flex space-x-4">
                  <NavigationMenuDemo collapsed={showNav} user={user} userLoading={isLoading} userLoggedInCookie={userLoggedInCookie} activeNav={activeNav} />
                </div>
                
                
              </div>
            </div>
            <div className={`hidden md:flex justify-between space-x-4 w-full transition transition-all duration-700 ease-in-out relative py-2 uppercase text-sm`}>
              <SubNav collapse={showNav} user={user} userLoading={isLoading} userLoggedInCookie={userLoggedInCookie} activeNav={activeNav} />
              <p className={`my-auto hidden xl:block normal-case font-semibold ${!showNav?'opacity-0 -z-10 absolute right-0 pt-3.5 text-gray-50 -mr-12 text-xs':'text-base'} transition transition-all duration-200 ease-in-out `}>
                A <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">
                  design discovery
                </span> publication platform.
              </p>

            </div>
          </div>

          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavigationMenuMobile user={user} userLoggedInCookie={userLoggedInCookie} userLoading={isLoading} activeNav={activeNav} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
