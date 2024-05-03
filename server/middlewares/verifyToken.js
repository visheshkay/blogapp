const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken=(req,res,next)=>{
    const bearerToken = req.headers.authorization
    if(!bearerToken){
        res.send({message:'Please login to continue'})
    }
    else{
        const token = bearerToken.split(' ')[1]
        try{
            let decodedToken= jwt.verify(token,process.env.SECRET_KEY)
            next()
        }
        catch(err){
            res.send({errMsg:err.message})
        }
    }
}
module.exports=verifyToken