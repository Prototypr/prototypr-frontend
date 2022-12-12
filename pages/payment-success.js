// import dynamic from "next/dynamic";
import { useEffect } from "react";
import Layout from "@/components/layout";
import Container from "@/components/container";
// import axios from "axios";
import useUser from '@/lib/iron-session/useUser'

export default function PaymentSuccess({}) {
 
  const {user, mutateUser} = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  })

    useEffect(()=>{
        
      if(user?.isLoggedIn){
        return false
      }

        const getProdSuccess = async()=>{
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
            .then((response) => {
              if (response.payment_status === "paid") {
                if (
                  window.performance
                    .getEntriesByType("navigation")
                    .map((nav) => nav.type)
                    .includes("reload")
                ) {
                  console.info("website reloded");
                } else {
                  console.log(response)
                  // store payment in strapi
                  const stripePaymentUrl = baseUrl + "/strapi-stripe/stripePayment";
                  fetch(stripePaymentUrl, {
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
                }
              }
            });
        }
        
        // this used to be in the strapi script, but we do it directly on the front end instead
        // const s = document.createElement("script");
        // s.setAttribute("src", "http://localhost:1337/plugins/strapi-stripe/static/stripe.js");
        // s.setAttribute("src", "http://localhost:1337/plugins/strapi-stripe/static/stripe.js");
        // s.setAttribute("async", "true");
        // document.head.appendChild(s);
        
        getProdSuccess()
     
      },[user?.isLoggedIn])
    

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
       <h1 className="text-xl">Payment Success</h1>
 
      </Container>
    </Layout>
  );
}