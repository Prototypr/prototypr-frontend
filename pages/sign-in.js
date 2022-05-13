import Head from "next/head";
import LoginForm from "@/components/sign-in/LoginForm";
import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
import LoginSide from "@/components/sign-in/LoginSide";
import Button from "@/components/atom/Button/Button";
import useUser from "@/lib/iron-session/useUser";
import WMOnboarding from '@/components/user/WMOnboarding'
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
