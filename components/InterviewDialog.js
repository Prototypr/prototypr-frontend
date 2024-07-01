import dynamic from "next/dynamic";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContentLarge,
  DialogTitle,
  DialogDescription,
  DialogClose,
  IconButton,
  DialogContent,
} from "@/components/Primitives/Dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "./Primitives/Button";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

const InterviewDialog = ({
  tool,
  open,
  toggleOpen,
  createPost,
  user,
  initialEditor,
  relatedPostId,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContentLarge
        onPointerDownOutside={e => e.preventDefault()}
        className="w-full p-0 overflow-hidden rounded-2xl"
        variant=""
      >
        <div className=" bg-blue-300 relative w-full">
          <img src="https://prototypr.io/static/images/earth.png" />
          {tool?.attributes?.logo?.data?.attributes?.url ? (
            <div className="absolute bg-blue-300/20 top-0 left-0 w-full h-full">
              <div className="relative h-full w-full flex flex-col justify-center">
                <div className="my-auto mx-auto ">
                  <img
                    src={tool?.attributes?.logo?.data?.attributes?.url}
                    className="w-20 h-20 mx-auto rounded-2xl shadow-lg "
                  />
                  <h2 className="text-white text-center font-medium mt-1 text-xl tracking-tight drop-shadow-md">
                    {tool.attributes?.title}
                  </h2>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="bg-white z-10 relative -mt-6 p-4 rounded-t-3xl">
          <DialogTitle className="text-2xl tracking-tight">
            Get your story featured
          </DialogTitle>
          <DialogDescription>
            <p className="text-gray-500">
              We want to share the humans behind the products and the stories
              that make them unique. Share your product journey and get
              featured.
            </p>
          </DialogDescription>

          <div className="text-base text-gray-800">
            <h3 className="font-semibold tracking-tight">How it works:</h3>
            <ol className="list-decimal list-inside mb-3 pl-4 mt-2">
              <li className="mb-0.5">
                Fill in the following 'creator story template' and submit it to
                be featured.
              </li>
              <li className="mb-0.5">
                We'll review and get back to you with feedback and questions.
              </li>
              <li>
                Then we'll collaboratively edit to help tell <i>your</i> story.
              </li>
            </ol>
            <p>
              Once done, we'll publish it and send it out in the newsletter to{" "}
              <span className="text-underline">25k+ subscribers</span> and{" "}
              <span className="text-underline">100k+ followers</span> on the
              Prototypr Medium publication.
            </p>
            <div className="w-full flex justify-start">
              <Button
                disabled={loading}
                className="mt-6 cursor-pointe rounded-full"
                onClick={async () => {
                  setLoading(true);

                  try {
                    const postInfo = await createPost({
                      user,
                      editor: initialEditor,
                      forReview: false,
                      relatedPost: relatedPostId,
                    });
                    //set the new slug
                    localStorage.removeItem("wipInterview");

                    router.push(
                      `/toolbox/post/${relatedPostId}/interview/${postInfo?.id}`
                    );
                  } catch (e) {
                    setLoading(false);
                    alert("Error creating post. Please try again.");
                  }
                }}
              >
                {loading ? (
                  <div className="mx-auto ml-0.5 opacity-50">
                    <Spinner size="sm" />
                  </div>
                ) : (
                  <>Start your story</>
                )}
              </Button>
            </div>
          </div>
        </div>

        <DialogClose className="m-1 pointer-events-auto" asChild>
          <IconButton
            className="bg-gray-200 shadow border border-gray-800 cursor-pointer"
            aria-label="Close"
          >
            <Cross2Icon />
          </IconButton>
        </DialogClose>
      </DialogContentLarge>
    </Dialog>
  );
};
export default InterviewDialog;
