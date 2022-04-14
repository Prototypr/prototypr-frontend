
   
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/iron-session/session'
import { getSession } from "next-auth/react";

/**
 * User needs to be standardised
 * 
 * //nextauth getSession provides:
 * //some of these properties, such as jwt are set inside nextauth
 * user:{
 *  avatar
 *  expires
 *  id
 *  jwt
 *  picture
 *  user{
 *    email
 *    image
 *    isLoggedIn
 *    name
 *  }
 * }
 * 
 *  iron-session/strapi provides everything in strapi:
 * 
 *  user:{
 *  isLoggedIn
 *  login:{
 *      jwt
 *      user{
 *        bio
 *        email
 *        username
 *        firstName
 *        secondName
 *      }
 *    }
 *  }
 * }
 * 
 */
/**
 * combines nextauth authentication
 * with strapi passwordless auth
 */
export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req, res) {

  //get the nextauth session
  const nextAuthSession = await getSession({req})
  
  //if the user is authenticated via nextauth session
  if(nextAuthSession && nextAuthSession.user){
    res.json({
      ...nextAuthSession.user,
      jwt:nextAuthSession.jwt,
      isLoggedIn: true,
    })
  }
  //now check if there's a strapi passwordless withIronSession session
  else if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user.login.user,
      jwt:req.session.user.login.jwt,
      isLoggedIn: true,
    })
  }
  else {
    res.json({
      isLoggedIn: false,
      login: '',
      avatarUrl: '',
    })
  }
}