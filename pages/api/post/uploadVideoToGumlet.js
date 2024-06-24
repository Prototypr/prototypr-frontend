import { userCheck } from "@/lib/account/userCheck";
import { getIronSession } from "iron-session";

import { sessionOptions } from "@/lib/iron-session/session";
const fetch = require("node-fetch");

const url = "https://api.gumlet.com/v1/video/assets";

async function handler(req, res) {
  // Check for secret to confirm this is a valid request

  //only logged in user can claim
  const { userId, user } = userCheck({ req, res });

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { videoUrl, mediaId } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ message: "videoUrl is required" });
  }
  //   if (!mediaId) {
  //     return res.status(400).json({ message: "mediaId is required" });
  //   }

  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer [bearer otken here]",
      },
      body: JSON.stringify({
        format: "ABR",
        input: videoUrl,
        collection_id: "[collection id here]",
      }),
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return res.status(200).json(json);
    } catch (err) {
      console.error("error:" + err);
      return res.status(500).send("Error uploading to gumlet");
    }

    
    // return res.status(200).json(claimPostResult.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error uploading to gumlet");
}
}

export default async function mainHandler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);
  req.session = session;
  return handler(req, res);
}
