// curl "https://api.lemonsqueezy.com/v1/discounts/1" 
//      -H 'Accept: application/vnd.api+json' 
//      -H 'Content-Type: application/vnd.api+json' 
//      -H 'Authorization: Bearer {api_key}'

// curl "https://api.lemonsqueezy.com/v1/discounts" 
//      -H 'Accept: application/vnd.api+json' 
//      -H 'Content-Type: application/vnd.api+json' 
//      -H 'Authorization: Bearer {api_key}'


import { lemonSqueezyApiInstance } from "@/lib/utils/lemonSqueezyAPI";

// https://docs.lemonsqueezy.com/api/discounts
export default async function handler(req, res) {

  if (req.method !== "POST") {
    // Only allow POST method for this endpoint
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // user check - returns error if no user found
    //anyone can view product
    // const {userId, user} = userCheck({req, res})

    const reqData = req.body; // Directly use req.body for JSON payload

    // console.log(user)
    if (!reqData.customDiscount) {
      return res.status(400).json({ message: "Discount code is required" });
    }

    // return res.status(500).json({ message: "An error occurred" });
    const response = await lemonSqueezyApiInstance.get(`/discounts?filter[store_id]=${process.env.LEMON_SQUEEZY_STORE_ID}`);
   
    // const response = await lemonSqueezyApiInstance.get("/products");
    
    //check if discount code exists
    const discount = response.data.data.find(d => d.attributes.code === reqData.customDiscount);
    
    if(!discount){
      return res.status(400).json({ message: "Discount code not found" });
    }

    return res.status(200).json({ discount:discount.attributes.amount });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}