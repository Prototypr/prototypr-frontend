
   
import { withIronSessionApiRoute } from 'iron-session/next'

//for some reason, importing this causes an error - cannot initialize sessionOptions before creation
// import { sessionOptions } from '@/lib/iron-session/session'


/**
 * endpoint for updating the session after
 * the user updates their details on the UserForm
 * 
 * If the email is new, the user session status is updated to unconfirmed
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function handler(req, res) {
   
  //now check if there's a strapi passwordless withIronSession session
   if (req.session.user) {
     if(req.body.email!=req.session.user.login.user.email){
      //if the email is new, set the current session to unconfirmed user
       req.session.user.login.user.email = req.body.email
       req.session.user.login.user.confirmed = false
     }else{
      req.session.user.login.user.confirmed = true 
     }
     req.session.user.login.user.username = req.body.username
     req.session.user.login.user.provider = req.body.provider
     req.session.user.login.user.location = req.body.location
     req.session.user.login.user.firstName = req.body.firstName
     req.session.user.login.user.secondName = req.body.secondName
     if(req.body.website){
       req.session.user.login.user.website = req.body.website
     }
     req.session.user.login.user.bio = req.body.bio
     req.session.user.login.user.paymentPointer = req.body.paymentPointer

     
     req.session.user={
      ...req.session.user,
    }
    await req.session.save();

    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      data:req.session.user
    })
  }else{
    res.json({
      done:true
    })
  }
}

//add sessionOptions directly here for now
export default withIronSessionApiRoute(handler,  {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'prototypr/iron-session',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
})
