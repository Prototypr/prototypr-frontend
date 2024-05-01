// import { processPost } from ".prototypr/prototypr-postie/index.js";
// import { processPost } from "@prototypr/prototypr-postie";
let processPost;

(async () => {
  try {
    if(process.env.NODE_ENV === 'development'){
      console.log('is dev')
      const postie = await import(".prototypr/prototypr-postie/index.js");
      processPost = postie.processPost;
    }else{
      const postie = await import("@prototypr/prototypr-postie");
      processPost = postie.processPost;
    }
  } catch (error) {
    processPost = () => {
      // Provide a fallback implementation or handle the error appropriately
      console.log("The @prototypr/prototypr-postie module is not installed.");
    };
  }
})();

export const maxDuration = 120; // This function can run for a maximum of 120 seconds

const axios = require("axios");

export default async function handler(req, res) {
  //get query string param called secret
  const secret = req.query.secret;

  if (secret !== process.env.PROTOTYPR_WEBHOOK_SECRET) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const processed = await processPost({
      source: "reader",
      data: req.body,
      req,
    });
    return res.status(200).send("done");
  } catch (e) {
    return res.status(500).send("Error processing post");
  }
  console.log(processed);

  // Check for secret to confirm this is a valid request
  const { values, packages } = req.body;

  let products = [];

  for (var i = 0; i < packages.length; i++) {
    products.push(packages[i].uid);
  }

  const { title, description, productId, link, sponsorEmail: email } = values;

  const entry = {
    title,
    description,
    productId,
    link,
    email,
    productIds: products.join(","),
    products,
  };

  try {
    /**
     * create sponsored post!
     */
    let publishPostEndpointConfig = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/sponsored-posts`,
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_WRITEABLE_TOKEN}`,
      },

      data: {
        data: {
          ...entry,
          publishedAt: null,
        },
      },
    };

    let postResult = await axios(publishPostEndpointConfig);

    return res.status(200).json({ id: postResult?.data?.data?.id });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error creating sponsored post");
  }
}
