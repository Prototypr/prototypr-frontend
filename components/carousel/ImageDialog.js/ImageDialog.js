import dynamic from "next/dynamic";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger, DialogContentLarge, DialogTitle, DialogDescription, DialogClose, IconButton, DialogContentImage } from "@/components/Primitives/Dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
  } from '../EmblaCarouselArrowButtons'

const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

export const ImageDialog = ({open, toggleOpen, image, onPrevButtonClick, onNextButtonClick, prevBtnDisabled, nextBtnDisabled}) =>{
  const router = useRouter();

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(open){
            setLoading(true)
        }else{
            setLoading(true)
        }
    },[open])

    const navigate = (direction) =>{
        // setLoading(true)
        if(direction=='prev'){
            onPrevButtonClick()
        }else{
            onNextButtonClick()
        }
    }

    return(
        <Dialog  open={open} onOpenChange={toggleOpen}>
        <DialogContentImage className="w-[70vw]" variant="">
          <div>
          {/* <DialogTitle>Submit for Review</DialogTitle> */}
          <DialogDescription>
            <div className="w-full h-full relative">
                <div className="absolute w-full h-full">
                    <div className={`${loading?'h-[100px]':'opacity-0'}  flex justify-center`}>
                        <div className="my-auto">
                            <div className="text-white -mt-[80px] flex flex-col">
                                <div className="mx-auto mb-3">
                                    <Spinner/>
                                </div>
                                {/* <p className="text-gray-100/70 text-center">Loading image...</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Image 
                key={image}
                width={0}
                onLoadingComplete={()=>setLoading(false)}
                height={0}
                sizes="100vw"
                className={`w-auto h-auto max-w-full mx-auto`}
                // width={'100%'}
                // height={'100%'}
                src={image}/>
                <div className="embla__buttons absolute top-0 w-[110%] -ml-[5%] flex justify-between -mt-[2.45rem]">
                    <PrevButton onClick={()=>navigate('prev')} disabled={prevBtnDisabled} />
                    <NextButton onClick={()=>navigate('next')} disabled={nextBtnDisabled} />
                </div>
            </div>
          </DialogDescription>
          </div>

         {!loading &&  <DialogClose className="-mr-12" asChild>
            <IconButton className="bg-gray-200 shadow border border-gray-800 cursor-pointer" aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </DialogClose>}
        </DialogContentImage>
      </Dialog>
    )
}