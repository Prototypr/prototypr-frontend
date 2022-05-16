
   
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
    //check if the email is in the iron-session
    let email = nextAuthSession.user.email

    if(req.session.user && req.session.user.login?.user?.email){
      email = req.session.user.login?.user?.email
    }
    let avatar = ''
    if(req.session.user?.login?.user?.avatar){
      avatar=req.session.user.login?.user?.avatar
    }
    let id = null
    if(req.session.user?.login?.user?.id){
      id=req.session.user.login?.user?.id
    }
    let slug = null
    if(req.session.user?.login?.user?.slug){
      slug=req.session.user.login?.user?.slug
    }
    //save to iron-session
    let nextAuthUser={
      isLoggedIn:true,
      isNextAuth:true,
      login:{
        jwt:nextAuthSession.jwt,
        user:{
          email:email,//problem - this does not get updated
          name:nextAuthSession.user.name,
          avatar:avatar,
          id,
          slug
        }
      }
    }
     req.session.user=nextAuthUser
    await req.session.save();

    res.json({
      ...nextAuthUser.login.user,
      jwt:nextAuthSession.jwt,
      isLoggedIn: true,
      isNextauth:true
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
      isNextAuth:false
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