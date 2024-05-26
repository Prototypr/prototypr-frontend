import { sessionOptions } from "@/lib/iron-session/session";
import { getIronSession } from "iron-session";

export default async function mainHandler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);
  req.session = session;
  return logoutRoute(req, res);
}

async function logoutRoute(req, res) {
  req.session.destroy();
  return res.json({ isLoggedIn: false, login: "", avatarUrl: "" });
}
