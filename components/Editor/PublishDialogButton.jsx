import dynamic from "next/dynamic";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger, DialogContentLarge, DialogTitle, DialogDescription, DialogClose, IconButton } from "@/components/Primitives/Dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Primitives/Button";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

export const PublishDialogButton = ({createNewPost,updateExistingPost,postId, user, editor, postStatus, postObject, slug}) =>{
  const router = useRouter();

  const [submitting, setSubmitting] = useState(null)
  const [submitOpen, setSubmitOpen] = useState(null)

  const onSubmit = async () => {
    setSubmitting(true)
    // before submitting, check strapi if slug or id already exists
    // if it exists, then do an update, else create a new one
    if (!slug) {
      const postInfo = await createNewPost(user, editor);
      //set the new slug
      localStorage.removeItem("wipContent");
      router.push(`p/${postInfo?.id}`);
    }

    if (slug) {
      await updateExistingPost({postId, user, editor, slug, forReview:true, postStatus, postObject});
      setSubmitting(false)
    }
  };

  useEffect(()=>{
    if(!submitting){
      setSubmitOpen(false)
    }
  },[submitting])
  
  const toggleSubmitOpen = () =>{
    setSubmitOpen(!submitOpen)
  }


    return(
        <Dialog onOpenChange={toggleSubmitOpen} open={submitOpen}>
        <DialogTrigger asChild>
        <Button
            variant="confirmRounded"
            className="text-sm"
            >
          Submit
        </Button>
        </DialogTrigger>
        <DialogContentLarge variant="big">
          <div>
          <DialogTitle>Submit for Review</DialogTitle>
          <DialogDescription>
            <p className="mb-4">
             Your story will be submitted to our publication
             editors for review. The editors will review your
             draft and publish it within 1 week if it fits our
             guidelines, or get back to you with feedback.
            </p>
            <p className="mb-4">
             Readers will not see your story in the publication
             until it is reviewed and published by our editors.
             Feel free to continue editing even after
             submitting.
            </p>
          </DialogDescription>
          </div>

          <div className="flex flex-row justify-start gap-2">
              <Button 
              onClick={onSubmit} 
              disabled={submitting}
              variant="confirm">
               {submitting?
                <Spinner size="sm" className="mx-auto p-1 cursor-loading "/>:
               'Submit'}
              </Button>

            <DialogClose asChild>
              <Button variant="gray">Cancel</Button>
            </DialogClose>
          </div>
          <DialogClose asChild>
            <IconButton aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </DialogClose>
        </DialogContentLarge>
      </Dialog>
    )
}