/**
 * Change the password for a logged in user
 *
 * @param res.body
 */
 import qs from "query-string";
 import { withIronSessionApiRoute } from 'iron-session/next'
 import axios from "axios";
import { updateSessionUser } from "@/lib/account/updateSessionUser";
 
 async function updateProfile(
  req,
  res
) {
  try {
    const body = req.body;
    const { data } = body;

    if (!req?.session?.user) {
      console.log('no user')
      return res.status(500).end("User is not authenticated");
    }

    const user = req.session.user
    if(!user?.login?.jwt){
      return res.status(500).end("User is not authenticated - invalid token");
    }

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
  
  if(result.status==200){
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
    console.error(error.message);
    res.status(500).json({error:error.message});
  }
}

/**
 * hook up to iron session
 */
export default withIronSessionApiRoute(updateProfile,  {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'prototypr/iron-session',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
})
