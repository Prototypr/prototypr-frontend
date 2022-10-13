import { useRouter } from "next/router";
import { useEffect } from "react";
var axios = require('axios');

// https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel
// copy from fathom analytics
const PageViewTracker = () =>{

    const router = useRouter();

    /**
     * onroutechange doesn't fire on page load,
     */
    useEffect(() => {
     const {asPath} = router
      //only check views for posts
      if(asPath.indexOf('/post/')>-1){
        axios
        .get(`/api/analytics?url=${asPath}`, {
          responseType: "json",
        })
        .then(function (response) {
          console.log(response?.data?.views);
        });
      }
  }, []);
    

    useEffect(() => {
      
      
      function onRouteChangeComplete(url, { shallow }) {

        //only check views for posts
        if(url.indexOf('/post/')>-1){
          axios
          .get(`/api/analytics?url=${url}`, {
            responseType: "json",
          })
          .then(function (response) {
            console.log(response?.data?.views);
          });
        }

      }
      // Record a pageview when route changes
      router.events.on('routeChangeComplete', onRouteChangeComplete);
  
      // Unassign event listener
      return () => {
        router.events.off('routeChangeComplete',onRouteChangeComplete);
      };
    }, []);


}

export default PageViewTracker