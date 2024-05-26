// Assuming this is located at pages/api/yourEndpointName.js
// import { fetchUser } from "@/app/actions";
import { lemonSqueezyApiInstance } from "@/lib/utils/lemonSqueezyAPI";
// import { userCheck } from '@/lib/account/userCheck'
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/iron-session/session'

// https://docs.lemonsqueezy.com/api/orders#retrieve-an-order
async function retrieveOrder(req, res) {
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
    if (!reqData.orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    // return res.status(500).json({ message: "An error occurred" });
    const response = await lemonSqueezyApiInstance.get("/orders/"+reqData.orderId);
    // const response = await lemonSqueezyApiInstance.get("/products");

    const order = response.data.data;
    //don't return all order details, only send back payment status
    return res.status(200).json({ status:order?.attributes?.status });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

/**
 * hook up to iron session
 */
  export default async function mainHandler (
    req,
    res,
  ) {
    const session = await getIronSession(req, res,  sessionOptions)
    req.session = session
    return retrieveOrder(req, res)
  }
  