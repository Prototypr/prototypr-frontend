import Fallback from "@/components/atom/Fallback/Fallback";
import Layout from "@/components/new-index/layoutForIndex";
import dynamic from "next/dynamic";
import Head from "next/head";
import axios from "axios";
// import toast from "react-hot-toast";
import useUser from "@/lib/iron-session/useUser";
import { useEffect, useState } from "react";
import AccountNavigation from "@/components/user/AccountNavigation";
import InterestsSelect from "@/components/user/InterestsSelect";

const toast = dynamic(() => import("react-hot-toast"), { ssr: true });
const Form = dynamic(() => import("@/components/Form"), { ssr: true });

const AccountPage = ({ preview }) => {
  const { user } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });

  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(null);

  if (!user) {
    return <Fallback />;
  }

  if (user?.isLoggedIn) {
    return (
      <Layout preview={preview}>
        <Head>
          <title>Account Settings</title>
        </Head>
        <div
          className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 "
          style={{ maxWidth: 1200 }}
        >
        {user && user.confirmed ? (
          <div className="flex w-full max-w-6xl mx-auto flex-col md:flex-row">
            <AccountNavigation activeTab={3} />
            <div className="w-full mx-auto px-2 sm:pr-0 sm:pl-6 lg:pl-8">
              <div className="pt-6 pb-10 px-0 xl:px-0">
                <div className="bg-white border border-gray-300/70 shadow-sm rounded-xl p-6">
                  <h1 className="font-semibold">Interests</h1>
                  <span className="text-sm text-gray-500">
                    Interests will be displayed on your public profile
                  </span>
                  <InterestsSelect
                    user={user}
                    next={false}
                    previous={false}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mx-auto px-2 sm:pr-0 sm:pl-6 lg:pl-8">
            <div className="pt-6 pb-10 md:pt-10 px-3 xl:px-0">
              <div className="bg-white border border-gray-300/70 shadow-sm rounded-xl p-6">
                <h1 className="font-semibold text-lg">Confirm your email</h1>
                <p className="text-normal mt-3 mb-3 text-gray-800">
                  Hi {user.name}, please check your email ({user.email}) to
                  confirm your account. If you didn't receive it, try again with
                  the following form:
                </p>
                <Form
                  buttonText={"Resend email verification"}
                  disabled={sent ? true : false}
                  disabledMessage={
                    <div className="text-center">
                      A new login link has been sent to your email.
                    </div>
                  }
                  label={"Enter your email"}
                  inputType={"email"}
                  defaultValue={user.email}
                  placeholder={"hola@prototypr.io"}
                  isLoading={isLoading}
                  onSubmit={e => {
                    e.preventDefault();
                    setSent(false);
                    setIsLoading(true);
                    var data = JSON.stringify({
                      email: e.target[0].value,
                    });
                    var config = {
                      method: "post",
                      url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users-permissions/users/resendConfirmationEmail`,
                      headers: {
                        Authorization: user.jwt,
                        "Content-Type": "application/json",
                      },
                      data: data,
                    };
                    const loadingToastId = toast.loading(
                      "Sending verification email"
                    );

                    axios(config)
                      .then(function (response) {
                        setSent(true);
                        setTimeout(() => {
                          setSent(true);
                          setIsLoading(false);
                          showSuccessToast(loadingToastId);
                        }, 800);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                />
              </div>
            </div>
          </div>
        )}
        </div>
      </Layout>
    );
  }

  // TODO
  return (
    <Layout preview={preview}>
      <Head>
        <title>Account Settings</title>
      </Head>

      <div>Unauthenticated, whoops!</div>
    </Layout>
  );
};

export default AccountPage;

const showSuccessToast = loadingToastId => {
  toast.dismiss(loadingToastId);
  toast.custom(
    t => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="relative border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex items-center p-4">
            <div className="flex flex-col justify-start h-10">
              <svg
                viewBox="0 0 24 24"
                className="text-teal-600 w-5 h-5 mx-auto"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-gray-900">Check your email.</p>
              <p className="max-w-xs text-sm text-gray-500 truncate">
                Click the link in your inbox to sign in.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    { duration: 10000 }
  );
};
