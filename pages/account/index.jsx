import Fallback from "@/components/atom/Fallback/Fallback";
import Layout from "@/components/layout";
import UserForm from "@/components/user/UserForm";
import axios from "axios";
import { getToken } from "next-auth/jwt";
// import { useSession } from "next-auth/react";
import Head from "next/head";

// import { User } from 'pages/api/auth/user'
import { sessionOptions } from '@/lib/iron-session/session'
import { withIronSessionSsr } from 'iron-session/next'
// import { InferGetServerSidePropsType } from 'next'
import useUser from "@/lib/iron-session/useUser";

const AccountPage = ({ preview, userData }) => {
  // const { data: sessionInfo, status } = useSession();

  const {user} = useUser({
    redirectTo: '/sign-in',
    redirectIfFound: false,
  })


  if (!user) {
    return <Fallback />;
  }

  if (user?.isLoggedIn) {
    return (
      <Layout preview={preview}>
        <Head>
          <title>Account Settings</title>
        </Head>
        <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="pt-6 pb-10 md:pt-10 px-3 xl:px-0">
            <div className="bg-white shadow-md rounded-lg py-6 px-4">
              <h1 className="font-semibold">Public Profile</h1>
              <span className="text-sm text-gray-400">
                This information will be displayed publicly on your profile
              </span>
              <UserForm
                info={{
                  firstName: userData.firstName,
                  secondName: userData.secondName,
                  location: userData.location,
                  website: userData.website,
                  bio: userData.bio,
                  paymentPointer: userData.paymentPointer,

                  // ask about these later
                  email: user?.email,
                  username: user?.name?user.name:userData.username,
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // TODO
  return( <Layout preview={preview}>
    <Head>
      <title>Account Settings</title>
    </Head>

<div>Unauthenticated, whoops!</div>
    </Layout>)
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  //iron-session user
  const user = req.session.user

  /**
   * to fetch user data, we need to use the jwt token
   * - if user is logged in with passwordless email, it's in the iron-session
   * 
   * - if the user is logged in with nextauth, use getToken
   */

  /**
   * nextauth
   */
  try {
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });

  if (token) {
      const res = await axios({
        method: "GET", // change this GET later
        url: process.env.NEXT_PUBLIC_API_URL + "/api/users/me",
        headers: {
          Authorization: `Bearer ${token.jwt}`,
        },
      });

      return {
        props: {
          userData: res.data,
        }, // will be passed to the page component as props
      };
    }
     
  }
  catch(e){
    console.log(e.message)
    return {
      notFound: true,
    };
  }

  /**
   * iron session user
   * who logged in with email
   */
   if (user === undefined) {
    res.setHeader('location', '/sign-in')
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: { isLoggedIn: false, login: '', avatarUrl: '' },
      },
    }
  }else{
    if(user?.login?.jwt){
      const res = await axios({
          method: "GET", // change this GET later
          url: process.env.NEXT_PUBLIC_API_URL + "/api/users/me",
          headers: {
            Authorization: `Bearer ${user.login.jwt}`,
          },
        });
  
        return {
          props: {
            userData: res.data,
          }, // will be passed to the page component as props
        };
    }
  }

  // console.log(req.session.user)

  return {
    props: { userData:req.session.user.login.user },
  }
},
sessionOptions)

export default AccountPage;
