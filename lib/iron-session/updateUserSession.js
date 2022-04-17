import fetchJson from "@/lib/iron-session/fetchJson";

/**
 * request sent to updateUserSession
 * so the iron-session can be updated with the 
 * latest user data
 * 
 * if the mail has been changed, the user is no longer confirmed.
 * they need to click the activation link in a new email..so 
 * we trigger a refresh to show the email confirmation form
 * @param {*} info 
 * @param {*} mutateUser 
 * @returns 
 */
 export const updateUserSession = async (info, mutateUser) =>{
    const body = info
    try {
      // mutateUser(
      let refresh =  await fetchJson('/api/auth/updateUserSession', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }).then((res)=>{
          if(res.data?.login?.user?.confirmed==false){
            //user email has been updated, and not confirmed
            //so refresh the page
            return true
          }else{
            return false
          }
        })
        return refresh
      // )
    } catch (error) {
        console.error('An unexpected error happened:', error)
        return false
      }
  }

  /**
   * update the user session from the server side
   * with the response read from the database
   * 
   * (acter the GET req to process.env.NEXT_PUBLIC_API_URL + "/api/users/me" )
   * @param {*} req 
   * @param {*} res 
   */
  export const updateUserSessionSSR = async(req, res) =>{
    if (req.session.user) {
      if(res.data.email!=req.session.user.login.user.email){
       //if the email is new, set the current session to unconfirmed user
        req.session.user.login.user.email = res.data.email
        req.session.user.login.user.confirmed = false
      }else{
       req.session.user.login.user.confirmed = true 
      }
      req.session.user.login.user.username = res.data.username
      req.session.user.login.user.provider = res.data.provider
      req.session.user.login.user.location = res.data.location
      req.session.user.login.user.firstName = res.data.firstName
      req.session.user.login.user.secondName = res.data.secondName
      if(res.data.website){
        req.session.user.login.user.website = res.data.website
      }
      req.session.user.login.user.bio = res.data.bio
      req.session.user.login.user.paymentPointer = res.data.paymentPointer
 
      
      req.session.user={
       ...req.session.user,
     }
     await req.session.save();
   }
  }