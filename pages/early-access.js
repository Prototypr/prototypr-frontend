import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import Meta from "@/components/meta";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { getPopularTopics } from "@/lib/api";
const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));
const LoginSide = dynamic(() => import("@/components/sign-in/LoginSide"));
const WMOnboarding = dynamic(() => import("@/components/user/WMOnboarding"));

export default function Index({allTags}) {
  const { user } = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  });

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

      <div className="h-full w-full grid md:grid-cols-12">
        <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
          <div className="flex items-center justify-center h-full w-full relative bg-[#195DE2] text-white">
            <LoginSide user={user} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-8">
          <div className="flex items-center justify-center h-full w-full relative">
            {!user && <Fallback />}

            {/* <div className="absolute top-[2%] left-[2%]">
              <Link href="/" passHref prefetch={false}>
                <Cross1Icon />
              </Link>
            </div> */}
            {user && !user?.isLoggedIn ? (
              <div className="w-full h-full bg-[#F4F4F4] grid place-items-center">
                <div className="max-w-[500px] mx-auto">
                  <LoginForm isSignUp={isSignUp} />
                </div>
                <div className="absolute top-[2%] right-[2%]">
                  <div className="text-sm text-gray-700">
                    <span>
                      {isSignUp
                        ? "Already got an account?"
                        : "Not got an account yet?"}
                    </span>
                    <a
                      onClick={toggleSignIn}
                      className="text-primary-400 cursor-pointer"
                    >
                      {isSignUp ? " Sign in." : " Sign up"}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              user && user?.isLoggedIn && <WMOnboarding allTags={allTags} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export async function getStaticProps() {
  // const popularToolTags = (await getPopularTopics({postType:'tool', pageSize:9})) || [];
  const allTags = (await getPopularTopics({postType:'article', pageSize:30, offset:0})) || [];

  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  // let alphabetical = morePopularTags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  allTags.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))



  return {
    props: {  
      // popularToolTags, 
      allTags:allTags
     },
    revalidate:8640//24 hrs
  };
}
