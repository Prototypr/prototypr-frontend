// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Container from "@/components/container";
// import axios from "axios";
import useUser from '@/lib/iron-session/useUser'
import Spinner from "@/components/atom/Spinner/Spinner";
import { useLoad } from "@/components/Sponsor/sponsorHooks";
import Button from "@/components/Primitives/Button";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function PaymentSuccess({}) {
 
  const router= useRouter()
  const {user, mutateUser} = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  })

  const { 
    loading:postLoading,
    content,
    postId,
    title,
    isOwner,
    postObject} =useLoad(user);
  

  const [loading, setLoading] = useState(true)
  const [reloaded, setReloaded] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)

    useEffect(()=>{

        const getProdSuccess = async()=>{
          if(processingPayment){
            setReloaded(true)
            setLoading(false)
            return false
          }
          setProcessingPayment(true)
            const params = new URLSearchParams(document.location.search);
            const checkoutSessionId = params.get("sessionId");
            const baseUrl = localStorage.getItem("strapiStripeUrl");

            const retrieveCheckoutSessionUrl =
            baseUrl + "/strapi-stripe/retrieveCheckoutSession/" + checkoutSessionId;
          fetch(retrieveCheckoutSessionUrl, {
            method: "get",
            mode: "cors",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((response) => response.json())
            .then(async(response) => {
              if (response.payment_status === "paid") {
                if (
                  window.performance
                    .getEntriesByType("navigation")
                    .map((nav) => nav.type)
                    .includes("reload")
                ) {
                  console.info("website reloded");
                  setTimeout(()=>{
                    setReloaded(true)
                    setLoading(false)
                  },500)
                } else {
                  console.log(response)
                  setLoading(true)
                  // store payment in strapi
                  const stripePaymentUrl = baseUrl + "/strapi-stripe/stripePayment";
                  await fetch(stripePaymentUrl, {
                    method: "post",
                    body: JSON.stringify({
                      txnDate: new Date(),
                      transactionId: response.id,
                      isTxnSuccessful: true,
                      userId:user?.id,
                      // txnMessage: response,
                      txnAmount: response.amount_total / 100,
                      customerName: response.customer_details.name,
                      customerEmail: response.customer_details.email,
                      stripeProduct: response.metadata.productId,
                      sponsoredPost:response.metadata.postId
                    }),
                    mode: "cors",
                    headers: new Headers({
                      Authorization: `Bearer ${user?.jwt}`,
                      "Content-Type": "application/json",
                    }),
                  });
                  console.log(response.metadata)
                  //then update the sponsored post with the payment
                  let configUpdate = {
                    method: "post",
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/updateBookingWeeks`,
                    headers: {
                      Authorization: `Bearer ${user?.jwt}`,
                    },
                    data: {
                      sponsoredPostId:response.metadata.postId,
                      weeks:response.metadata.sponsorWeeks,
                    },
                  };
                  console.log(configUpdate)
                  await axios(configUpdate)
                  .then(async function (response) {

                    if(response?.data?.posted==true){
                      toast.success("Your Sponsored post is scheduled!", {
                        duration: 3000,
                      });
                    }else{
                      toast.error(response?.data?.message?response?.data?.message:'Something went wrong submitting your post!', {
                        duration: 5000,
                      });
                    }
                  }).catch(function (error) {
                    console.log(error)
                    toast.error("You're payment was accepted, and will be scheduled!", {
                      duration: 5000,
                    });
                  });
                  
                  setTimeout(()=>{
                    setLoading(false)
                  },500)
                }
              }
            });
        }
        

        if(user?.isLoggedIn && !postLoading){
          // return false
          if(!postObject?.active){

            getProdSuccess()
          }else{
            console.log('already a payment')
            setReloaded(true)
            setLoading(false)

          }
        }
     
      },[user?.isLoggedIn, postLoading])
    

  return (
    <Layout
      seo={{
        title: "Prototypr Toolbox - new design, UX and coding tools.",
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        canonical: "https://prototypr.io/toolbox",
        url: "https://prototypr.io/toolbox",
      }}
      activeNav={"toolbox"}
    >
      <Container>
        <div className="max-w-2xl mt-3 mb-4">
        <h1 className="text-xl font-bold mb-3">{(!loading && !reloaded)?'Payment Successful':(!loading && reloaded)?'This page has expired':'Updating your post...'}</h1>
          {loading && <Spinner/>}

          {(!loading && !reloaded)?
          <div className="text-md">
            <p>
              Thanks for your purchase. Your sponsored post will be reviewed and scheduled within 24 hrs.
            </p>
            <p>
              You'll receive an email when it goes live. If you need any help or have any questions, we're waiting to help in the support chat.
            </p>
          </div>
          :(!loading && reloaded) &&
          <div className="text-md">
            <p>
              It looks like the checkout session is no longer valid.
            </p>
            <p>
              You'll receive an email when your sponsored post goes live. If you need any help or have any questions, we're waiting to help in the support chat.
            </p>
            
          </div>
          }
        </div>
          {!loading && <Button onClick={()=>{
              router.push(`/sponsor/booking/${postId}/edit`)
            }}>
              Edit listing
            </Button>}
            <Toaster/>
      </Container>
    </Layout>
  );
}