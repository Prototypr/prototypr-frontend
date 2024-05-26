// Assuming this is located at pages/api/yourEndpointName.js
// import { fetchUser } from "@/app/actions";
import { lemonSqueezyApiInstance } from "@/lib/utils/lemonSqueezyAPI";
import { userCheck } from "@/lib/account/userCheck";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/iron-session/session";

async function getProduct(req, res) {
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
    if (!reqData.productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    // return res.status(500).json({ message: "An error occurred" });
    const response = await lemonSqueezyApiInstance.get(
      "/variants/" + reqData.productId
    );
    // const response = await lemonSqueezyApiInstance.get("/products");

    const product = response.data.data;
    return res.status(200).json({ ...product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

/**
 * hook up to iron session
 */
export default async function mainHandler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);
  req.session = session;
  return getProduct(req, res);
}
