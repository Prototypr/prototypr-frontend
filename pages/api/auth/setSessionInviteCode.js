// Import necessary modules
import { withIronSessionApiRoute } from 'iron-session/next';
// import axios from "axios";
// import { parse } from 'cookie';
// import Cookies from 'cookies'

async function setSessionInviteCode(req, res) {
  // Assuming the access code is sent in the request body or as a query parameter
  const inviteCode = req.body.inviteCode || req.query.inviteCode;
  // console.log('hello invite code thing')
  // console.log('inviteCode',inviteCode)
  // // const cookies = parse(req.headers.cookie || '');
  // // console.log(cookies)
  // // const inviteCode = cookies['inviteCode']; // Retrieve the access code from parsed cookies

  // // const cookies = new Cookies(req, res)
  // console.log(`cookies.get('inviteCode')`)
  // console.log(cookies.get('inviteCode'))

  // let inviteCode = cookies.get('inviteCode')
  // // console.log(	req.cookies.get('inviteCode')?.value  )
// console.log('session')
// console.log(req.session)
// const inviteCode = false
  // console.log(inviteCode)
  try {
    // if (!req.session.user) {
    //   console.log('No user in session');
    //   return res.status(401).end("User is not authenticated");
    // }

    // Here, instead of updating the profile, you would store the access code in the session
    if (inviteCode) {
      req.session.inviteCode = inviteCode;
      // req.session.user.inviteCode = inviteCode;
      await req.session.save(); // Save the session with the access code
      console.log('saved req.session')
      console.log(req.session)
      return res.status(200).json({ message: "Access code saved in session", inviteCode });
    }else{
      console.log('no access code cookie found')
      return res.status(500).json({error:'No access code'})
    }

    // Any other logic can follow here, if needed
    // For example, if you're still updating the profile or performing another action

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export default withIronSessionApiRoute(setSessionInviteCode, {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'prototypr/iron-session',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
