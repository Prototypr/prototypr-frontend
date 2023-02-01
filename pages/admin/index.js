// import Head from "next/head";
import dynamic from "next/dynamic";
// import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
// import Navbar from "@/components/small-nav";
import Layout from "@/components/layout-dashboard";

import useUser from "@/lib/iron-session/useUser";
import { useState } from "react";

import Dashboard from "@/components/admin/Dashboard/AdminDashboard";
import Navigation from "@/components/admin/Dashboard/navigation";
// const axios = dynamic(() => import("axios"));
const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));
// const LoginSide = dynamic(() => import("@/components/sign-in/LoginSide"));

export default function Index() {
  const { user } = useUser({
    redirectTo: '/',
    redirectIfFound: false,
  });



  return (
    <>
      {/* <div className="h-full w-full">
        <div className="w-full h-full mx-auto  relative"> */}
      {!user && <Fallback />}
        {user &&
        (user?.isLoggedIn && user.isAdmin) && (
          <Layout navType={"simple"} background="#fff">
              <div
                className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 "
                style={{ maxWidth: 1200 }}
                >
                    <div className="flex flex-row justify-between items-baseline mt-3">
                        <h1 className="my-3 text-3xl font-semibold">My posts</h1>
                    </div>
                    <Navigation activeTab={1}/>
                    <Dashboard postStatus='draft' />
                </div>
          </Layout>
        )
      }
    </>
  );
}