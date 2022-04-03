import Fallback from "@/components/atom/Fallback/Fallback";
import Layout from "@/components/layout";
import UserForm from "@/components/user/UserForm";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Head from "next/head";

const AccountPage = ({ preview, userData }) => {
  const { data: sessionInfo, status } = useSession();
  if (status === "loading") {
    return <Fallback />;
  }

  if (status === "authenticated") {
    return (
      <Layout preview={preview}>
        <Head>
          <title>Account Settings</title>
        </Head>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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
                  email: sessionInfo.user.email,
                  username: sessionInfo.user.name,
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // TODO
  return <div>Unauthenticated whoops</div>;
};

export async function getServerSideProps(context) {
  try {
    const token = await getToken({
      req: context.req,
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
    // TODO redirect back to home
    return {
      notFound: true,
    };
  } catch (error) {
    console.log(error);
    // TODO 500 server error
    return {
      notFound: true,
    };
  }
}

export default AccountPage;
