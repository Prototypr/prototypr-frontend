import dynamic from "next/dynamic";

import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import Layout from "@/components/layout-editor";

import Editor from "@/components/Editor/Editor";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

// const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

export default function Index(props) {
  const { user } = useUser({
    redirectTo: "/early-access",
    redirectIfFound: false,
  });

  // const [isSignUp, setSignUp] = useState(true);

  // const toggleSignIn = () => {
  //   setSignUp(!isSignUp);
  // };

  return (
    <>
      <div className="h-full w-full">
        <div id="editor-container" className="w-full h-full mx-auto  relative">
          {!user && <Fallback />}

          {user && !user?.isLoggedIn ? (
            <>
              <Layout>
                <div className="relative w-full h-full flex">
                  <div className="my-auto mx-auto">
                    <Spinner />
                  </div>
                </div>
              </Layout>

              {/* <LoginForm isSignUp={isSignUp} />
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
                </div> */}
            </>
          ) : (
            user &&
            user?.isLoggedIn && (
              <div>
                {/* <EditDraft/> */}
                <Editor editorType="edit" />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}