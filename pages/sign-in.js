import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/sign-in/LoginForm";
import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
import LoginSide from "@/components/sign-in/LoginSide";
import Button from "@/components/atom/Button/Button";

export default function Index({ allPosts, preview }) {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Sign into Prototypr</title>
      </Head>

      <div className="h-full w-full grid md:grid-cols-12">
        <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
          <div className="flex items-center justify-center h-full w-full relative bg-[#252636] text-white">
            <LoginSide />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-8">
          <div className="flex items-center justify-center h-full w-full relative">
            {status === "loading" && <Fallback />}
            {status === "authenticated" && (
              <div className="flex flex-col w-[285px]">
                <h2 className="text-lg text-gray-800 font-bold text-center">
                  You're on the waitlist!
                </h2>
                <p className="text-sm text-gray-600 text-center mt-3 mb-4">
                  Let us know more about you by filling out your profile
                  information, and we'll be in touch soon!
                </p>
                <Link href="/account" passHref prefetch={false}>
                  <Button as="a" color="primary" className="text-sm">
                    Set up profile
                  </Button>
                </Link>
              </div>
            )}
            {status === "unauthenticated" && (
              <>
                <LoginForm />
                <div className="absolute top-[2%] right-[2%]">
                  <div className="text-sm text-gray-700 font-inter">
                    <span>I already have access? </span>
                    <Link href="/sign_in" passHref prefetch={false}>
                      <a className="text-primary-400">Sign in.</a>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
