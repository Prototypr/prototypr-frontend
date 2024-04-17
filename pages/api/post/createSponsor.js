const axios = require("axios");

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  const { values, packages } = req.body;

  let products = [];

  for (var i = 0; i < packages.length; i++) {
    products.push(packages[i].uid);
  }

  const {
    title,
    description,
    productId,
    link,
    sponsorEmail: email,
  } = values;

  const entry = {
    title,
    description,
    productId,
    link,
    email,
    productIds: products.join(","),
    products
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
