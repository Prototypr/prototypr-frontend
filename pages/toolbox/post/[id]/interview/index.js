import useUser from "@/lib/iron-session/useUser";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import "tippy.js/dist/svg-arrow.css";
import "tippy.js/animations/scale-subtle.css";
import "react-datepicker/dist/react-datepicker.css";
import { typrProps } from "@/lib/editor/typrProps";
import { useTypr } from "tiptypr";
const Tiptypr = dynamic(() => import("tiptypr"), {
  ssr: false,
});

import { getPostWithTool, getToolById, getUserArticle } from "@/lib/api";
import InterviewDialog from "@/components/InterviewDialog";
import { createPost } from "@/lib/editor/createPost";

/**
 * Write
 * used to create new post
 *
 * uses the 'new post' version of useLoad
 * /components/Editor/editorHooks/newPost/useLoad
 * this hook loads the editor with any content stored in local storage
 *
 * @returns
 */
export default function InterviewEditor({ tool }) {
  const router = useRouter();
  const { user, isLoading, mutateUser } = useUser({
    // redirectTo: '/account',
    redirectTo: "/onboard",
    redirectIfFound: false,
  });

  const [postData, setPostData] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);


  useEffect(() => {
    if (postData && postData.interviews && postData.interviews.length > 0) {
      setIsDisabled(true);
      //redirect to the interview
      router.push(
        `/toolbox/post/${router.query.id}/interview/${postData?.interviews[0].id}`
      );
    } else {
      setIsDisabled(false);
    }
  }, [postData]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (user && router.query.id) {
        try {
          const data = await getUserArticle({user, id:router.query.id, type:'article'});
          setPostData(data);
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      }
    };

    fetchPostData();
  }, [user, router.query.id]);

  //useLoad hook
  //initialContent is null until loaded - so is 'false' when it's a new post
  // const { canEdit, loading, initialContent, postStatus } = useLoad({
  //   user,
  //   interview: true,
  //   productName: tool?.attributes?.title,
  // });

  //create new post hook
  // const { createPost } = useCreate();

  const [dialogOpen, setDialogOpen] = useState(true);
  const [initialEditor, setInitialEditor] = useState(null);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  if (router.isFallback) {
    return (
      <div className="my-auto h-screen flex flex-col justify-center text-center">
        <div className="mx-auto opacity-50">
          <Spinner />
        </div>
      </div>
    );
  }

  const typr = useTypr({
    ...typrProps({ user, userLoading: isLoading, mutateUser, router }),
    tool: tool,
    hooks:{
      onPostCreated: ({ id }) => {
        localStorage.removeItem("wipInterview");

        router.push(`/toolbox/post/${id}/interview/${postInfo?.id}`);
      },
    }
  });

  return (
    <>
      <Tiptypr
        typr={typr}
        // postOperations={{
        //   load: typrProps({ user, userLoading: isLoading, mutateUser, router }).postOperations.load,
        //   save: typrProps({ user, userLoading: isLoading, mutateUser, router }).postOperations.save,
        //   create: async ({ entry }) => {
        //     const postObject = await savePost({ editor: entry, forReview: false });
        //     return postObject;
        //   }
        // }}
      />
      <InterviewDialog
        tool={tool}
        initialEditor={initialEditor}
        createPost={async ({relatedPostId}) => {
          localStorage.removeItem("wipInterview");
          const dummyPost = {
            // title:` ${tool?.attributes?.title}: Creator Story`,
            // content: getInterViewTemplate({productName:tool?.attributes?.title}),
            versioned_title:` ${tool?.attributes?.title}: Creator Story`,
            versioned_content:getInterViewTemplate({productName:tool?.attributes?.title}),
            status:'draft',
            relation:relatedPostId
          };

          let post = await createPost({ entry: dummyPost, user: user });
          localStorage.removeItem("wipInterview");

          router.push(
            `/toolbox/post/${relatedPostId}/interview/${post?.id}`
          );
        }}
        toggleOpen={toggleDialog}
        open={dialogOpen}
        user={user}
        relatedPostId={router.query.id}
        enabled={!!postData && !isDisabled} // Enable dialog only when postData is available
      />
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



const getInterViewTemplate = ({productName}) =>{
  return `<p class="italic">Welcome to your creator story! This is an interview template that will help share your story and show the human behind the product. The purpose is to showcase work you're excited about, whilst also helping and inspiring readers with their own projects. On completion, your story will be featured on Prototypr and shared with our 25k+ newsletter subscribers and 100k+ Medium followers.</p>
    <ul>
        <li class="italic">Add your responses under the headings marked with Q.</li>
        <li class="italic">Feel free to add your own questions to steer the article</li>
        <li class="italic">Long answers are encouraged, we will scope it down where needed when editing the submission</li>
        <li class="italic">Add pictures and videos (this editor is still WIP, so add links to videos if they don't upload)</li>
    </ul>
    <p class="italic">Once completed, submit it for review, and we'll work with you to turn it into a piece <a href="https://prototypr.io/post/framer-sites-building-landing-pages-that-tell-stories-with-olvy" target="_blank">like this one</a> or <a href="https://prototypr.io/post/from-design-system-to-nft-design-system-creating-tinyfaces" target="_blank">this one</a>.</p>
    <hr>
  `

}