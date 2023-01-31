import { signIn } from "next-auth/react";
import Button from "../atom/Button/Button";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const Form = dynamic(() => import("@/components/Form"), { ssr: true });
// const toast = dynamic(() => import('react-hot-toast'), { ssr: true })
import toast from "react-hot-toast";

const LoginForm = ({ isSignUp, title = "Sign up" }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col bg-[#fff] rounded-3xl p-8  md:p-18">
      <h2 className="text-[32px] font-inter text-gray-800 font-bold">
        {isSignUp ? title : "Welcome back"}
      </h2>
      <div className="flex flex-col gap-4 flex-grow mt-6">
        <Button
          isFullWidth
          className="text-left w-full text-sm justify-start h-11 p-8 md:px-20 rounded-full font-normal"
          color="twitter"
          leftIcon={
            <div className="bg-white p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#55ACEE"
                viewBox="0 0 24 24"
                className="!h-4 !w-4"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </div>
          }
          onClick={() => signIn("twitter")}
        >
          {isSignUp ? "Sign up with Twitter" : "Sign in with Twitter"}
        </Button>
        <Button
          isFullWidth
          className="text-left w-full text-sm  justify-start h-11 p-8 md:px-20 rounded-full font-normal"
          color="github"
          leftIcon={
            <div className="bg-white p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#1F1F1F"
                viewBox="0 0 16 16"
                className="!h-4 !w-4"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </div>
          }
          onClick={() => signIn("github")}
        >
          {isSignUp ? "Sign up with GitHub" : "Sign in with GitHub"}
        </Button>
        <Button
          isFullWidth
          className="text-left w-full text-sm  justify-start h-11 p-8 md:px-20 rounded-full font-normal"
          color="google"
          leftIcon={
            <div className="bg-white p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 48 48"
                className="!h-4 !w-4"
              >
                <defs>
                  {" "}
                  <path
                    id="prefix__a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />{" "}
                </defs>{" "}
                <clipPath id="prefix__b">
                  {" "}
                  <use xlinkHref="#prefix__a" overflow="visible" />{" "}
                </clipPath>{" "}
                <path
                  clipPath="url(#prefix__b)"
                  fill="#FBBC05"
                  d="M0 37V11l17 13z"
                />{" "}
                <path
                  clipPath="url(#prefix__b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />{" "}
                <path
                  clipPath="url(#prefix__b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />{" "}
                <path
                  clipPath="url(#prefix__b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />{" "}
              </svg>
            </div>
          }
          onClick={() => signIn("google")}
        >
          {isSignUp ? "Sign up with Google" : "Sign in with Google"}
        </Button>
      </div>
      <div className="my-5">
        <p className="text-gray-600 text-center font-medium">OR</p>
      </div>
      {showLoginForm == false ? (
        <Button
          isFullWidth
          type="submit"
          className="text-left bg-gray-100 justify-start h-11 p-8 md:px-20 rounded-full font-normal"
          onClick={() => {
            setShowLoginForm(!showLoginForm);
            // signIn("email", {email:'graeme@prototypr.io'})
          }}
          leftIcon={
            <div className="bg-white p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="!h-4 !w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          }
        >
          {isSignUp ? "Sign up with Email" : "Sign in with Email"}
        </Button>
      ) : (
        <div className="max-w-xs">
          <Form
            buttonText={isSignUp ? 'Sign up' : "Sign in"}
            disabled={sent ? true : false}
            disabledMessage={
              <div className="text-center">
                A login link has been sent to your email. <br />
                If you didn't receive it,{" "}
                <a
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setSent(false)}
                >
                  retry
                </a>
                .
              </div>
            }
            label={"Enter your email address"}
            inputType={"email"}
            placeholder={"hi@email.com"}
            isLoading={isLoading}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(false);
              setIsLoading(true);
              console.log(e);
              //create username from email
              let username = e.target[0].value;
              //check if username is an email address
              var emailValidator = require("email-validator");
              if (emailValidator.validate(username)) {
                let newUsername = username.split("@")[0];
                let timestamp = String(Date.now());
                //last 3 digits of timestamp
                timestamp = timestamp.substring(
                  newUsername.length - 3,
                  newUsername.length
                );
                newUsername = newUsername + timestamp;
                username = newUsername;
              }

              var data = JSON.stringify({
                email: e.target[0].value,
                username: username,
              });

              var config = {
                method: "post",
                url: `${process.env.NEXT_PUBLIC_API_URL}/api/passwordless/send-link`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: data,
              };

              const loadingToastId = toast.loading(
                "Sending verification email"
              );

              axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                  //redirect to verification page
                  // Router.push('/account/verification-sent')
                  // toast.success("Successfully updated", {
                  //   duration: 10000,
                  // });
                  setSent(true);
                  setTimeout(() => {
                    setSent(true);
                    setIsLoading(false);
                    showSuccessToast(loadingToastId);
                  }, 800);
                })
                .catch(function (error) {
                  setSent(false);
                  setIsLoading(false);
                  toast.dismiss(loadingToastId);
                  alert("Please try again, or contact support.");
                });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LoginForm;

const showSuccessToast = (loadingToastId) => {
  toast.dismiss(loadingToastId);
  toast.custom(
    (t) => (
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
