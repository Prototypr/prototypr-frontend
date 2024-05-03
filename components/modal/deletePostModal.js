import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, IconButton } from "../Primitives/Dialog";
import Button from "../Primitives/Button";
import { Trash } from "@/components/icons";


const DeletePostButton = ({ onClick }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="text-sm bg-white underline text-black p-3  rounded-full hover:bg-gray-100">
        <Trash size={18}/>
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this post?
      </DialogDescription>

      <div className="flex flex-row justify-start gap-2">
        <DialogClose asChild>
          <Button onClick={onClick} variant="red2">
            Delete
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button variant="gray">Cancel</Button>
        </DialogClose>
      </div>
      <DialogClose asChild>
        <IconButton aria-label="Close">
          <Cross2Icon />
        </IconButton>
      </DialogClose>
    </DialogContent>
  </Dialog>
);

export default DeletePostButton;
