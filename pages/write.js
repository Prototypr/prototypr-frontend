import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Layout from "@/components/layout-editor";

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
// import Meta from "@/components/meta";
// import { Cross1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";

import Editor from "@/components/Editor/Editor";
// const axios = dynamic(() => import("axios"));
const Spinner = dynamic(() => import('@/components/atom/Spinner/Spinner'))
// const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));
// const LoginSide = dynamic(() => import("@/components/sign-in/LoginSide"));
// const WMOnboarding = dynamic(() => import("@/components/user/WMOnboarding"));

export default function Index() {
  const { user } = useUser({
    // redirectTo: '/account',
    redirectTo:'/early-access',
    redirectIfFound: false,
  });

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  // const [editorInstance, setEditorInstance] = useState(null)

  useEffect(()=>{
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("id", "twitter-widget");
    s.setAttribute("async", "true");

    if(!document.getElementById('twitter-widget')){
      document.head.appendChild(s);
    }
    if(window.$crisp){
      window.$crisp.push(['do', 'chat:hide']);
    }

  },[])

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
      <div className="h-full w-full" id="editor-container">
        <div className="w-full h-full mx-auto  relative">
          {!user && <Fallback />}

            {user && !user?.isLoggedIn ? (
              <Layout>
                 <div className="my-auto">
                  <Spinner />
                </div>
                
                {/* <div className="w-full" style={{maxWidth:600}}>
                <LoginForm isSignUp={isSignUp} />
                </div>
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
              </Layout>
            ) : (
              user &&
              user?.isLoggedIn && (
                
                  <div className="my-4">
                    {/* <Editor setEditorInstance={setEditorInstance} /> */}
                    <Editor />
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
