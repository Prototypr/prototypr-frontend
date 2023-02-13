import { useEffect, useState } from "react";

const PreviewDisplay = ({ content, editor }) => {
 
  const [html, setHTML] = useState(null)

  useEffect(() => {
    setHTML(editor.getHTML())
  }, [editor]);

  useEffect(()=>{
    var tweets = document.getElementsByClassName('twitter-tweet')
    console.log(tweets)
    
    for(var x = 0;x<tweets.length;x++){
      let id = tweets[x]?.getAttribute('tweetId')
      tweets[x].outerHTML=`<div class="twitter-tweet" tweetId="${id}"></div>`
      
      window.twttr.widgets.createTweet(id, tweets[x]);

    }

  },[html])

  // use editor instead of content cos content only 
  // reflects what is there on first load
  return (
    <div>
      <article>
        <div className="max-w-2xl mx-auto blog-content pb-10">
          <h2 className="text-5xl">Preview</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default PreviewDisplay;
