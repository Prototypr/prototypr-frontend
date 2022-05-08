import Link from "next/link";
import dynamic from "next/dynamic";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
// import NavigationMenuDemo from "./navbar-menu";
import { useState, useEffect } from "react";
import useUser from '@/lib/iron-session/useUser'
// import useSWR from 'swr'
import jsCookie from 'js-cookie';
// import { useIntl } from "react-intl";
const NavigationMenuDemo = dynamic(() => import("./navbar-menu"));


export default function Navbar({ activeNav }) {

  // const intl = useIntl();

  // const { data: user, mutate: mutateUser } = useSWR('/api/auth/user')
  const {user, isLoading} = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  })

    /**
   * use the logged in true/false cookie
   * so there is minimal flicker between subscribe and log in button
   */
    const [userLoggedInCookie] = useState(()=>{
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

  return (
    <Disclosure
      as="nav"
      className="bg-white fixed w-full top-0 z-50 border-b border-1 border-gray-100 backdrop-blur"
      style={{
        // borderBottom: `1px solid rgba(17, 24, 39, ${borderTransparacy})`,
        background: `rgba(255, 255, 255, 0.9)`,
      }}
    >
      {({ open }) => (
        <>
          {/* // <!-- This example requires Tailwind CSS v2.0+ --> */}
          <div
            className="mx-auto px-2 sm:px-6 lg:px-8"
            style={{ maxWidth: "1200px" }}
          >
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* <!-- Mobile menu button--> */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                  <div className="flex-shrink-0 flex items-center cursor-pointer">
                    <img
                      className="block lg:hidden h-9 w-9"
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
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <NavigationMenuDemo user={user} userLoading={isLoading} userLoggedInCookie={userLoggedInCookie} activeNav={activeNav} />
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavigationMenuDemo user={user} userLoggedInCookie={userLoggedInCookie} userLoading={isLoading} activeNav={activeNav} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
