import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/iron-session/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req, res) {
  req.session.destroy();
  return res.json({ isLoggedIn: false, login: "", avatarUrl: "" });
}