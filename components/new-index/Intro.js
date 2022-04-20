import dynamic from "next/dynamic";
const SignupHorizontal = dynamic(() => import("@/components/newsletter/SignupHorizontal"), { ssr: true });

import { FormattedMessage } from 'react-intl';
export default function Intro() {
  return (
    <aside className="px-5 py-10 sm:p-12 bg-gray-100 sm:p-16 mb-8">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-3xl sm:text-5xl md:text-6.5xl text-black leading-tight text-title-1 font-bold mt-2">
          {/* <span className="block sm:inline"> */}
            <FormattedMessage 
              id="intro.title.half1"
            />
          {/* </span> */}
          {/* <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">
            <FormattedMessage 
              id="intro.title.half2"
            />
          </span> */}
        </p>
        <SignupHorizontal />
        <p className="text-xs font-medium mt-5 text-gray-900">
            <FormattedMessage 
              id="intro.description"
            />
          <div className="sm:hidden pt-2"></div> 💙{" "}
          <a className="underline">
            <FormattedMessage 
              id="intro.link"
            />
          </a>.
        </p>
      </div>
    </aside>
  );
}
