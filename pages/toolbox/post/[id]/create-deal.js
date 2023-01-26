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
     {loading?
      <div className="relative w-full h-full pt-10 flex">
      <div className="my-auto mx-auto">
        <Spinner />
      </div>
      </div>
     :(available && !postObject?.active) ?
     <Container maxWidth="max-w-[1320px]">
        <div className="max-w-2xl pt-3 mb-3">

       <h1 className="text-xl mb-3 font-bold">Complete your purchase</h1>
       <p>Once you complete your purchase, your post will be reviewed by our team and scheduled at the nearest date. Your job post is saved, so you can come back and pay later. </p>
        </div>
       {/* {!user?.isLoggedIn && <p>Please log in or create an account to buy a sponsorship.</p>} */}

       
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
      </Container>:
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