
   
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/iron-session/session'
import axios from "axios";
import { getNextAuthSession } from '@/lib/account/getNextAuthSession'
import { updateSessionUser } from '@/lib/account/updateSessionUser';
import {checkSessionExpired} from  '@/lib/account/checkSessionExpired';
/**
 * combines nextauth authentication
 * with strapi passwordless auth
 */
export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req, res) {

  /**
   * get info from the user, if the session is 
   * a social one, with nextauth check that first
   */
  //get the nextauth session user
  const nextAuthSessionUser = await getNextAuthSession(req)
  
  // sessionUser, the user object iwth standardised format
  // cos you can log in with nextauth social providers/strapi passwordless 
  let sessionUser = null
  let isNextAuth = false
  let userObject = nextAuthSessionUser?.user
  
  if(nextAuthSessionUser?.user){
    sessionUser = nextAuthSessionUser
    isNextAuth = true
  }
  /**
   * if no nextauth session user, 
   * but there is an iron session/strapi email login user
   */
  //get the strapi email session user
  else if(req?.session?.user){
    sessionUser = req.session.user
  }
  
  // strapi passwordless or nextauth
  if(sessionUser?.login){

    //check if jwt is expired
    const sessionExpired = checkSessionExpired(sessionUser.login.jwt)
    //if so, just log them out
    if(sessionExpired){
      req.session.destroy();
      return res.json({
        isLoggedIn: false,
        login: '',
        avatarUrl: '',
      })
    }


    // https://github.com/vvo/iron-session/blob/main/examples/next.js/pages/api/user.js
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed

    //update the data each load so it's always up to date
    const strapiUserRes = await axios({
      method: "GET", // change this GET later
      url: process.env.NEXT_PUBLIC_API_URL + "/api/users/me",
      headers: {
        Authorization: `Bearer ${sessionUser.login.jwt}`,
      },
    });
    const {data:freshProfileData} = strapiUserRes

    //add user role and isAdmin flag
    if(sessionUser.login?.user){
      sessionUser.login.user.role = freshProfileData.role?.type
      sessionUser.login.user.isAdmin = (freshProfileData.role?.type==='admin')
    }

    //copy over the new profile data to the session user
    userObject = updateSessionUser(freshProfileData, sessionUser)
    
    //make sure the req session is up to date
    req.session.user={
      ...sessionUser,
    }
    //save it
    await req.session.save();
    /**
     * return the user
     */
    return res.json({
      ...sessionUser.login.user,
      jwt:sessionUser.login.jwt,
      isLoggedIn: true,
      profile:userObject.login.user,
      isNextAuth
    })
  }
  else{
    //nobody logged in
    return res.json({
      isLoggedIn: false,
      login: '',
      avatarUrl: '',
    })
  }
}