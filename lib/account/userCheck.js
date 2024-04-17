export const userCheck = ({req, res, requireAuth}) =>{

    if (!req?.session?.user) {
        console.log('no user')
        if(requireAuth!==false){
          return res.status(500).json({status:500,message:"User is not authenticated"});
        }
      }
  
      const user = req.session.user
      if(!user?.login?.jwt){
        console.log('no token')
        if(requireAuth!==false){
          return res.status(500).json({status:500,message:"User is not authenticated - invalid token"});
        }
      }
  
      const userId = user?.login?.user?.id?user?.login?.user?.id:null;
  
      if (!userId) {
        if(requireAuth!==false){
          return res.status(500).end("User is not authenticated");
        }
      }

      return {user, userId}
} 