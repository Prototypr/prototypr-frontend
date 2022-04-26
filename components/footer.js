import Container from "./container";
import { EXAMPLE_PATH } from "@/lib/constants";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import axios from "axios";
export default function Footer() {
  const intl = useIntl();
  const [buttonText, setButtonText] = useState(
    intl.formatMessage({ id: "navbar.menu.title4" })
  );
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
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
    <footer className="bg-accent-1 border-accent-2">
      <Container>
        <div className="w-full max-w-screen-xl relative mx-auto py-12 ">
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12">
              <p className="text-xl font-semibold">{intl.formatMessage({ id: "footer.title"})}</p>
              <input className="hidden" defaultValue={"hello@prototypr.io"} />

              <p className="text-base mt-0 mb-2 text-gray-700">
                {intl.formatMessage({ id: "footer.subtitle"})} 💌
              </p>
              <p className="text-sm mt-6 text-gray-800 font-semibold">
                Created by{" "}
                <a
                  className="text-blue-800 underline"
                  href="https://twitter.com/annchichii"
                >
                  Ann
                </a>
                ,{" "}
                <a
                  className="text-blue-800 underline"
                  href="https://twitter.com/graeme_fulton"
                >
                  Graeme
                </a>
                , and{" "}
                <a
                  className="text-blue-800 underline"
                  href="https://twitter.com/iamsofiamm"
                >
                  Sofia
                </a>
                . Illustrations by{" "}
                <a
                  className="text-blue-800 underline"
                  href="https://twitter.com/thisismariaespi"
                >
                  María
                </a>
                .
              </p>
              <p className="text-sm text-gray-700 font-semibold mt-2">
                {" "}
                © 2020 Prototpyr, All rights reserved.
              </p>
              <HookForm onSubmit={onSubmit} buttonText={buttonText} />
            </div>

            <div className="w-full md:w-6/12">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full md:w-6/12 xl:w-4/12 pt-6 md:pt-0 md:px-4 ml-auto">
                  <span className="block uppercase text-gray-900 text-sm font-semibold mb-2">
                    Good Stuff
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://blog.prototypr.io"
                        target="_blank"
                      >
                        Medium Publication
                      </a>
                    </li>
                    <li>
                      <Link href="/posts" as="/posts">
                        <a className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base">
                          Prototypr Open
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://twitter.com/prototypr"
                        target="_blank"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://instagram.com/prototyprio"
                        target="_blank"
                      >
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-6/12 xl:w-4/12 pt-6 md:pt-0 ml-auto">
                  <span className="block uppercase text-gray-900 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://adobe.com/products/xd/adobe-fund.html"
                        target="_blank"
                      >
                        Adobe Fund for Design
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://tailwindcss.com"
                        target="_blank"
                      >
                        Made with Tailwind
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://letter.so"
                        target="_blank"
                      >
                        Mail by Letter
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-base block py-3 text-base"
                        rel="noreferrer"
                        href="https://prototypr.io/privacy-policy/"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
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
      <form
        className="mt-7 relative h-16 md:w-10/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="Email" className="sr-only	">
          {intl.formatMessage({ id: "sourcepanel.form.label" })}
        </label>
        <input
          id="Email"
          name="email"
          placeholder={intl.formatMessage({
            id: "sourcepanel.form.placeholder",
          })}
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
            <FormattedMessage id="signup.input.validation" />
          </p>
        )}
        {errors.emailRequired && errors.emailRequired.type === "pattern" && (
          <p className="text-pink-600 mt-2 text-sm text-left">
            <FormattedMessage id="sourcepanel.form.errortip" />
          </p>
        )}
      </div>
    </div>
  );
}
