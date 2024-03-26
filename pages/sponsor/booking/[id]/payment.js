// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout-dashboard";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";
import axios from 'axios'
import {
  useLoad,
  useGetUpcomingSponsorSlots,
} from "@/components/Sponsor/sponsorHooks";
// import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
// import { currentWeekNumber } from "@/components/Sponsor/lib/weekNumber";
// import { cloneDeep } from "lodash";
import Link from "next/link";
import BookingCalendar from "@/components/Sponsor/BookingCalendar";

export default function SponsorPaymentPage({}) {
  const [productId, setProductId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const { user, mutateUser } = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  });

  const { loading, content, postId, title, isOwner, postObject } =
    useLoad(user);

  useEffect(() => {
    setProductId(postObject?.productId);
    setCompanyId(postObject?.company);
  }, [postObject]);
  
  //lemonsqueezy product
  const [lsProduct, setLsProduct] = useState(null)
  //get the product (so latest pricing is available)
  useEffect(()=>{

    const getLsProduct= async() =>{

      const response = await axios.post("/api/lemonsqueezy/getProduct", {
        productId: productId,
      });
  
      setLsProduct(response.data);
    }

    if(productId){
      getLsProduct()
    }
  },[productId])

  // const [selectedSlots, setSelectedSlots] = useState(null);

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
      {loading ? (
        <div className="relative w-full h-full pt-10 flex">
          <div className="my-auto mx-auto">
            <Spinner />
          </div>
        </div>
      ) : !postObject?.active ? (
        <Container>
          <div className="px-8">
            <div className=" pt-3 mb-8">
              <h1 className="text-3xl mb-3 font-bold">Book a slot</h1>
              <p>
                Choose your week(s) and upon payment, your sponsored post will
                be reviewed by our team and scheduled.{" "}
              </p>
            </div>
           {productId? <BookingCalendar lsProduct={lsProduct} productId={productId} companyId={companyId} user={user} postObject={postObject} />:null}
            <p className="mt-3 max-w-2xl text-gray-500">
              You can come back and pay later, your sponsored post details are
              available on your{" "}
              <Link href="/dashboard/partner">
                <span className="text-blue-500">partners dashboard</span>
              </Link>
              .{" "}
            </p>
          </div>
        </Container>
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

// const Slots = ({productId, setSelectedSlots, selectedSlots}) =>{

//   const [weekNumber, setWeekNumber] = useState()
//   const [options, setOptions] = useState(null)

//   useEffect(()=>{
//     const week = currentWeekNumber() + 1
//     // const week = 40

//     //build the options based off the current week to start with
//     //present options for the upcoming 8 weeks
//     const totalWeeks = 8 + 1
//     const opts = []
//     for(var x = 0 ;x<totalWeeks;x++){
//       opts.push({
//         week:week + x,
//         available:true
//       })
//     }
//     setOptions(opts)
//     setWeekNumber(week)
// },[])


//   useEffect(()=>{
//     //now we got the slots, mark the booked ones as unavailable
//     if((slots?.length && options?.length)){
//       let posts = cloneDeep(options)
//       //create an array of every booked slot
//       const bookedWeeks = []
//       for(var x = 0;x<slots.length;x++){
//         let post = slots[x]
//         if(post?.weeks?.length){
//           for(var y = 0; y<post.weeks.length;y++){
//             bookedWeeks.push(post.weeks[y])
//           }
//         }
//       }
//        //set the booked weeks to disabled
//       if(bookedWeeks?.length){
//         for(var x = 0;x<bookedWeeks.length;x++){
//           for(var y = 0 ;y<posts.length;y++){
//             if(bookedWeeks[x]==posts[y]?.week){
//               posts[y].available=false
//             }
//           }
//         }
//       }
//       setOptions(posts)
//     }

//   },[slots])

//   // https://www.delftstack.com/howto/react/react-checkbox-onchange/
//   const updateSelections = (e) =>{
//     let selections = cloneDeep(selectedSlots)
//     const val = e.target.value

//     if(!selections?.length){
//       selections = []
//     }
//       if(!selections.includes(val)){          //checking weather array contain the id
//         selections.push(val);               //adding to array because value doesnt exists
//       }else{
//         selections.splice(selections.indexOf(val), 1);  //deleting
//       }
//     setSelectedSlots(selections)
//   }

//   return(
//     <>
// <div className="mb-6 mt-3 p-4 bg-white max-w-2xl mt-3 rounded-lg">
//           <h2 className="text-xl font-semibold mb-2">
//             Choose a slot
//           </h2>
//           {options?.map((option, index)=>{
//            return (
//            <>
//            <div class="mb-1">
//             <input
//             onChange={updateSelections}
//             disabled={!options[index].available}
//             id={options[index].week}
//             name={`${options[index].week}`}
//             value={options[index].week}
//             class={`${!options[index].available?'opacity-50 cursor-not-allowed':'cursor-pointer'} appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2`} type="checkbox"/>
//             <label class={`${!options[index].available?'opacity-50 cursor-not-allowed':''} inline-block text-gray-800`} for={options[index].week}>
//               Week {options[index].week}
//             </label>
//           </div>
//             </>)
//           })}
//         </div>
//     </>
//   )

// }
