import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "../Primitives/Button";

export default function SignupHorizontal({ className, showNoSpam }) {
 const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [tryEmail, setTryEmail] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const intl = useIntl();
  const [buttonText, setButtonText] = useState(
    intl.formatMessage({ id: "intro.button.updates" })
  );

  const onSubmit = async (data) => {
    setButtonText(intl.formatMessage({ id: "signup.button.submitting" }));

    const response = await fetch(`/api/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.emailRequired,
        listId: "et15895b31367",
      }),
    });
    setTryEmail(false);
    setAlreadySubscribed(false);
    setRegistered(false);
    setError(false);

    if (response.status == 200) {
      setRegistered(true);
      setButtonText(intl.formatMessage({ id: "intro.button.updates" }));
    } else if (response.status == 204) {
      setAlreadySubscribed(true);
      setButtonText(intl.formatMessage({ id: "intro.button.updates" }));
    }else if(response.status==202){
      setTryEmail(true);
      setButtonText(intl.formatMessage({ id: "intro.button.updates" }));
    }
    else {
      setRegistered(false);
      setError(true);
      setButtonText(intl.formatMessage({ id: "intro.button.updates" }));
    }
  };

  return (
    <>
      <div className={`rounded-md lg:mb-0`}>
        {registered == false && tryEmail == false && alreadySubscribed == false ? (
          <>
            <HookForm
              className={className}
              onSubmit={onSubmit}
              buttonText={buttonText}
              layout={"horizontal"}
            />
          </>
        ) : error ? (
          <>
            <h2 className={`text-base text-gray-800  font-semibold mb-2`}>
              {intl.formatMessage({ id: "signup.tip.again" })} &nbsp;{" "}
              <div className="inline -mt-1">🤖</div>
            </h2>
            <div
              className={`block text-sm mb-1 leading-5 font-base text-gray-800`}
            >
              {intl.formatMessage({ id: "signup.res.error" })}
            </div>
          </>
        ) : tryEmail ? (
          <div className="p-6 bg-white shadow rounded-xl max-w-md xl:max-w-xl mb-2 mt-2">
            <h2 className={`text-lg mb-2 text-gray-800 font-semibold  `}>
              Please check your email &nbsp;
            </h2>
            <div
              className={`block text-base  leading-6 font-base text-gray-800 `}
            >
              You've tried to sign up before. There should be a confirmation email in your inbox from the first time you tried to signed up - if you can't find it, check your spam folder.
            </div>
          </div>
        ) : alreadySubscribed ? (
          <div className="p-6 bg-white shadow rounded-xl max-w-md xl:max-w-xl mb-2 mt-2">
            <h2 className={`text-lg mb-2 text-gray-800 font-semibold  `}>
              You've already subscribed to the newsletter
            </h2>
            <div
              className={`block text-base  leading-6 font-base text-gray-800 `}
            >
              Thanks for being a part of the community! 🎉
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white shadow rounded-xl max-w-md xl:max-w-xl mb-2 mt-2">
            <h2 className={`text-lg mb-2 text-gray-800 font-semibold  `}>
              {intl.formatMessage({ id: "signup.input.check" })} &nbsp;{" "}
              <div className="inline -mt-1">🎉</div>
            </h2>
            <div
              className={`block text-base  leading-6 font-base text-gray-800 `}
            >
              {intl.formatMessage({ id: "signup.input.click" })}
            </div>
          </div>
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
    showNoSpam,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => props.onSubmit(data);
  const intl = useIntl();

  return (
    <div>
      <div className="flex flex-col">
        <form className={`${props.className}`} onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex-1 sm:max-w-xs w-full">
            <label htmlFor="Email" className="sr-only	">
              <FormattedMessage id="intro.input.placeholder" />
            </label>
            <input
              id="Email"
              style={{ fontSize: ".875rem" }}
              type="text"
              placeholder={intl.formatMessage({ id: "intro.input.placeholder" })}
              name="email"
              {...register("emailRequired", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              // ref={...register({ required: true, pattern: /^\S+@\S+$/i })}
              className="border-transparent border-solid border-2 border-gradient-br-blue-darkblue-gray-50 hover:border-gradient-tl-blue-darkblue-gray-50 gradient-border-3 w-full h-full p-3 text-gray-800 bg-white rounded-full"
            />
          </div>
          {/* <input type="checkbox" placeholder="Consent" name="consent" ref={register({ required: true })} /> */}
          {errors.consent && errors.consent.type === "required" && (
            <p className="text-orange-600 mt-1">
              <FormattedMessage id="signup.input.confirm" />
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
          <div className="flex flex-col md:ml-2">
            <Button
             disabled={
              props.buttonText !==
              intl.formatMessage({ id: "intro.button.updates" })
                ? true
                : false
            }
              aria-label="Sign up for newsletter"
              style={{height:47}}
              className="px-5 md:ml-2 mt-3 md:mt-0 rounded-full"
              type=""
            >
              {props.buttonText}
              {/* <svg
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
              </svg> */}
            </Button>
          </div>
        </form>
        {/* <div className="text-sm text-gray-600 max-w-[505px] mx-auto w-full mt-2">
          No spam, just good stuff.
        </div> */}
      </div>
      <div className="px-1 w-10/12 mx-auto">
        {errors.emailRequired && errors.emailRequired.type === "required" && (
          <p className="text-pink-600 mt-2 text-sm text-left">
            <FormattedMessage id="signup.input.validation" />
          </p>
        )}
        {errors.emailRequired && errors.emailRequired.type === "pattern" && (
          <p className="text-pink-600 mt-2 text-sm text-left">
            <FormattedMessage id="signup.input.error" />
          </p>
        )}
      </div>
    </div>
  );
}
