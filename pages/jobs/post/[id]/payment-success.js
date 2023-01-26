// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
// import axios from "axios";
import useUser from '@/lib/iron-session/useUser'
import Spinner from "@/components/atom/Spinner/Spinner";
import { useLoad } from "@/components/Jobs/jobHooks";
import Button from "@/components/Primitives/Button";
import { useRouter } from "next/router";

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
                 let res = await fetch(stripePaymentUrl, {
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
                      job:response.metadata.postId
                    }),
                    mode: "cors",
                    headers: new Headers({
                      Authorization: `Bearer ${user?.jwt}`,
                      "Content-Type": "application/json",
                    }),
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
          if(!postObject.active){

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
        // canonical: "https://prototypr.io/toolbox",
        // url: "https://prototypr.io/toolbox",
      }}
      activeNav={"toolbox"}
    >
     <Container maxWidth="max-w-[1320px] mx-auto">
        <div className="max-w-2xl mt-3 mb-4">
        <h1 className="text-xl font-bold mb-3">{(!loading && !reloaded)?'Payment Successful':(!loading && reloaded)?'This page has expired':'Updating your job...'}</h1>
          {loading && <Spinner/>}

          {(!loading && !reloaded)?
          <div className="text-md">
            <p>
              Thanks for your purchase. Your job post will be reviewed and scheduled within 24 hrs.
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
              You'll receive an email when your job post goes live. If you need any help or have any questions, we're waiting to help in the support chat.
            </p>
            
          </div>
          }
        </div>
          {!loading && <Button onClick={()=>{
              router.push(`/jobs/post/${postId}/edit`)
            }}>
              Edit listing
            </Button>}
      </Container>
    </Layout>
  );
}