// Assuming this is located at pages/api/yourEndpointName.js
// import { fetchUser } from "@/app/actions";
import { lemonSqueezyApiInstance } from "@/lib/utils/lemonSqueezyAPI";
// import { userCheck } from '@/lib/account/userCheck'
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/iron-session/session";

// https://docs.lemonsqueezy.com/api/orders#retrieve-an-order
async function resendInvite(req, res) {
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

    //create invite
    let configGenerateInvite = {
      method: "POST",
      // url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/updateSponsoredPost`,
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/invite-only/generate-invite-token`,
      headers: {
        // Authorization: `Bearer ${user?.jwt}`,
        Authorization: `Bearer ${process.env.STRAPI_WRITEABLE_TOKEN}`,
      },
      data: {
        quantity: 1,
        userId: 2,
        inviteeEmail: inviteeEmail,
        sendEmail: true,
      },
    };
    await axios(configGenerateInvite)
      .then(async function (response) {
        console.log("configGenerateInvite update:");
        const inviteToken = response?.data?.inviteToken;
        console.log("inviteToken", inviteToken);
        console.log("now send email ");
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });

    //don't return all order details, only send back payment status
    return res.status(200).json({ sent: true });
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
  return resendInvite(req, res);
}
