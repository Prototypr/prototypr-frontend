import OpenAI from "openai";

import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/iron-session/session";
import { generate } from "@prototypr/paper-interview/dist/api/generate";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


async function getSession(req) {
  const res = new Response();
  const session = await getIronSession(req, res, sessionOptions);
  return session;
}

export async function POST(req) {
  try {
    const session = await getSession(req);
    const user = session.user;

    if (!user?.login?.jwt) {
      console.log("no token");
      return NextResponse.json(
        {
          status: 500,
          message: "User is not authenticated - invalid token",
        },
        { status: 401 }
      );
    }

    const userId = user?.login?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User is not authenticated" },
        { status: 401 }
      );
    }

    // Call generate and get the stream
    const stream = await generate({ req, user, openai });

    // Return the stream directly
    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}