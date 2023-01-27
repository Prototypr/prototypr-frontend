import Layout from "@/components/layout-dashboard";
// import { jobTypes} from "@/lib/constants";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import LoginSide from "@/components/sign-in/LoginSide";
import {
  useWizardContext,
  WizardProvider,
  Steps,
  Step,
} from 'react-sweet-wizard';
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

const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

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
              <div className="flex">
              <Link href={`/toolbox/post/${postObject?.id}/deal`}>
                <Button variant="confirmMedium">
                  Add a deal
                </Button>
              </Link>
              <div className="ml-3">
                <Link href="/dashboard">
                  <Button variant="confirmMediumSecondary">
                    Continue to dashboard
                  </Button>
                </Link>
              </div>
              
              </div>
              </div>
          </div>
        </div>
    </Step>
</Steps>
  )
}

export default PostToolPage;