import Link from 'next/link';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import NavigationMenuDemo from './navbar-menu';

export default function Navbar({ posts, type, activeNav }) {

    return(
    <Disclosure as="nav" className="bg-white shadow fixed w-full top-0 z-50">
      {({ open }) => (
          <>
    {/* // <!-- This example requires Tailwind CSS v2.0+ --> */}
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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
                        <img className="block lg:hidden h-12 w-auto" src="https://prototypr.io/wp-content/uploads/2018/10/1_SdMNHdB-vvUH4eWMBYkzQw.png" alt="Workflow"/>
                        <img className="hidden lg:block h-8 w-auto" src="https://letter-so.s3.us-west-1.amazonaws.com/uploads/LQatPZxS8qFXER9Hi/2rzv1a" alt="Workflow"/>
                </div>
            </Link>
        </div>
        <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-800 hover:bg-gray-100 hover:text-gray-900" --> */}
                {/* <Link href="/posts" as="/posts">
                    <a href="#" className={activeNav=='posts'?"bg-gray-100 text-black px-3 py-2 shadow-sm rounded-md text-sm font-semibold":"text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"} aria-current="page">Stories</a>
                </Link> */}
                <Link href={`/toolbox/page/1`}>
                    <NavigationMenuDemo activeNav={activeNav}/>
                    {/* <a href="#" className={activeNav=='toolbox'?"bg-gray-100 text-black px-3 py-2 shadow-sm rounded-md text-sm font-semibold":"text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"} aria-current="page">Toolbox</a> */}
                </Link>
                {/* <a href="#" className={activeNav=='become-author'?"bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium":"text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"} aria-current="page">Write for us</a>

                <a href="#" className={activeNav=='subscribe'?"bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium":"text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"}>Subscribe</a> */}

                {/* <a href="#" className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sign up</a>

                <a href="#" className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sign in</a> */}
            </div>
        </div>
        {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            </button>

            <div className="ml-3 relative">
            <div>
                <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                </button>
            </div>
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
            </div>
            </div>
        </div> */}
        </div>
    </div>

    {/* <!-- Mobile menu, show/hide based on menu state. --> */}
    <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
                <Disclosure.Button
                  key={'stories'}
                  as="a"
                  href="/posts/page/1"
                  className={activeNav=='posts'?"bg-gray-100 text-gray-900 block px-3 py-2 rounded-md text-base font-medium":"text-gray-800 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"}
                  aria-current={'page'}
                >
                  Stories
                </Disclosure.Button>
                <Disclosure.Button
                  key={'toolbox'}
                  as="a"
                  href={'/toolbox'}
                  className={activeNav=='toolbox'?"bg-gray-100 text-gray-900 block px-3 py-2 rounded-md text-base font-medium":"text-gray-800 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"}
                  aria-current={'page'}
                >
                  Toolbox
                </Disclosure.Button>
                <Disclosure.Button
                  key={'become-author'}
                  as="a"
                  href={'#'}
                  className={activeNav=='become-author'?"bg-gray-100 text-gray-900 block px-3 py-2 rounded-md text-base font-medium":"text-gray-800 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"}
                  aria-current={'page'}
                >
                  Write for us
                </Disclosure.Button>
                <Disclosure.Button
                  key={'subscribe'}
                  as="a"
                  href={'#'}
                  className={activeNav=='become-author'?"bg-gray-100 text-gray-900 block px-3 py-2 rounded-md text-base font-medium":"text-gray-800 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"}
                  aria-current={'page'}
                >
                  Subscribe
                </Disclosure.Button>
            </div>
          </Disclosure.Panel>
</>)}
    </Disclosure>
    )

}