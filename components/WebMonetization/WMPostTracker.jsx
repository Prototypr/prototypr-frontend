import { useEffect } from 'react'
import { useMonetizationCounter } from './react-web-monetization'
import { resetGlobalWebMonetizationPage } from './react-web-monetization/global'
import { useRouter } from "next/router";
import { Provider, Tooltip, TooltipTrigger, TooltipContent } from "../Primitives/Tooltip";


const WMPostTracker = ({postId}) =>{
    const router = useRouter();

    const monetization = useMonetizationCounter(router.asPath)

    useEffect(()=>{

        const updateWM = async(monetization, url) =>{
            const result = await fetch(
                `https://wm.prototypr.io/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        formattedTotal:monetization.formattedTotal,
                        url:url,
                        monetization:monetization,
                        post_id:postId
                  })
                }
                );
            }
        //every time it changes send a request
        updateWM(monetization, router.asPath)

    },[monetization.totalAmount])


    useEffect(() => {
      
      
        function onRouteChangeComplete(url, { shallow }) {
  
            // console.log(url)
          //only check views for posts
          resetGlobalWebMonetizationPage(url)
  
        }
        // Record a pageview when route changes
        router.events.on('routeChangeComplete', onRouteChangeComplete);
    
        // Unassign event listener
        return () => {
          router.events.off('routeChangeComplete',onRouteChangeComplete);
        };
      }, []);

      return null
    // return <WMTooltipCounter count={monetization.formattedTotal}/>
}

export default WMPostTracker


const WMTooltipCounter = ({count}) =>{

    return(
        <>
      <Provider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
          {count &&<div className="hover:cursor-pointer rounded-full shadow w-2 h-2 ml-4 mr-4 mt-1 bg-teal-500"/>}
            {/* <IconButton>
              <PlusIcon />
            </IconButton> */}
          </TooltipTrigger>
          <TooltipContent sideOffset={5} >
          <div className="inline text-gray-600 text-sm flex flex-col"> 
          <div className="mb-2 text-xs font-medium text-gray-600">Micropayments</div>
          <div className="mb-4 flex p-1 px-2 bg-green-50 border border-green-100 border-1 rounded-lg text-teal-600 font-medium">${count}</div>
          <div className="" style={{fontSize:11}}>💚 Thanks for your support!</div>
          </div>
          </TooltipContent>
        </Tooltip>
      </Provider>
        </>
        
    )


}