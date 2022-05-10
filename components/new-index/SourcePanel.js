import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useIntl, FormattedMessage } from "react-intl";
const SignupHorizontal = dynamic(() =>
  import("../newsletter/SignupHorizontal")
);

export default function SourcePanel({ desc, title }) {
  const intl = useIntl();

  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);

  return (
    <section className="w-full mb-4 px-3 xl:px-0 pb-8 md:py-0">
      <div className="bg-white relative w-full h-auto md:h-100 flex flex-col md:flex-row relative rounded-lg">
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
                <h3 className="font-semibold text-5xl lg:text-s6xl text-gray-1">
                  {title}
                </h3>
                <p className="font-base text-lg leading-normal">{desc}</p>
                <SignupHorizontal className="sm:flex w-full mt-5" />
                {/* <HookForm onSubmit={onSubmit} buttonText={buttonText} /> */}
              </>
            ) : error ? (
              <>
                <h3 className="font-semibold text-3xl my-3 md:text-s6xl text-gray-1">
                  {intl.formatMessage({ id: "signup.tip.again" })} &nbsp;{" "}
                  <div className="inline -mt-1">🤖</div>
                </h3>
                <p className="font-base text-lg leading-normal">
                  {intl.formatMessage({ id: "signup.res.error" })}
                </p>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-3xl my-3 md:text-s6xl text-gray-1">
                  {intl.formatMessage({ id: "signup.input.check" })} &nbsp;{" "}
                  <div className="inline -mt-1">🎉</div>
                </h3>
                <p className="font-base text-lg leading-normal">
                  {intl.formatMessage({ id: "signup.input.click" })}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
