// import dynamic from "next/dynamic";
import { useEffect } from "react";
import Layout from "@/components/layout";
import Container from "@/components/container";
import axios from "axios";

export default function PaymentSuccess({}) {
    
    useEffect(()=>{
        
        const getProdSuccess = async()=>{
            const params = new URLSearchParams(document.location.search);
            const checkoutSessionId = params.get("sessionId");
            const response = await axios.get(`http://localhost:1337/strapi-stripe/retrieveCheckoutSession/${checkoutSessionId}`)


            console.log(response)
        }
        
        const s = document.createElement("script");
        s.setAttribute("src", "http://localhost:1337/plugins/strapi-stripe/static/stripe.js");
        s.setAttribute("async", "true");
        document.head.appendChild(s);
        
        getProdSuccess()
     
      },[])
    

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