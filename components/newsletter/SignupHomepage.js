import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "../Primitives/Button";

export default function SignupHomepage({ className }) {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const intl = useIntl();
  const [buttonText, setButtonText] = useState(
    intl.formatMessage({ id: "intro.button.updates" })
  );
  const onSubmit = async (data) => {
    setButtonText(intl.formatMessage({ id: "signup.button.submitting" }));

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
          setButtonText(intl.formatMessage({ id: "intro.button.updates" }));
        }
      })
      .catch(function (error) {
        setRegistered(false);
        setError(true);
        setButtonText(intl.formatMessage({ id: "intro.button.updates" }));
      });
  };

  return (
    <>
      <div className={`rounded-md lg:mb-0`}>
        {registered == false ? (
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
        ) : (
          <div className="p-6 bg-blue-400 rounded-md mb-2 mt-10">
            <h2 className={`text-base text-gray-800 font-semibold font-inter `}>
              {intl.formatMessage({ id: "signup.input.check" })} &nbsp;{" "}
              <div className="inline -mt-1">🎉</div>
            </h2>
            <div
              className={`block text-base  leading-6 font-base text-gray-800 font-inter`}
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
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => props.onSubmit(data);
  const intl = useIntl();

  return (
    <div>
      <form className={`${props.className}`} onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex-1 sm:max-w-sm w-full">
          <label htmlFor="Email" className="sr-only	">
            <FormattedMessage id="intro.input.placeholder" />
          </label>
          <input
            id="Email"
            //   type="text"
            placeholder={intl.formatMessage({ id: "intro.input.placeholder" })}
            {...register("emailRequired", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            className="w-full max-w-sm p-3 py-2.5 rounded-2xl mb-4 border border-1 border-blue-600"
          ></input>
          {/* <input
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
            className="border-transparent border-solid border-2 border-gradient-br-blue-darkblue-gray-50 hover:border-gradient-tl-blue-darkblue-gray-50 gradient-border-3 w-full h-full p-3 text-gray-800 bg-white rounded-lg"
          /> */}
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
        {/* <div className="flex flex-col ml-2"> */}
        <Button className="rounded-full px-5 font-medium py-3 leading-none bg-blue-600 hover:bg-blue-500" variant={"confirmBig"}>
          Sign up
        </Button>
        {/* </div> */}
      </form>
      <div className=" w-10/12 font-inter">
        {errors.emailRequired && errors.emailRequired.type === "required" && (
          <p className="text-white text-sm mt-2 text-left px-4 py-3 bg-red-400 border rounded-xl">
            <FormattedMessage id="signup.input.validation" />
          </p>
        )}
        {errors.emailRequired && errors.emailRequired.type === "pattern" && (
          <p className="text-white text-sm mt-2 text-left px-4 py-3 bg-red-400 border rounded-xl">
            <FormattedMessage id="signup.input.error" />
          </p>
        )}
      </div>
    </div>
  );
}
