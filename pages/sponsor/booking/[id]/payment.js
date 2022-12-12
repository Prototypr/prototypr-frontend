// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Container from "@/components/container";
import axios from "axios";
import useUser from '@/lib/iron-session/useUser'
import { useLoad, useGetUpcomingSponsorSlots } from "@/components/Sponsor/sponsorHooks";
import Button from "@/components/Primitives/Button";
// import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
import { currentWeekNumber } from "@/components/Sponsor/lib/weekNumber";
import { cloneDeep } from "lodash"
import Link from "next/link";


export default function SponsorPaymentPage({}) {

  const [PRODUCT_ID, setProductId] = useState(1)


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


  useEffect(()=>{
    if(postObject.type=='banner'){
      setProductId(1)
    }else if(postObject.type == 'link'){
      setProductId(3)
    }

  },[postObject])
  

    const [available, setAvailable] = useState(true)
    
    useEffect(()=>{        
        const getProd = async()=>{
            
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/strapi-stripe/getProduct/${PRODUCT_ID}`)
            if(response.data.availability===false){
              setAvailable(false)
            }
        }
        getProd()
     
      },[])

      const [selectedSlots, setSelectedSlots] = useState(null)

      

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
     {loading?
      <div className="relative w-full h-full pt-10 flex">
      <div className="my-auto mx-auto">
        <Spinner />
      </div>
      </div>
     :(available && !postObject?.active) ?
      <Container>
        <div className="max-w-2xl pt-3 mb-3">
       <h1 className="text-xl mb-3 font-bold">Complete your purchase</h1>

        {postObject?.type=='banner'?
        <div className="p-2 bg-blue-100 mb-4 rounded-lg">
        <p>
          Full package sponsorship: newsletter banner, and website placements for 1 week.
        </p>
        <p>Unit Price is $600, book as many as you like.</p>
        </div>  
        :postObject?.type=='link' &&
        <div  className="p-2 bg-blue-100 mb-4 rounded-lg">
        <p>
          1 sponsored link in the Prototypr weekly newsletter.
        </p>
        <p>Unit Price is $400, book as many as you like.</p>
        </div>  
        }

       <p>Once you complete your purchase, your sponsored post will be reviewed by our team and scheduled. </p>
        </div>
       {/* {!user?.isLoggedIn && <p>Please log in or create an account to buy a sponsorship.</p>} */}
        <Slots selectedSlots={selectedSlots} setSelectedSlots={setSelectedSlots} type={postObject?.type}/>
       
       <Button 
       onClick={()=>{
        if(!selectedSlots || !selectedSlots?.length){
          alert('Please choose the date(s) for your sponsorship.')
          return false
        }
        localStorage.setItem("strapiStripeUrl", process.env.NEXT_PUBLIC_API_URL);
        const getProductApi = process.env.NEXT_PUBLIC_API_URL + "/strapi-stripe/getProduct/" + PRODUCT_ID;
        const checkoutSessionUrl = process.env.NEXT_PUBLIC_API_URL + "/strapi-stripe/createCheckoutSession/";
        const successUrl = `${process.env.NEXT_PUBLIC_HOME_URL}/sponsor/booking/${postId}/payment-success`;
        const cancelUrl = `${process.env.NEXT_PUBLIC_HOME_URL}/sponsor/booking/${postId}/payment-failure`;

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
                postType:'sponsor',
                successUrl,
                cancelUrl,
                sponsorWeeks:selectedSlots?selectedSlots:null // an array of checkbox values [40,41,42]
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
       }} type="button">Complete purchase</Button>
          <p className="mt-3 max-w-2xl text-gray-500">You can come back and pay later, your sponsored post details are available on your <Link href="/dashboard/partner"><span className="text-blue-500">partners dashboard</span></Link>. </p>

      </Container>:
       <Container>
      <div className="max-w-2xl pt-3 mb-3">

      <h1 className="text-xl mb-3 font-bold">Payment is complete</h1>
      <p>Payment for this sponsorship has already been made. </p>
       </div>
       </Container>
      }
    </Layout>
  );
}


const Slots = ({type, setSelectedSlots, selectedSlots}) =>{


  const [weekNumber, setWeekNumber] = useState()
  const [options, setOptions] = useState(null)

  useEffect(()=>{
    // const week = currentWeekNumber()
    const week = 40

    //build the options based off the current week to start with
    //present options for the upcoming 8 weeks
    const totalWeeks = 8 + 1
    const opts = []
    for(var x = 0 ;x<totalWeeks;x++){
      opts.push({
        week:week + x,
        available:true
      })
    }
    setOptions(opts)
    setWeekNumber(week)
},[])

  const {slots, loading} = useGetUpcomingSponsorSlots({type})

  useEffect(()=>{
    //now we got the slots, mark the booked ones as unavailable
    if((slots?.length && options?.length)){
      let posts = cloneDeep(options)
      //create an array of every booked slot
      const bookedWeeks = []
      for(var x = 0;x<slots.length;x++){
        let post = slots[x]
        if(post?.weeks?.length){
          for(var y = 0; y<post.weeks.length;y++){
            bookedWeeks.push(post.weeks[y])
          }
        }     
      }
       //set the booked weeks to disabled
      if(bookedWeeks?.length){
        for(var x = 0;x<bookedWeeks.length;x++){
          for(var y = 0 ;y<posts.length;y++){
            if(bookedWeeks[x]==posts[y]?.week){
              posts[y].available=false
            }
          }
        }
      }
      setOptions(posts)
    }

  },[slots])

  // https://www.delftstack.com/howto/react/react-checkbox-onchange/
  const updateSelections = (e) =>{
    let selections = cloneDeep(selectedSlots)
    const val = e.target.value

    if(!selections?.length){
      selections = []
    }
      if(!selections.includes(val)){          //checking weather array contain the id
        selections.push(val);               //adding to array because value doesnt exists
      }else{
        selections.splice(selections.indexOf(val), 1);  //deleting
      }
    setSelectedSlots(selections)
  }

  return(
    <>
<div className="mb-6 mt-3 p-4 bg-white max-w-2xl mt-3 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Choose a slot
          </h2>
          {options?.map((option, index)=>{
           return ( 
           <>
           <div class="mb-1">
            <input 
            onChange={updateSelections}
            disabled={!options[index].available} 
            id={options[index].week} 
            name={`${options[index].week}`} 
            value={options[index].week} 
            class={`${!options[index].available?'opacity-50 cursor-not-allowed':'cursor-pointer'} appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2`} type="checkbox"/>
            <label class={`${!options[index].available?'opacity-50 cursor-not-allowed':''} inline-block text-gray-800`} for={options[index].week}>
              Week {options[index].week}
            </label>
          </div>
            </>)
          })}
        </div>
    </>
  )

}