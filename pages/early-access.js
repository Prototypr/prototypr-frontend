import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import { withIronSessionSsr } from "iron-session/next";
import {
  updateUserSessionSSR,
  updateUserSession,
} from "@/lib/iron-session/updateUserSession";
import { sessionOptions } from "@/lib/iron-session/session";
// import axios from "axios";
import { useEffect } from "react";
import Meta from "@/components/meta";
import {
  Cross1Icon
} from '@radix-ui/react-icons';
import axios from 'axios'
import { useState } from "react";
// const axios = dynamic(() => import("axios"));
const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));
const LoginSide = dynamic(() => import("@/components/sign-in/LoginSide"));
const WMOnboarding = dynamic(() => import("@/components/user/WMOnboarding"));


export default function Index() {
  const { user } = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  });


  const [isSignUp, setSignUp] = useState(true)

  const toggleSignIn = ()=> {
    setSignUp(!isSignUp)
  }

  useEffect(() => {
    if (user && !user.avatar) {
      // declare the data fetching function
      const fetchUserData = async () => {
        const res = await axios({
          method: "GET", // change this GET later
          url: process.env.NEXT_PUBLIC_API_URL + "/api/users/me",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });
        if (res.data) {
          await updateUserSession(res.data);
        }
      };
      // call the function
      fetchUserData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [user]);

  return (
    <>
      <Head>
        <Meta
          seo={{
            title: "Sign into Prototypr",
            description: "Sign in or create an account",
            //   image: "",
            canonical: "https://prototypr.io/early-acess",
            url: "https://prototypr.io/early-acess",
          }}
        />
      </Head>

      <div className="h-full w-full grid md:grid-cols-12">
        <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
          <div className="flex items-center justify-center h-full w-full relative bg-[#252636] text-white">
            <LoginSide user={user} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-8">
          <div className="flex items-center justify-center h-full w-full relative">
            {!user && <Fallback />}
            
              <div className="absolute top-[2%] left-[2%]">
                <Link href="/" passHref prefetch={false}>
                  <a>
                    <Cross1Icon/>
                  </a>
                </Link>
              </div>
            {user && !user?.isLoggedIn ? (
              <>
                <LoginForm isSignUp={isSignUp} />
                <div className="absolute top-[2%] right-[2%]">
                  <div className="text-sm text-gray-700">
                    <span>{isSignUp?'Already got an account?':'Not got an account yet?' }</span>
                      <a 
                      onClick={toggleSignIn}
                      className="text-primary-400 cursor-pointer">{isSignUp?' Sign in.':' Sign up'}</a>
                  </div>
                </div>
              </>
            ) : (
              user &&
              user?.isLoggedIn && (
                  <WMOnboarding/>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  //iron-session user
  const user = req.session.user;

  if (user?.login?.jwt) {
    try {
      const res = await axios({
        method: "GET", // change this GET later
        url: process.env.NEXT_PUBLIC_API_URL + "/api/users/me",
        headers: {
          Authorization: `Bearer ${user.login.jwt}`,
        },
      });
      //update iron-session with this up to date data
      await updateUserSessionSSR(req, res);

      //then return it
      return {
        props: {
          userData: res.data,
          isConfirmed: res.data.confirmed,
        }, // will be passed to the page component as props
      };
    } catch (e) {
      console.log(e.message);
      return {
        props: {
          user: {
            isLoggedIn: false,
            login: "",
            avatarUrl: "",
            isConfirmed: false,
          },
        },
      };
    }
  }
  return {
    props: {},
  };
},
sessionOptions);
