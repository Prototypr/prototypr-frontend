const metascraper = require('metascraper')([
    // @ts-ignore
    require('metascraper-amazon')(),
    // @ts-ignore
    require('metascraper-spotify')(),
    // @ts-ignore
    require('metascraper-instagram')(),
    // @ts-ignore
    require('metascraper-author')(),
    // @ts-ignore
    require('metascraper-date')(),
    // @ts-ignore
    require('metascraper-description')(),
    // @ts-ignore
    require('metascraper-image')(),
    // @ts-ignore
    require('metascraper-logo')(),
    // @ts-ignore
    require('metascraper-clearbit')(),
    // @ts-ignore
    require('metascraper-publisher')(),
    // @ts-ignore
    require('metascraper-title')(),
    // @ts-ignore
    require('metascraper-url')(),

]);
const fetch = require('node-fetch');

const puppeteerUrl = 'https://letter-puppeteer.vercel.app/api/getPage'


export default async function handler(req, res) {
    const body = req.body;
    const {url} = body
     // Check for secret to confirm this is a valid request
     if (!url) {
        return res.status(401).json({message:"no url"});
      }

      try{

          const link = url
          let body = ''
          if(link.indexOf('amazon.')==-1){
              var pageRes = await fetch(link)
              body = await pageRes.text()
          }
          else if (link.indexOf('amazon.')>-1){
              
              var pageRes = await fetch(puppeteerUrl,{
                  method: 'post',
                  body: JSON.stringify({"url":link}),
                  headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${process.env.PUPPETEER_PASSWORD}`}
              })
      
              const data = await pageRes.json()
              body = data.html
          }
          let metadata = await metascraper({ html: body, url: link })

          //if it can't find the descripotion or date, something may be up
            if((!metadata.description || !metadata.date) || !metadata.image){
              //so fetch with pupetter
              var pageRes = await fetch(puppeteerUrl,{
                method: 'post',
                body: JSON.stringify({"url":link}),
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${process.env.PUPPETEER_PASSWORD}`}
            })
    
            const data = await pageRes.json()
            body = data.html
            metadata = await metascraper({ html: body, url: link })
          }
          
      
          let card = ``
          if(metadata){
            // card=`
            // <a href="${link}" target="_blank" class="headline no-underline ">
            // <div class="w-full max-w-[44rem] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            //     ${metadata?.image?`<img class="object-cover w-full rounded-t-lg h-48 md:w-48 md:rounded-none md:rounded-l-lg" src="${metadata.image}" alt="">`:''}
            //     <div class="flex flex-col justify-center p-4 leading-normal h-48">
            //         <h5 class="mb-2 no-underline text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${metadata?.title?metadata?.title:url}</h5>
            //         <p class="mb-3 no-underline font-normal text-gray-700 dark:text-gray-400">${metadata?.description}</p>
            //     </div>
            // </div>
            // </a>
            // `
            card = `
            <a href="${link}" target="_blank" contenteditable="false" class="headline link-box no-underline">
            <div contenteditable="false" class="w-full lg:max-w-full sm:flex mb-8 link-embed-box">
            ${metadata?.image?`<img class="object-cover h-48 sm:w-48 w-full border border-1 border-gray-200 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l rounded-r-none text-center overflow-hidden" src="${metadata?.image}"/>`:''}
            <div class="w-full border-r border-b border-l border-gray-200 h-auto pb-4 sm:h-48 lg:border-l-0 lg:border-t bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div class="my-auto">
                <div class="text-gray-900 font-bold text-lg mb-2 line-clamp-2">${metadata?.title?metadata?.title:url}</div>
                <div class="text-gray-600 line-clamp-2 text-sm">${metadata?.description}</div>
              </div>
            </div>
          </div>
          </a>
            `
          }

          return res.status(200).json({metadata, card})
      }catch(e){
        console.log(e)
        return res.status(500).send("Error fetching metadata");
      }


}