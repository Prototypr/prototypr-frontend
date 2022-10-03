import { useEffect, useState } from "react";
import { Provider, Tooltip, TooltipTrigger, TooltipContent } from "../Primitives/Tooltip";
// import { PlusIcon } from '@radix-ui/react-icons';
import { violet, blackA } from '@radix-ui/colors';
import { styled } from '@stitches/react';


    // Your app...
    const IconButton = styled('button', {
        all: 'unset',
        fontFamily: 'inherit',
        borderRadius: '100%',
        height: 35,
        width: 35,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: violet.violet11,
        backgroundColor: 'white',
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: violet.violet3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      });
      

const WebMonetizationCounter = () =>{

    const [count, setCount] = useState(null)

    useEffect(()=>{
        let total = Number(localStorage.getItem("webMonCount"));
        if(!total){
         localStorage.setItem("webMonCount", 0);
         total = 0
        }
        let scale
        // https://webmonetization.org/docs/counter
        if (document?.monetization) {
            document.monetization.addEventListener('monetizationprogress', ev => {
              // initialize currency and scale on first progress event
              if (total === 0) {
                scale = ev.detail.assetScale
                localStorage.setItem("webMonScale", Number(scale));
            }
            if(!scale){
                scale = Number(localStorage.getItem("webMonScale")); 
            }
      
              total += Number(ev.detail.amount)
      
              const formatted = (total * Math.pow(10, -scale)).toFixed(scale)

              localStorage.setItem("webMonCount", Number(total));
            //   document.getElementById('total').innerText = formatted
                setCount(formatted)
            })
          }
    }, [])


    return(
        <>
      <Provider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
          {count &&<div className="rounded-full shadow w-2 h-2 ml-4 mr-4 mt-1 bg-green-500"/>}
            {/* <IconButton>
              <PlusIcon />
            </IconButton> */}
          </TooltipTrigger>
          <TooltipContent sideOffset={5} >
          <div className="inline text-green-700 text-xs flex flex-col"> 
          <div className="mb-2 font-semibold">Web Monetization</div>
          <div>{count}</div>
          </div>
          </TooltipContent>
        </Tooltip>
      </Provider>
        </>
        
    )

    
}
export default WebMonetizationCounter
