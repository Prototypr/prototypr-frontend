import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import "tippy.js/dist/svg-arrow.css";
import "tippy.js/animations/scale-subtle.css";
import "react-datepicker/dist/react-datepicker.css";
import { typrNotesProps } from "@/lib/editor/typrNotesProps";
import Layout from "@/components/new-index/layoutForIndex";

const Tiptypr = dynamic(() => import("tiptypr"), {
  ssr: false,
});

/**
 *
 * Editor for slug page
 *
 * @returns
 */
export default function EditPostPage() {
  const { user, isLoading, mutateUser } = useUser({
    redirectTo: "/onboard",
    redirectIfFound: false,
  });

  const router = useRouter();
  const [postId, setPostId] = useState(-1);

  useEffect(() => {
    if (router.isReady && (router.query.slug || router.query.id)) {
      setPostId(router.query.slug || router.query.id || -1);
    }
  }, [router.isReady, router.query.slug, router.query.id]);

  return (
    <Layout
      navOffset={false}
      padding={false}
      preview={false}
      background={"#ede7e6"}
      // background={"#f7f9fd"}
      // background={"#F7F7F8"}
      // background={"#ffffff"}
      seo={{
        title: "New Note",
        description: "Create a new note on Prototypr",
        image: "",
        canonical: "https://prototypr.io/note",
        url: "https://prototypr.io/note",
      }}
    >
      <div className="h-screen overflow-hidden bg-gray-100">
        <div className="w-[758px] group z-10 flex items-center justify-center bg-gray-50 mx-auto mt-20 relative rounded-sm rounded-b-none shadow-lg h-[calc(100vh-114px)]">
          <div className="group relative w-full h-full overflow-hidden bg-white group-hover:border-gray-100  shadow-lg p-6 transform -rotate-1 hover:rotate-0 transition-all duration-500 ease-in-out border border-opacity-0 border-gray-400 group-hover:border-opacity-100">
            <div className="absolute inset-0 z-0 overflow-auto">
              <div className="z-10">
                <Tiptypr
                  {...typrNotesProps({
                    user,
                    userLoading: isLoading,
                    mutateUser,
                    router,
                  })}
                  postId={postId}
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gray-50 -left-1 top-0.5 transform -rotate-[1.5deg] -z-10 shadow-md transition-all duration-500 ease-in-out group-hover:-left-0.5 group-hover:-top-[2px] group-hover:rotate-0 border-l border-gray-50 border border-opacity-0 group-hover:border-gray-100 group-hover:border-opacity-100" />
          <div className="absolute inset-0 bg-white/80 -right-0.5 top-0.5 transform rotate-[1.5deg] -z-20 shadow-md transition-all duration-500 ease-in-out group-hover:-left-[4px] group-hover:right-0 group-hover:-top-[4px] group-hover:rotate-0 border-l border-t border-gray-50 border-opacity-0 group-hover:border-gray-100 group-hover:border-opacity-100" />
          <div className="absolute inset-0 -right-0.5 top-0 transform rotate-[1.5deg] -z-50 shadow-md transition-all duration-500 ease-in-out group-hover:right-0.5 group-hover:-top-0.5 group-hover:rotate-0 border-l group-hover:border-gray-100 border-opacity-0 group-hover:border-opacity-100" />
        </div>
      </div>
    </Layout>
  );
}
