
   
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/iron-session/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { useSession } from "next-auth/react";

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req, res) {

  // const { data: sessionInfo, status } = useSession();

  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  }
  // else if(status === "authenticated") {
  //   res.json({
  //     login:sessionInfo.user,
  //     isLoggedIn: true,
  //   })
  // } 
  else {
    res.json({
      isLoggedIn: false,
      login: '',
      avatarUrl: '',
    })
  }
}