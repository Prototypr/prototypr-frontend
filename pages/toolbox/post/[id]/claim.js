// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
import axios from "axios";
import useUser from '@/lib/iron-session/useUser'
import { useLoad } from "@/components/Jobs/jobHooks";
import Button from "@/components/Primitives/Button";
import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
import { getToolById } from "@/lib/api";
import LoginForm from "@/components/sign-in/LoginForm";

// const PRODUCT_ID = 2

export default function ClaimToolPage({data}) {

    const [post, setPost] = useState()

    useEffect(()=>{
        setPost(data?.posts?.data[0])
    },[data])


  const {user, mutateUser} = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  })


  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };


  return (
    <Layout
      seo={{
        title: "Prototypr Toolbox - new design, UX and coding tools.",
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        // canonical: "https://prototypr.io/toolbox",
        // url: "https://prototypr.io/toolbox",
      }}
      activeNav={"toolbox"}
    >
     <Container maxWidth="max-w-[1320px]">
        <div className="max-w-[650px] mt-6 mx-auto pt-3 mb-3 p-5 border border-black/10 rounded-xl bg-white">
      <img className="rounded rounded-lg shadow-sm border border-gray-100" src={post?.attributes?.legacyFeaturedImage?.logoNew} width={60} height={60}/>
      <div className="">
       <h1 className="text-xl mb-3 font-bold mt-2">Claim "{post?.attributes?.title}"</h1>
       <div className="text-gray-800">
        {!user?.isLoggedIn?<p className="mb-2">Please sign in to claim this page.</p>:''}
        <p className="mb-2">Once approved as owner, you'll be able to edit the description, images, and see the page stats for this tool.</p>
        {user?.isLoggedIn?<p className="mb-2">To claim the page, send a claim message using the button below – the button will create a message to our support team with the necessary details - the tool name and your user name.</p>:''}
        </div>
       </div>
      {(user?.isLoggedIn===true)?
      <Button 
      className="mt-6"
       onClick={()=>{
        if (window.$crisp) {
            window.$crisp.push(["do", "chat:open"]);
            window.$crisp.push(["set", "message:text", [`Hi! I would like to claim tool: "${post?.attributes?.title}". My username is ${user?.profile?.name}, and my user ID is ${user?.id}. Thanks!`]]);
          }
       }} type="button">Send claim message</Button>:''}
        </div>

        {!(user?.isLoggedIn===true)?
            <div className="w-full relative max-w-4xl mx-auto ">
            <div
              className="w-full bg-white shadow-sm p-8 rounded-lg flex justify-center mx-auto"
              style={{ maxWidth: 650 }}
            >
              <LoginForm isSignUp={isSignUp} />
            </div>
          <div className="mt-4 mb-20 flex justify-center">
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
        </div>:''}       
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params, preview = null, locale }) {
    
    const data = await getToolById(params.id, preview);
    return { props: {
        data
    } };
}