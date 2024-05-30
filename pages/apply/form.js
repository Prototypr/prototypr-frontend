import Head from "next/head";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import Meta from "@/components/meta";
// import { Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link'
// import { getPopularTopics } from "@/lib/api";
// import { useRouter } from "next/router";
// const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));
// const LoginSide = dynamic(() => import("@/components/sign-in/LoginSide"));
// const WMOnboarding = dynamic(() => import("@/components/user/WMOnboarding"));

export default function Apply() {
//   const router = useRouter();

  useEffect(()=>{
    const s = document.createElement("script");
    s.setAttribute("src", "https://tally.so/widgets/embed.js");
    s.setAttribute("id", "tally-form");
    s.setAttribute("async", "true");

    if(!document.getElementById('tally-form')){
      document.head.appendChild(s);
    }
    setTimeout(()=>{
        Tally?.loadEmbeds();
    },500)

  },[])

  const { user } = useUser({
    redirectTo: '/account',
    redirectIfFound: true,
  });


  return (
    <>
      <Head>
        <Meta
          seo={{
            title: "Apply for Prototypr Account",
            description: "Applicaiton to create an account",
            //   image: "",
            canonical: "https://prototypr.io/early-acess",
            url: "https://prototypr.io/early-acess",
          }}
        />
      </Head>

      <div className="h-full relative w-full grid md:grid-cols-12 min-h-screen">
    
        {!user?.isLoggedIn? <div className="hidden z-50 relative w-full h-full md:block md:col-span-5 lg:col-span-5">
          <div 
          // style={{background:'radial-gradient(at right center, rgb(103, 118, 192), rgb(40,60, 151))'}}
          className="flex items-center magicpattern justify-center h-full w-full relative text-white">
                <div className="flex flex-col w-full h-full relative">
     
            <div className="z-10 relative max-w-[420px] -mt-4 mx-auto flex flex-col h-full justify-center">
            <div className="relative">
                <p><Link href="/apply">← Back</Link></p>
                    {/* <Sparkle size={44}/> */}
                <h1 className="text-4xl leading-snug text-white font-medium  mt-4">
                Application Form
                </h1>
            <p className="my-4 max-w-[450px]">Prototypr accounts are invite only, and applications are manually approved to prevent spam signups. Members can create posts, submit links, get a profile and more. You can ask current members for an invite or submit this application.</p>
            {/* <div className="flex mt-4">
                <img className="w-[164px] my-auto" src="/static/images/prototypr-ppl.png"/>
                <p className="my-auto ml-4">Apply to join</p>
            </div> */}
            </div>
            </div>
            <div className="translate-y-[200px] scale-[1.5]">
            {/* <img
                className=" rotate-[-20deg]"
                src={`/static/images/signup-publishing-showcase.png`}
            ></img> */}
            </div>
        </div>
          </div>
        </div>:null}
        <div className={`col-span-12 ${!user?.isLoggedIn?`md:col-span-7 lg:col-span-7`:''} z-10 relative`}>
          <div className="flex items-center justify-center h-full w-full relative">
            {/* <div ref={formRef}/> */}
            <div className="p-4 rounded-lg h-screen overflow-auto w-full">
                <iframe
                data-tally-src="https://tally.so/embed/3EQrMq?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                className="w-full"
                height="{1333}"
                frameBorder="{0}"
                marginHeight="{0}"
                marginWidth="{0}"
                title="Prototypr Account Application"
                ></iframe>
            </div>

          </div>
        
        </div>
      </div>
    </>
  );
}
