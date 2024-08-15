import { getToolById } from "@/lib/api";
import useUser from "@/lib/iron-session/useUser";
import dynamic from "next/dynamic";

import "tippy.js/dist/svg-arrow.css";
import "tippy.js/animations/scale-subtle.css";
import "react-datepicker/dist/react-datepicker.css";
// import '@prototypr/paper-interview/dist/styles.css';
// import 'tiptypr/dist/styles.css';
import { useRouter } from "next/router";
import { typrProps } from "@/lib/editor/typrProps";

const Tiptypr = dynamic(() => import("tiptypr"), {
  ssr: false,
});

// const InterviewEditor = dynamic(() => import("prototypr-packages/private/InterviewEditor/components/InterviewEditor"), {
//   ssr: false
// });
const InterviewEditor = dynamic(
  () => import("@prototypr/paper-interview/dist/components/InterviewEditor"),
  {
    ssr: false,
  }
);

/**
 * Edit post page
 * used to edit existing post given the slug
 *
 * uses the 'edit' version of useLoad
 * /components/Editor/editorHooks/editPost/useLoad
 * this hook loads the editor with the existing post content from the backend
 *
 * @param {*} props
 * @returns
 */
export default function EditPostPage({ tool }) {
  const { user, isLoading, mutateUser } = useUser({
    // redirectTo: '/account',
    redirectTo: "/onboard",
    redirectIfFound: false,
  });
  const router = useRouter();

  
  return (
    <>
      <div className="h-screen w-screen">
        <div className="flex flex-row mx-auto w-full">
          <div className="w-full" id="interview-editor">
            <Tiptypr
              {...typrProps({ user, userLoading: isLoading, mutateUser, router })}
              isInterview={true}
              tool={tool}
              postId={(router?.isReady && (router.query.slug || router.query.id) )|| -1}
            >
              <InterviewEditor />
            </Tiptypr>
          </div>
          <div className="w-[450px] flex-none h-screen">
            <div
              id="assitant-panel"
              className="h-screen p-4 h-full border border-gray-200 w-[450px] shadow-sm fixed overflow-y-auto"
            >
              <h2 className="text-lg fixed z-30 top-0 right-0 w-[450px] border-l p-4 bg-gray-50 border-b border-gray-300 font-medium tracking-tight text-gray-800 mb-4">
                Interview Assistant
              </h2>
              <div id="assistant-container" className="mt-[100px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  let data;
  try {
    data = await getToolById(params.id, preview);
  } catch (error) {
    console.error("Failed to get tool:", error);
    return {
      notFound: true,
    };
  }

  let tool = data?.posts?.data[0] || null;
  return {
    props: {
      tool: tool || null,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
