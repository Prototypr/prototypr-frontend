import { signIn } from "next-auth/react";
// import Button from "../atom/Button/Button";
import Button from "../Primitives/Button";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Link from "next/link";
import Cookie from "js-cookie";
import { CheckCircle } from "@phosphor-icons/react";

const Form = dynamic(() => import("@/components/Form"), { ssr: true });
// const toast = dynamic(() => import('react-hot-toast'), { ssr: true })
import toast from "react-hot-toast";
import { EmailIcon, GitHubIcon, GoogleIcon, TicketIcon } from "../icons";
import fetchJson from "@/lib/iron-session/fetchJson";

const LoginForm = ({
  isSignUp,
  title = "Sign up",
  user,
  toggleSignIn,
  inviteeEmail,
  initialInviteCode
}) => {
  const [inviteCode, setInviteCode] = useState(null);

  useEffect(()=>{
    setInviteCode(initialInviteCode)
  },[initialInviteCode])

  return (
    <div className="flex flex-col bg-[#fff] w-full rounded-3xl">
      {isSignUp && !inviteCode ? (
        <InviteOnlyForm
          isSignUp={isSignUp}
          title={title}
          toggleSignIn={toggleSignIn}
          setInviteCode={setInviteCode}
          initialInviteCode={initialInviteCode}
        />
      ) : (
        <ProviderForm
          isSignUp={isSignUp}
          title={`You're Invited! Sign up`}
          toggleSignIn={toggleSignIn}
          inviteCode={inviteCode}
          inviteeEmail={inviteeEmail}
        />
      )}
    </div>
  );
};

export default LoginForm;

const InviteOnlyForm = ({
  setInviteCode,
  toggleSignIn,
  isSignUp
}) => {
  const [showInputForm, setShowInputForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setInviteCodeValid = code => {
    setInviteCode(code);
  };

  return (
    <div className="max-w-[90%] md:max-w-[340px] -mt-8 w-full mx-auto flex flex-col">
      <div className="w-[140px] bg-white rounded-2xl mb-16 ">
        <Link href="/">
          <img
            src={`/static/images/prototypr_logo.svg`}
            data-gumlet="false"
            alt="Prototypr Logo"
          />
        </Link>
      </div>
      <h2 className="text-3xl  text-gray-800 font-semibold">
        Create an account
      </h2>
      <p className="mt-2 mb-4 text-black/60">
        Start your Prototypr creator journey
      </p>
      <p className="my-4 mb-8">
        Prototypr content is open to all, but only invited members can create
        posts. Get an invite from current members or submit an{" "}
        <Link href="/apply">
          <span className="text-blue-600">application</span>
        </Link>{" "}
        form to <span className="text-underline">join as a creator</span>.
      </p>
      {/* <div className="max-w-[90%] md:max-w-[340px] flex flex-col"> */}
      {showInputForm == false ? (
        <Button
          type="submit"
          variant={"confirmRounded"}
          className="text-center !max-w-[340px] !w-full !py-2 !mx-auto !px-0 w-full !text-base !rounded-full font-normal"
          onClick={() => {
            setShowInputForm(!showInputForm);
            // signIn("email", {email:'graeme@prototypr.io'})
          }}
        >
          <div className="flex text-white">
            <TicketIcon />
            <div className="ml-2.5 my-auto text-base inline-block ">
              Join with an invite
            </div>
          </div>
        </Button>
      ) : (
        <div className="max-w-xs w-full">
          <Form
            buttonText={`Submit`}
            disabled={false}
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
            label={"Enter invite code"}
            inputType={"text"}
            placeholder={"XXX XXX XXX"}
            isLoading={isLoading}
            onSubmit={e => {
              e.preventDefault();
              // setSent(false);
              // setIsLoading(true);
              //create username from email
              let code = e.target[0].value;
              // setInviteCode(code)

              var data = JSON.stringify({
                token: code,
              });

              //@todo in strapi - add invite code collection
              // change this to 'get' code in strapi
              var config = {
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}/api/invite-only/check-token`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: data,
              };

              const loadingToastId = toast.loading("Checking invite code...");

              axios(config)
                .then(async function (response) {
                  if (response?.data?.valid == true) {
                    // toast.success("Invite code is valid", {
                    //   duration: 10000,
                    // });
                    // setSent(true);
                    const body = { inviteCode: code };
                    try {
                      const result = await fetchJson(
                        "/api/auth/setSessionInviteCode",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(body),
                        }
                      );
                      console.log(result);
                    } catch (e) {
                      console.log(e);
                    }

                    Cookie.set("inviteCode", code, {
                      expires: 1 / 24,
                      secure: process.env.NODE_ENV === "production",
                      sameSite: "Lax",
                    }); // Expires in 1 hour

                    setTimeout(() => {
                      // setSent(true);
                      setInviteCodeValid(code);
                      // setIsLoading(false);
                      showSuccessToast(loadingToastId, "accessCode");
                    }, 800);
                  } else {
                    toast.dismiss(loadingToastId);
                    alert("The invite code is invalid.");
                  }
                  //redirect to verification page
                  // Router.push('/account/verification-sent')
                })
                .catch(function (error) {
                  // setSent(false);
                  // setIsLoading(false);
                  toast.dismiss(loadingToastId);
                  alert("The invite code is invalid.");
                });
            }}
          />
        </div>
      )}
      {/* </div> */}
      <div className="mt-10 text-center">
        <div className="text-sm text-gray-700">
          <span>
            {isSignUp ? "Already got an account?" : "Don't have an account?"}
          </span>
          <a onClick={toggleSignIn} className="text-primary-400 cursor-pointer">
            {isSignUp ? " Sign in" : " Sign up"}
          </a>
          .
        </div>
      </div>

      {/* {isSignUp
                        ? 
                        <div className="mt-2 text-center text-sm text-gray-700">Need a an invite? <Link href="/apply"><span className="text-blue-500">Apply here</span></Link>.</div>
                        :null} */}
    </div>
  );
};

const ProviderForm = ({
  isSignUp,
  title = "Sign up",
  inviteCode,
  toggleSignIn,
  inviteeEmail,
}) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-[90%] md:max-w-[340px] -mt-8 w-full mx-auto flex flex-col">
      <div className="w-[140px] bg-white rounded-2xl mb-10 ">
        <img
          src={`/static/images/prototypr_logo.svg`}
          data-gumlet="false"
          alt="Prototypr Logo"
        />
      </div>
      <h2 className="text-3xl  text-black/90 font-semibold">
        {(isSignUp || inviteeEmail) ? `You're invited!` : "Welcome back"}
      </h2>
      {(isSignUp || inviteeEmail) ? (
        <p className={`text-black/80 mt-3 ${inviteeEmail?'mb-8':'mb-3'}`}>
          {inviteeEmail?"Sign in using your invited email.":'🎟️ Access granted, you can now sign up via the options below.'}
        </p>
      ) : (
        <p className="text-black/80 mt-3 mb-3">Hi again, sign in below.</p>
      )}
      {!sent && !inviteeEmail ? (
        <div className="flex flex-col gap-4 flex-grow mt-6">
          <Button
            isFullWidth
            style={{ border: "1px solid rgba(0,0,0,0.2)" }}
            variant={"confirmRounded"}
            className="text-center !max-w-[340px] !w-full !mx-auto w-full !py-2 !px-0 !bg-gray-50 !text-black/90 !text-base !rounded-full font-normal"
            onClick={() => signIn("google", { invite_code: inviteCode })}
          >
            <div className="flex">
              <GoogleIcon />
              <div className="ml-2.5 my-auto">
                {isSignUp ? "Sign up with Google" : "Sign in with Google"}
              </div>
            </div>
          </Button>
          <Button
            variant={"confirmRounded"}
            className="text-center !max-w-[340px] !w-full !mx-auto !py-2 !px-0 w-full !bg-black/80 !text-base !rounded-full font-normal"
            onClick={() => signIn("github", { invite_code: inviteCode })}
          >
            <div className="flex">
              <GitHubIcon />
              <div className="ml-2.5 my-auto">
                {isSignUp ? "Sign up with GitHub" : "Sign in with GitHub"}
              </div>
            </div>
          </Button>
        </div>
      ) : null}
      {(!sent && !inviteeEmail)? (
        <div className="my-5">
          <p className="text-gray-600 text-center font-medium">OR</p>
        </div>
      ) : null}
      {(showLoginForm == false && !inviteeEmail) ? (
        <Button
          type="submit"
          variant={"confirmRounded"}
          className="text-center !max-w-[340px] !w-full !mx-auto !py-2 !px-0 w-full !text-base !rounded-full font-normal"
          onClick={() => {
            setShowLoginForm(!showLoginForm);
            // signIn("email", {email:'graeme@prototypr.io'})
          }}
        >
          <div className="flex ">
            <EmailIcon />
            <div className="ml-2.5 my-auto inline-block ">
              {isSignUp ? "Sign up with Email" : "Sign in with Email"}
            </div>
          </div>
        </Button>
      ) : (
        <div className="max-w-[340px]">
          <Form
            buttonText={isSignUp ? "Sign up" : "Sign in"}
            disabled={sent ? true : false}
            defaultValue={inviteeEmail}
            disabledMessage={
              <div className="text-left bg-blue-50 p-3 rounded-2xl mt-10 flex">
                <div className="">
                  <CheckCircle width={24} height={24} color="#2563eb" />
                </div>
                <div className="ml-3 flex flex-col">
                  <h2 className="font-semibold mb-2">Check your inbox</h2>
                  <div>
                    A login link has been sent to your email. If you didn't
                    receive it,{" "}
                    <a
                      className="text-blue-600 cursor-pointer"
                      onClick={() => setSent(false)}
                    >
                      retry
                    </a>
                    .
                  </div>
                </div>
              </div>
            }
            label={"Enter your email"}
            inputType={"email"}
            placeholder={"hi@email.com"}
            isLoading={isLoading}
            onSubmit={e => {
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
                invite_code: inviteCode,
              });

              console.log(data);

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
      {!inviteeEmail?<div className="mt-10 text-center">
        <div className="text-sm text-gray-700">
          <span>
            {isSignUp ? "Already got an account?" : "Don't have an account?"}
          </span>
          <a onClick={toggleSignIn} className="text-primary-400 cursor-pointer">
            {isSignUp ? " Sign in" : " Sign up"}
          </a>
          .
        </div>
      </div>:null}
    </div>
  );
};

const showSuccessToast = (loadingToastId, type) => {
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
            className="absolute p-1 bg-gray-100 border border-gray-300 !rounded-full -top-1 -right-1"
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
            {type !== "accessCode" ? (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium text-gray-900">Check your email.</p>
                <p className="max-w-xs !text-base text-gray-500 truncate">
                  Click the link in your inbox to sign in.
                </p>
              </div>
            ) : (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium text-gray-900">Access granted!</p>
                <p className="max-w-xs !text-base text-gray-500 truncate">
                  You can create your account.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { duration: 10000 }
  );
};
