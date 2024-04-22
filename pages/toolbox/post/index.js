import Layout from "@/components/new-index/layoutForIndex";
import dynamic from "next/dynamic";

import React, { useEffect, useState, useCallback } from "react";
import useUser from "@/lib/iron-session/useUser";
import {
  useWizardContext,
  WizardProvider,
  Steps,
  Step,
} from "react-sweet-wizard";
import TitleLinkForm from "@/components/toolbox/forms/TitleLinkForm";

const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

const seo = {
  title: `Post a tool on Prototypr`,
  description: `Share your tool with the Prototypr community.`,
  // image:``,
  canonical: `https://prototypr.io/toolbox/post`,
  url: `https://prototypr.io/toolbox/post`,
};

const PostToolPage = () => {
  const { user } = useUser({
    // redirectTo: "/",
    redirectIfFound: false,
  });

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  return (
    <Layout
      showFooter={false}
      padding={false}
      navType={"full"}
      navOffset={false}
      seo={seo}
      showWriteButton={false}
      // background="#fff"
    >
      <div className="h-full min-h-screen w-full grid md:grid-cols-12">
        <div className="hidden w-full h-full md:block md:col-span-4 lg:col-span-4">
          <div className="flex items-center magicpattern justify-center h-full w-full relative text-white">
            {/* <LoginSide showArrow={false} title="Submit a tool or resource" user={user} /> */}
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-8 flex flex-col justify-center">
          {!(user && !user?.isLoggedIn) ? (
            <div className="bg-white p-6 rounded-xl max-w-xl mx-auto my-auto shadow-sm border border-gray-300/70">
              <WizardProvider>
                <ToolSteps user={user} />
                <div className="mt-6">
                  <Navigation />
                </div>
              </WizardProvider>
            </div>
          ) : (
            // <ToolPostForm user={user}/>
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
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const ToolSteps = ({ user }) => {
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =
    useWizardContext();

  const [currentPost, setCurrentPost] = useState();

  const goNext = data => {
    setCurrentPost(data);
    onNext();
  };

  return (
    <Steps>
      <Step key={`page/1`} id={"1"}>
        <div className="flex items-center justify-center h-full w-full relative">
          <TitleLinkForm
            currentPost={currentPost}
            user={user}
            goNext={goNext}
          />
        </div>
      </Step>
    </Steps>
  );
};

const Navigation = () => {
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =
    useWizardContext();

  return (
    <>
      {!isFirstStep ? (
        <div>
          <button onClick={onPrevious} disabled={isFirstStep}>
            Previous
          </button>
          <button
            onClick={useCallback(() => {
              if (activeStepIndex === 1) {
                goTo(5);
              } else {
                onNext(() => console.log("Calling `onNext` method"));
              }
            }, [goTo, onNext, activeStepIndex])}
            // disabled={isLastStep}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PostToolPage;
