import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import Meta from "@/components/meta";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { getPopularTopics } from "@/lib/api";
import { useRouter } from "next/router";
const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));
const LoginSide = dynamic(() => import("@/components/sign-in/LoginSide"));
const WMOnboarding = dynamic(() => import("@/components/user/WMOnboarding"));

export default function Index({allTags}) {
  const router = useRouter();

  const [inviteeEmail,setInviteeEmail] = useState(false)

  const { user } = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  });

  // useEffect(()=>{
  //   if((user?.profile?.onboardComplete==true) && !router?.query?.onboard){
  //     router.push("/");
  //   }
  // },[user])

  useEffect(()=>{
    if(router.query?.signin=='true'){
      toggleSignIn()
    }
    if(router.query?.inviteeemail){
      setInviteeEmail(router.query?.inviteeemail)
    }
  },[router.query])

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  return (
    <>
      <Head>
        <Meta
          seo={{
            title: "Sign into Prototypr",
            description: "Sign in or create an account",
            //   image: "",
            canonical: "https://prototypr.io/early-acess",
            url: "https://prototypr.io/early-acess",
          }}
        />
      </Head>

      <div className="h-full relative w-full grid md:grid-cols-12">
        <div className={`col-span-12 ${!user?.isLoggedIn?`md:col-span-6 lg:col-span-6`:''} z-10 relative`}>
          <div className="flex items-center justify-center h-full w-full relative">
            {!user && <Fallback />}

            {!user?.isLoggedIn?<div className="absolute top-[16px] left-[16px]">
              <Link href="/" passHref prefetch={false}>
                <Cross1Icon />
              </Link>
            </div>:''}
            {user && !user?.isLoggedIn ? (
              <div className="w-full h-full bg-white grid place-items-center">
                  <LoginForm inviteeEmail={inviteeEmail} user={user} isSignUp={isSignUp} toggleSignIn={toggleSignIn} />
                
              </div>
            ) : (
              user && user?.isLoggedIn && <WMOnboarding user={user} allTags={allTags} />
            )}
          </div>
        
        </div>
        {!user?.isLoggedIn? <div className="hidden z-50 relative w-full h-full md:block md:col-span-6 lg:col-span-6">
          <div 
          // style={{background:'radial-gradient(at right center, rgb(103, 118, 192), rgb(40,60, 151))'}}
          className="flex items-center magicpattern justify-center h-full w-full relative text-white">
            <LoginSide user={user} />
          </div>
        </div>:null}
      </div>
    </>
  );
}


export async function getStaticProps() {
  // const popularToolTags = (await getPopularTopics({postType:'tool', pageSize:9})) || [];
  const allTags = (await getPopularTopics({postType:'article', pageSize:30, offset:0})) || [];

  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  // let alphabetical = morePopularTags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  // allTags.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))



  return {
    props: {  
      // popularToolTags, 
      allTags:allTags
     },
    revalidate:8640//24 hrs
  };
}
