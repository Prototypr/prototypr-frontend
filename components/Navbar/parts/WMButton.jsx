import { Provider, Tooltip, TooltipTrigger, TooltipContent } from "../../Primitives/Tooltip";
// import { PlusIcon } from '@radix-ui/react-icons';
import { gray, teal, blackA } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import Link from "next/link";
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent, DropdownMenuItem, DropdownMenuItemIndigator, DropdownMenuTriggerItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuArrow } from '../../ProfileBadge' 
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const WMCounter = dynamic(() => import("../../WebMonetization/Counter"), {
  ssr: false,
});

    // Your app...
    const IconButton = styled('button', {
        all: 'unset',
        fontFamily: 'inherit',
        borderRadius: '100%',
        height: 32,
        width: 32,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: teal.teal11,
        backgroundColor: 'white',
        // boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: teal.teal3 },
        border: `1px solid ${gray.gray3}`,
        '&:focus': { boxShadow: `0 0 0 2px ${teal.teal5}` },
      });
      

const WMButton = () =>{

  const [monetizationActive, setMonetizationActive] = useState(false)

  
  const router = useRouter();
  useEffect(() => {

    // https://webmonetization.org/docs/api/
    function startEventHandler (event) {
      setMonetizationActive(true)
    }
    
    document?.monetization?.addEventListener('monetizationprogress', startEventHandler)
    return () => document?.monetization?.removeEventListener('monetizationprogress', startEventHandler)
  }, [router.asPath]);
    return(
        <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton style={{marginTop:'5px'}} aria-label="Web Monetization">
          <Provider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/web-monetization">
            <img dataGumlet={false} className={`w-full h-full my-auto text-green-600 object-cover rounded-full ${monetizationActive?'bg-teal-50/20':''}`} src={monetizationActive?'/static/images/icons/wm-icon-animated.svg':"/static/images/icons/wm.png"}/>
              {/* <MoneyIcon className="w-7 h-7 my-auto text-gray-700" /> */}
            </Link>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} >
            Web Monetization
          </TooltipContent>
        </Tooltip>
      </Provider>
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuPrimitive.DropdownMenuPortal container={document?.getElementById('main-nav')}>

          <DropdownMenuContent
            side={"bottom"}
            align={"center"}
            // alignOffset={-10}
            avoidCollisions={true}
            // sideOffset={-36}
          >
            <h2 className="font-semibold text-xs uppercase mb-2 py-2 text-teal-900/70 cursor-default rounded px-6 bg-gray-50">Web Monetization</h2>
            <DropdownMenuItem
              onSelect={() => {
                router.push(`/web-monetization`);
              }}
            >
                Earn micropayments
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={() => {
                router.push("/web-monetization/payment-pointer");
              }}
            >
              Get a pointer pointer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                router.push("/posts/web-monetization/page/1");
              }}
            >
              Explore Web-Monetization
            </DropdownMenuItem>
            <DropdownMenuArrow offset={12} />
            <div>
            <WMCounter/>
            </div>
          </DropdownMenuContent>
        </DropdownMenuPrimitive.DropdownMenuPortal>
      </DropdownMenu>

      
        </>
        
    )

    
}
export default WMButton
