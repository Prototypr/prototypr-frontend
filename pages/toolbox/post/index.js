import Layout from "@/components/layout-dashboard";
// import { jobTypes} from "@/lib/constants";
// import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import React, { useEffect, useState, useCallback } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
// import toast from "react-hot-toast";
// import { FormContainer } from "@/components/Jobs/FormStepper";
// import { FormInput } from "@/components/Jobs/FormInput";
// import MiniEditor from "@/components/MiniEditor/MiniEditor";
// import TagsInput from "@/components/Jobs/tagsInput";
// import ImageUploader from "@/components/ImageUploader/ImageUploader";
// import useGetLocations from "@/components/Jobs/jobHooks/useGetLocations";
// import useGetSkills from "@/components/Jobs/jobHooks/useGetSkills";
// import GalleryUpload from "@/components/GalleryUpload/GalleryUpload";
// import LoginSide from "@/components/sign-in/LoginSide";
import {
  useWizardContext,
  WizardProvider,
  Steps,
  Step,
} from 'react-sweet-wizard';
import TitleLinkForm from "@/components/toolbox/forms/TitleLinkForm";
// import DescriptionExcerptForm from "@/components/toolbox/forms/DescriptionExcerptForm";

// const Progress = () => {
//   const { activeStepIndex, steps } = useWizardContext();

//   return (
//     <div>
//       State {activeStepIndex + 1} of {steps.length}
//     </div>
//   );
// };

// const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

// let axios = require("axios");

// const slugify = require("slugify");


// const styles = {
//   input:
//     "w-full px-3 max-w-2xl  bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
//   inputFlex:
//     "px-3 bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
//   label: "text-md font-medium uppercase text-gray-700 font-semibold",
//   inputError: "text-xs font-medium uppercase text-red-400",
// };

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

const seo={
  title:`Post a tool on Prototypr`,
  description:`Share your tool with the Prototypr community.`,
  // image:``,
  canonical: `https://prototypr.io/toolbox/post`,
  url: `https://prototypr.io/toolbox/post`
}

const PostToolPage = () =>{

  const { user } = useUser({
    // redirectTo: "/",
    redirectIfFound: false,
  });



  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };


  return(
    <Layout showFooter={false} padding={false} seo={seo} showWriteButton={false} background="#fff">
      <div className="h-full min-h-screen w-full grid md:grid-cols-12">
          <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-5">
            <div className="flex items-center magicpattern justify-center h-full w-full relative text-white">
              {/* <LoginSide showArrow={false} title="Submit a tool or resource" user={user} /> */}
            </div>
          </div>
    <div className="col-span-12 md:col-span-6 lg:col-span-7">
      {!(user && !user?.isLoggedIn) ? 
      <WizardProvider>
        <ToolSteps user={user}/>
        <div className="mt-6">
          <Navigation />
        </div>
      </WizardProvider>
      // <ToolPostForm user={user}/>
      :
    <div className="w-full h-full bg-[#F4F4F4] grid place-items-center">
    <div className="max-w-[500px] mx-auto">
      <LoginForm isSignUp={isSignUp} />
    </div>
    <div className="absolute top-[2%] right-[2%]">
      <div className="text-sm text-gray-700">
        <span>
          {isSignUp
            ? "Already got an account?"
            : "Not got an account yet?"}
        </span>
        <a
          onClick={toggleSignIn}
          className="text-primary-400 cursor-pointer"
        >
          {isSignUp ? " Sign in." : " Sign up"}
        </a>
      </div>
    </div>
  </div>}
    </div>
     </div>
      </Layout>
  )

}

const ToolSteps = ({user}) =>{
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =useWizardContext();

  const [currentPost, setCurrentPost]= useState()

  const goNext = (data) =>{
    setCurrentPost(data)
    onNext()
  }

  return(
    <Steps>

    <Step key={`page/1`} id={'1'}>
        <div className="flex items-center justify-center h-full w-full relative">
          <TitleLinkForm currentPost={currentPost} user={user} goNext={goNext} />
        </div>
    </Step>
</Steps>
  )
}


const Navigation = () => {
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =
    useWizardContext();

  return (
    <>
    {!isFirstStep?<div>
      <button onClick={onPrevious} disabled={isFirstStep}>
        Previous
      </button>
      <button
        onClick={useCallback(() => {
          if (activeStepIndex === 1) {
            goTo(5);
          } else {
            onNext(() => console.log('Calling `onNext` method'));
          }
        }, [goTo, onNext, activeStepIndex])}
        // disabled={isLastStep}
      >
        Next
      </button>
    </div>:''}
    </>
  );
};

export default PostToolPage;