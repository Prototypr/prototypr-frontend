// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
import axios from "axios";
import useUser from "@/lib/iron-session/useUser";
// import { useLoad } from "@/components/Jobs/jobHooks";
import Button from "@/components/Primitives/Button";
// import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
import { getToolById } from "@/lib/api";
import LoginForm from "@/components/sign-in/LoginForm";

// const PRODUCT_ID = 2

export default function ClaimToolPage({ data }) {
  const [post, setPost] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimedByUser, setClaimedByUser] = useState(false);

  const { user, mutateUser } = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  });

  useEffect(() => {
    if (!post) {
      setPost(data?.posts?.data[0]);
    }

    if (data?.posts?.data[0]?.attributes?.claimedBy && user?.id) {
      //if the user id exists in claimedByUser.data, then setClaimedByUser to true
      setClaimedByUser(
        data?.posts?.data[0]?.attributes?.claimedBy?.data?.some(
          claimUser => user.id == claimUser?.id
        )
      );
    }
  }, [data, user]);

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  const claimTool = async () => {
    setIsSubmitting(true);
    axios
      .post(`/api/post/claimPost`, { postId: post?.id })
      .then(res => {
        if (res.status === 200) {
          alert(
            "Claim request sent. You will be notified once the claim is approved."
          );
          setIsSubmitting(false);
          setClaimedByUser(true);
        }
      })
      .catch(err => {
        setIsSubmitting(false);
        console.log(err);
      });
  };

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
      <Container maxWidth="max-w-[1320px]">
        <div className="max-w-[650px] mt-6 mx-auto pt-3 mb-3 p-5 border border-black/10 rounded-xl bg-white">
          <img
            className="rounded rounded-lg shadow-sm border border-gray-100"
            src={post?.attributes?.legacyFeaturedImage?.logoNew}
            width={60}
            height={60}
          />
          <div className="">
            <h1 className="text-xl mb-3 font-bold mt-2">
              Claim "{post?.attributes?.title}"
            </h1>
            {!claimedByUser ? (
              <div className="text-gray-800">
                {!user?.isLoggedIn ? (
                  <p className="mb-2">Please sign in to claim this page.</p>
                ) : (
                  ""
                )}
                <p className="mb-2">
                  Once approved as owner, you'll be able to edit the
                  description, images, and see the page stats for this tool.
                </p>
                {user?.isLoggedIn ? (
                  <p className="mb-2">
                    To claim the page, send a message with the tool name and
                    URL, along with your user name.
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : null}
          </div>
          {user?.isLoggedIn === true && !claimedByUser ? (
            <Button
              className="mt-6 rounded-full"
              onClick={claimTool}
              type="button"
            >
              {isSubmitting ? <Spinner size="sm" /> : "Claim now"}
            </Button>
          ) : claimedByUser ? (
            <>
              <p className="text-gray-800 mt-6">
              ✅ You have claimed this page. You will be notified once the claim
                is approved.
              </p>
              <p className="text-gray-800 mt-1">
              💬 Please contact support if you need any more help.
              </p>
                <Button
                  className="mt-6 rounded-full"
                  onClick={() => {
                     // console.log(user)
                      // pop up chat
                      // window.$chatwoot?.setUser(user?.id, {
                      //   claimId: post?.id,
                      //   claimName: post?.attributes?.title,
                      // });
                      if (!window?.$chatwoot) {
                        addSupportScript();
                        setTimeout(() => {
                          window?.$chatwoot?.toggle();
                        }, 1000);
                      } else {
                        window?.$chatwoot?.toggle();
                      }
                      // window.$chatwoot.popoutChatWindow();

                      // woot-widget-bubble
                  }}
                  type="button"
                >
                  Ask support
                </Button>
            </>
          ) : (
            ""
          )}
        </div>

        {!(user?.isLoggedIn === true) ? (
          <div className="w-full relative max-w-4xl mx-auto ">
            <div
              className="w-full bg-white mt-6 border border-gray-300/70 mb-20 pt-20 shadow-sm pb-20 rounded-xl flex justify-center mx-auto"
              style={{ maxWidth: 650 }}
            >
              <LoginForm
                isSignUp={isSignUp}
                user={user}
                toggleSignIn={toggleSignIn}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params, preview = null, locale }) {
  const data = await getToolById(params.id, preview);
  return {
    props: {
      data,
    },
  };
}
