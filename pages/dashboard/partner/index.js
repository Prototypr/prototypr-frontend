// import Head from "next/head";
import dynamic from "next/dynamic";
// import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
// import Navbar from "@/components/small-nav";
import Layout from "@/components/layout-dashboard";

import useUser from "@/lib/iron-session/useUser";
import { useState } from "react";

import ListSponsors from "@/components/DashboardPartners/ListSponsors";
// import Navigation from "@/components/Dashboard/navigation";
import ListJobs from "@/components/DashboardPartners/ListJobs";
import CompanyNav from "@/components/Sponsor/CompanyNav";
import DashboardNavigation from "@/components/DashboardPartners/DashboardNavigation";
import CompanyProfilePreview from "@/components/DashboardPartners/CompanyProfilePreview";

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
              style={{ maxWidth: 650 }}
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
          <Layout
            navType={"simple"}
            showWriteButton={false}
            showSponsorButton={true}
            background="#EFF2F8"
          >
            <div
              className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 "
              style={{ maxWidth: 1200 }}
            >
              {user?.profile?.activeCompany && <CompanyNav user={user} />}
              <div
                className={`${user?.profile?.activeCompany ? "pt-8" : ""} flex w-full max-w-6xl mx-auto flex-col md:flex-row`}
              >
                <DashboardNavigation activeTab={0} />

                <div className="w-full mx-auto px-2 sm:pr-0 sm:pl-6 lg:pl-8">
                  <div className="pt-6 pb-10 px-0 xl:px-0">
                    <div className="bg-white rounded-xl p-6 border border border-gray-300/70">
                      <h2 className={`text-xl font-semibold mb-6`}>Company</h2>
                      <CompanyProfilePreview company={user?.profile?.activeCompany}/>
                    </div>
                    <div className="bg-white mt-6 rounded-xl p-6 border border border-gray-300/70">
                      <h2 className={`text-xl font-semibold mb-6`}>Ads</h2>
                      {/* <Navigation activeTab={1}/> */}
                      <ListSponsors />
                    </div>
                    <div className="bg-white mt-6 rounded-xl p-6 border border border-gray-300/70">
                      {/* <hr /> */}
                      <h2 className="my-3 text-xl font-semibold mb-6">
                        Job Posts
                      </h2>
                      {/* <Navigation activeTab={1}/> */}
                      <ListJobs />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        )
      )}
      {/* </div>
      </div> */}
    </>
  );
}
