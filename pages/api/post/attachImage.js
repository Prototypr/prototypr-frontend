import * as formidable from 'formidable';
import axios from 'axios'
import FormData from 'form-data';

import fs from 'fs'
import fetch from 'node-fetch'
export const config = {
    api: {
      bodyParser: false, // Disable Next.js body parser
    },
  };

export default async function handler(req, res) {


    // console.log(values)
    try{

        if (req.method !== 'POST') {
            return res.status(405).end('Method Not Allowed');
        }
    
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/upload`; // Your Strapi endpoint
    
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.STRAPI_WRITEABLE_TOKEN}`,
                ...req.headers,
            },
            body: req,
        };
         // Remove any headers that might cause issues or are not necessary to forward
        delete options.headers['host'];
        delete options.headers['content-length'];

        try {
            const strapiRes = await fetch(url, options);
            console.log(strapiRes)
            const data = await strapiRes.json();

            // Forward Strapi's response back to the original client
            res.status(strapiRes.status).json(data);
        } catch (error) {
            console.error('Error forwarding request to Strapi:', error);
            res.status(500).json({ message: 'Error forwarding request to Strapi' });
        }
        // const form = new formidable.IncomingForm();

        // form.parse(req, async (err, fields, files) => {
        //     if (err) {
        //       res.status(500).json({ error: 'Error parsing the files' });
        //       return;
        //     }
        
        //     // Here you can convert the images to FormData to send to another server
        //     const formDatas = []
        //     Object.keys(files).forEach((key) => {
        //         const formData = new FormData();
        //         const file = files[key][0]; // Assuming each field contains an array of files, and we take the first one
        //         formData.append(key, fs.createReadStream(file.filepath), file.originalFilename);
        //         formDatas.push({key,formData})
        //       });
        

        //     const postId = fields.postId;
        //     for(var x = 0;x<formDatas?.length;x++){
        //         let currentFormData = formDatas[x].formData
        //         if(formDatas[x].key=='banner'){
        //             currentFormData.append('refId',postId[0] )
        //             currentFormData.append('ref','api::sponsored-post.sponsored-post' )
        //             //upload to strapi
        //             var imageConfig = {
        //                 method: "post",
        //                 url: `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        //                 headers: {
        //                   Authorization: `Bearer ${process.env.STRAPI_WRITEABLE_TOKEN}`,
        //                 },
        //                 data: currentFormData,
        //               };
        //               await axios(imageConfig)
        //               .then(async function (response) {
        //                 console.log(response)
        //               })
        //               .catch(function (error) {
        //                 console.log(error)
        //                 // res.status(500).json({ error: 'Error parsing the files' });
        //               });
        //         }
        //     }
        
        //     // Now, you can use `formData` to send a request to another server, e.g., using axios
        //     // Ensure you set the 'Content-Type': 'multipart/form-data' in your request headers
        
        //     res.status(200).json({ message: 'Files parsed successfully', fields, files });
        //   });
    
    }catch(error){
        console.log(error)
        return res.status(500).send("Error creating sponsored post");

    }
  }
  