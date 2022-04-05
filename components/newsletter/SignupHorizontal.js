import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignupHorizontal() {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [buttonText, setButtonText] = useState("Get Updates");

  const onSubmit = async (data) => {
    setButtonText("Submitting");

    axios
      .post(
        "https://req.prototypr.io/https://emailoctopus.com/lists/c70b3a0c-1390-11eb-a3d0-06b4694bee2a/members/embedded/1.3/add",
        {
          field_0: data.emailRequired,
        }
      )
      .then(function (response) {
        console.log("success");
        // var cookieDomain = process.env.customKey && { domain: ".prototypr.io" };
        // jsCookie.set("prototypr_signupbar", "hide", cookieDomain);

        if (response.data.success) {
          setRegistered(true);
          setError(false);
          setButtonText("Get Updates");
        }
      })
      .catch(function (error) {
        setRegistered(false);
        setError(true);
        setButtonText("Get Updates");
      });
  };

  return (
    <>
      <div className={`rounded-md mb-12 lg:mb-0`}>
        {registered == false ? (
          <>
            <HookForm
              align={"left"}
              onSubmit={onSubmit}
              buttonText={buttonText}
              layout={"horizontal"}
            />
          </>
        ) : error ? (
          <>
            <h2
              className={`text-base text-gray-800 text-white font-semibold mb-2`}
            >
              Please try again! &nbsp; <div className="inline -mt-1">🤖</div>
            </h2>
            <div
              className={`block text-sm mb-1 leading-5 font-base text-gray-800`}
            >
              Something went wrong. Please refresh the page and try again.
              Contact hello@prototypr.io for help.
            </div>
          </>
        ) : (
          <>
            <h2 className={`text-2xl text-gray-800 font-semibold mb-2 mt-10`}>
              Check your inbox! &nbsp; <div className="inline -mt-1">🎉</div>
            </h2>
            <div
              className={`block text-lg mb-10 leading-6 font-base text-gray-800 text-white`}
            >
              Click the activation link in the email we just sent you, and add
              hello@prototypr.io to your address list so you don't miss the
              newsletter.
            </div>
          </>
        )}
      </div>
    </>
  );
}

function HookForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => props.onSubmit(data);

  return (
    <div>
      <form
        className="mt-5 md:mt-8 sm:flex w-10/12 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="sm:flex-1 sm:max-w-xs w-full">
          <label htmlFor="Email" className="sr-only	">
            Enter email address
          </label>
          <input
            id="Email"
            style={{ fontSize: ".875rem" }}
            type="text"
            placeholder="Enter your email address"
            name="email"
            {...register("emailRequired", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            // ref={...register({ required: true, pattern: /^\S+@\S+$/i })}
            className="border-transparent border-solid border-2 border-gradient-br-blue-darkblue-gray-50 hover:border-gradient-tl-blue-darkblue-gray-50 gradient-border-3 w-full h-full p-3 text-gray-800 bg-white rounded-xl"
          />
        </div>
        {/* <input type="checkbox" placeholder="Consent" name="consent" ref={register({ required: true })} /> */}
        {errors.consent && errors.consent.type === "required" && (
          <p className="text-orange-600 mt-1">
            Please confirm you want to join the newsletter.
          </p>
        )}

        <div className="hidden email-octopus-form-row-hp" aria-hidden="true">
          {/* Do not remove this field, otherwise you risk bot sign-ups */}
          <input
            type="text"
            name="hp1cc5fdf6-63b5-11ea-a3d0-06b4694bee2a"
            tabIndex={-1}
            autoComplete="nope"
          />
        </div>
        <div className="flex flex-col ">
          <button
            aria-label="Sign up for newsletter"
            className="flex justify-center md:text-left items-center md:justify-between w-full px-5 py-3 mt-4 font-medium text-white bg-blue-800 rounded-xl sm:w-auto sm:mt-0 sm:ml-3 hover:bg-blue-700"
            type="submit"
          >
            {props.buttonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 w-4 h-4 ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className="px-1 w-10/12 mx-auto">
        {errors.emailRequired && errors.emailRequired.type === "required" && (
          <p className="text-pink-600 mt-2 text-sm text-left">
            Email address required.
          </p>
        )}
        {errors.emailRequired && errors.emailRequired.type === "pattern" && (
          <p className="text-pink-600 mt-2 text-sm text-left">
            Please check and try again.
          </p>
        )}
      </div>
    </div>
  );
}
