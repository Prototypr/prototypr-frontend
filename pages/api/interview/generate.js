// import { userCheck } from "@/lib/account/userCheck";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/iron-session/session";
import {generate} from "@prototypr/paper-interview/dist/api/generate"
export const runtime = "edge";
export const dynamic = "force-dynamic";

const getSession = async (req, res) =>{
  const session = await getIronSession(req, res, sessionOptions);
  return session
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const session = await getSession(req, res)
    const user = session.user

    if(!user?.login?.jwt){
      console.log('no token')
      return res.status(200).json({status:500,message:"User is not authenticated - invalid token"});
    }

    const userId = user?.login?.user?.id

    if (!userId) {
      return res.status(500).end("User is not authenticated");
    }

    if (userId) {
      // Call generate and get the stream
      const stream = await generate({ req, res, user });
      
      // Return the stream directly
      return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream' },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * hook up to iron session
 */
export default async function mainHandler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);
  req.session = session;
  return handler(req, res);
}