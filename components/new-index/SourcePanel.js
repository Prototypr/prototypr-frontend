import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SourcePanel({}) {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [buttonText, setButtonText] = useState("Subscribe");

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
          setButtonText("Subscribe");
        }
      })
      .catch(function (error) {
        setRegistered(false);
        setError(true);
        setButtonText("Subscribe");
      });
  };

  return (
    <section className="w-full mb-4 px-3 xl:px-0">
      <div className="bg-white relative w-full h-auto md:h-100 flex flex-col md:flex-row relative">
        <figure className="relative h-56 md:absolute left-0 relative w-full md:h-full mb-3 sm:mb-0 mr-6 lg:mr-0 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full md:w-2/3 h-full ml-8 sm:ml-0 md:ml-8 object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out">
            <Image
              objectFit="contain"
              className="rounded-lg contrast-115"
              layout="fill"
              src={"/static/images/source-bg.png"}
            />
          </div>
        </figure>
        <div className="w-full relative md:absolute md:w-1/2 right-0">
          <div
            className="px-8 pb-8  md:px-0 md:absolute top-16 md:top-20 z-30 left-0 md:-ml-24 md:pr-12 lg:pr-0"
            style={{ maxWidth: "540px" }}
          >
            {registered == false ? (
              <>
                <h3 className="font-semibold text-5xl md:text-s6xl text-gray-1">
                  The Source
                </h3>
                <p className="font-base text-lg leading-normal">
                  The Source tackles taboo topics, exposes unseen truths, and
                  gets the scoop on the latest in the tech and design sphere.
                </p>
                <HookForm onSubmit={onSubmit} buttonText={buttonText} />
              </>
            ) : error ? (
              <>
                <h3 className="font-semibold text-3xl my-3 md:text-s6xl text-gray-1">
                  Please try again! &nbsp;{" "}
                  <div className="inline -mt-1">🤖</div>
                </h3>
                <p className="font-base text-lg leading-normal">
                  Something went wrong. Please refresh the page and try again.
                  Contact hello@prototypr.io for help.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-3xl my-3 md:text-s6xl text-gray-1">
                  Check your inbox! &nbsp;{" "}
                  <div className="inline -mt-1">🎉</div>
                </h3>
                <p className="font-base text-lg leading-normal">
                  Click the activation link in the email we just sent you, and
                  add hello@prototypr.io to your address list so you don't miss
                  the newsletter.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
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
        className="mt-7 relative h-16 md:w-10/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="Email" className="sr-only	">
          Enter email address
        </label>
        <input
          id="Email"
          name="email"
          placeholder="Your Email"
          {...register("emailRequired", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.02)" }}
          className="bg-gray-4 rounded-lg w-full h-full p-3 focus:outline-none text-base font-medium leading-6 text-neutrals-700 placeholder:text-neutrals-700"
        />
        <div className="hidden email-octopus-form-row-hp" aria-hidden="true">
          {/* Do not remove this field, otherwise you risk bot sign-ups */}
          <input
            type="text"
            name="hp1cc5fdf6-63b5-11ea-a3d0-06b4694bee2a"
            tabIndex={-1}
            autoComplete="nope"
          />
        </div>
        <button className="absolute top-3 right-3 h-10 z-20 bg-blue-1 rounded-lg text-white text-base font-medium leading-6 flex items-center justify-center py-2 px-3 hover:opacity-70">
          {props.buttonText}
        </button>
      </form>
      <div className="px-1">
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
