import { cloneDeep } from "lodash"
// export const updateSessionUser = (newStrapiProfile, sessionUser) =>{
export const updateSessionUser = (newStrapiProfile, existingSessionUser) =>{

    let sessionUser = cloneDeep(existingSessionUser)
    //keep session user simple so it doesn't run out of cookie memory
    existingSessionUser.login.user = {
      id:existingSessionUser.login?.user?.id, 
      jwt:existingSessionUser.login?.user?.jwt,
      email:existingSessionUser.login?.user?.email
    }
    // existingSessionUser = existingSessionUser.login
    //when the user email changes, set their confirmation status to unconfirmed
    if((newStrapiProfile.email && existingSessionUser.login.user.email) && (newStrapiProfile.email != existingSessionUser.login.user.email)){
        existingSessionUser.login.user.email = newStrapiProfile.email
        existingSessionUser.login.user.confirmed = false
      }else{
        existingSessionUser.login.user.confirmed = true 
      }
      //update the other profile fields with fresh data from strapi
      sessionUser.login.user.slug = newStrapiProfile.slug
      sessionUser.login.user.username = newStrapiProfile.username
      sessionUser.login.user.provider = newStrapiProfile.provider
      sessionUser.login.user.location = newStrapiProfile.location
      sessionUser.login.user.firstName = newStrapiProfile.firstName
      sessionUser.login.user.twitter = newStrapiProfile.twitter
      sessionUser.login.user.dribbble = newStrapiProfile.dribbble
      sessionUser.login.user.github = newStrapiProfile.github
      sessionUser.login.user.kofi = newStrapiProfile.kofi
      sessionUser.login.user.secondName = newStrapiProfile.secondName
      sessionUser.login.user.id = newStrapiProfile.id
      sessionUser.login.user.tags = newStrapiProfile.tags
      //checkboxes
      sessionUser.login.user.mentor = newStrapiProfile.mentor
      sessionUser.login.user.mentee = newStrapiProfile.mentee
      sessionUser.login.user.monetization = newStrapiProfile.monetization
      sessionUser.login.user.availability = newStrapiProfile.availability
      sessionUser.login.user.networking = newStrapiProfile.networking
      sessionUser.login.user.writer = newStrapiProfile.writer
      sessionUser.login.user.reader = newStrapiProfile.reader
      sessionUser.login.user.designer = newStrapiProfile.designer
      sessionUser.login.user.coder = newStrapiProfile.coder
      sessionUser.login.user.maker = newStrapiProfile.maker
      
      sessionUser.login.user.newsletterWeekly = newStrapiProfile.newsletterWeekly
      sessionUser.login.user.newsletterUpdates = newStrapiProfile.newsletterUpdates
      sessionUser.login.user.newsletterDeals = newStrapiProfile.newsletterDeals
      sessionUser.login.user.newsletterJobs = newStrapiProfile.newsletterJobs
      sessionUser.login.user.newsletters = newStrapiProfile.newsletters
      sessionUser.login.user.onboardComplete = newStrapiProfile.onboardComplete

      // delete sessionUser.login.user.newsletterJobs
      // delete sessionUser.login.user.newsletterDeals
      // delete sessionUser.login.user.newsletterUpdates
      // delete sessionUser.login.user.newsletterWeekly
      // delete sessionUser.login.newsletters
      if(newStrapiProfile.website){
        sessionUser.login.user.website = newStrapiProfile.website
      }
      sessionUser.login.user.bio = newStrapiProfile.bio
      sessionUser.login.user.paymentPointer = newStrapiProfile.paymentPointer
      sessionUser.login.user.avatar = newStrapiProfile.avatar

      if(newStrapiProfile.companies){
        sessionUser.login.user.companies = newStrapiProfile.companies
      }
      // if(req.body?.avatar?.url){
      //   req.session.user.login.user.avatar = req.body.avatar
      //  }else if (res.body?.avatar?.url){
      //    req.session.user.login.user.avatar = res.body.avatar
      //  }

      return sessionUser

}