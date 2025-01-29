const jwt=require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware=(req,res,next)=>{
   const authentication=req.headers.authentication;
   if(!authentication){return res.status(400).json('invalid tokens');}
   
    // extract jwt tokan from request
    const token=req.headers.athorization.split(' ')(1);
    if(!token) return res.status(401).json({error:'unAuthorized'});
    
    try{
        // verify the jwt token

        const decoded=jwt.verify(token,process.env.JWT_SECRECT);

        // attach the user information to the request object
        req.user=decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
    }
}
// function to generate token

const generateToken=(userData)=>{
    // generate a new jwt user data
    return jwt.sign(userData,process.env.JWT_SECRECT);
}

module.exports={jwtAuthMiddleware,generateToken};