import { userCheck } from "@/lib/account/userCheck";
import { getIronSession } from "iron-session";

import { sessionOptions } from "@/lib/iron-session/session";
const axios = require("axios");

async function handler(req, res) {
  // Check for secret to confirm this is a valid request

  //only logged in user can claim
  const { userId, user } = userCheck({ req, res });

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "postId is required" });
  }

  try {

    // fetch post 
    let postEndpointConfig = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}?populate=claimedBy`,
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_READONLY_TOKEN}`,
      },
    };

    let postResult = await axios(postEndpointConfig);
    let post = postResult.data;

    let claims = post?.data?.attributes?.claimedBy?.data?.length? post?.data?.attributes?.claimedBy?.data : [];

    //push userId to claims array if not already there
    if(!claims?.includes(userId)){
      claims.push(userId)
    }


    let postData = {
        claimedBy: claims,
      };

      let claimPostEndpointConfig = {
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_WRITEABLE_TOKEN}`,
        },
        data: {
          data: { ...postData },
        },
      };


    let claimPostResult = await axios(claimPostEndpointConfig);
    return res.status(200).json(claimPostResult.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error claiming post");
  }
}

export default async function mainHandler(req, res) {
    const session = await getIronSession(req, res, sessionOptions);
    req.session = session;
    return handler(req, res);
  }