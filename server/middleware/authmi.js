const jwt =  require('jsonwebtoken')

module.exports =function(req,res,next){
    //get token from the header
    const token =  req.header('Authoraization')
  

    //check  if no token
    if(!token){
        return  res.status(401).json({
            msg:'No token  authoraization denied'
        })
    }

    //verify  the token 

    try{
        const decode = jwt.verify(token,'qwertyuioqwerui')
         req.user =decode.user
         req.email=decode.email
         console.log(req.email)

        //  req.Access = JSON.parse(body)
        //  oauth_token = req.Access.access_token;

         console.log(decode.email)
       
        next();
    }catch(err){
        res.status(401).json({
            mg:'Token is not Valid'
        })
    }
}
//to  be implemented in a protected router 