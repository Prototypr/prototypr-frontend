import { Provider, Tooltip, TooltipTrigger, TooltipContent } from "../../Primitives/Tooltip";
// import { PlusIcon } from '@radix-ui/react-icons';
import { gray, teal } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import { CoinsIcon, MoneyIcon } from "@/components/icons";
import Link from "next/link";


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
        color: teal.teal11,
        backgroundColor: 'white',
        // boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: teal.teal3 },
        border: `1px solid ${gray.gray3}`,
        '&:focus': { boxShadow: `0 0 0 2px black` },
      });
      

const WMButton = () =>{

    return(
        <>
      <Provider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/web-monetization">
            <IconButton>
            <img className="w-7 h-7 my-auto text-green-600 rounded-full" src="/static/images/icons/wm.png"/>
              {/* <MoneyIcon className="w-7 h-7 my-auto text-gray-700" /> */}
            </IconButton>
            </Link>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} >
            Web Monetization
          </TooltipContent>
        </Tooltip>
      </Provider>
        </>
        
    )

    
}
export default WMButton
