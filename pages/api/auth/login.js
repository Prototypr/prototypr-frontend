// import { User } from "./user";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/iron-session/session";
// import { NextApiRequest, NextApiResponse } from "next";

var axios = require("axios");

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req, res) {
  const { token } = await req.body;
  try {
    var config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/passwordless/login?loginToken=${token}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(async function (response) {
        const user = { isLoggedIn: true, login: response.data };

        req.session.user = user;
        await req.session.save();
        return res.status(200).json(user);
      })
      .catch(function (error) {
        return res.status(400).json({ message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
