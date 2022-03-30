import Intro from "@/components/sign-in/intro";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginForm from "@/components/sign-in/LoginForm";
import Link from "next/link";

export default function Index({ allPosts, preview }) {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Sign into Prototypr</title>
      </Head>
      {session ? (
        <div>Logged in.</div>
      ) : (
        <div className="h-full">
          <div className="flex items-center justify-center h-full w-full relative">
            <LoginForm />
            <div className="absolute top-[2%] right-[2%]">
              <div className="text-sm text-gray-700">
                <span>I already have access? </span>
                <Link href="/sign_in" passHref prefetch={false}>
                  <a className="text-primary-400">Sign in.</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Intro session={session} />        
          {session?
           <>
           Signed in as {session.user.email} <br />
           <button onClick={() => signOut()}>Sign out</button>
         </>
          :<div className="pt-6 flex flex-col md:flex-row ">
            <button onClick={() => signIn('twitter')} style={{ background: 'rgb(29, 161, 242)' }} className="shadow hover:shadow-md text-white font-semibold text-sm py-2 px-4 rounded inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 24 24" className="mr-2"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                <span className="text-xs uppercase">Sign In with Twitter</span>
            </button>
            <button onClick={() => signIn('github')} className="shadow mt-3 md:mt-0 md:ml-6 bg-gray-800 hover:shadow-md text-white font-semibold text-sm py-2 pl-3 pr-4 rounded inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#fff" viewBox="0 0 24 24" className="mr-2">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.09.682-.218.682-.484 0-.236-.009-.866-.014-1.699-2.782.602-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.909-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.337-2.22-.251-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.097-2.646 0 0 .84-.269 2.75 1.025A9.548 9.548 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.307.679.917.679 1.852 0 1.335-.012 2.415-.012 2.741 0 .269.18.579.688.481A9.997 9.997 0 0022 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-xs uppercase">Sign In with GitHub</span>
            </button>
            <button onClick={() => signIn('google')} className="shadow mt-3 md:mt-0 md:ml-6 bg-white hover:shadow-md text-gray-800 border border-gray-100 font-semibold text-sm py-2 pl-3 pr-4 rounded inline-flex items-center justify-center">
            
                <svg width="24" height="24" className="mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" > 
                <defs> <path id="prefix__a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /> </defs> <clipPath id="prefix__b"> <use xlinkHref="#prefix__a" overflow="visible" /> </clipPath> <path clipPath="url(#prefix__b)" fill="#FBBC05" d="M0 37V11l17 13z" /> <path clipPath="url(#prefix__b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /> <path clipPath="url(#prefix__b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" /> <path clipPath="url(#prefix__b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /> </svg>
                <span className="text-xs uppercase">Sign In with Google</span>
            </button>
        </div>} */}
    </>
  );
}
