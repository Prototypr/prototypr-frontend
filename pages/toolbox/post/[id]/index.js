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

// const Progress = () => {
//   const { activeStepIndex, steps } = useWizardContext();

//   return (
//     <div>
//       Step {parseInt(activeStepIndex, 10)+1} of {steps.length}
//     </div>
//   );
// };

const MenuItems =[
{title:'Title and URL'},
{title:'General information'},
{title:'Image and media'},
// {title:'Done'},
]
const Menu = ({post}) => {
  const { activeStepIndex, steps, goTo } = useWizardContext();

  const lastStepActive = activeStepIndex==3

  return (
    <div className="flex flex-col">
   {MenuItems.map((menuItem, index)=>{
    const active = activeStepIndex==index
    return(
      <div 
      onClick={()=>{goTo(index)}}
      className={`p-3 w-full cursor-pointer rounded-lg min-w-[300px] mb-2 ${active?'bg-blue-100 font-semibold':''}`}>
        {menuItem.title}
      </div>
    )
   })}
   {/* only show done step if info is there */}
   {((post?.logo?.id && post?.gallery?.length))?
    <div 
    onClick={()=>{goTo(3)}}
    className={`p-3 w-full cursor-pointer rounded-lg min-w-[300px] mb-2 ${lastStepActive?'bg-blue-100 font-semibold':''}`}>
      Done
    </div>:''}
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
    const { loading, postObject, isOwner, refetch:refetchPost } =
    useLoad(user);
  
    return(
      !user && loading?<Fallback/>:
      postObject? 
      <ToolPostForm refetchPost={refetchPost} isOwner={isOwner} postObject={postObject} user={user} />:null
    )
  
  }

const ToolPostForm = ({user, isOwner, postObject,refetchPost}) =>{

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };



  return(
    <Layout showFooter={false} padding={false} seo={seo} showWriteButton={false} background="#fff">
        
      {!((user && !user?.isLoggedIn) && (isOwner || user?.isAdmin)) ? 
      <WizardProvider>
        <div className="h-full min-h-screen w-full grid md:grid-cols-12">
        <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
        <div className="flex pt-24 justify-center h-full w-full relative text-black/80">
            <Menu post={postObject}/>
            {/* <Progress/> */}
            {/* <LoginSide showArrow={false} title="Submit a tool or resource" user={user} /> */}
        </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-7">
        <div className="justify-center mt-20 w-full">
          {/* <Progress/> */}
        <ToolSteps refetchPost={refetchPost} postObject={postObject} user={user}/>
          </div>
        </div>
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
      </Layout>
  )

}

const ToolSteps = ({user, postObject, refetchPost}) =>{
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
        <div className="flex items-center justify-start h-full w-full relative">
          <TitleLinkFormEdit refetchPost={refetchPost} onNext={onNext} postObject={postObject} user={user} />
        </div>
    </Step>
    <Step key={`page/2`} id={'2'}>
        <div className="flex items-center justify-start h-full w-full relative">
          <DescriptionExcerptForm postObject={postObject} user={user} />
        </div>
    </Step>
    <Step key={`page/3`} id={'3'}>
        <div className="flex items-center justify-start h-full w-full relative">
         <MediaForm postObject={postObject} user={user}/>
        </div>
    </Step>
    <Step key={`page/4`} id={'4'}>
        <div className="flex items-center justify-start h-full w-full relative">
          <div className="px-6 md:px-0 max-w-2xl pt-6 pb-20 w-full">
              <div className="my-2 mb-6">
              {postObject.status=='draft'?
              <>
                <h1 className="text-3xl font-semibold mx-auto mb-2">Thanks for your submission!</h1>
                <p className="text-lg mt-4 text-gray-600">Thanks for submitting your tool. Our team will review and then publish your submission if it is relevant to the Prototypr audience.</p>
              </>
              :
              <>
                <h1 className="text-lg font-bold mx-auto mb-2">Your tool has been updated!</h1>
                {/* <p className="text-xl my-4 text-gray-600">Thanks for submitting your tool. Our team will review and then publish your submission if it is relevant to the Prototypr audience.</p> */}
              </>
              }
              <p className="text-lg mt-4 mb-6 text-gray-600">If you have a special offer or discount for the Prototypr audience, you can also create an offer for your tool to be featured on our Designer Deals page.</p>
              <div className="flex">
              {/* <Link href={`/toolbox/post/${postObject?.id}/deal`}>
                <Button variant="confirmMedium">
                  Add a deal
                </Button>
              </Link> */}
              {/* <div className="ml-3"> */}
                <Link href="/dashboard">
                  <Button 
                                  className="p-4 bg-blue-700 text-white font-semibold rounded-full disabled:bg-gray-300 hover:bg-blue-600 disabled:cursor-not-allowed"
                  variant="confirmMediumSecondary">
                    Continue to dashboard
                  </Button>
                </Link>
              {/* </div> */}
              
              </div>
              </div>
          </div>
        </div>
    </Step>
</Steps>
  )
}

export default PostToolPage;