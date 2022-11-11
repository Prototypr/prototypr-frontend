import { getSession } from "next-auth/react";

/*
 * //nextauth getSession provides:
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
 * */


/**
 * format should be returned as
 * the same as if a user logged into 
 * strapi with email only, which is this:
 * 
 * *  user:{
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
 * 
 * This file takes the next auth user session 
 * and returns the data in the same format
 * as strapi provides, so it's the same user object
 * regardless of the provider 
 * - strapi passwordless email or nextauth social
 */

  export const getNextAuthSession = async (req) =>{
    
    /**
   * get info from the user, if the session is 
   * a social one, with nextauth check that first
   */
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

    return nextAuthUser
    // res.json({
    //   ...nextAuthUser.login.user,
    //   jwt:nextAuthSession.jwt,
    //   isLoggedIn: true,
    //   isNextauth:true
    // })
  }else{
    return false
  }

  }
  