export const userCheck = ({req, res}) =>{

    if (!req?.session?.user) {
        console.log('no user')
        return res.status(500).json({status:500,message:"User is not authenticated"});
      }
  
      const user = req.session.user
      if(!user?.login?.jwt){
        console.log('no token')
        return res.status(500).json({status:500,message:"User is not authenticated - invalid token"});
      }
  
      const userId = user?.login?.user?.id?user?.login?.user?.id:null;
  
      if (!userId) {
        return res.status(500).end("User is not authenticated");
      }

      return {user, userId}
} 