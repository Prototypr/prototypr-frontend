import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

import Layout from "@/components/new-index/layoutForIndex";
let axios = require("axios");

import dynamic from "next/dynamic";

import Fallback from "@/components/atom/Fallback/Fallback";
import { withIronSessionSsr } from "iron-session/next";
import {
  updateUserSessionSSR,
  updateUserSession,
} from "@/lib/iron-session/updateUserSession";
import { sessionOptions } from "@/lib/iron-session/session";

const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
import ArticleStats from "@/components/stats/StatsDashboard";

export default function Index(props) {
  const { user } = useUser({
    redirectTo: "/early-access",
    redirectIfFound: false,
  });

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

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
      <div className="h-full w-full">
        <div id="editor-container" className="w-full h-full mx-auto  relative">
          {!user && <Fallback />}

          {user && !user?.isLoggedIn ? (
            <>
              <Layout>
                <div className="relative w-full h-full flex">
                  <div className="my-auto mx-auto">
                    <Spinner />
                  </div>
                </div>
              </Layout>

              {/* <LoginForm isSignUp={isSignUp} />
                <div className="absolute top-[2%] right-[2%]">
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
                </div> */}
            </>
          ) : (
            user &&
            user?.isLoggedIn && (
              <div className="w-full h-full">
                <ArticleStats />
              </div>
            )
          )}
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
