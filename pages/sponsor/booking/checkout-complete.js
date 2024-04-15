// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout-dashboard";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";
import axios from 'axios'
import {
  useLoad,
} from "@/components/Sponsor/sponsorHooks";
// import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
// import { currentWeekNumber } from "@/components/Sponsor/lib/weekNumber";
// import { cloneDeep } from "lodash";
import Link from "next/link";
// import BookingCalendar from "@/components/Sponsor/BookingCalendar";
import Button from "@/components/Primitives/Button";

export default function SponsorPaymentPage({}) {
  // const [productId, setProductId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const { user, mutateUser } = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  });


  const { loading, content, postId, title, isOwner, postObject } =
    useLoad(user);

  useEffect(() => {
    setPaymentId(postObject?.paymentId);
    setCompanyId(postObject?.company);
  }, [postObject]);
  
  //lemonsqueezy product
  const [lsProduct, setLsProduct] = useState(null)
  //get the product (so latest pricing is available)
  useEffect(()=>{

    const getLsProduct= async() =>{

      const response = await axios.post("/api/lemonsqueezy/retrieveOrder", {
        orderId: paymentId,
      });
  
      setLsProduct(response.data);
    }

    if(paymentId){
      getLsProduct()
    }
  },[paymentId])

  // console.log(lsProduct)
  // console.log(postObject)
  // const [selectedSlots, setSelectedSlots] = useState(null);
  return (
    <Layout
      seo={{
        title: "Payment complete.",
        description:
          "Thanks for supporting Prototypr",
        //   image: "",
        // canonical: "https://prototypr.io/toolbox",
        // url: "https://prototypr.io/toolbox",
      }}
      activeNav={""}
    >
      {loading || !lsProduct ? (
        <div className="relative w-full h-full pt-10 flex">
          <div className="my-auto mx-auto">
            <Spinner />
          </div>
        </div>
      ) : lsProduct?.status=='paid' ? (
        <>
        {postObject?.featuredImage?
          <div className="fixed top-[88px] z-20 left-0 flex mb-6 border -mt-6 border-gray-300/60 bg-white p-2 w-full">
            <div className="max-w-[1160px] mx-auto md:px-3 w-full flex">
              <img src={postObject.featuredImage?.data?.attributes?.url} className="my-auto rounded-xl mr-2 w-[44px] h-[44px] object-cover"/>
              <div className="flex flex-col justify-center">
                <h1 className="pr-2 font-semibold">{postObject?.title}</h1>
                <div className="pr-2 text-gray-500" dangerouslySetInnerHTML={{__html:postObject?.description}}></div>
              </div>
            </div>
          </div>
          :null}
        <Container>
          <div className="px-4">
            <div className=" pt-20 mb-6">
              <h1 className="text-3xl mb-3 font-bold">Thanks for supporting Prototypr</h1>
              
              {!postObject?.company?.data?.id?
              // user has not created an account (no company assigned)
              <>
              <p>
                Your payment was successful. You can manage your sponsored post with a Prototypr account.  
              </p>
              <p>
              Check your inbox for an invitation. Don't see it? Resend it here:
              </p>
              <Button className="mt-6 rounded-full">Resend invitation</Button>
              </>:
              <p>Log in to manage your ads.</p>}
            </div>
          </div>
        </Container>
        </>
      ) : (
        <Container>
          <div className="max-w-2xl pt-3 mb-3">
            <h1 className="text-xl mb-3 font-bold">Payment is complete</h1>
            <p>Payment for this sponsorship has already been made. </p>
          </div>
        </Container>
      )}
    </Layout>
  );
}