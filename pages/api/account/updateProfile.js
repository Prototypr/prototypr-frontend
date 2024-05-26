/**
 * Change the password for a logged in user
 *
 * @param res.body
 */
 import qs from "query-string";
 import { getIronSession } from 'iron-session';
 import axios from "axios";
import { updateSessionUser } from "@/lib/account/updateSessionUser";
 import { sessionOptions } from '@/lib/iron-session/session'

 async function updateProfile(
  req,
  res
) {
  try {
    const body = req.body;
    let { data } = body;

    if (!req?.session?.user) {
      console.log('no user')
      return res.status(500).end("User is not authenticated");
    }

    const user = req.session.user
    if(!user?.login?.jwt){
      console.log('no token')
      return res.status(500).end("User is not authenticated - invalid token");
    }

    //check if jwt is expired
    // const sessionExpired = checkSessionExpired(sessionUser.login.jwt)
    // if(sessionExpired){
    //   console.log('expired session')
    //   return res.status(500).end("User session has expired");
    // }

    //remove empty form values
    // data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));

    //don't submit email and username - no allow change
    delete data.email
    // delete data.username
    
   const result = await axios({
    method: "POST",
    url:
      process.env.NEXT_PUBLIC_API_URL + "/api/users-permissions/users/me",
    headers: {
      Authorization: `Bearer ${user?.login?.jwt}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(data),
  });
  
  // console.log(result)
  if(result?.status==200){
    console.log('success')
    //update the user session 
    const updatedSessionUser = updateSessionUser(result.data, req.session.user)
    req.session.user = {
      ...updatedSessionUser
    }
    //save the session
    await req.session.save();
    //send result back
    return res.status(200).json({data:result.data, status:200});
  }else{
    return res.status(500).json({data:result, status:500});
  }
   
  } catch (error) {
    // console.log(error.toJSON())
    const er = error.response?.data?.error;
    return res.json({error:er, status:500});
  }
}

/**
 * hook up to iron session
 */
export default async function mainHandler (
  req,
  res,
) {
  const session = await getIronSession(req, res,  sessionOptions)
  req.session = session
  return updateProfile(req, res)
}
