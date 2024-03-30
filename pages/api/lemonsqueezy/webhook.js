// pages/api/webhook.js
import crypto from "crypto";
import axios from 'axios'
// import getRawBody from "raw-body";

// https://vancelucas.com/blog/how-to-access-raw-body-data-with-next-js/
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}


//need this!! to check webhook when not in nextjs app directory
export const config = {
  api: {
    bodyParser: false,
  },
};



export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Catch the event type
      // const clonedReq = req.clone();
      const rawBody = await getRawBody(req);
      const eventType = req.headers["x-event-name"];
      
      const body =  JSON.parse(rawBody.toString());
  
      const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
      const hmac = crypto.createHmac('sha256', secret);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signature = Buffer.from(req.headers['x-signature'], 'utf8');
  
      if (!crypto.timingSafeEqual(digest, signature)) {
        console.log('invalid signautre')
        res.status(401).send('Invalid signature');
        return
      }

      if (eventType === "order_created") {
        console.log(body.meta.custom_data)
        console.log('----')
        const companyId = body.meta.custom_data.company_id;
        const sponsoredPostId = body.meta.custom_data.sponsoredPostId;
        const bookingDate = JSON.parse(body.meta.custom_data.bookingDate)
        const isSuccessful = body.data.attributes.status === "paid";
        if (isSuccessful) {
          console.log(companyId)
          console.log(bookingDate)
          
         const postData =  {
            weeks:bookingDate,
            paymentId:body.data.id,
            paid:true
          }

          //update product http://localhost:1337/api/restaurants/1
          let configUpdateSponsoredPost = {
            method: "PUT",
            // url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/updateSponsoredPost`,
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/sponsored-posts/${sponsoredPostId}`,
            headers: {
              // Authorization: `Bearer ${user?.jwt}`,
              Authorization: `Bearer ${process.env.STRAPI_WRITEABLE_TOKEN}`,
            },
            data: {
              data:{...postData},
            },
          };
          
          let inviteeEmail = null
          await axios(configUpdateSponsoredPost)
          .then(async function (response) {
            inviteeEmail=response.data?.data?.attributes?.email
          }).catch(function (error) {
            console.log('error')
            console.log(error)
          })

          if(!companyId){
            //create invite if the user has no company
            let configGenerateInvite = {
              method: "POST",
              // url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/updateSponsoredPost`,
              url: `${process.env.NEXT_PUBLIC_API_URL}/api/invite-only/generate-invite-token`,
              headers: {
                // Authorization: `Bearer ${user?.jwt}`,
                Authorization: `Bearer ${process.env.STRAPI_WRITEABLE_TOKEN}`,
              },
              data: {
                quantity:1,
                userId:2,
                inviteeEmail:inviteeEmail,
                sendEmail:true,
                via:'payment'
              },
            };
            await axios(configGenerateInvite)
            .then(async function (response) {
              const inviteToken = response?.data?.inviteToken
              
            }).catch(function (error) {
              console.log('error')
              console.log(error)
            })
          }          
        }
      }

      return res.status(200).json({ message: "Webhook received" });
    } else {
      // Handle any non-POST requests
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
