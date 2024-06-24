import Layout from "@/components/new-index/layoutForIndex";
// import { jobTypes} from "@/lib/constants";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
const axios = require("axios");

import React, { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
// import LoginSide from "@/components/sign-in/LoginSide";
import {
  useWizardContext,
  WizardProvider,
  Steps,
  Step,
} from "react-sweet-wizard";
import DescriptionExcerptForm from "@/components/toolbox/forms/DescriptionExcerptForm";
import TitleLinkFormEdit from "@/components/toolbox/forms/TitleLinkFormEdit";
import useLoad from "@/components/toolbox/hooks/useLoad";
import Fallback from "@/components/atom/Fallback/Fallback";
import MediaForm from "@/components/toolbox/forms/MediaForm";
// import Link from "next/link";
// import Button from "@/components/Primitives/Button";
import DealForm from "@/components/toolbox/forms/DealForm";
// import { PublishDialogButton } from "@/components/Editor/PublishDialogButton";
import { PublishToolDialog } from "@/components/toolbox/forms/PublishToolDialog";
import ToolIconCard from "@/components/v4/card/ToolIconCard";
import Button from "@/components/Primitives/Button";
import { addSupportScript } from "@/lib/addSupportScript";

// const Progress = () => {
//   const { activeStepIndex, steps } = useWizardContext();

//   return (
//     <div>
//       Step {parseInt(activeStepIndex, 10)+1} of {steps.length}
//     </div>
//   );
// };

const MenuItems = [
  { title: "Title and Link" },
  { title: "General information" },
  { title: "Image and media" },
  { title: "Add Promo" },
  { title: "Finish" },
];
const Menu = ({ post, refetchPost }) => {
  const { activeStepIndex, steps, goTo } = useWizardContext();

  const lastStepActive = activeStepIndex == 4;

  useEffect(() => {
    refetchPost();
  }, [activeStepIndex]);

  return (
    <div className="flex flex-col">
      {MenuItems.map((menuItem, index) => {
        const active = activeStepIndex == index;
        let enabled = index == 2 && !post?.content ? false : true;
        enabled = index == 3 && !post?.gallery?.length ? false : enabled;
        enabled = index == 4 && !post?.gallery?.length ? false : enabled;
        return (
          <div
            onClick={() => {
              if (enabled) {
                goTo(index);
              }
            }}
            className={`${enabled ? "cursor-pointer" : "opacity-50 cursor-not-allowed"} p-3 w-full  rounded-lg mb-2 ${active ? "bg-blue-100 font-semibold" : ""}`}
          >
            {menuItem.title}
          </div>
        );
      })}
      {/* only show done step if info is there */}
      {/* {!post.published_at &&
      post?.logo?.id &&
      post?.gallery?.length &&
      activeStepIndex > 3 ? (
        <div
          onClick={() => {
            goTo(4);
          }}
          className={`p-3 w-full cursor-pointer rounded-lg mb-2 ${lastStepActive ? "bg-blue-100 font-semibold" : ""}`}
        >
          Done
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

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
    redirectTo: "/",
    redirectIfFound: false,
  });
  const { loading, postObject, isOwner, refetch: refetchPost } = useLoad(user);

  return !user && loading ? (
    <div className="h-screen flex flex-col justify-center">
      <Fallback />
    </div>
  ) : postObject ? (
    <ToolPostForm
      refetchPost={refetchPost}
      isOwner={isOwner}
      postObject={postObject}
      user={user}
    />
  ) : null;
};

const ToolPostForm = ({ user, isOwner, postObject, refetchPost, loading }) => {
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
      <div className="h-14 bg-white shadow-sm z-10 w-full fixed top-[44px] border-b border-gray-300/50">
        <div className="flex gap-x-6 h-14  max-w-[1320px] mx-auto">
          <a
            href={postObject?.slug ? `/toolbox/${postObject?.slug}` : "#"}
            target={postObject?.slug ? "_blank" : "_self"}
            className={postObject?.slug ? "cursor-pointer" : "cursor-default"}
          >
            <div className="flex gap-3 max-w-[1320px] mx-auto h-full">
              <img
                src={
                  postObject?.logo?.url
                    ? postObject?.logo?.url
                    : postObject?.legacyLogo
                      ? postObject.legacyLogo
                      : "https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png"
                }
                className="w-10 bg-gray-50 shadow-sm h-10 my-auto rounded-lg"
              />
              <div className="my-auto text-lg tracking-tight font-medium">
                {postObject?.title}
              </div>
            </div>
          </a>
          <div className="my-auto">
            <span
              className={`text-[11px] uppercase font-semibold w-auto px-3 py-1 ${
                postObject.status === "draft"
                  ? "bg-gray-200 text-gray-700"
                  : postObject.status === "pending"
                    ? "bg-orange-500 text-white"
                    : "bg-green-500 text-white"
              }   rounded-[20px] my-2`}
            >
              {postObject.status == "draft"
                ? "Draft"
                : postObject.status == "pending"
                  ? "Pending"
                  : "Published"}
            </span>
          </div>
        </div>
      </div>
      {!(user && !user?.isLoggedIn && (isOwner || user?.isAdmin)) ? (
        <WizardProvider>
          <div className="h-full min-h-screen max-w-[1320px] mx-auto w-full grid md:grid-cols-12 pt-[128px]">
            <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-3">
              <div className="max-w-[280px] h-full w-full relative text-black/80">
                <Menu post={postObject} refetchPost={refetchPost} />
                {/* <Progress/> */}
                {/* <LoginSide showArrow={false} title="Submit a tool or resource" user={user} /> */}
              </div>
            </div>
                {/* <Progress/> */}
                <ToolSteps
                  loading={loading}
                  refetchPost={refetchPost}
                  postObject={postObject}
                  user={user}
                />
          </div>
        </WizardProvider>
      ) : !(user && !user?.isLoggedIn) ? (
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
      ) : (
        <div className="w-full h-full bg-[#F4F4F4] grid place-items-center">
          <div className="max-w-[500px] mx-auto">
            <p>You don't have permission to edit this post</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

const ToolSteps = ({ user, postObject, refetchPost, loading }) => {
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =
    useWizardContext();
  const router = useRouter();
  const { step } = router.query;

  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (step == 2) {
      if (activeStepIndex == 0) {
        goTo("1");
      }
    }
    if (step == 3) {
      if (activeStepIndex == 0) {
        goTo("3");
      }
    }
  }, [step]);

  const onSubmitForPublishing = async () => {
    setPublishing(true);
    toast.success("Submitting your tool!", {
      duration: 5000,
    });

    let entry = {
      status: "pending",
    };

    let publishPostEndpointConfig = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
      data: {
        data: {
          ...entry,
        },
      },
    };
    await axios(publishPostEndpointConfig)
      .then(async function (response) {
        setPublishing(false);
        toast.success("Submitted for review!", {
          duration: 5000,
        });
        refetchPost();
        return response;
      })
      .catch(function (error) {
        console.log(error);
        setPublishing(false);
        toast.error("Your post could not be submitter!", {
          duration: 5000,
        });
      });
  };


  return (
    <div className={`col-span-12 md:col-span-6 ${activeStepIndex==2?'lg:col-span-8':'lg:col-span-6'} mb-12`}>

    <div className="bg-white border border-gray-300/70 shadow-sm rounded-xl p-6 step-wizard">

    <Steps>
      <Step key={`page/1`} id={"1"}>
        <div className="flex items-center justify-start h-full w-full relative">
          <TitleLinkFormEdit
            refetchPost={refetchPost}
            loading={loading}
            onNext={onNext}
            postObject={postObject}
            user={user}
            isEditMode={postObject?.published_at}
          />
        </div>
      </Step>
      <Step key={`page/2`} id={"2"}>
        <div className="flex flex-col justify-start h-full w-full relative">
          <DescriptionExcerptForm
            isEditMode={postObject?.published_at}
            postObject={postObject}
            loading={loading}
            user={user}
          />
        </div>
      </Step>
      <Step key={`page/3`} id={"3"}>
        <div className="flex flex-col justify-start h-full w-full relative">
          <MediaForm
            refetchPost={refetchPost}
            postObject={postObject}
            loading={loading}
            user={user}
            isEditMode={postObject?.published_at}
          />
        </div>
      </Step>
      <Step key={`page/4`} id={"4"}>
        <div className="flex items-center justify-start h-full w-full relative">
          <div className="px-6 md:px-0 max-w-2xl pt-6 w-full">
            <DealForm
              isEditMode={postObject?.published_at}
              postObject={postObject}
              loading={loading}
              refetchPost={refetchPost}
              user={user}
            />
          </div>
        </div>
      </Step>
      <Step key={`page/5`} id={"5"}>
        <div className="flex items-center justify-start h-full w-full relative">
          <div className="px-6 md:px-0 max-w-2xl w-full">
            <div className="my-2">
              <>
                <h1 className="text-2xl font-semibold mx-auto mb-2">
                  {postObject.status == "draft"
                    ? "Submit for review"
                    : postObject.status == "pending"
                      ? "Pending review"
                      : postObject.status == "publish"
                        ? "Your post is live 🎉"
                        : "Thanks for your submission!"}
                </h1>
                <p className="text-lg mt-4 text-gray-600">
                  {postObject.status == "draft" ? (
                    "Your tool is saved as a draft. You can edit it anytime."
                  ) : postObject.status == "pending" ? (
                    "Thanks for your submission, your post is awaiting review. We will notify you when it is live. You can still make changes."
                  ) : postObject.status == "publish" ? (
                    <>
                      Your tool has been published. Thank you for contributing!
                    </>
                  ) : (
                    "Your tool is saved as a draft. You can edit it anytime."
                  )}
                </p>
                {postObject.status == "publish" ? (
                  <div className="mt-8">
                    <ToolIconCard
                      tool={postObject}
                      logo={
                        postObject?.logo?.url
                          ? postObject?.logo?.url
                          : postObject?.legacyLogo
                            ? postObject.legacyLogo
                            : null
                      }
                      small={true}
                      withBackground={true}
                    />
                  </div>
                ) : (
                  <PostPreview postObject={postObject} />
                )}
              </>

              {/* <p className="text-lg mt-4 mb-4 text-gray-600">
                If you have a special offer or discount for the Prototypr
                audience, you can also create an offer for your tool to be
                featured on our Designer Deals page.
              </p> */}
              {/* <Link href={`/toolbox/post/${postObject?.id}/deal`}>
                <Button variant="confirmMedium">
                  Add a deal
                </Button>
              </Link> */}
              {/* <div className="ml-3"> */}
              {/* <Link href="/dashboard">
                  <Button
                    className="p-4 mt-6 bg-blue-700 text-white font-semibold rounded-full disabled:bg-gray-300 hover:bg-blue-600 disabled:cursor-not-allowed"
                    variant="confirmMediumSecondary"
                  >
                    Submit
                  </Button>
                </Link> */}
              {postObject.status == "draft" ? (
                <div className="flex mt-8">
                  <PublishToolDialog
                    saving={publishing}
                    onSave={onSubmitForPublishing}
                  />
                </div>
              ) : (
                <>
                  <p className="text-gray-700 mt-8">
                    Any questions? Please contact support.
                  </p>
                  <Button
                    className="mt-3 rounded-full"
                    onClick={() => {
                      // console.log(user)
                      // pop up chat
                      // window.$chatwoot?.setUser(user?.id, {
                      //   claimId: post?.id,
                      //   claimName: post?.attributes?.title,
                      // });
                      console.log(window.$chat)
                      if (!window?.$chatwoot) {
                        addSupportScript();
                        setTimeout(() => {
                          window?.$chatwoot?.toggle();
                        }, 1000);
                      } else {
                        window?.$chatwoot?.toggle();
                      }
                      // window.$chatwoot.popoutChatWindow();

                      // woot-widget-bubble
                    }}
                    type="button"
                  >
                    Ask support
                  </Button>
                </>
              )}
              {/* </div> */}
            </div>
          </div>
        </div>
      </Step>
    </Steps>
    </div>
    </div>
  );
};

export default PostToolPage;

const PostPreview = ({ postObject }) => {
  return (
    <div className="mt-4 border bordr-gray-100 rounded-lg p-3 text-gray-800">
      <div className="mb-4 flex gap-1">
        <h3 className="font-semibold">Title:</h3>
        <p>{postObject.title}</p>
      </div>
      <div className="mb-4 flex gap-1">
        <h3 className="font-semibold">Tagline:</h3>
        <p>{postObject.excerpt}</p>
      </div>
      <div className="mb-4 flex gap-1">
        <h3 className="font-semibold">Description:</h3>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: postObject.content }}
        />
      </div>
      <div className="mb-4 flex gap-1">
        <h3 className="font-semibold">Link:</h3>
        <p>{postObject.link}</p>
      </div>
      <div className="">
        <h3 className="font-semibold">Media:</h3>
        <div className="flex gap-3 mt-2 flex-wrap">
          <img
            className="w-[100px] h-[100px] border border-gray-100/80 rounded-xl object-cover"
            src={postObject.logo?.url}
          />
          {postObject.gallery.map(image => {
            return (
              <img
                className="w-[100px] h-[100px] border border-gray-100/80 rounded-xl object-cover"
                src={image.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
