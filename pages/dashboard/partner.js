// import Head from "next/head";
import dynamic from "next/dynamic";
// import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
// import Navbar from "@/components/small-nav";
import Layout from "@/components/layout-dashboard";

import useUser from "@/lib/iron-session/useUser";
import { useState } from "react";

import ListSponsors from "@/components/DashboardPartners/ListSponsors";
import Navigation from "@/components/Dashboard/navigation";
import ListJobs from "@/components/DashboardPartners/ListJobs";
// const axios = dynamic(() => import("axios"));
const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));
// const LoginSide = dynamic(() => import("@/components/sign-in/LoginSide"));

export default function Index() {
  const { user } = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  });

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  return (
    <>
      {/* <div className="h-full w-full">
        <div className="w-full h-full mx-auto  relative"> */}
      {!user && <Fallback />}

      {user && !user?.isLoggedIn ? (
        <Layout>
          <div className="w-full relative max-w-4xl p-4 mx-auto ">
            <div
              className="w-full bg-white shadow-sm p-8 rounded-lg flex justify-center mx-auto mt-8"
              style={{ maxWidth: 390 }}
            >
              <LoginForm isSignUp={isSignUp} />
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="text-sm text-gray-700">
              <span>
                {isSignUp
                  ? "Already got an account?"
                  : "Not got an account yet?"}
              </span>
              <a
                onClick={toggleSignIn}
                className="text-primary-400 cursor-pointer"
              >
                {isSignUp ? " Sign in." : " Sign up"}
              </a>
            </div>
          </div>
        </Layout>
      ) : (
        user &&
        user?.isLoggedIn && (
          <Layout navType={"simple"} background="#fff">
              <div
                className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 "
                style={{ maxWidth: 1200 }}
                >
                    <div className="flex flex-row justify-between items-baseline mt-3">
                        <h1 className="my-3 text-3xl font-semibold mb-12">Partner Dashboard</h1>
                    </div>

                    <h2 className="my-3 text-2xl font-semibold mb-6">Sponsorships</h2>
                    {/* <Navigation activeTab={1}/> */}
                    <ListSponsors/>
                    <hr/>
                    <h2 className="mt-12 text-2xl font-semibold mb-6">Job Posts</h2>
                    {/* <Navigation activeTab={1}/> */}
                    <ListJobs/>
                </div>
          </Layout>
        )
      )}
      {/* </div>
      </div> */}
    </>
  );
}