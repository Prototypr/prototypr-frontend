// Assuming this is located at pages/api/yourEndpointName.js
// import { fetchUser } from "@/app/actions";
import { lemonSqueezyApiInstance } from "@/lib/utils/lemonSqueezyAPI";
import { userCheck } from "@/lib/account/userCheck";
import { withIronSessionApiRoute } from "iron-session/next";
import axios from "axios";

async function purchaseProduct(req, res) {
  if (req.method !== "POST") {
    // Only allow POST method for this endpoint
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    //get currentuser
    const { userId, user } = userCheck({ req, res, requireAuth: false });

    const reqData = req.body; // Directly use req.body for JSON payload
    // let email = user?.email

    if (userId) {
      if (!reqData.companyId) {
        return res.status(400).json({ message: "companyId is required" });
      }
    } else {
      //if no user, fetch the linked email as admin
      //don't need to fetch linked email, just saving sponsoredPostId id will do
      // let sponsoredPostEndpoint = {
      //   method: "get",
      //   url: `${process.env.NEXT_PUBLIC_API_URL}/api/sponsored-post/${reqData?.postObject?.id}`,
      //   headers: {
      //     Authorization: `Bearer ${process.env.STRAPI_READABLE_TOKEN}`,
      //   },
      // };
      // let sponsoredPost =  await axios(sponsoredPostEndpoint)
      // console.log(sponsoredPost)
    }

    if (!reqData.weeks) {
      return res.status(400).json({ message: "bookingDate is required" });
    }
    if (!reqData.postObject) {
      return res.status(400).json({ message: "postObject is required" });
    }
    if (!reqData.selectedProducts) {
      return res.status(400).json({ message: "selectedProducts is required" });
    }


    let sponsorshipQuantity = reqData.weeks?.newsletter?.length + reqData.weeks?.website?.length;

    

    if (sponsorshipQuantity < 1) {
      return res.status(400).json({ message: "No weeks selected" });
    }

    //save weeks to strapi if not yet paid (if paid don't allow change via pre-checkout)
    if(!reqData.postObject?.paid){
      let sponsoredPostId = reqData.postObject.id;
      let postData = {
        weeks: reqData.weeks,
      }
  
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

      await axios(configUpdateSponsoredPost)
      .then(async function (response) {
        console.log('ok')
      }).catch(function (error) {
        console.log('error')
        console.log(error)
      })
    }


    let addDiscount = false;


    if(sponsorshipQuantity >= 4){
      addDiscount = process.env.LEMON_SQUEEZY_10_DISCOUNT;
    }

    //if products contains newsletter and website, add discount
    if(reqData.selectedProducts.find(product => product.type === "newsletter") && reqData.selectedProducts.find(product => product.type === "website")){
      if(!addDiscount){
        addDiscount = process.env.LEMON_SQUEEZY_10_DISCOUNT;
      }else{
        //if already has bulk discount, add multi discount
        addDiscount = process.env.LEMON_SQUEEZY_15_DISCOUNT;
      }
    }

    //get the product by id server side strapi
   const price = await calculatePrice(reqData)


   //custom data for checkout
    let custom =  {
      sponsoredPostId: reqData.postObject.id.toString(),
      // weeks: (reqData.weeks),//data too big for lemonsqueezy - causes error when lots of
      // email:email
    }
    if(reqData.companyId){
      custom.company_id = reqData.companyId.toString()
    }


  //  console.log('reqData.weeks',reqData.weeks)
    // checkout attributes
    const attributes = {
      custom_price:price*100,
      product_options: {
        enabled_variants: [process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCTID_SPONSORSHIP],
      },
      checkout_options: {
        discount: false,
      },
      checkout_data: {
        // variant_quantities: variantQuantities,
        custom
      },
    }

    if(addDiscount){
      attributes.checkout_data.discount_code = addDiscount;
    }

    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: attributes,  
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
              id: process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCTID_SPONSORSHIP,
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
export default withIronSessionApiRoute(purchaseProduct, {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "prototypr/iron-session",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});


const calculatePrice = async(reqData) => {


  const productIds = reqData.postObject.products.map(product => product.id);
//rewrite the productIds array to match the format below

// ?filters[id][$in][0]=1&filters[id][$in][1]=2
//filters should be like the comment above. Rewrite the productresponse query to match this format, only if the productIds array index is not empty

let filters = "";
productIds.forEach((productId, index) => {
  if (productId) {
    filters += `filters[id][$in][${index}]=${productId}&`;
  }
});
const productResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${filters}`, {
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_READONLY_TOKEN}`,
  },
});


  const products = productResponse.data;
  // console.log(products);


  // console.log(reqData)
  let totalPrice = 0;
  products.data.forEach((product) => {
    const { id, attributes } = product;
    const { price } = attributes;
    
    // const quantity = reqData.newsletterProductId == id ? reqData?.newsletterDates?.length : reqData?.websiteDates?.length;
    const quantity = reqData.selectedProducts?.find(product => product.id == id).dates.length;

    totalPrice += price * quantity;

  });

  if(reqData.customDiscount){
    try{

      const response = await lemonSqueezyApiInstance.get(`/discounts?filter[store_id]=${process.env.LEMON_SQUEEZY_STORE_ID}`);
      //check if discount code exists
      const discountItem = response.data.data.find(d => d.attributes.code === reqData.customDiscount);
      const discountPercentage = discountItem.attributes.amount;

      totalPrice = totalPrice - (totalPrice * discountPercentage / 100);
      if(totalPrice==0){
        totalPrice=1
      }


    }catch(e){
      console.log('Error fetching discount')
    }
  }

  // console.log(totalPrice);

  return totalPrice
}