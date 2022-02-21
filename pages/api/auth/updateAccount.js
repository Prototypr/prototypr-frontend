import { getSession } from 'next-auth/client'
import axios from "axios";

export default async (req, res) => {
    const session = await getSession({ req })
    if (session) {
      // Signed in
      var email = req.body && req.body.email
      var password = req.body && req.body.password
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`,
        {
            FirstName: 'gary',
            // password: password
        }, 
        {
            headers:{
                Authorization:`Bearer ${session.jwt}`
            }
        }
        ).then(function (response) {
            res.status(200)
        }).catch(function(error){
            // console.log(error.message)
            res.status(405)
        })
    } else {
      // Not Signed in
      res.status(401)
    }
    res.end()
  }