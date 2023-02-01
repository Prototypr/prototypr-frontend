// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout-dashboard";
import Container from "@/components/container";
import axios from "axios";
import useUser from '@/lib/iron-session/useUser'
import { useLoad } from "@/components/Jobs/jobHooks";
import Button from "@/components/Primitives/Button";
import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
import LoginSide from "@/components/sign-in/LoginSide";
import Link from "next/link";

// const PRODUCT_ID = 2

export default function JobPaymentPage({}) {

  const [PRODUCT_SLUG, setProductSlug] = useState('job-post')


  const {user, mutateUser} = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  })

  const { 
    loading,
    content,
    postId,
    title,
    isOwner,
    postObject} =useLoad(user);
   

    const router = useRouter()
   

    // useEffect(()=>{
    //   if(postObject?.active){
    //     router.push('/')
    //   }

    // },[postObject])


    const [available, setAvailable] = useState(true)
    
    useEffect(()=>{        
        const getProd = async()=>{
            
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/strapi-stripe/getProductBySlug/${PRODUCT_SLUG}`)
            if(response.data.availability===false){
              setAvailable(false)
            }
        }
        getProd()
     
      },[])

  return (
    <Layout
      showFooter={false}
      padding={false}
      seo={{
        title: "Prototypr Toolbox - new design, UX and coding tools.",
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        // canonical: "https://prototypr.io/toolbox",
        // url: "https://prototypr.io/toolbox",
      }}
      activeNav={"jobs"}
    >
     {loading?
      <div className="relative w-full h-full pt-10 flex">
      <div className="my-auto mx-auto">
        <Spinner />
      </div>
      </div>
     :(available && !postObject?.active) ?
        <div className="h-full min-h-screen w-full grid md:grid-cols-12">
          <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
              <div className="flex pt-24 items-center justify-center h-full w-full relative bg-[#195DE2] text-white">
                <LoginSide title="Submit a job or opportunity" user={user} />
              </div>
            </div>
          {user?.profile?.pro!==true?
          <div className="col-span-12 md:col-span-6 lg:col-span-8">
          <div className="justify-center mt-20 max-w-2xl mx-auto mt-48 px-2 sm:px-6 lg:px-10">
            <h1 className="text-3xl font-bold mx-auto mb-2">Thanks for submitting an opportunity!</h1>
            <p className="text-xl mt-4 mb-6 text-gray-600">Once you complete your purchase, your job will be reviewed by our team and scheduled at the nearest date. Your job post is saved, so you can come back and pay later.</p>
          <Button 
          onClick={()=>{
            

            localStorage.setItem("strapiStripeUrl", process.env.NEXT_PUBLIC_API_URL);
            const getProductApi = process.env.NEXT_PUBLIC_API_URL + "/strapi-stripe/getProductBySlug/" + PRODUCT_SLUG;
            const checkoutSessionUrl = process.env.NEXT_PUBLIC_API_URL + "/strapi-stripe/createCheckoutSession/";
            const successUrl = `${process.env.NEXT_PUBLIC_HOME_URL}/jobs/post/${postId}/payment-success`;
            const cancelUrl = `${process.env.NEXT_PUBLIC_HOME_URL}/jobs/post/${postId}/payment-failure`;

            fetch(getProductApi, {
              method: "get",
              mode: "cors",
              headers: new Headers({
                "Content-Type": "application/json",
              }),
            })
            .then((response) => response.json())

              .then((response) => {
                fetch(checkoutSessionUrl, {
                  method: "post",
                  body: JSON.stringify({
                    stripePriceId: response.stripePriceId,
                    productId: response.id,
                    productName: response.title,
                    postId:postId,
                    postType:'job',
                    successUrl,
                    cancelUrl
                  }),
                  mode: "cors",
                  headers: new Headers({
                    //  Authorization: `Bearer ${user?.jwt}`,
                    "Content-Type": "application/json",
                  }),
                })
                  .then((response) => response.json())
                  .then((response) => {
                    if (response.id) {
                      //the response.url is the strapi checkout 
                      window.location.replace(response.url);
                    }
                  });
              });
          }} type="button">Complete Purchase</Button>
          </div>
        </div>:
        <div className="col-span-12 md:col-span-6 lg:col-span-8">
        <div className="justify-center bg-white p-10 rounded-2xl shadow-sm mt-20 max-w-2xl mx-auto mt-48 px-2 sm:px-6 lg:px-10">
        <h1 className="text-3xl font-bold mx-auto mb-2">Thanks for submitting an opportunity!</h1>
        <p className="text-xl mt-4 mb-6 text-gray-600">Your job will be reviewed by our team and scheduled at the nearest date. Your job post is saved, so you can come back and edit it whenever.</p>
        <p className="text-xl mt-4 mb-6 text-gray-600">🎁 This post is free for you as you've been gifted a <span className="font-semibold text-gray-700">pro account</span> for being an awesome contributor. Normally job posts are a paid feature 🤗. Thanks for your support!</p>
        
        <div className="">
                <Link href="/dashboard/partner">
                  <Button variant="confirmMedium">
                    Continue to partner dashboard
                  </Button>
                </Link>
              </div>
        </div>
        </div>
        }
        </div>
      :
       <Container>
      <div className="max-w-2xl pt-3 mb-3">

      <h1 className="text-xl mb-3 font-bold">Payment is complete</h1>
      <p>Payment for this job has already been made. </p>
       </div>
       </Container>
      }
    </Layout>
  );
}