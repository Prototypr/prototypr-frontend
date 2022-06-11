// import dynamic from "next/dynamic";
import { useEffect } from "react";
import Layout from "@/components/layout";
import Container from "@/components/container";
import axios from "axios";

export default function SponsorPage({}) {
    
    useEffect(()=>{
        // <script type="text/javascript" src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js" > </script>
        
        const getProd = async()=>{
            const response = await axios.get( " http://localhost:1337/strapi-stripe/getProduct/2" )


            console.log(response)
        }
        
        const s = document.createElement("script");
        s.setAttribute("src", "http://localhost:1337/plugins/strapi-stripe/static/stripe.js");
        s.setAttribute("async", "true");
        document.head.appendChild(s);
        
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
       <button 
       onClick={async()=>{
        const response = await axios.get( " http://localhost:1337/strapi-stripe/getProduct/2" )

        console.log(response)
       }} 
       class="css style" type="button" id="SS_ProductCheckout" data-id="2" data-url="http://localhost:1337"> Buy Now </button>
      </Container>
    </Layout>
  );
}