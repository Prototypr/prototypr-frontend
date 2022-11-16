var axios = require('axios');

export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (!req.query.url) {
      return res.status(401).json({message:"no url"});
    }

    try {

        var data = JSON.stringify({
        "url": req.query.url
        });
        

      var config = {
        method: 'post',
        url: process.env.NEXT_PUBLIC_STRAPI_API_URL+'/api/analytics',
        headers: { 
          'authorization': `Bearer ${process.env.STRAPI_READONLY_TOKEN}`, 
          'Content-Type': 'application/json'
        },
        data : data
      };

      
      axios(config)
        .then(function (response) {
            try{
                return res.status(200).json({ views: response.data?.results?.pageviews?.value})
                // return res.status(200).json({ views: response.data?.results?.visitors?.value})
            }catch(e){
                return res.status(500).send("Error checking analytics");
            }
        })
        .catch(function (error) {
        console.log(error.message);
        return res.status(500).send("Error checking analytics");
        });
   
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send("Error checking analytics");
    }
  }
  