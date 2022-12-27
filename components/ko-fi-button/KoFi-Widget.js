import { useEffect }  from "react";

export default function App(props) {

    useEffect(() => {
        if(typeof window !=='undefined'){
            //if there's no ko-fi button added
            if(!window.kofiWidgetOverlay){
                //attach scroll listener, so ko-fi scripts and button can be added on scroll
                window.addEventListener('scroll', kofiScrollListener, false);
            }

        }
      }, [])

      /**
       * kofiScrollListener
       * Detect if scrolled past halfway, and add button
       */
      function kofiScrollListener(){
        if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight/2)) {
                openKofi()
            }
      }

    /**
     * openKofi
     * called from the scroll listener - adds all the ko-fi scripts 
     * also removes the scroll listener, so it only happens once
     */
    function openKofi(){

        window.removeEventListener('scroll', kofiScrollListener, false);
        var kofiLoaderScript = document.createElement("script");
        kofiLoaderScript.setAttribute("src", "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js");
        kofiLoaderScript.setAttribute("type", "text/javascript");
        document.head.appendChild(kofiLoaderScript);
        
        kofiLoaderScript.onload=()=>{
            var kofiButtonScript = document.createElement("script");
            kofiButtonScript.setAttribute("type", "text/javascript");
            kofiButtonScript.innerHTML=`
                window.kofiWidgetOverlay = kofiWidgetOverlay
                kofiWidgetOverlay.draw('prototyprio', {
                    'type': 'floating-chat',
                    'floating-chat.donateButton.text': 'Donate',
                    'floating-chat.donateButton.background-color': '#00b9fe',
                    'floating-chat.donateButton.text-color': '#fff'
                });
            `
            document.head.appendChild(kofiButtonScript);
        }
    }

    return null
  
}