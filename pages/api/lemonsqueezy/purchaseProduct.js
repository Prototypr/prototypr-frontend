// Assuming this is located at pages/api/yourEndpointName.js
// import { fetchUser } from "@/app/actions";
import { lemonSqueezyApiInstance } from "@/lib/utils/lemonSqueezyAPI";
import { userCheck } from '@/lib/account/userCheck'
import { withIronSessionApiRoute } from 'iron-session/next'

async function purchaseProduct(req, res) {
  if (req.method !== "POST") {
    // Only allow POST method for this endpoint
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // user check - returns error if no user found
    const {userId, user} = userCheck({req, res})

    const reqData = req.body; // Directly use req.body for JSON payload

    // console.log(user)
    // console.log(reqData.companyId)
    // console.log(reqData.productId)
    // console.log(reqData.bookingDate)

    if (!reqData.companyId) {
      return res.status(400).json({ message: "companyId is required" });
    }

    if (!reqData.productId) {
      return res.status(400).json({ message: "productId is required" });
    }
    if (!reqData.bookingDate) {
      return res.status(400).json({ message: "bookingDate is required" });
    }
    if (!reqData.postObject) {
      return res.status(400).json({ message: "postObject is required" });
    }

    let quantity = 1
    if(reqData.quantity){
        quantity= reqData.quantity
    }

    // Logging to console can still be done; just remember it appears in server logs
    // console.log(reqData.productId, 'companyid', reqData.companyId, 'lemonsqueezystore', process.env.LEMON_SQUEEZY_STORE_ID);

    // return res.status(500).json({ message: "An error occurred" });
    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
            product_options:{
                enabled_variants:[reqData.productId]
            },
          checkout_data: {
            variant_quantities:[
            {
                "variant_id": parseInt(reqData.productId,10),
                "quantity": parseInt(quantity,10)
            }
            ],
            custom: {
              company_id: reqData.companyId.toString(),
              sponsoredPostId:reqData.postObject.id.toString(),
              bookingDate:JSON.stringify(reqData.bookingDate)
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: reqData.productId.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response.data.data.attributes.url;
    return res.status(200).json({ checkoutUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

/**
 * hook up to iron session
 */
export default withIronSessionApiRoute(purchaseProduct,  {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'prototypr/iron-session',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
  