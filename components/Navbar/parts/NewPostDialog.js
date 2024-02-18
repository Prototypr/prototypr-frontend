import React, { useEffect, useState } from "react";
import Button from "@/components/Primitives/Button";
import { Dialog, DialogTrigger, DialogContentLarge, DialogTitle, DialogDescription, DialogClose } from "@/components/Primitives/Dialog";
import { useRouter } from "next/router";
import Link from "next/link";
// import { Cross2Icon } from "@radix-ui/react-icons";
import { Sparkle, NotePencil, Package, TextAa, Briefcase } from "phosphor-react";
import { violet, mauve, blackA } from '@radix-ui/colors';
import { styled, keyframes } from '@stitches/react';



const button_options = [
  { name: "Wrte an article", link: "/write" },
  { name: "Submit a tool", filter: "/toolbox/post" },
];

const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 100,
    width: 100,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: blackA.blackA12,
    backgroundColor: 'white',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    // '&:hover': { backgroundColor: violet.violet3 },
    '&:focus': { boxShadow: `0 0 0 2px ${blackA.blackA5}` },
  });

const NewPostDialog = ({button}) => {
  const [submitOpen, setSubmitOpen] = useState(null)

  const toggleSubmitOpen = () =>{
    setSubmitOpen(!submitOpen)
  }

//   const router = useRouter();


//   useEffect(() => {
//     if(submitOpen){

//       toggleSubmitOpen()
//     }    

//   }, [router.asPath]);


  return (
    <Dialog onOpenChange={toggleSubmitOpen} open={submitOpen}>
        <DialogTrigger asChild>
        {button==true?
       <Button variant={"confirmBig"} className="rounded-full">
          Create new
        </Button>
        :<div className="flex cursor-pointer text-black/80 text-sm mr-3">
                  <NotePencil size={22} className="mr-1.5" />
                 <div className="my-auto font-medium">New</div>
              </div>}
        {/* <div
            className="rounded-full hover:bg-blue-50 cursor-pointer ml-2 bg-gray-50/20 p-2 text-sm"
            >
           <Button variant={"confirmRounded"}>
              New post
            </Button>
        </div> */}
        </DialogTrigger>
        <DialogContentLarge className="bg-transparent shadow-none" variant="big">
          <div>
          {/* <DialogTitle>Search</DialogTitle> */}
          <DialogDescription>
          <div className="relative  flex flex-col md:flex-row justify-center">
            <Link href="/write">
                <div className="flex group cursor-pointer flex-col mb-10 md:mb-0 md:mr-12">
                    <IconButton className="bg-white mx-auto transition transition-all duration-300 group-hover:scale-110 ">
                        <TextAa weight="fill" size="44"/>
                    </IconButton>
                    <h3 className="text-white text-lg mt-2 font-medium text-center transition transition-all duration-300 group-hover:scale-110 ">Article</h3>
                </div>
            </Link>
            <Link href="/toolbox/post">
                <div className="flex group cursor-pointer flex-col mb-10 md:mb-0 md:mr-12">
                    <IconButton className="bg-blue-500 transition transition-all duration-300 group-hover:scale-110 mx-auto">
                        <Package weight="fill" size="44"/>
                    </IconButton>
                    <h3 className="text-white text-lg transition transition-all duration-300 group-hover:scale-110 mt-2 font-medium text-center">Tool</h3>
                </div>
            </Link>
            <Link href="/jobs/post">
                <div className="flex group cursor-pointer flex-col">
                    <IconButton className="bg-purple-500 transition transition-all duration-300 group-hover:scale-110 mx-auto">
                    <Briefcase weight="fill" size="44" />
                    </IconButton>
                    <h3 className="text-white text-lg transition transition-all duration-300 group-hover:scale-110 mt-2 font-medium text-center">Opportunity</h3>
                </div>
            </Link>
           
          </div>
          </DialogDescription>
          </div>

          {/* <DialogClose asChild>
            <IconButton aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </DialogClose> */}
        </DialogContentLarge>
      </Dialog>
  );
};

export default NewPostDialog;