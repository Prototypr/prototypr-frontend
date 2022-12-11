// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Container from "@/components/container";
import axios from "axios";
import useUser from '@/lib/iron-session/useUser'

export default function SponsorPage({}) {

  const {user, mutateUser} = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  })

    const [available, setAvailable] = useState(true)
    
    useEffect(()=>{
        // <script type="text/javascript" src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js" > </script>
        
        const getProd = async()=>{
            const response = await axios.get( "http://localhost:1337/strapi-stripe/getProduct/1" )


            if(response.data.availability===false){
              setAvailable(false)
            }
            console.log(response)
        }
        
        // used to be in the strapi script, but doing it directly on the front end
        // const s = document.createElement("script");
        // // s.setAttribute("src", "http://localhost:1337/plugins/strapi-stripe/static/stripe.js");
        // s.setAttribute("src", "http://localhost:1337/plugins/strapi-stripe/static/stripe.js");
        // s.setAttribute("async", "true");
        // document.head.appendChild(s);
        
        getProd()
     
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
       <h1 className="text-xl">Sponsor Prototypr</h1>
       {!user?.isLoggedIn && <p>Please log in or create an account to buy a sponsorship.</p>}
       <p>{available?'Open for booking':'Sold!'}</p>
       {available && <button 
       onClick={()=>{
        const strapiStripe = document.querySelector("#SS_ProductCheckout");
        const productId = strapiStripe.dataset.id;
        console.log(productId);
        const baseUrl = strapiStripe.dataset.url;
        localStorage.setItem("strapiStripeUrl", baseUrl);
        const getProductApi = baseUrl + "/strapi-stripe/getProduct/" + productId;
        const checkoutSessionUrl = baseUrl + "/strapi-stripe/createCheckoutSession/";
        // console.log(getProductApi, checkoutSessionUrl);
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
                  window.location.replace(response.url);
                }
              });
          });
       }}
       class="css style" type="button" id="SS_ProductCheckout" data-id="1" data-url="http://localhost:1337"> Buy Now </button>}
      </Container>
    </Layout>
  );
}