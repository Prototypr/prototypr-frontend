import Layout from "@/components/layout-dashboard";
// import { jobTypes} from "@/lib/constants";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
// import TagsInput from "@/components/Jobs/tagsInput";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
// import useGetLocations from "@/components/Jobs/jobHooks/useGetLocations";
// import useGetSkills from "@/components/Jobs/jobHooks/useGetSkills";
import GalleryUpload from "@/components/GalleryUpload/GalleryUpload";
import LoginSide from "@/components/sign-in/LoginSide";
import {
  useWizardContext,
  WizardProvider,
  Steps,
  Step,
} from 'react-sweet-wizard';
import TitleLinkForm from "@/components/toolbox/forms/TitleLinkForm";
import DescriptionExcerptForm from "@/components/toolbox/forms/DescriptionExcerptForm";
import TitleLinkFormEdit from "@/components/toolbox/forms/TitleLinkFormEdit";
import useLoad from "@/components/toolbox/hooks/useLoad";
import Fallback from "@/components/atom/Fallback/Fallback";
import MediaForm from "@/components/toolbox/forms/MediaForm";
import Link from "next/link";
import Button from "@/components/Primitives/Button";

const Progress = () => {
  const { activeStepIndex, steps } = useWizardContext();

  return (
    <div>
      Step {parseInt(activeStepIndex, 10)+1} of {steps.length}
    </div>
  );
};

const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

let axios = require("axios");

const slugify = require("slugify");


const styles = {
  input:
    "w-full px-3 max-w-2xl  bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  inputFlex:
    "px-3 bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  label: "text-md font-medium uppercase text-gray-700 font-semibold",
  inputError: "text-xs font-medium uppercase text-red-400",
};

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
      redirectTo: "/",
      redirectIfFound: false,
    });
    const { loading, postObject, isOwner } =
    useLoad(user);
  
    return(
      !user && loading?<Fallback/>:
      postObject? 
      <ToolPostForm isOwner={isOwner} postObject={postObject} user={user} />:null
    )
  
  }

const ToolPostForm = ({user, isOwner, postObject}) =>{

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };


  return(
    <Layout showFooter={false} padding={false} seo={seo} showWriteButton={false} background="#EFF2F8">
      <div className="h-full min-h-screen w-full grid md:grid-cols-12">
          <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
            <div className="flex pt-24 items-center justify-center h-full w-full relative bg-[#195DE2] text-white">
              <LoginSide title="Submit a tool or resource" user={user} />
            </div>
          </div>
    <div className="col-span-12 md:col-span-6 lg:col-span-8">
      {!((user && !user?.isLoggedIn) && (isOwner || user?.isAdmin)) ? 
      <WizardProvider>
        <div className="justify-center mt-20 w-full  px-2 sm:px-6 lg:px-10">
          <Progress/>
        <ToolSteps postObject={postObject} user={user}/>
        {/* <div className="mt-6">
          <Navigation />
        </div> */}
        </div>
      </WizardProvider>
      :!(user && !user?.isLoggedIn)?
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
  </div>:
  <div className="w-full h-full bg-[#F4F4F4] grid place-items-center">
    <div className="max-w-[500px] mx-auto">
      <p>You don't have permission to edit this post</p>
    </div>
    </div>
  }
    </div>
     </div>
      </Layout>
  )

}

const ToolSteps = ({user, postObject}) =>{
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =useWizardContext();
  const router = useRouter();
  const { step } = router.query

  useEffect(()=>{
    if(step==2){
      console.log(activeStepIndex)
      if(activeStepIndex==0){
        goTo('1')
      }
    }

  },[step])
  return(
    <Steps>

    <Step key={`page/1`} id={'1'}>
        <div className="flex items-center justify-center h-full w-full relative">
          <TitleLinkFormEdit onNext={onNext} postObject={postObject} user={user} />
        </div>
    </Step>
    <Step key={`page/2`} id={'2'}>
        <div className="flex items-center justify-center h-full w-full relative">
          <DescriptionExcerptForm postObject={postObject} user={user} />
        </div>
    </Step>
    <Step key={`page/3`} id={'3'}>
        <div className="flex items-center justify-center h-full w-full relative">
         <MediaForm postObject={postObject} user={user}/>
        </div>
    </Step>
    <Step key={`page/4`} id={'4'}>
        <div className="flex items-center justify-center h-full w-full relative">
          <div className="max-w-2xl pt-6 pb-20 w-full">
              <div className="my-2 mb-6">
              {postObject.status=='draft'?
              <>
                <h1 className="text-3xl font-bold mx-auto mb-2">Your tool is submitted!</h1>
                <p className="text-xl mt-4 text-gray-600">Thanks for submitting your tool. Our team will review and then publish your submission if it is relevant to the Prototypr audience.</p>
              </>
              :
              <>
                <h1 className="text-3xl font-bold mx-auto mb-2">Your tool has been updated!</h1>
                {/* <p className="text-xl my-4 text-gray-600">Thanks for submitting your tool. Our team will review and then publish your submission if it is relevant to the Prototypr audience.</p> */}
              </>
              }
              <p className="text-xl mt-4 mb-6 text-gray-600">If you have a special offer or discount for the Prototypr audience, you can also create an offer for your tool to be featured on our Designer Deals page.</p>
              <Link href="/dashboard">
                <Button variant="confirmMedium">
                  Continue to dashboard
                </Button>
              </Link>
              </div>
          </div>
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


