import dynamic from "next/dynamic";

import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import { useState } from "react";
import Layout from "@/components/layout-editor";

import { PageStats } from "@/components/stats/PageStats";
import { useRouter } from "next/router";

const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

export default function Index(props) {
  const router = useRouter();

  const { user } = useUser({
    redirectTo: "/onboard",
    redirectIfFound: false,
  });

  const [isSignUp, setSignUp] = useState(true);
  const { slug: slugger } = router.query;

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  return (
    <>
      <div className="h-full w-full">
        <div id="editor-container" className="w-full h-full mx-auto  relative">
          {!user && <Fallback />}

          {user && !user?.isLoggedIn ? (
            <>
              <Layout>
                <div className="relative w-full h-screen flex">
                  <div className="my-auto mx-auto">
                    <Spinner />
                  </div>
                </div>
              </Layout>
            </>
          ) : (
            user &&
            user?.isLoggedIn && (
              <div>
                <PageStats />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}