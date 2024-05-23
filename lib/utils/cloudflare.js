import axios from 'axios'
export const purgeCloudFlareCache = async(url) =>{
    try {
      const response = await axios.post(
        `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_API_ZONE}/purge_cache`,
        { files: [url] },
        {
          headers: {
            'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.data.success) {
        return true
        // res.status(200).json({ message: 'Cache purged successfully' });
      } else {
        console.log('Cloudflare cache purge failed', response.data)
      }
    } catch (error) {
        console.log('Cloudflare cache purge failed', error)
    }
  }