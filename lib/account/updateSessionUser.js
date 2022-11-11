export const updateSessionUser = (newStrapiProfile, sessionUser) =>{

    //when the user email changes, set their confirmation status to unconfirmed
    if(newStrapiProfile.email != sessionUser.login.user.email){
        sessionUser.login.user.email = newStrapiProfile.email
        sessionUser.login.user.confirmed = false
      }else{
        sessionUser.login.user.confirmed = true 
      }
      //update the other profile fields with fresh data from strapi
      sessionUser.login.user.slug = newStrapiProfile.slug
      sessionUser.login.user.username = newStrapiProfile.username
      sessionUser.login.user.provider = newStrapiProfile.provider
      sessionUser.login.user.location = newStrapiProfile.location
      sessionUser.login.user.firstName = newStrapiProfile.firstName
      sessionUser.login.user.secondName = newStrapiProfile.secondName
      sessionUser.login.user.id = newStrapiProfile.id

      if(newStrapiProfile.website){
        sessionUser.login.user.website = newStrapiProfile.website
      }
      sessionUser.login.user.bio = newStrapiProfile.bio
      sessionUser.login.user.paymentPointer = newStrapiProfile.paymentPointer
      sessionUser.login.user.avatar = newStrapiProfile.avatar

      // if(req.body?.avatar?.url){
      //   req.session.user.login.user.avatar = req.body.avatar
      //  }else if (res.body?.avatar?.url){
      //    req.session.user.login.user.avatar = res.body.avatar
      //  }

      return sessionUser

}