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

    const [count, setCount] = useState(()=>{
        const storedCount = localStorage.getItem("WMFormatted")
        if(storedCount){
            return storedCount
        }
    })

    useEffect(()=>{
        let total = Number(localStorage.getItem("WMCount"));
        if(!total){
         localStorage.setItem("WMCount", 0);
         total = 0
        }
        let scale
        // https://webmonetization.org/docs/counter
        if (document?.monetization) {
            document.monetization.addEventListener('monetizationprogress', ev => {
              // initialize currency and scale on first progress event
              if (total === 0) {
                scale = ev.detail.assetScale
                localStorage.setItem("WMScale", Number(scale));
                if(ev.detail?.assetCode=='USD'){
                    localStorage.setItem("WMCurrency", '$');
                }
            }
            
            if(!scale){
                scale = Number(localStorage.getItem("WMScale")); 
            }
      
              total += Number(ev.detail.amount)

              const formatted = (total * Math.pow(10, -scale)).toFixed(scale)

              localStorage.setItem("WMFormatted", formatted);
              localStorage.setItem("WMCount", Number(total));
                setCount(formatted)
            })
          }
    }, [])


    return(
        <>
      {count ?<Provider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
          <div className="hover:cursor-pointer rounded-full shadow w-2 h-2 ml-4 mr-4 mt-1 bg-teal-500"/>
            {/* <IconButton>
              <PlusIcon />
            </IconButton> */}
          </TooltipTrigger>
          <TooltipContent sideOffset={5} >
          <div className="inline text-gray-600 text-sm flex flex-col"> 
          <div className="mb-2 text-xs font-medium text-gray-600">Micropayments</div>
          <div className="mb-4 flex p-1 px-2 bg-green-50 border border-green-100 border-1 rounded-lg text-teal-600 font-medium">{localStorage.getItem('WMCurrency')}{count}</div>
          <div className="" style={{fontSize:11}}>💚 Thanks for your support!</div>
          </div>
          </TooltipContent>
        </Tooltip>
      </Provider>:
          <div className="hover:cursor-pointer w-1 h-1 ml-2 mr-2 mt-1 bg-transparent"/>
          }
        </>
        
    )

    
}
export default WebMonetizationCounter
