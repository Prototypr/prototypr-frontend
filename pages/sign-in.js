import Head from "next/head";
import LoginForm from "@/components/sign-in/LoginForm";
import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
import LoginSide from "@/components/sign-in/LoginSide";
import Button from "@/components/atom/Button/Button";
import useUser from "@/lib/iron-session/useUser";
import { withIronSessionSsr } from "iron-session/next";
import {
  updateUserSessionSSR,
  updateUserSession,
} from "@/lib/iron-session/updateUserSession";
import { sessionOptions } from "@/lib/iron-session/session";
import axios from "axios";
import { useEffect } from "react";
import Meta from "@/components/meta";

export default function Index() {
  const { user } = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  });

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
            canonical: "https://prototypr.io/sign-in",
            url: "https://prototypr.io/sign-in",
          }}
        />
      </Head>

      <div className="h-full w-full grid md:grid-cols-12">
        <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
          <div className="flex items-center justify-center h-full w-full relative bg-[#252636] text-white">
            <LoginSide />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-8">
          <div className="flex items-center justify-center h-full w-full relative">
            {!user && <Fallback />}
            {user?.isLoggedIn && (
              <div className="absolute top-[2%] left-[2%]">
                <Link href="/" passHref prefetch={false}>
                  <a>
                    <img
                      src={`/static/images/logo-small.svg`}
                      alt=""
                      className="w-8 h-8"
                    />
                  </a>
                </Link>
              </div>
            )}
            {user && !user?.isLoggedIn ? (
              <>
                <LoginForm />
                <div className="absolute top-[2%] right-[2%]">
                  <div className="text-sm text-gray-700">
                    <span>I already have access? </span>
                    <Link href="/sign_in" passHref prefetch={false}>
                      <a className="text-primary-400">Sign in.</a>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              user &&
              user?.isLoggedIn && (
                // <div className="flex flex-col w-[285px]">
                <div className="flex flex-col  w-[585px] ">
                  <h2 className="text-lg text-gray-800 font-bold text-center">
                    Welcome, early adopter!
                  </h2>
                  {/* <p className="text-gray-600 mt-3">
                    Hi {user.name},
                  </p> */}
                  {/* <p className="text-gray-600 mt-3">
                    Thanks for joining as a writer, and welcome to the new Prototypr.
                    </p> */}
                    <p className="text-gray-600 mt-3"> 
                    You're among the first joining our new Open Source web design publication, which is being built to boost an <span className="font-bold">open</span>, <span className="font-bold">fair</span>, and <span className="font-bold">inclusive</span> web through a new browser technology called '<a target="_blank" className="text-blue-600 cursor-pointer hover:underline" href="https://prototypr.io/post/imagining-an-ad-free-internet-web-monetization-for-designers/">Web Monetization</a>' – yes, a solution to paywalls and intrusive ads.
                  </p>
                  <ul className="list-disc pl-8 text-gray-600 mt-3">
                    <li className="my-2"><span className="font-semibold">Accessible and Inclusive</span>: No more paywalls or subscriptions. Built for different cultures and abilities.</li>
                    <li className="my-2"><span className="font-semibold">Privacy-first</span>: No to tracking or targeted ads, you control your data.</li>
                    <li className="my-2"><span className="font-semibold">Open Source</span>: The code for the Prototypr platform will be published under MIT Open License for anyone to remix, learn from, and copy.</li>
                  </ul>
                  {/* <Link href="/account" passHref prefetch={false}> */}
                  <a className="block mx-auto" href="/account" passHref prefetch={false}>
                    <Button as="a" color="primary" className="text-sm">
                      Set up profile
                    </Button>
                  </a>
                </div>
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
